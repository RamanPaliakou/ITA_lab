define('primitive', function () {
    class basicOperations {

        constructor() {
        };

        randomStringGenerator() {
            return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
        };

        getTimePeriod(time) {
            if (+time >= 12) return "PM";
            if (+time < 12) return "AM";
        }
    }

    return {
        basicClass: basicOperations
    }
});