function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}
class Unfold {
    constructor() {
    }

    //Behavior: x[i]=function(x[i-1])
    toSequenceArray (YfromXMathFunction, initial, length) {
        try {
            var value = YfromXMathFunction(initial);
            var result = [];
            while (length > 0) {
                result[result.length] = value;
                value = YfromXMathFunction(result[result.length - 1]);
                length--;
            }
            return result;
        } catch (err) {
            throw "IncorrectInputParameters"
        }
    }
    /*Behavior: [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...
    *function must have stop-condition inside
    *ex: var f = n => n < 50 ? [-n, n + 10] : false ;
    */
    toBoundArray (fn, seed) {
        try {
            var pair = fn(seed);
            var result = [];
            while (pair && pair.length) {
                result[result.length] = pair[0];
                pair = fn(pair[1]);
            }
            return result;
        } catch (err) {
            throw "IncorrectInputParameters"
        }
    }
}

let u = new Unfold();
let f1 = x => x*x + 2 * Math.log(x);
let f2 = n => n < 80 ? [n, n+10] : false;
console.log(u.toSequenceArray(f1,2,10));
console.log(u.toBoundArray(f2,1.4))