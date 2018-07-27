function curry(fn) {
    let numberOfFunctionParams = fn.length;
    return function partialApply() {
        let args = [].slice.call(arguments);
        if (args.length >= numberOfFunctionParams) { //if we send enough arguments we call the main function
            return fn.apply(null, args);
        }
        else { //otherwise we return the function that asks for more input arguments and then calls the partialApply
            return function() {
                let args2 = [].slice.call(arguments);
                return partialApply.apply(null, args.concat(args2));
            }
        }
    };
}

//test example
const curriedSumFive=curry((z1,z2,z3,z4,z5)=>z1+z2+z3+z4+z5);
console.log(curriedSumFive(1)(2)(1)(1)(1));
console.log(curriedSumFive(1)(1,1)(1,2,1));