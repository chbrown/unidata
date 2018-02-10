# unidata

[![npm package version](https://badge.fury.io/js/unidata.svg)](https://www.npmjs.com/package/unidata)

JavaScript interface to the [Unicode Character Database](http://www.unicode.org/reports/tr44/)
(currently using [Unicode 9.0.0](https://www.unicode.org/versions/Unicode9.0.0/)).

    npm install unidata --save


## API

Using ES6 syntax:

    import {getBlocks, getCharacters} from 'unidata';

There are a few other exports (and a couple useful interfaces, if you're using TypeScript),
but these are the main methods.

They both simply call `require()` to load the preprocessed Unicode data from a JSON file.

    const characters = getCharacters();
    const blocks = getBlocks();

These are both just arrays.
* `characters` is an array of [`Character`](index.d.ts)
* `blocks` is an array of [`Block`](index.d.ts)
Blocks are simple; _every_ item in `blocks` has these three fields:

    > blocks.length
    262
    > blocks.slice(0, 5)
    [ {   startCode: 0, endCode: 127, blockName: 'Basic Latin' },
      { startCode: 128, endCode: 255, blockName: 'Latin-1 Supplement' },
      { startCode: 256, endCode: 383, blockName: 'Latin Extended-A' },
      { startCode: 384, endCode: 591, blockName: 'Latin Extended-B' },
      { startCode: 592, endCode: 687, blockName: 'IPA Extensions' } ]

Characters are richer, but the representation is parsimonious:
if a field is not available or not applicable for a given character, that key will be undefined.

    > characters.length
    29215
    > characters.slice(32, 40)
    [ { code: 32, name: 'SPACE',            cat: 'Zs', bidi: 'WS' },
      { code: 33, name: 'EXCLAMATION MARK', cat: 'Po', bidi: 'ON' },
      { code: 34, name: 'QUOTATION MARK',   cat: 'Po', bidi: 'ON' },
      { code: 35, name: 'NUMBER SIGN',      cat: 'Po', bidi: 'ET' },
      { code: 36, name: 'DOLLAR SIGN',      cat: 'Sc', bidi: 'ET' },
      { code: 37, name: 'PERCENT SIGN',     cat: 'Po', bidi: 'ET' },
      { code: 38, name: 'AMPERSAND',        cat: 'Po', bidi: 'ON' },
      { code: 39, name: 'APOSTROPHE',       cat: 'Po', bidi: 'ON', oldName: 'APOSTROPHE-QUOTE' } ]

The first three fields, `code`, `name`, and `cat`, are always present.
The other ten are optional.
(For details on the optional fields, and what values to assume when they are omitted,
see the comments on the `Block` interface.)


## License

Copyright 2015-2018 Christopher Brown.
[MIT Licensed](https://chbrown.github.io/licenses/MIT/#2015-2018).
