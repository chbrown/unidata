declare module "unidata/UnicodeData" {
    /**
    Character is a raw representation of a character.
    */
    interface Character {
        /** numeric character code (a non-negative integer) */
        code: number;
        /** character name (ASCII only) */
        name: string;
        /** general category */
        cat: string;
        /** canonical combining class (missing if == 0 "not reordered") */
        comb?: number;
        /** bidirectional category (missing if == 'L' "Letter") */
        bidi?: string;
        /** decomposition type and mapping */
        decompType?: string;
        decomp?: number[];
        /** numeric value of character (may be a fraction, so it not unevaluated) */
        num?: string;
        /** true if character is mirrored in bidirectional text (missing otherwise) */
        bidiMirror?: boolean;
        /** Unicode 1.0 name, if it differs from the current name */
        oldName?: string;
        /** simple uppercase mapping */
        upper?: number;
        /** simple lowercase mapping */
        lower?: number;
        /** simple titlecase mapping */
        title?: number;
    }
    /**

    Snippet from `UnicodeData.txt`:

        00A0;NO-BREAK SPACE;Zs;0;CS;<noBreak> 0020;;;;N;NON-BREAKING SPACE;;;;
        00A1;INVERTED EXCLAMATION MARK;Po;0;ON;;;;;N;;;;;
        00A2;CENT SIGN;Sc;0;ET;;;;;N;;;;;
        00A3;POUND SIGN;Sc;0;ET;;;;;N;;;;;
        00A4;CURRENCY SIGN;Sc;0;ET;;;;;N;;;;;
        00A5;YEN SIGN;Sc;0;ET;;;;;N;;;;;
        00A6;BROKEN BAR;So;0;ON;;;;;N;BROKEN VERTICAL BAR;;;;

    If there were a header of column names, it might look like this:

        Code;Name;Cat;Comb;BidiC;Decomp;Num1;Num2;Num3;BidiM;Unicode_1_Name;ISO_Comment;Upper;Lower;Title

    There are 14 ;'s per line, and so there are 15 fields per UnicodeDatum:

    0.  Code
    1.  Name
    2.  General_Category
    3.  Canonical_Combining_Class
    4.  Bidi_Class
    5.  <Decomposition_Type> Decomposition_Mapping
    6.  Numeric Value if decimal
    7.  Numeric Value if only digit
    8.  Numeric Value otherwise
    9.  Bidi_Mirrored
    10. Unicode_1_Name
    11. ISO_Comment (always empty)
    12. Simple_Uppercase_Mapping
    13. Simple_Lowercase_Mapping
    14. Simple_Titlecase_Mapping

    */
    function parse(UnicodeData_txt: string): Character[];
}
