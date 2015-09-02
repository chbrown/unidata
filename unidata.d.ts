/// <reference path='./UnicodeData.d.ts'/>
/// <reference path='./Blocks.d.ts'/>

declare module "unidata" {
  import UnicodeData = require('unidata/UnicodeData');
  import Blocks = require('unidata/Blocks');

  type Block = Blocks.Block;
  type Character = UnicodeData.Character;

  function getCharacters(): UnicodeData.Character[];
  function getBlocks(): Blocks.Block[];
  function evaluateNum(num: string): number;
}
