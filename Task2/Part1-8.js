// Additional functions
function randomArrayGenerator(num, minval, maxaval) {
    let i = 0;
    let result = [];
    while (i < num) {
        result[result.length] = (Math.random() * (maxaval + 1)) + minval;
        i++;
    }
    return result;
}

function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
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

// Main realization
let testArray = randomArrayGenerator(10, -10, 10);
console.log(testArray);
console.log(linearFold(testArray, (x, y) => x + y, 0));