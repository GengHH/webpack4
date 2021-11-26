const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCss = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin
const config = {
	mode: "production",
	entry: {
		main: path.join(__dirname, "../src/main.js"),
	},
	output: {
		filename: "js/[name].bundle.js",
		path: path.join(__dirname, "../dist"),
	},
	module: {
		rules: [
			// ... 其它规则
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							//publicPath: '/public/path/to/',
						},
					},
					"css-loader",
				],
			},
			{
				test: /\.(png|jp?g|gif|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192, // 小于8192字节（8KB）的图片打包成base 64图片
							name: "images/[name].[hash:8].[ext]",
							esModule: false, //不适用esModule模式，使用CommonJS模式
							publicPath: "",
						},
					},
				],
			},
			{
				// 文件依赖配置项——字体图标
				test: /\.(woff|woff2|svg|eot|ttf)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							limit: 8192,
							name: "fonts/[name].[ext]?[hash:8]",
							esModule: false, //不适用esModule模式，使用CommonJS模式
							publicPath: "",
						},
					},
				],
			},
		],
	},
	// plugins: [
	// 	new CleanWebpackPlugin(),
	// 	new MiniCssExtractPlugin(),
	// 	new HtmlWebpackPlugin({
	// 		template: path.join(__dirname, "../public/index.html"),
	// 		inject: true,
	// 		minify: {
	// 			removeComments: true,
	// 		},
	// 	}),
	// 	new VueLoaderPlugin(),
	// ],
	// optimization: {
	// 	minimize: true,
	// 	minimizer: [
	// 		new TerserPlugin({
	// 			cache: true,
	// 			parallel: true,
	// 			sourceMap: true, // Must be set to true if using source-maps in production
	// 			terserOptions: {
	// 				// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
	// 			},
	// 		}),
	// 	],
	// },
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "../public/index.html"),
			inject: true,
			minify: {
				removeComments: true,
			},
		}),
		new VueLoaderPlugin(),
		new BundleAnalyzerPlugin({
			analyzerMode: "server",
			analyzerHost: "127.0.0.1",
			analyzerPort: 8889,
			reportFilename: "report.html",
			defaultSizes: "parsed",
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: "stats.json",
			statsOptions: null,
			logLevel: "info",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
				},
			}),
			new optimizeCss({}),
		],
		runtimeChunk: {
			name: (entrypoint) => `runtime~${entrypoint.name}`,
		},
		splitChunks: {
			chunks: "async",
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false,
			cacheGroups: {
				vendor: {
					name: "vendor",
					chunks: "initial",
					priority: -10,
					reuseExistingChunk: false,
					test: /node_modules\/(.*)\.js/,
				},
				styles: {
					name: "styles",
					test: /\.(scss|css)$/,
					chunks: "all",
					minChunks: 1,
					reuseExistingChunk: true,
					enforce: true,
				},
				elementUI: {
					name: "chunk-elementUI", // 单独将 elementUI 拆包
					priority: 15, // 权重需大于其它缓存组
					test: /[\/]node_modules[\/]element-ui[\/]/,
				},
			},
		},
	},
}

module.exports = config
