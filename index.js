function getBlocks() {
    return require('./Blocks.json');
}
exports.getBlocks = getBlocks;
function getCharacters() {
    return require('./UnicodeData.json');
}
exports.getCharacters = getCharacters;
/**
evaluateNum(num: string): number

Take a Character.num string value and return a native Javascript number.

1000000000000 is the biggest numeric value defined for any Unicode character
(U+16B61 "PAHAWH HMONG NUMBER TRILLIONS"), so what we have to worry about are
the fractions (which can have negative signs, though
U+0F33 "TIBETAN DIGIT HALF ZERO" is the only one of those)
*/
function evaluateNum(num) {
    if (num === undefined || num === null || num === '')
        return NaN;
    var fraction_match = num.match(/(-?\d+)\/(\d+)/);
    if (fraction_match) {
        return parseInt(fraction_match[1], 10) / parseInt(fraction_match[2], 10);
    }
    return parseInt(num, 10);
}
exports.evaluateNum = evaluateNum;
/**
Snippet from `Blocks.txt`:

    0000..007F; Basic Latin
    0080..00FF; Latin-1 Supplement
    0100..017F; Latin Extended-A
    0180..024F; Latin Extended-B
    0250..02AF; IPA Extensions

*/
function parseBlocks(Blocks_txt) {
    return Blocks_txt
        .split(/\n/)
        .map(function (line) { return line.match(/^([A-F0-9]+)\.\.([A-F0-9]+); (.+)$/); })
        .filter(function (match) { return match !== null; })
        .map(function (match) {
        var _ = match[0], startCode = match[1], endCode = match[2], blockName = match[3];
        return {
            blockName: blockName,
            startCode: parseInt(startCode, 16),
            endCode: parseInt(endCode, 16),
        };
    });
}
exports.parseBlocks = parseBlocks;
/**
Snippet from `UnicodeData.txt`:

    00A0;NO-BREAK SPACE;Zs;0;CS;<noBreak> 0020;;;;N;NON-BREAKING SPACE;;;;
    00A1;INVERTED EXCLAMATION MARK;Po;0;ON;;;;;N;;;;;
    00A2;CENT SIGN;Sc;0;ET;;;;;N;;;;;
    00A3;POUND SIGN;Sc;0;ET;;;;;N;;;;;
    00A4;CURRENCY SIGN;Sc;0;ET;;;;;N;;;;;
    00A5;YEN SIGN;Sc;0;ET;;;;;N;;;;;
    00A6;BROKEN BAR;So;0;ON;;;;;N;BROKEN VERTICAL BAR;;;;

If there were a header of column names, it might look like this:

    Code;Name;Cat;Comb;BidiC;Decomp;Num1;Num2;Num3;BidiM;Unicode_1_Name;ISO_Comment;Upper;Lower;Title

There are 14 ;'s per line, and so there are 15 fields per UnicodeDatum:

0.  Code
1.  Name
2.  General_Category
3.  Canonical_Combining_Class
4.  Bidi_Class
5.  <Decomposition_Type> Decomposition_Mapping
6.  Numeric Value if decimal
7.  Numeric Value if only digit
8.  Numeric Value otherwise
9.  Bidi_Mirrored
10. Unicode_1_Name
11. ISO_Comment (always empty)
12. Simple_Uppercase_Mapping
13. Simple_Lowercase_Mapping
14. Simple_Titlecase_Mapping

*/
function parseUnicodeData(UnicodeData_txt) {
    return UnicodeData_txt
        .split(/\n/)
        .filter(function (line) { return line !== ''; })
        .map(function (line) {
        // parse out the raw values
        var _a = line.split(';'), code = _a[0], name = _a[1], cat = _a[2], comb = _a[3], bidi = _a[4], decomp = _a[5], numDecimal = _a[6], numDigit = _a[7], num = _a[8], bidiMirror = _a[9], oldName = _a[10], isoComment = _a[11], upper = _a[12], lower = _a[13], title = _a[14];
        // initialize the character with required fields
        var character = {
            // code is hexadecimal
            code: parseInt(code, 16),
            // name is a string
            name: name,
            // cat is a string
            cat: cat,
        };
        // skip comb if it is '0', which it is in 97% of cases (26,523 / 27,268)
        if (comb !== '0') {
            character.comb = parseInt(comb, 10);
        }
        // skip bidi if it is 'L', which it is in 66% of cases (17,936 / 27,268)
        if (bidi !== 'L') {
            character.bidi = bidi;
        }
        // skip decomp if it is empty, which it is in 79% of cases (21,547 / 27,268)
        if (decomp !== '') {
            var _b = decomp.match(/^(?:<(\w+)> )?([0-9A-F ]+)$/), _ = _b[0], decompType = _b[1], decompMapping = _b[2];
            // decompMapping will be a string of hexadecimal character codes,
            // e.g., '0041 0301' for U+00C1 LATIN CAPITAL LETTER A ACUTE
            character.decomp = decompMapping.split(' ').map(function (code) { return parseInt(code, 16); });
            if (decompType) {
                character.decompType = decompType;
            }
        }
        // we ignore numDecimal and numDigit (which are always empty if num is empty)
        // skip num if it is empty, which it is in 95% of cases (25,914 / 27,268)
        if (num !== '') {
            character.num = num;
        }
        // skip bidiMirror if it is N, which it is in 98% of cases (26,723 / 27,268)
        if (bidiMirror !== 'N') {
            character.bidiMirror = true;
        }
        // skip oldName if it is empty, which it is in 93% of cases (25,290 / 27,268)
        if (oldName !== '') {
            character.oldName = oldName;
        }
        // isoComment is always empty
        // upper, lower, title are one character, if they are anything
        if (upper !== '') {
            character.upper = parseInt(upper, 16);
        }
        if (lower !== '') {
            character.lower = parseInt(lower, 16);
        }
        if (title !== '') {
            character.title = parseInt(title, 16);
        }
        return character;
    });
}
exports.parseUnicodeData = parseUnicodeData;
