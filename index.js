var fs = require('fs')
var path = require('path')
var Writer = require('broccoli-writer')
var helpers = require('broccoli-kitchen-sink-helpers')

module.exports = EmbedScript

EmbedScript.prototype = Object.create(Writer.prototype)
EmbedScript.prototype.constructor = EmbedScript
function EmbedScript(inputTree, options) {
  if (!(this instanceof EmbedScript)) return new EmbedScript(inputTree, options)

  this.inputTree = inputTree
  this.inputFiles = options.inputFiles
  this.token = options.token
  this.fileToEmbed = options.fileToEmbed
}

EmbedScript.prototype.write = function (readTree, destDir) {
  var self = this

  return readTree(this.inputTree).then(function (srcDir) {
    var script = fs.readFileSync(path.join(srcDir, self.fileToEmbed), { encoding: 'utf-8' })
    var inputFiles = helpers.multiGlob(self.inputFiles, { cwd: srcDir })

    for (var i = 0; i < inputFiles.length; i++) {
      var fname = inputFiles[i]

      var file = fs.readFileSync(path.join(srcDir, fname), { encoding: 'utf-8' })
      var replacedFile = file.replace(self.token, script)

      fs.writeFileSync(path.join(destDir, fname), replacedFile)
    }
  })
}
