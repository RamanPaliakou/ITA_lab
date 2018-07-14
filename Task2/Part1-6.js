function forEach(arr, iterator, context) {
    for (let i=0, l=arr.length;i<l;i++) {
        iterator.call(context,arr[i]);
    }
};

function filter(arr, iterator, context) {
    let result=[];
    forEach(arr, function(value,index,list) {
        if (iterator.call(context,value, index, list)) {
            result[result.length]=value;
        }
    });
    return result;
};

let testArray=[1,2,3,4,5,6,7,8];
console.log(testArray.filter(a=>a>2));
console.log(filter(testArray,a=>a>2));