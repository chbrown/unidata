export interface Block {
  blockName: string;
  startCode: number;
  endCode: number;
}

/**
Snippet from `Blocks.txt`:

    0000..007F; Basic Latin
    0080..00FF; Latin-1 Supplement
    0100..017F; Latin Extended-A
    0180..024F; Latin Extended-B
    0250..02AF; IPA Extensions

*/
export function parse(Blocks_txt: string): Block[] {
  return Blocks_txt
    .split(/\n/)
    .map(line => line.match(/^([A-F0-9]+)\.\.([A-F0-9]+); (.+)$/))
    .filter(match => match !== null)
    .map(match => {
      var [_, startCode, endCode, blockName] = match;
      return {
        blockName: blockName,
        startCode: parseInt(startCode, 16),
        endCode: parseInt(endCode, 16),
      };
    });
}
