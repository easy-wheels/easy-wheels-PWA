
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const {Heap} = require('heap-js');

admin.initializeApp();

const db = admin.firestore();

exports.matchPassengerWithDriver = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        try {
            const {day, hour, toUniversity, geoHash, userPosition} = request.body;
            const currentDate = new Date();
            const docsTrips = await db.collection("trips")
                .where("full", "==", false)
                .where("toUniversity", "==", toUniversity)
                .where("day", "==", day)
                .where("hour", "==", hour)
                .where("geoHashes", "array-contains", geoHash)
                .where("departureDate", ">", currentDate).get();
            const trips = docsTrips.docs.map(doc => doc.data());
            if (trips.length < 1) {
                response.status(204).send();
            } else {
                let minDistance = maxDistanceInMatch;
                let minTrip = null;
                let meetingPoint = null;

                trips.forEach(trip => {
                    trip.route.forEach(point => {
                        let currentDistance = distance(point, userPosition);
                        if (minDistance > currentDistance) {
                            minTrip = trip;
                            minDistance = currentDistance;
                            meetingPoint = point;
                        }
                    })
                });
                minTrip.meetingPoint = meetingPoint;
                minTrip.minDistance = minDistance;
                response.status(200).send(minTrip);
            }
        } catch (error) {
            console.log(error);
            response.status(500).send(error)
        }
    })
});
exports.matchDriverWithPassenger = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const {day, hour, geoHashes, route, availableSeats, toUniversity} = request.body;

            const currentDate = new Date();
            let tripRequests = [];
            await Promise.all(geoHashes.map(async geoHash => {
                const docsTripRequests = await db.collection("tripRequests")
                    .where("matched", "==", false)
                    .where("toUniversity", "==", toUniversity)
                    .where("day", "==", day)
                    .where("hour", "==", hour)
                    .where("geoHash", "==", geoHash)
                    .where("arrivalDate", ">", currentDate).get();
                docsTripRequests.docs.forEach(doc => tripRequests.push(doc.data()));
            }));
            if (tripRequests.length < 1) {
                response.status(204).send();
            } else {
                const passengers = filterPassengers(route, tripRequests, availableSeats);
                response.status(200).send(passengers);
            }
        } catch (error) {
            console.log(error);
            response.status(500).send(error)
        }
    })
});

exports.setGeoHashToTripRequest = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const {email, userPosition, day, hour} = request.body;
            const geoHash = encodeGeohash(userPosition);
            await db.collection("tripRequests").doc(`${email} ${day} ${hour}`).set({
                geoHash: geoHash
            }, {merge: true});
            response.status(200).send(geoHash);
        } catch (error) {
            console.log(error);
            response.status(500).send(error)
        }
    })
});

exports.setGeoHashToTrip = functions.https.onRequest(async (request, response) => {
    return cors(request, response, async () => {
        try {
            const {driverEmail, route, day, hour} = request.body;
            let geoHashes = route.map(point => encodeGeohash(point));
            geoHashes = geoHashes.filter((hash, index) => {
                return !geoHashes.some((otherHash, otherIndex) => index > otherIndex && hash === otherHash);
            });
            await db.collection("trips").doc(`${driverEmail} ${day} ${hour}`).set({
                geoHashes: geoHashes
            }, {merge: true});
            response.status(200).send(geoHashes)
        } catch (error) {
            console.log(error);
            response.status(500).send(error)
        }
    })
});

function filterPassengers(route, tripRequests, availableSeats) {
    const possiblePassengers = [];
    tripRequests.forEach(tripRequest => {
        let minDistance = maxDistanceInMatch;
        let meetingPoint = {};
        route.forEach(point => {
            let currentDistance = distance(point, tripRequest.userPosition);
            if (minDistance > currentDistance) {
                minDistance = currentDistance;
                meetingPoint = point;
            }
        });
        possiblePassengers.push({...tripRequest, distance: minDistance, meetingPoint: meetingPoint});
    });
    const comparator = (a, b) => b.distance - a.distance;
    return nSmallest(possiblePassengers, availableSeats, comparator)

}

const nSmallest = (array, n, comparator) => {
    if (array.length <= n) {
        return array
    }
    const heap = array.slice(0, n);
    Heap.heapify(heap, comparator); //Max-Heap
    for (let i = n; i < array.length; i++) {
        if (heap[0] > array[i]) {
            Heap.heapreplace(heap, array[i], comparator);
        }
    }
    console.log("ans",heap);
    return heap

};

// Characters used in location geohashes
const g_BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";

// Number of bits per geohash character
const g_BITS_PER_CHAR = 5;

const maxDistanceInMatch = 700;

Math.log2 = Math.log2 || function (x) {
    return Math.log(x) / Math.log(2);
};

/**
 * Generates a geohash of the specified precision/string length from the  [latitude, longitude]
 * pair, specified as an array.
 *
 * @param {Object} geoPoint - The [latitude, longitude] pair to encode into a geohash.
 * @param {Object} geoPoint.lat - The latitude.
 * @param {Object} geoPoint.lng - The longitude.
 * precision The length of the geohash to create. If no precision is
 * specified, the global default is used.
 * @return {string} The geohash of the inputted geoPoint.
 */
