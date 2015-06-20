/// <reference path="type_declarations/DefinitelyTyped/node/node.d.ts" />
import * as fs from 'fs';
import * as UnicodeData from './UnicodeData';
import * as Blocks from './Blocks';

fs.readFile('ucd/UnicodeData.txt', {encoding: 'ascii'}, (error: Error, UnicodeData_txt: string) => {
  if (error) throw error;
  var characters = UnicodeData.parse(UnicodeData_txt);
  var json = JSON.stringify(characters);
  json = json.replace(/\},\{/g, '}\n,{');
  fs.writeFile('UnicodeData.json', json, {encoding: 'ascii'}, (error: Error) => {
    if (error) throw error;
    console.log('Wrote UnicodeData.json');
  });
});

fs.readFile('ucd/Blocks.txt', {encoding: 'ascii'}, (error: Error, Blocks_txt: string) => {
  if (error) throw error;
  var blocks = Blocks.parse(Blocks_txt);
  var json = JSON.stringify(blocks);
  json = json.replace(/\},\{/g, '}\n,{');
  fs.writeFile('Blocks.json', json, {encoding: 'ascii'}, (error: Error) => {
    if (error) throw error;
    console.log('Wrote Blocks.json');
  });
});
