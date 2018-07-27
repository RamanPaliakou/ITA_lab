define(['Part2'], function Part2() {

    function $$() {
        this._arrayV = [1, 2, 3, 4, 5, 6, 7];
        this._numericV = 0;
        this._contextV = null;
        this._reserved = function () {};
    }

    //NAME-FUNCTIONS
    $$.prototype.isArray = function (obj) {
        //return(obj.constructor.name==='Array');
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    $$.prototype.isBoolean = function (obj) {
        // return typeof(obj)==='boolean';
        //return Object.prototype.toString.call(obj)==='[object Boolean]';
        return (obj === false || obj === true);
    };
    $$.prototype.isDate = function (obj) {
        // let d = new Date(obj);
        // return !isNaN(d.valueOf());
        return (obj instanceof Date && !isNaN(obj.valueOf()));
    };
    $$.prototype.isNumber = function (obj) {
        //return((obj.constructor.name==='Number')&& !(obj !== obj));
        return ((Object.prototype.toString.call(obj) === '[object Number]') && (obj === obj));
    };
    $$.prototype.isString = function (obj) {
        //return(obj.constructor.name==='String');
        return (Object.prototype.toString.call(obj) === '[object String]');
    };
    $$.prototype.isFunction = function (obj) {
        //return(obj.constructor.name==='String');
        return (Object.prototype.toString.call(obj) === '[object Function]');
    };
    $$.prototype.isUndefined = function (obj) {
        return (typeof (obj) === 'undefined');
    };
    $$.prototype.isNull = function (obj) {
        return (Object.prototype.toString.call(null) === '[Object Null]')
    };

    // ARRAY FUNCTIONS
    // Returns newArray with elements, that accept iterator condition
    $$.prototype.where = function (arr, iterator) {
        if (!$$.prototype.isArray(arr) || !$$.prototype.isFunction(iterator) || (arguments.length < 2))
            throw "IncorrectInputException";

        let result = [];
        $$.prototype.forEach(arr, function (value, index, list) {
            if (iterator.call(null, value, index, list)) {
                result[result.length] = value;
            }
        });
        return result;
    };

    // Returns the first element proceeded with fn, if no fn, returns the first element
    $$.prototype.first = function (arr, fn) {
        if ((arguments.length < 1) || !$$.prototype.isArray(arr) || (arr.length === 0))
            throw "IncorrectInputException";

        let func = (x) => x;
        if (arguments.length > 1)
            func = fn;

        return func.call(null, arr[0]);
    };

    // Returns last element proceeded with fn, or if no fn, returns last element
    $$.prototype.last = function (arr, fn) {
        if ((arguments.length < 1) || !$$.prototype.isArray(arr) || (arr.length === 0))
            throw "IncorrectInputException";

        let func = (x) => x;
        if (arguments.length > 1)
            func = fn;

        return func.call(null, arr[arr.length - 1]);
    };

    // Returns newArray with bool elements, that indicate whether initial array elements satisfy given fn
    $$.prototype.select = function (arr, fn) {
        if (!$$.prototype.isArray(arr) || !$$.prototype.isFunction(fn) || (arguments.length < 2))
            throw "IncorrectInputException";

        let result = [];
        $$.prototype.forEach(arr, function (value) {
            result.push(fn.call(null, value));
        });
        return result;
    };

    // Returns the array, that contains all elements of the initial, except first <number> elements,
    // If fn exists, method processes returned with fn;
    $$.prototype.skip = function (arr, number, fn) {
        let func = (x) => (x);
        if (arguments.length >= 3) func = arguments[2];

        if (!$$.prototype.isArray(arr) || !$$.prototype.isNumber(number) || !$$.prototype.isFunction(func))
            throw "IncorrectInputException";

        if (number >= arr.length) return [];
        let tempArr = Array.prototype.slice.call(arr, number, arr.length);
        return Array.prototype.map.call(tempArr, func);
    };

    // Returns the array, that contains first <number> of elements of the initial array
    $$.prototype.take = function (arr, number, fn) {
        let func = (x) => x;
        if (arguments.length >= 3) func = arguments[2];

        if (!$$.prototype.isArray(arr) || !$$.prototype.isNumber(number) || !$$.prototype.isFunction(func))
            throw "IncorrectInputException";

        if (number <= 0) return [];
        let tempArr = Array.prototype.slice.call(arr, 0, number);
        return Array.prototype.map.call(tempArr, func);
    };

    // Makes all the array-functions be callable as a chain
    $$.prototype.turnIntoChained = function () {

        if (!this._reserved.prototype.where) {
            this._reserved.prototype.where = $$.prototype.where;
            this._reserved.prototype.take = $$.prototype.take;
            this._reserved.prototype.select = $$.prototype.select;
            this._reserved.prototype.skip = $$.prototype.skip;
            this._reserved.prototype.first = $$.prototype.first;
            this._reserved.prototype.last = $$.prototype.last;
        }
        $$.prototype.where = this.partialApplyChained(this._arrayV, this._reserved.prototype.where);
        $$.prototype.take = this.partialApplyChained(this._arrayV, this._reserved.prototype.take);
        $$.prototype.select = this.partialApplyChained(this._arrayV, this._reserved.prototype.select);
        $$.prototype.skip = this.partialApplyChained(this._arrayV, this._reserved.prototype.skip);
        $$.prototype.first = this.partialApplyChained(this._arrayV, this._reserved.prototype.first);
        $$.prototype.last = this.partialApplyChained(this._arrayV, this._reserved.prototype.last);

        return this._reserved;
    };

    // Setter and getters for values
    $$.prototype.getLastArrayOutput = function () {
        return this._arrayV;
    };
    $$.prototype.getLastNumericOutput = function () {
        return this._numericV;
    };
    $$.prototype.setInitialValues = function (arr, num) {
        if (this.isArray(arr)) this._arrayV = arguments[0];
        if (this.isNumber(num)) this._numericV = arguments[1];
    };

    // Additional functions
    $$.prototype.forEach = function (arr, iterator) {
        if (!$$.prototype.isArray(arr)) throw ("NotArrayFirstArgumentException");
        if (!$$.prototype.isFunction(iterator)) throw ("NotFunctionSecondArgumentException");
        for (let i = 0, l = arr.length; i < l; i += 1) {
            iterator.call(null, arr[i]);
        }
    };
    $$.prototype.partialApplyChained = function () {
        let fn = arguments [arguments.length - 1];
        let initialArguments = [].slice.call(arguments, 0, arguments.length - 1);
        let self = this;
        return function () {
            let finalArguments = initialArguments.concat([].slice.call(arguments));
            let result = fn.apply(this, finalArguments);
            if (this.isArray(result)) this._arrayV = result;
            if (this.isNumber(result)) this._numericV = result;
            self.turnIntoChained();
            return this;
        }
    };

    // Export
    return {
        main: $$
    }

});



