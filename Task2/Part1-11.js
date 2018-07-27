//main function
function makePreviousCache(f) {
    let cache2={};
    let cache = {};
    return function() {
        cache2=cache;
        let args=[].slice.call(arguments);
        cache = f.apply(this,args);
        if(cache !== cache) cache='generated undefined value';
        else if (Number.isNaN(cache)) cache='generated not-a-number value';
        return cache2;
    };
}
//test example
const f1=makePreviousCache((a,b)=>a*b);
console.log(f1(4,5));
console.log(f1(3,7));
console.log(f1(2,4));
