BIN := node_modules/.bin

all: index.js index.d.ts Blocks.js UnicodeData.js

$(BIN)/tsc:
	npm install

%.js %.d.ts: %.ts $(BIN)/tsc
	$(BIN)/tsc -d

Blocks.js: ucd/Blocks.txt
	node dev/writeBlocks.js > $@

UnicodeData.js: ucd/UnicodeData.txt
	node dev/writeUnicodeData.js > $@

# Could use http://www.unicode.org/Public/UNIDATA/$@ instead
ucd/%.txt:
	mkdir -p $(@D)
	curl -s http://www.unicode.org/Public/8.0.0/$@ > $@
