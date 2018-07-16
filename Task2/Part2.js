function $$() {
    this.test = [1, 2, 3, 4, 5];
}

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

$$.prototype.forEach = function (arr, iterator) {
    if (!$$.prototype.isArray(arr)) throw ("NotArrayFirstArgumentException");
    if (!$$.prototype.isFunction(iterator)) throw ("NotFunctionSecondArgumentException");
    for (let i = 0, l = arr.length; i < l; i += 1) {
        iterator.call(null, arr[i]);
    }
};

$$.prototype.where = function (arr, iterator) {
    let result = [];
    $$.prototype.forEach(arr, function (value, index, list) {
        if (iterator.call(null, value, index, list)) {
            result[result.length] = value;
        }
    });
    return result;
};

$$.prototype.first = function (arr, fn) {
    if ($$.prototype.isArray(arr)) {
        if (arr.length > 0) return fn.call(null, arr[0]);
        else throw "EmptyArrayException"
    }
    throw "NotArrayArgumentException";
};

$$.prototype.last = function (arr, fn) {
    if ($$.prototype.isArray(arr)) {
        if (arr.length > 0) return fn.call(null, arr[arr.length - 1]);
        else throw "EmptyArrayException"
    }
    throw "NotArrayArgumentException";
};

$$.prototype.select = function (arr, fn) {
    let result = [];
    $$.prototype.forEach(arr, function () {
        result[result.length] = fn.call(arr, arr);
    });
    return result;
};

$$.prototype.skip = function (arr, number) {
    if ($$.prototype.isArray(arr)) {
        if (number >= arr.length) return [];
        else return Array.prototype.slice.call(arr, number, arr.length);
    } else
        throw "NotArrayArgumentException"
};

$$.prototype.take = function (arr, number, fn) {
    if (!$$.prototype.isNumber(number)) throw "NotNumberSecondArgumentException";
    if (!$$.prototype.isArray(arr)) throw "NotArrayFirstArgumentException";
    if (!$$.prototype.isFunction(fn) && arguments.length >= 3) throw "NotFunctionThirdArgumentException";
    if (arguments.length === 2) {
        if (number >= arr.length) throw "NumberOutOfRangeException";
        return arr[number];
    }
    if (arguments.length >= 3) {
        if (number >= arr.length) throw "NumberOutOfRangeException";
        return fn.call(arr[number], arr[number])
    }
    throw "IncorrectInputException";
};


test1 = [1, 2, 3, 4, 5, 6];

console.log($$.prototype.take(test1, 2));
