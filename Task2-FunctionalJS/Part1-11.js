function makePreviousCache(f) {
    if (Object.prototype.toString.call(f) !== '[object Function]')
        throw "IncorrectInputException";
    let doubleOperationCache = {};
    let singleOperationCache = {};
    return function () {
        doubleOperationCache = singleOperationCache;

        let args = [].slice.call(arguments);
        singleOperationCache = f.apply(this, args);

        if (singleOperationCache !== singleOperationCache) singleOperationCache = 'generated undefined value';
        if (Number.isNaN(singleOperationCache)) singleOperationCache = 'generated not-a-number value';

        return doubleOperationCache;
    };
}

// Test example
const f1 = makePreviousCache((a, b) => a * b);
console.log(f1(4, 5));
console.log(f1(3, 7));
console.log(f1(2, 4));
