require('node-minify').minify({
  compressor: 'uglifyjs',
  input: [
      'home/home.js',
      'news-list/news-list.js',
      'tech-news-list/tech-news-list.js',
      'weather-line-chart/weather-line-chart.js',
      'keywords-bar-chart/keywords-bar-chart.js',
      'app.const.js',
      'app.js'
  ],
  output: 'index.min.js',
  options: {
    mangle: false,
    compress: true
  },
  sync: true,
  callback: function (err, min) {}
});