/**
 * Encoder performs Array -> String conversion,
 * where array contains notes like:
 * [
 *  bit,    // binary mark for value (0/1)
 *  val,    // value (selector)
 *  grp     // dimension values could be grouped by
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
    var report = {}, result = [], i, note, group;

    for (i = arr.length; i--;) {
        note = arr[i];

        if (!report.hasOwnProperty(note[2])) {
            report[note[2]] = [[], []];
        }

        report[note[2]][note[0]].push(note[1]);
    }

    for (group in report) {
        if (report.hasOwnProperty(group)) {
            result.push(group, report[group][0].join(','), report[group][1].join(','));
        }
    }

    return result.join(sep);
}
