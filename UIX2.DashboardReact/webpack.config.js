const path = require("path");
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//var WebpackObfuscator = require('webpack-obfuscator');

module.exports = function (env, argv) {
	return {
		entry: {
			shellui: "./src/shellui.js",				// ShellUI application
			bundle: "./src/index.jsx",	// dashboard application
		},
		mode: "production",
		//mode: "development",
		output: {
			filename: "[name].js",
			//path: path.resolve(__dirname, "pack/app"),
			//publicPath: "/",		// use "/" to rebase on app directory
			//environment: {
			//	arrowFunction: false,	// WebBrowser control doesn't support arrow functions
			//	const: false,			// WebBrowser control doesn't support const keyword
			//	module: false
			//},
			//library: {
			//	name: 'OnNewShellUI',
			//	type: 'window',
			//},
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
				/* {	// linked SVG files won't work in M-Files Web due to wrong MIME-type emitted by IIS
					test: /kanbanoo-logo-dark\.svg$/i,	// generate as separate file
					type: "asset/resource"
				}, */
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
					//					//useBuiltIns: 'usage',	// add polyfills as used by code
					//					//"corejs": "3.26.0",		// actual polyfills package (core-js@3)
					//					targets: {
					//						"chrome": "99",
					//						"ie": "8"		// target for IE 8 ~ MS WebBrowser control
					//					}, debug: false
									},
					
								], 
								'@babel/preset-react'
							],	// let's us use latest JS features
					//		"retainLines": true,
					//		"plugins": ["@babel/plugin-transform-member-expression-literals"],
					//		cacheCompression: false,
					//		cacheDirectory: true,
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
					exclude: /(NVS.js|dashboard.html)/,		// /(NVS.js|dashboard.html|main.js)/,
					terserOptions: {
						compress: false,
						format: { beautify: true },	// keep line breaks so M-Files error messages make sense
						/* compress: {
							defaults: true,
							properties: false,		// important: don't rewrite property access using the dot notation, e.g. foo["bar"] → foo.bar
						},*/
						//mangle: true,
						keep_fnames: true,	// was false
						keep_classnames: true,
						//ie8: true,
					},
				}),
				new CssMinimizerPlugin()
			],
			concatenateModules: true
		},
		plugins: [
			//new webpack.DefinePlugin({
			//	KANBANOOVERSION: JSON.stringify(env.addonversion),
			//	KANBANOOBUILDMODE: JSON.stringify("Debug")
			//}),
			new CopyPlugin({
				patterns: [
					{ from: "src/index.html", to: "index.html" },
					{ from: "src/style.css", to: "style.css" },
			//		{ from: "src/globals.js", to: "globals.js" },
			//		{ from: "src/date.js", to: "date.js" },
			//		{ from: "src/images/kanbanoo-icon.ico", to: "images/kanbanoo-icon.ico" },
			//		{ from: "src/images/kanbanoo-enable-icon.ico", to: "images/kanbanoo-enable-icon.ico" },
			//		{ from: "src/images/kanbanoo-disable-icon.ico", to: "images/kanbanoo-disable-icon.ico" },
			//		{ from: "src/NVS.js", to: "NVS.js" },
			//		{ from: "src/Kanbanoo EULA - non USA.pdf", to: "Kanbanoo EULA - non USA.pdf" },
				],
			}),
			new MiniCssExtractPlugin(),
			//new HtmlWebpackPlugin({
			//	template: 'src/dashboard.html',
			//	//inject: true,
			//	//chunks: ['index'],	// reference index entry point
			//	filename: 'dashboard.html'
			//}),
			//new HtmlWebpackPlugin({
			//	template: 'src/EULA - non USA.html',
			//	filename: 'EULA - non USA.html'
			//}),
			//new WebpackManifestPlugin(),
			/*		new WebpackObfuscator ({
						// see https://github.com/javascript-obfuscator/javascript-obfuscator
							optionsPreset: "low-obfuscation",	// will approximately double size of JS file
							rotateStringArray: true
						},
						['excluded_bundle_name.js']
					) */
			//,new BundleAnalyzerPlugin()
			new webpack.SourceMapDevToolPlugin({
				//filename: "[file].map",
				//moduleFilenameTemplate: "[absolute-resource-path]",
				//fallbackModuleFilenameTemplate: "[absolute-resource-path]"
				append: '\n//# sourceMappingURL=file:///C:/kanban_sourcemaps/[url]',
				filename: '[file].map[query]',
			}),
		],
		cache: {
			type: 'filesystem',	// cache build process
		},
		stats: {
			modulesSpace: 100,
			//chunkModulesSpace: 100,
			//groupAssetsByChunk: true,
			// Display bailout reasons. https://webpack.js.org/plugins/module-concatenation-plugin/
			//optimizationBailout: true,
			//orphanModules: true,
		},
	}
}