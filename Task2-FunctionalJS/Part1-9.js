function forEach(arr, iterator, context) {
    for (let i = 0, l = arr.length; i < l; i++) {
        iterator.call(context, arr[i]);
    }
}

// Main function
function filterFirst(arr, iterator, context) {
    if (Object.prototype.toString.call(arr) !== '[object Array]' ||
        Object.prototype.toString.call(iterator) !== '[object Function]')
        return 0;

    for (let i = 0; i < arr.length; i++) {
        if (iterator.call(context, arr[i])) {
            return arr[i];
        }
    }
}

// Test example
let testArray = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(filterFirst(testArray, a => a < 1));