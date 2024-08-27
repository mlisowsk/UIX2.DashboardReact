const path = require("path");
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = function (env, argv) {
	return {
		entry: {
			shellui: "./src/shellui.js",	// ShellUI module
			bundle: "./src/index.jsx",		// dashboard module
		},
		mode: "production",
		output: {
			filename: "[name].js",
			iife: false,	// prevent top level IIFE on Webpack 5 - need this so M-Files finds the OnNewShellUI entry point
			pathinfo: true,	// include comments in bundles with information about the contained modules.
			clean: true		// clean output dir before each build
		},
		//target: "browserslist",
		//devtool: "source-map",	// source map files for debugging
		devServer: {
			static: "app"
		},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [
						MiniCssExtractPlugin.loader,	// generate separate CSS file
						{
							loader: "css-loader"
						}
					]
				},
				{
					test: /\.(jpg|jpeg|bmp|gif|svg|png)$/i,
					type: "asset/inline"
				},
				{
					test: /\.(js|jsx)$/,	// transpile JSX to JS using babel
					exclude: /node_modules/,	// don't mess with node_modules
					use: ['babel-loader'],
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								[
									'@babel/preset-env', {
									},
					
								], 
								'@babel/preset-react'
							],
						}
					}
				}
			]
		},
		resolve:{
			extensions: ['.js', '.jsx', '.css'],
			modules: ['src', 'node_modules']
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: false,
						format: { beautify: true },	// keep line breaks so M-Files error messages make sense
						/* compress: {
							defaults: true,
							properties: false,		// important: don't rewrite property access using the dot notation, e.g. foo["bar"] → foo.bar
						},*/
						//mangle: true,
						keep_fnames: true,
						keep_classnames: true,
					},
				}),
				new CssMinimizerPlugin()
			],
			concatenateModules: true
		},
		plugins: [
			new CopyPlugin({
				patterns: [
					{ from: "src/index.html", to: "index.html" },
					{ from: "src/style.css", to: "style.css" },
				],
			}),
			new MiniCssExtractPlugin(),
			new webpack.SourceMapDevToolPlugin({
				append: '\n//# sourceMappingURL=file:///C:/kanban_sourcemaps/[url]',
				filename: '[file].map[query]',
			}),
		],
		cache: {
			type: 'filesystem',	// cache build process
		},
		stats: {
			modulesSpace: 100,
		},
	}
}