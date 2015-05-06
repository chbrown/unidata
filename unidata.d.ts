declare module "unidata" {
  import UnicodeData = require('UnicodeData');
  import Blocks = require('Blocks');

  type Block = Blocks.Block;
  type Character = UnicodeData.Character;

  function getCharacters(): UnicodeData.Character[];
  function getBlocks(): Blocks.Block[];
  function evaluateNum(num: string): number;
}
