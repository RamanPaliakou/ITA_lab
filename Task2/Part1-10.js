//variant-1
function apb(a, b) {
    return a + b;
}

class Lazy {

    constructor(fn) {
        this._args = [].slice.call(arguments, 1, arguments.length);
        this._state = "pending";
        this._function = fn;
        this._value = 0;
    }

    calculate() {
        this._value = this._function.apply(this, this._args);
        this._state = "done";
        return this._value;
    }

    get state() {
        return `${this._state}`;
    }
}

var f = new Lazy(apb, 5, 7);
console.log(f.state);
console.log(f.calculate());
console.log(f.state);

//variant-2
//written as much as close to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*
//but not operational
/*function CreateGenerator(fn) {
    args = [].slice.call(arguments, 1, arguments.length);
    return function* () {
        yield "pending";
        yield fn.apply(this, args);
    }
}
function* IterateGenerator() {
    var k = CreateGenerator(x=>x*10);
    yield* k;
}
var f = IterateGenerator();

console.log(f.next());
console.log(f.next());*/

