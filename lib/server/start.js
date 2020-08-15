require('@babel/register')({
  presets: ['@babel/preset-env'],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]
});

module.exports = require('./bin/www');
