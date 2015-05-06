function getCharacters() {
  return require('./UnicodeData.json');
}
exports.getCharacters = getCharacters;

function getBlocks() {
  return require('./Blocks.json');
}
exports.getBlocks = getBlocks;
