function curry(fn) {
    let numberOfFunctionParams = fn.length;
    return function partialApply() {
        let args = [].slice.call(arguments);
        if (args.length >= numberOfFunctionParams) {
            return fn.apply(null, args);
        }
        else {
            return function() {
                let args2 = [].slice.call(arguments);
                return partialApply.apply(null, args.concat(args2));
            }
        }
    };
}

function sumFive(x1,x2,x3,x4,x5) {
    return x1+x2+x3+x4+x5;
}

const curriedSumFive=curry(sumFive);
console.log(curriedSumFive(1)(2)(1)(1)(1));
console.log(curriedSumFive(1)(1,1)(1,2,1));