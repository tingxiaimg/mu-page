module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  css: { extract: false }
}