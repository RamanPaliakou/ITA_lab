//additional function
const forEach = function (arr, iterator,context) {
    for (let i = 0, l = arr.length; i < l; i += 1) {
        iterator.call(context, arr[i]);
    }
};
//main function
const map = function(arr, iterator,context) {
    let result = [];
    forEach(arr, function (value, index, list) {
        result[result.length] = iterator.call(context, value, index, list);
    });
    return result;
};
//test example
let testArray=[1,2,3,4,5];
const test = map(testArray,x=>x*x,null);
console.log(test);