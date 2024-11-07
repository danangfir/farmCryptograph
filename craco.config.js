// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/@chainsafe\/is-ip/,
            /node_modules\/dag-jose/,
          ],
        });
        return webpackConfig;
      },
    },
  };
  