/**
 * Decodes crech string back
 * and executes callback on every parsed note
 *
 * @param {string} str
 * @param {string} sep
 * @param {function} cb
 */
function crechDecode(str, sep, cb) {
    if (typeof str !== 'string') { return; }

    var group, bit, selectors, si, sl;
    var parts = str.split(sep), pi;
    var partsLength = parts.length;

    if (partsLength % 3) { return; }

    for (pi = 0; pi < partsLength; pi+=3) {
        group = parts[pi];
        // check = 0/1
        for (bit = 0; bit < 2; bit++) {
            selectors = parts[pi+1+bit].split(',');
            for (si = 0, sl = selectors.length; si < sl; si++) {
                if (selectors[si]) {
                    cb(selectors[si], group, bit);
                }
            }
        }
    }
}

/**
 * Encoder performs Array -> String conversion,
 * where array contains items like:
 * [
 *  bit,    // binary mark for value (0/1)
 *  value,  // value (selector)
 *  group,    // dimension values could be grouped by
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

module.exports = {
    encode: crechEncode,
    decode: crechDecode
};
