const forEach = function (arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i += 1) {
        iterator.call(context, arr[i]);
    }
};

const map = function (arr, iterator, context) {
    if (Object.prototype.toString.call(arr) !== '[object Array]' ||
        Object.prototype.toString.call(iterator) !== '[object Function]')
        return [];

    let result = [];
    forEach(arr, function (value, index, list) {
        result.push = iterator.call(context, value, index, list);
    });
    return result;
};

// Test example
let testArray = [1, 2, 3, 4, 5];
const test = map(testArray, x => x * x, null);
console.log(test);