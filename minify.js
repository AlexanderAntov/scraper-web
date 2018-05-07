require('node-minify').minify({
  compressor: 'uglifyjs',
  input: [
      'home/home.js',
      'news-lists/news-lists-service.js',
      'news-lists/main/main-news-list.js',
      'news-lists/tech/tech-news-list.js',
      'news-lists/programming/programming-news-list.js',
      'charts/weather/weather-line-chart.js',
      'charts/keywords/keywords-bar-chart.js',
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