//additional functions
function forEach(arr, iterator, context) {
    for (let i=0, l=arr.length;i<l;i++) {
        iterator.call(context,arr[i]);
    }
};
//main function
function filterFirst(arr, iterator, context) {
    let result=[];
    forEach(arr, function(value,index,list) {
        if (iterator.call(context,value, index, list) && (result.length===0)) {
            result[result.length]=value;
        }
    });
    return result;
};
//test example
let testArray=[1,2,3,4,5,6,7,8];
console.log(filterFirst(testArray,a=>a>3));