function encodeGeohash(point) {
    const precision = 6;
    const latitudeRange = {
        min: -90,
        max: 90
    };
    const longitudeRange = {
        min: -180,
        max: 180
    };
    let hash = "";
    let hashVal = 0;
    let bits = 0;
    let even = 1;

    const geoPoint = toGeoPoint(point);

    while (hash.length < precision) {
        const val = even ? geoPoint.longitude : geoPoint.latitude;
        const range = even ? longitudeRange : latitudeRange;
        const mid = (range.min + range.max) / 2;

        /* jshint -W016 */
        if (val > mid) {
            hashVal = (hashVal << 1) + 1;
            range.min = mid;
        } else {
            hashVal = (hashVal << 1) + 0;
            range.max = mid;
        }
        /* jshint +W016 */
        even = !even;
        if (bits < 4) {
            bits++;
        } else {
            bits = 0;
            hash += g_BASE32[hashVal];
            hashVal = 0;
        }
    }
    return hash;
}

/**
 * Validates the inputted geohash and throws an error if it is invalid.
 *
 * @param {string} geohash The geohash to be validated.
 */
const validateGeohash = function (geohash) {
    let error;

    if (typeof geohash !== "string") {
        error = "geohash must be a string";
    } else if (geohash.length === 0) {
        error = "geohash cannot be the empty string";
    } else {
        let i = 0, length = geohash.length;
        for (; i < length; ++i) {
            if (g_BASE32.indexOf(geohash[i]) === -1) {
                error = "geohash cannot contain \"" + geohash[i] + "\"";
            }
        }
    }

    if (typeof error !== "undefined") {
        throw new Error("Invalid GeoFire geohash '" + geohash + "': " + error);
    }
};

/**
 * Converts degrees to radians.
 *
 * @param {number} degrees The number of degrees to be converted to radians.
 * @return {number} The number of radians equal to the inputted number of degrees.
 */
const degreesToRadians = function (degrees) {
    if (typeof degrees !== "number" || isNaN(degrees)) {
        throw new Error("Error: degrees must be a number");
    }
    return (degrees * Math.PI / 180);
};

const geoQueryWrapper = function (geoHash) {
    return geohashQuery(geoHash, 30)
};

/**
 * Calculates the bounding box query for a geohash with x bits precision.
 *
 * @param {string} geohash The geohash whose bounding box query to generate.
 * @param {number} bits The number of bits of precision.
 * @return {Array.<string>} A [start, end] pair of geohashes.
 */
const geohashQuery = function (geohash, bits) {
    validateGeohash(geohash);
    const precision = Math.ceil(bits / g_BITS_PER_CHAR);
    if (geohash.length < precision) {
        console.warn("geohash.length < precision: " + geohash.length + " < " + precision + " bits=" + bits + " g_BITS_PER_CHAR=" + g_BITS_PER_CHAR);
        return [geohash, geohash + "~"];
    }
    geohash = geohash.substring(0, precision);
    const base = geohash.substring(0, geohash.length - 1);
    const lastValue = g_BASE32.indexOf(geohash.charAt(geohash.length - 1));
    const significantBits = bits - (base.length * g_BITS_PER_CHAR);
    const unusedBits = (g_BITS_PER_CHAR - significantBits);
    /*jshint bitwise: false*/
    // delete unused bits
    const startValue = (lastValue >> unusedBits) << unusedBits;
    const endValue = startValue + (1 << unusedBits);
    /*jshint bitwise: true*/
    if (endValue >= g_BASE32.length) {
        console.warn("endValue > 31: endValue=" + endValue + " < " + precision + " bits=" + bits + " g_BITS_PER_CHAR=" + g_BITS_PER_CHAR);
        return [base + g_BASE32[startValue], base + "~"];
    } else {
        return [base + g_BASE32[startValue], base + g_BASE32[endValue]];
    }
};

/**
 * Static method which calculates the distance, in meters, between two locations,
 * via the Haversine formula. Note that this is approximate due to the fact that the
 * Earth's radius varies between 6356.752 km and 6378.137 km.
 *
 * @param {firebase.firestore.GeoPoint} location1 The [latitude, longitude] pair of the first location.
 * @param {firebase.firestore.GeoPoint} location2 The [latitude, longitude] pair of the second location.
 * @return {number} The distance, in meters, between the inputted locations.
 */
const distance = function (location1, location2) {
    const radius = 6371000; // Earth's radius in meters

    const loc1 = toGeoPoint(location1);
    const loc2 = toGeoPoint(location2);

    const latDelta = degreesToRadians(loc2.latitude - loc1.latitude);
    const lonDelta = degreesToRadians(loc2.longitude - loc1.longitude);

    const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
        (Math.cos(degreesToRadians(loc1.latitude)) * Math.cos(degreesToRadians(loc2.latitude)) *
            Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
};


const toGeoPoint = (location) => {
    let geoPoint = location;
    if (location.lat !== undefined && location.lng !== undefined){
        geoPoint = {latitude:location.lat, longitude: location.lng}
    }
    else if (location.latitude === undefined || location.longitude === undefined){
        geoPoint = {latitude:location._latitude, longitude: location._longitude}
    }
    return geoPoint;

};