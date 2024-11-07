// webpack.config.js
module.exports = {
    // Konfigurasi lain (jika ada)
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/@chainsafe\/is-ip/,
            /node_modules\/dag-jose/,
          ],
        },
      ],
    },
  };
  