const forEach = function (arr, iterator,context) {
    for (let i = 0, l = arr.length; i < l; i += 1) {
        iterator.call(context, arr[i]);
    }
};
const map = function(arr, iterator,context) {
    let result = [];
    forEach(arr, function (value, index, list) {
        result[result.length] = iterator.call(context, value, index, list);
    });
    return result;
};

let testArray=[1,2,3,4,5];
forEach(testArray, x=>x*x,testArray);
var testArray2 = map(testArray, x=>x*x,null);
console.log(testArray2);