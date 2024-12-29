const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point aplikasi Anda
  output: {
    path: path.resolve(__dirname, "dist"), // Folder output
    filename: "bundle.js", // Nama file bundle
  },
  mode: "development", // Atau "production" jika Anda membuild untuk produksi
  devtool: "source-map", // Aktifkan source map untuk debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Terapkan pada semua file JS
        enforce: "pre", // Proses sebelum loader lain
        use: ["source-map-loader"], // Gunakan source-map-loader
        exclude: [
          /node_modules\/@chainsafe\/is-ip/, // Kecualikan is-ip
          /node_modules\/dag-jose/, // Kecualikan dag-jose
        ],
      },
      {
        test: /\.css$/, // Loader untuk file CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Loader untuk file gambar
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolusi untuk file JS dan JSX
  },
  devServer: {
    static: path.resolve(__dirname, "public"), // Folder untuk file statis
    compress: true, // Aktifkan kompresi
    port: 3000, // Port server
    hot: true, // Aktifkan hot reload
  },
};
