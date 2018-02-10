all: Blocks.js UnicodeData.js

Blocks.js: ucd/Blocks.txt
	node dev/writeBlocks.js > $@

UnicodeData.js: ucd/UnicodeData.txt
	node dev/writeUnicodeData.js > $@

# Could use http://www.unicode.org/Public/UNIDATA/$@ instead
ucd/%.txt:
	mkdir -p $(@D)
	curl -s https://www.unicode.org/Public/9.0.0/$@ > $@

clean:
	rm -rf ucd/
	npm run-script clean
