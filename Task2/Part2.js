;(function () {

    function $$() {
        this._arrayV = [1, 2, 3, 4, 5, 6, 7];
        this._numericV = 0;
        this._contextV = null;
        this._reserved = function () {
        };
    }
    //name-functions
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
        return ((Object.prototype.toString.call(obj) === '[object Number]') && !(obj !== obj));
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
        return !(obj === obj);
    };
    $$.prototype.isNull = function (obj) {
        return (Object.prototype.toString.call(null) === '[Object Null]')
    };

    //returns newArray with elements, that accept iterator condition
    $$.prototype.where = function (arr, iterator) {
        let result = [];
        $$.prototype.forEach(arr, function (value, index, list) {
            if (iterator.call(null, value, index, list)) {
                result[result.length] = value;
            }
        });
        return result;
    };
    //returns the first element proceeded with fn, or if no fn, returns the first element
    $$.prototype.first = function (arr, fn) {
        if (!$$.prototype.isArray(arr)) throw "NotArrayArgumentException";
        if (arguments.length > 1) {
            if (arr.length > 0) return fn.call(null, arr[0]);
            else throw "EmptyArrayException"
        } else if (arguments.length === 1) {
            if (arr.length > 0) return arr[0];
            else throw "EmptyArrayException"
        }
    };
    //returns last element proceeded with fn, or if no fn, returns last element
    $$.prototype.last = function (arr, fn) {
        if (!$$.prototype.isArray(arr)) throw "NotArrayArgumentException";
        if (arguments.length > 1) {
            if (arr.length > 0) return fn.call(null, arr[arr.length-1]);
            else throw "EmptyArrayException"
        } else if (arguments.length === 1) {
            if (arr.length > 0) return arr[arr.length-1];
            else throw "EmptyArrayException"
        }
    };
    //returns newArray with bool elements, that indicate whether initial array elements satisfy given fn
    $$.prototype.select = function (arr, fn) {
        let result = [];
        $$.prototype.forEach(arr, function () {
            result[result.length] = fn.call(arr, arr);
        });
        return result;
    };
    //returns the array, that contains all elements of the initial, except first <number> elements
    $$.prototype.skip = function (arr, number) {
        if (this.isArray(arr)) {
            if (number >= arr.length) return [];
            else return Array.prototype.slice.call(arr, number, arr.length);
        } else
            throw "NotArrayArgumentException"
    };
    //returns the array, that contains first <number> of elements of the initial array
    $$.prototype.take = function (arr, number, fn) {
        if (!this.isNumber(number) && arguments.length >= 2) throw "NotNumberSecondArgumentException";
        if (!this.isArray(arr)) throw "NotArrayFirstArgumentException";
        if (!this.isFunction(fn) && arguments.length >= 3) throw "NotFunctionThirdArgumentException";
        if (arguments.length <= 2) {
            if (number >= arr.length) throw "NumberOutOfRangeException";
            return arr[number];
        }
        if (arguments.length >= 3) {
            if (number >= arr.length) throw "NumberOutOfRangeException";
            return fn.call(arr[number], arr[number])
        }
        throw "IncorrectInputException";
    };
    //makes all the array-functions be callable as a chain
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

    //setter and geters for values
    $$.prototype.getLastArrayOutput = function () {
        return this._arrayV;
    }
    $$.prototype.getLastNumericOutput = function () {
        return this._numericV;
    }
    $$.prototype.setInitialValues  = function (arr, num) {
        if(this.isArray(arr)) this._arrayV=arguments[0];
        if (this.isNumber(num)) this._numericV=arguments[1];
    };

    //additional functions
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
        let am = this;
        return function () {
            let finalArguments = initialArguments.concat([].slice.call(arguments));
            let result = fn.apply(this, finalArguments);
            if (this.isArray(result)) this._arrayV = result;
            if (this.isNumber(result)) this._numericV = result;
            am.turnIntoChained();
            return this;
        }
    };

    //export
    this.Lib = $$; //this must be equal window!!!
})();

let f = new Lib();
let s = f.turnIntoChained();

console.log(f.where((x) => x > 2).skip(2).first());
console.log(f.where((x) => x > 2).skip(2).last(x=>x*x));
function Lazy(fn) {
    fn.call(args);
}


