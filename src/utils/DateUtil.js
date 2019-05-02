class DateUtils {

    static days = [["Sunday", 0], ["Monday", 1], ["Tuesday", 2], ["Wednesday", 3], ["Thursday", 4], ["Friday", 5], ["Saturday", 6]];
    static dayToNumber = new Map(this.days);

    static getNextDateFromDayAndHour = (day, hour) => {
        let date = new Date();
        const d = new Date(date);
        const dayOfWeek = this.dayToNumber.get(day);
        const hourAndMinutes = hour.split(":");
        date.setMilliseconds(0);
        date.setSeconds(0);
        date.setMinutes(hourAndMinutes[1]);
        date.setHours(hourAndMinutes[0]);
        date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
        if (date.getTime() < d.getTime()){
            date.setDate(date.getDate() + 7);
        }
        return date
    };

    static getDateMinusSeconds = (date, seconds) => {
        let d = new Date(date);
        d.setSeconds(d.getSeconds() - seconds);
        return d
    };

    static getDatePlusSeconds(date, seconds) {
        let d = new Date(date);
        d.setSeconds(d.getSeconds() + seconds);
        return d
    }
}

export default DateUtils;