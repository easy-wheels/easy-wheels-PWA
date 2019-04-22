const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.matchPassengerWithDriver = functions.https.onRequest(async (request, response) => {
    try {
        const tripRequest = request.body;
        const docsTrips = await db.collection("TripV2.0").where("toUniversity", "==", tripRequest.toUniversity)
            .where("time", "==", tripRequest.time)
            .where("geoHashes", "array-contains", tripRequest.geoHash).get();
        const trips = docsTrips.docs.map(doc => doc.data());
        if(trips.length < 1){
            response.status(204).send();
            return;
        }
        let minDistance = maxDistanceInMatch;
        let minTrip;
        let meetingPoint;

        trips.forEach(trip => {
            trip.route.forEach(point => {
                let currentDistance = distance(point, tripRequest.point);
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
    } catch (error) {
        console.log(error);
        response.status(500).send(error)
    }
});

exports.matchDriverWithPassenger = functions.https.onRequest(async (request, response) => {
    try {
        const trip = request.body;
        let tripRequests = [];
        const consult = [];
        await Promise.all(trip.geoHashes.map(async geoHash => {
            // const geoHashesToQuery = geoQueryWrapper(geoHash);
            const docsTripRequests = await db.collection("TripRequestv2.0").where("toUniversity", "==", trip.toUniversity)
                .where("time", "==", trip.time)
                .where("geoHash", "==", geoHash).get();
            docsTripRequests.docs.forEach(doc => tripRequests.push(doc.data()));
        }));
        if(tripRequests.length < 1){
            response.status(204).send();
            return;
        }
        let minDistance = maxDistanceInMatch;
        let minTripRequest = {};
        let meetingPoint = {};
        trip.route.forEach(point => {
            tripRequests.forEach(tripRequest => {
                let currentDistance = distance(point, tripRequest.point);
                if (minDistance > currentDistance) {
                    minTripRequest = tripRequest;
                    minDistance = currentDistance;
                    meetingPoint = point;
                }
            })
        });
        minTripRequest.meetingPoint = meetingPoint;
        minTripRequest.minDistance = minDistance;
        response.status(200).send(minTripRequest);
    } catch (error) {
        console.log(error);
        response.status(500).send(request.body)
    }
});

exports.createGeoHashToTripRequest = functions.firestore
    .document('TripRequestv2.0/{tripRequestID}')
    .onCreate((snap, context) => {
        const point = snap.data().point;
        return snap.ref.set({
            geoHash: encodeGeohash(point)
        }, {merge: true});
    });

exports.updateGeoHashToTripRequest = functions.firestore
    .document('TripRequestv2.0/{tripRequestID}')
    .onUpdate((change, context) => {
        const pointBefore = change.before.data().point;
        const pointAfter = change.after.data().point;
        if (pointBefore === pointAfter) return null;
        return change.after.ref.set({
            geoHash: encodeGeohash(pointAfter)
        }, {merge: true});
    });

exports.createGeoHashToTrip = functions.firestore
    .document('TripV2.0/{tripID}')
    .onCreate((snap, context) => {
        const route = snap.data().route;
        let geoHashes = route.map(point => encodeGeohash(point));
        geoHashes = geoHashes.filter((hash, index) => {
            return !geoHashes.some((otherHash, otherIndex) => index > otherIndex && hash === otherHash);
        });
        return snap.ref.set({
            geoHashes: geoHashes
        }, {merge: true});
    });

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
 * @param {firebase.firestore.GeoPoint} geoPoint The [latitude, longitude] pair to encode into a geohash.
 * @param {number=} precision The length of the geohash to create. If no precision is
 * specified, the global default is used.
 * @return {string} The geohash of the inputted geoPoint.
 */
function encodeGeohash(geoPoint) {
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
    const latDelta = degreesToRadians(location2.latitude - location1.latitude);
    const lonDelta = degreesToRadians(location2.longitude - location1.longitude);

    const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
        (Math.cos(degreesToRadians(location1.latitude)) * Math.cos(degreesToRadians(location2.latitude)) *
            Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c;
};
