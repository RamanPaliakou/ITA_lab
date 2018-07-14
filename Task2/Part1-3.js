function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}

function linearFold(obj, iterator, accu, thisArg) {
    let hasAccu = arguments.length > 2;
    forEach(obj, function (value, index, list) {

        if (!hasAccu) {
            accu = value;
            hasAccu = true;
        } else {
            accu = iterator.call(thisArg, accu, value, index, list);
        }
    });
    return accu;
}

// set an array of values to get the sum of
let someArray = [1, 10, 100,200];


// output the sum of someArray
let foldedArray = linearFold(someArray, (x,y)=>x+y); // 111
foldedArray = linearFold(someArray, (x,y)=>x+y, 1000); //1111
