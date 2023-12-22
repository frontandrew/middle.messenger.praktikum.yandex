/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(123); // => true
isEmpty(''); // => true
isEmpty(0); // => true
isEmpty(undefined) // => true
isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']])) // => false
isEmpty(new Set(['value1', 'value2', 'value3'])) // => false
*/

function isEmpty(value) {
    if (!value) return true
    if (typeof value === 'boolean') return true
    if (typeof value === 'number') return true
    if (typeof value === 'string') return !value.length
    if (Array.isArray(value)) return !value.length 
    // if (typeof value === 'object') return !Object.keys(value).length
    // if (!value.size) return true
    return false
  }