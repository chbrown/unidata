all: tmp/UnicodeData.txt tmp/Blocks.txt type_declarations/DefinitelyTyped/node/node.d.ts

type_declarations/DefinitelyTyped/%:
	mkdir -p $(@D)
	curl -s https://raw.githubusercontent.com/chbrown/DefinitelyTyped/master/$* > $@

%.js: %.ts | node_modules/.bin/tsc
	node_modules/.bin/tsc -m commonjs -t ES5 $<

tmp/%.txt:
	mkdir -p $(@D)
	# curl -s http://www.unicode.org/Public/UNIDATA/$@ > $@
	curl -s http://www.unicode.org/Public/7.0.0/$@ > $@
