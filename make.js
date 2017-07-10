const earthly = require("earthly");
const browserify = require("browserify");

earthly.task("browserify", [ "index.js", "lib/*.js" ], async () => {
	const bundle = await earthly.stream(
		browserify("index.js")
			.transform("babelify", {
				plugins: [ "transform-es2015-modules-commonjs" ],
				presets: [ "react" ]
			})
			.bundle()
	);

	await earthly.writeFile(__dirname + "/bundle.js", bundle);
});

earthly.go();
