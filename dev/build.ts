import {readFile, writeFile} from 'fs';
import {parseBlocks, parseUnicodeData} from '../index';

readFile('./ucd/UnicodeData.txt', {encoding: 'ascii'}, (error: Error, UnicodeData_txt: string) => {
  if (error) throw error;
  var characters = parseUnicodeData(UnicodeData_txt);
  var json = JSON.stringify(characters);
  json = json.replace(/\},\{/g, '}\n,{');
  writeFile('./UnicodeData.json', json, {encoding: 'ascii'}, (error: Error) => {
    if (error) throw error;
    console.log('Wrote UnicodeData.json');
  });
});

readFile('./ucd/Blocks.txt', {encoding: 'ascii'}, (error: Error, Blocks_txt: string) => {
  if (error) throw error;
  var blocks = parseBlocks(Blocks_txt);
  var json = JSON.stringify(blocks);
  json = json.replace(/\},\{/g, '}\n,{');
  writeFile('./Blocks.json', json, {encoding: 'ascii'}, (error: Error) => {
    if (error) throw error;
    console.log('Wrote Blocks.json');
  });
});
