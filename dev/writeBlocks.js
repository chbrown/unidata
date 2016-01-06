var fs = require('fs');
var unidata = require('..');

fs.readFile('./ucd/Blocks.txt', {encoding: 'ascii'}, (error, Blocks_txt) => {
  if (error) throw error;
  var blocks = unidata.parseBlocks(Blocks_txt);
  var js = 'module.exports = ' + JSON.stringify(blocks).replace(/\},\{/g, '}\n,{');
  console.log(js);
});
