BIN := node_modules/.bin

all: ucd/Blocks.txt ucd/UnicodeData.txt Blocks.json UnicodeData.json

$(BIN)/tsc:
	npm install

%.js: %.ts $(BIN)/tsc
	$(BIN)/tsc -d

UnicodeData.json Blocks.json: dev/build.js
	node $<

# Could use http://www.unicode.org/Public/UNIDATA/$@ instead
ucd/%.txt:
	mkdir -p $(@D)
	curl -s http://www.unicode.org/Public/8.0.0/$@ > $@
