//Raman: I tried import-export from ES6, but it didn't worked as supposed, so i have to use copypast from previous tasks
//additional functions
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
function linearFold(obj, iterator, accu, thisArg) {
    var hasAccu = arguments.length > 2;
    forEach(obj, function (value, index, list) {

        if (!hasAccu) {
            accu = value;
            hasAccu = true;
        } else {
            accu = iterator.call(thisArg, accu, value, index, list);
        }
    });
    return accu;
};

//main solution (test ex also)
let test=[1,2,3,4,5,6,7,8,9,13,14,15,16,17];
let result=filter(test, x=>x%2===0);
test=result.length;
result=linearFold(result,(x,y)=>x+y)/test; //    50/6=8,3
console.log(result);
