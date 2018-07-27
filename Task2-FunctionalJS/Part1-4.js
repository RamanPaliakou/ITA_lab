function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}

class Unfold {
    constructor() {
    }

    /* Behavior example: x[i]=function(x[i-1])
     */
    static toSequenceArray(YfromXMathFunction, initial, length) {
        try {
            let value = YfromXMathFunction(initial);
            let result = [];
            while (length > 0) {
                result.push(value);
                value = YfromXMathFunction(result[result.length - 1]);
                length--;
            }
            return result;
        } catch (err) {
            throw "IncorrectInputParameters";
        }
    }

    /* Behavior example: [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...
    * function must have stop-condition inside
    * ex: var f = n => n < 50 ? [-n, n + 10] : false ;
    */
    static toBoundArray(fn, seed) {
        try {
            let pair = fn(seed);
            let result = [];
            while (pair && pair.length) {
                result.push(pair[0]);
                pair = fn(pair[1]);
            }
            return result;
        } catch (err) {
            throw "IncorrectInputParameters";
        }
    }
}

// Test example
let f1 = x => x * x + 2 * Math.log(x);
let f2 = n => n < 80 ? [n, n + 10] : false;
console.log(Unfold.toSequenceArray(f1, 2, 10));
console.log(Unfold.toBoundArray(f2, 1.4));