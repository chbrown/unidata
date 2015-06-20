BIN := node_modules/.bin
DTS := node/node

all: ucd/UnicodeData.txt ucd/Blocks.txt UnicodeData.json Blocks.json
type_declarations: $(DTS:%=type_declarations/DefinitelyTyped/%.d.ts)

UnicodeData.json Blocks.json: build.js
	node $<

type_declarations/DefinitelyTyped/%:
	mkdir -p $(@D)
	curl -s https://raw.githubusercontent.com/chbrown/DefinitelyTyped/master/$* > $@

$(BIN)/tsc:
	npm install

%.js: %.ts $(BIN)/tsc type_declarations
	$(BIN)/tsc -m commonjs -t ES5 $<

# Could use http://www.unicode.org/Public/UNIDATA/$@ instead
ucd/%.txt:
	mkdir -p $(@D)
	curl -s http://www.unicode.org/Public/8.0.0/$@ > $@
