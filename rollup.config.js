import  babel from 'rollup-plugin-babel';
import  serve from 'rollup-plugin-serve';
export default {
	input: './src/index.js', //打包入口文件
	output: {
		file: 'dist/umd/vue.js', //出口文件
		name: 'Vue', // 指定打包后全局变量的名称
		format: 'umd', //统一模块规范 cmd umd
		sourcemap: true // 开启源码调试
	},
	plugins:[
		babel({
			exclude: 'node_modules/**'
		}),
		process.env.ENV == 'development'? serve({
			open: true,
			openPage:'/public/index.html',// 默认打开页面路径
			port: 3000, // 端口号
			contentBase:''
        }) : null
	]

}
