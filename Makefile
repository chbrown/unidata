all: Blocks.js UnicodeData.js

Blocks.js: ucd/Blocks.txt
	node dev/writeBlocks.js > $@

UnicodeData.js: ucd/UnicodeData.txt
	node dev/writeUnicodeData.js > $@

# Could use http://www.unicode.org/Public/UNIDATA/$@ instead
ucd/%.txt:
	mkdir -p $(@D)
	curl -s http://www.unicode.org/Public/8.0.0/$@ > $@
