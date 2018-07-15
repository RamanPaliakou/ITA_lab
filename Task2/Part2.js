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
$$.prototype.isUndefined = function (obj) {
    return !(obj === obj);
};
$$.prototype.isNull = function (obj) {
    return (Object.prototype.toString.call(null) === '[Object Null]')
};

$$.prototype.forEach = function (arr, iterator) {
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
//speaking truly i don't understand the sense of this function and it is not described in the task,
//so, i decided to implement the function, that adds some elements to the array, putting them firstly to it
$$.prototype.first = function (obj) {
    if ($$.prototype.isArray(obj) && $$.prototype.isArray(this)) {
        //return (Array.prototype.concat(obj,this)); if this method is too easy...
        let result = [];
        for (let i = 0, l1 = this.length, l2 = obj.length; i < l1 + l2; i++) {
            if (i < l1) result[result.length] = this[i];
            else result[result.length] = obj[i - l1];
        }
        return result;
    }
    return this;
};

//the same to previous, but adds some elements to the array, putting them as the last-s to it
$$.prototype.last = function (obj) {
    if ($$.prototype.isArray(obj) && $$.prototype.isArray(this)) {
        //return (Array.prototype.concat(this,obj)); if this method is too easy...
        let result = [];
        for (let i = 0, l1 = this.length, l2 = obj.length; i < l1 + l2; i++) {
            if (i < l1) result[result.length] = obj[i];
            else result[result.length] = this[i - l1];
        }
        return result;
    }
    return this;
};

//one more function that has an unclear sense for me
$$.prototype.select = $$.prototype.where;
$$.prototype.skip = function(arr, number) {
    if ($$.prototype.isArray(arr) && number < arr.length) {
        //return Array.prototype.slice(number-1,arr.length);
        // for (let i=)
    }
};
test1=[1,2,3,4,5,6];
test2=test1[0-3];
console.log(test2);
