//additional function
function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}
//main function
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

//test example
let someArray = [1, 10, 100,200];
console.log(linearFold(someArray, (x,y)=>[x,y])); // 311
console.log(linearFold(someArray, (x,y)=>x+y, 1000, this)); //1311
