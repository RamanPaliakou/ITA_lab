function curry(fn) {
    let numberOfFunctionParams = fn.length;
    return function partialApply() {
        let args = [].slice.call(arguments);
        // If enough arguments is sent - call the main function
        if (args.length >= numberOfFunctionParams) {
            return fn.apply(null, args);
        } else {
            // Otherwise return the function that takes more input arguments and then call partialApply once again
            return function () {
                let args2 = [].slice.call(arguments);
                return partialApply.apply(null, args.concat(args2));
            }
        }
    };
}

// Test example
const curriedSumFive = curry((z1, z2, z3, z4, z5) => z1 + z2 + z3 + z4 + z5);
console.log(curriedSumFive(1)(2)(1)(1)(1));
console.log(curriedSumFive(1)(1, 1)(1, 2, 1));