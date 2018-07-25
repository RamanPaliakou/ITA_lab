function partialApply() {
    let fn = arguments [arguments.length - 1];
    let initialArguments = [].slice.call(arguments, 0,arguments.length - 1);

    return function() {
        let finalArguments = initialArguments.concat([].slice.call(arguments));
        return fn.apply(null,finalArguments);
    }
 }

 // Sums all given arguments. test example
function sum() {
    let result= [].reduce.call(arguments,(x,y)=>x+y,0);
    return result;
}

 console.log(sum(1,1,10,17));
 sum15 = partialApply(1,10,sum);
 console.log(sum15(1,17));
