function getCharacters() {
  return require('./UnicodeData.json');
}
exports.getCharacters = getCharacters;

function getBlocks() {
  return require('./Blocks.json');
}
exports.getBlocks = getBlocks;

/**
evaluateNum(num: string): number

Take a Character.num string value and return a native Javascript number.

1000000000000 is the biggest numeric value defined for any Unicode character
(U+16B61 "PAHAWH HMONG NUMBER TRILLIONS"), so what we have to worry about are
the fractions (which can have negative signs, though
U+0F33 "TIBETAN DIGIT HALF ZERO" is the only one of those)
*/
function evaluateNum(num) {
  if (num === undefined || num === null || num === '') return NaN;
  var fraction_match = num.match(/(-?\d+)\/(\d+)/);
  if (fraction_match) {
    return parseInt(fraction_match[1], 10) / parseInt(fraction_match[2], 10);
  }
  return parseInt(num, 10);
}
exports.evaluateNum = evaluateNum;
