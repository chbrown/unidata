declare module "unidata/Blocks" {
    interface Block {
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
    function parse(Blocks_txt: string): Block[];
}
