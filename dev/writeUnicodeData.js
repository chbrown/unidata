var fs = require('fs');
var unidata = require('..');

fs.readFile('./ucd/UnicodeData.txt', {encoding: 'ascii'}, (error, UnicodeData_txt) => {
  if (error) throw error;
  var characters = unidata.parseUnicodeData(UnicodeData_txt);
  var js = 'module.exports = ' + JSON.stringify(characters).replace(/\},\{/g, '}\n,{');
  console.log(js);
});
