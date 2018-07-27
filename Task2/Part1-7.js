function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}

function filter(arr, iterator, context) {
    if (Object.prototype.toString.call(arr) !== '[object Array]' ||
        Object.prototype.toString.call(iterator) !== '[object Function]')
        return [];

    let result = [];
    forEach(arr, function (value, index, list) {
        if (iterator.call(context, value, index, list)) {
            result.push(value);
        }
    });
    return result;
}

function linearFold(obj, iterator, accu, thisArg) {
    if (Object.prototype.toString.call(obj) !== '[object Array]' ||
        Object.prototype.toString.call(iterator) !== '[object Function]')
        return 0;

    let hasAccu = arguments.length > 2;
    forEach(obj, function (value, index, list) {
        if (!hasAccu) {
            accu = value;
            hasAccu = true;
            return;
        }
        accu = iterator.call(thisArg, accu, value, index, list);
    });
    return accu;
}

// Main solution (test ex also)
let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 17];
let result = filter(test, x => x % 2 === 0);
test = result.length;
result = linearFold(result, (x, y) => x + y) / test; //    50/6=8,3
console.log(result);
