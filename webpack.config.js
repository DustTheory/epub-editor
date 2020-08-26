const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";
const LEGACY = process.env.LEGACY;

const hostname = "localhost";
const port = 8080;

module.exports = {
	mode: process.env.NODE_ENV || "development",
	entry: {
		index: "./src/index.js",
	},
	devtool: PROD ? undefined : "inline-source-map",
	devServer: {
		contentBase: "./dist",
		host: hostname,
		port: port,
		inline: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
		},
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "templates", "index.html"),
			chunks: ["index"],
		}),
		new ReactRefreshWebpackPlugin(),
	],
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		plugins: [new DirectoryNamedWebpackPlugin()],
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									targets: LEGACY
										? "defaults"
										: "last 2 Chrome versions, last 2 Safari versions, last 2 ChromeAndroid versions, l" +
										  "ast 2 iOS versions, last 2 Firefox versions, last 2 Edge versions",
									useBuiltIns: "usage",
									corejs: 3,
									bugfixes: true,
								},
							],
							["@babel/preset-react"],
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"],
			},
		],
	},
};
