
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

// Test example
let someArray = [1, 10, 100, 200];
console.log(linearFold(someArray, (x, y) => [x, y])); // [ [ [ 1 , 10 ], 100], 200]
console.log(linearFold(someArray, (x, y) => x + y, 1000, this)); //1311
