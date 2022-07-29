// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:prettier/recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	globals: {
		uni: 'readonly',
		wx: 'readonly',
	},
	plugins: ['vue', 'prettier'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 5, //标签超出5个属性就会换行
			},
		],
		/*
              ---------------
              POSSIBLE ERRORS
              ---------------
           */
		eqeqeq: 'error', // 要求使用 === 和 !==
		'no-extra-semi': 1, // 禁止多余的分号
		'for-direction': 2, // for 循环死了
		'no-cond-assign': 2, // 防止 if 写成赋值
		'no-dupe-args': 2, // 禁止参数重名
		'no-dupe-keys': 2, // 禁止 key 重名
		'no-duplicate-case': 2, // 禁止 case 重复
		'no-func-assign': 2, // 禁止覆盖函数字面量
		'no-inner-declarations': [2, 'both'], // 禁止在 if 中 var
		'no-irregular-whitespace': 2, // 禁止非常规空白
		'no-prototype-builtins': 2, // 禁止直接调用 obj 上的 proto 方法
		'no-sparse-arrays': 2, // 防止数组中多余的逗号
		'no-template-curly-in-string': 2, // 禁止字符串中出现 ${}
		'no-unreachable': 2, // 禁止出现无法执行到的语句
		'no-unsafe-finally': 2, // 禁止 finally 出现控制语句
		'no-unsafe-negation': 2, // 禁止有歧义、不安全的 ! 号
		'use-isnan': 2, // 强制 isNaN()
		'valid-typeof': 2, // 防止 typeof 类型的字符写错
		// "valid-jsdoc": 2, // 如果有的话，校验 jsdoc

		// 小括号中的空格
		'space-in-parens': [1, 'never'],
	},
};
