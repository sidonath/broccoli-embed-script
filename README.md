# broccoli-script-embed

Embeds a script file directly into HTML.
Generally the project can be used to replace any token in any files with the contents of another file.

## Usage

```js
var embedScript = require('broccoli-embed-script')

var embeddedFiles = embedScript('app'), {
  fileToEmbed: 'main.js'
, inputFiles: ['**/*.html']
, token: '{{{script}}}'
})

module.exports = embeddedFiles
```

## Options

* `fileToEmbed` — a name of a file which should be embedded. Should be contained withing the input tree
* `inputFiles` — a glob of files in which `token` should be replaced by the script
* `token` — a token that will be replaced by the contents of `fileToEmbed`

## Tests

:warning: No tests! Contributions welcome.

## License

The project is distributed under the MIT license.
