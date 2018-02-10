const fs = require('fs')
const unidata = require('..')

fs.readFile('./ucd/UnicodeData.txt', {encoding: 'ascii'}, (error, UnicodeData_txt) => {
  if (error) throw error
  const characters = unidata.parseUnicodeData(UnicodeData_txt)
  const js = 'module.exports = ' + JSON.stringify(characters).replace(/\},\{/g, '}\n,{')
  console.log(js)
})
