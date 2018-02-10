const fs = require('fs')
const unidata = require('..')

fs.readFile('./ucd/Blocks.txt', {encoding: 'ascii'}, (error, Blocks_txt) => {
  if (error) throw error
  const blocks = unidata.parseBlocks(Blocks_txt)
  const js = 'module.exports = ' + JSON.stringify(blocks).replace(/\},\{/g, '}\n,{')
  console.log(js)
})
