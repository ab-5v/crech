/**
 * Encoder performs Array -> String conversion,
 * where array contains items like:
 * [
 *  bit,    // binary mark for value (0/1)
 *  value,  // value (selector)
 *  dim1,   // dimension1 values could be grouped by
 *  dim2    // dimension2 values could be grouped by
 * ]
 * and string will contain all that data
 * with minimum possible overhead
 *
 * @param {array} arr
 * @param {string} sep
 *
 * @returns string
 */

function crechEncode(arr, sep) {
    return '';
}

/**
 * Decodes crech string back into array
 *
 * @param {string} str
 * @param {string} sep
 *
 * @returns array
 */

function crechDecode(str, sep) {
    return [];
}


module.exports = {
    encode: crechEncode,
    decode: crechDecode
};
