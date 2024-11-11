module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        exclude: [
          /node_modules\/@chainsafe\/is-ip/,
          /node_modules\/dag-jose/,
        ],
        use: ["source-map-loader"],
      });

      webpackConfig.ignoreWarnings = [
        (warning) =>
          warning.module &&
          warning.module.resource &&
          warning.module.resource.includes("node_modules/@chainsafe/is-ip") ||
          warning.module.resource.includes("node_modules/dag-jose"),
      ];

      return webpackConfig;
    },
  },
};
