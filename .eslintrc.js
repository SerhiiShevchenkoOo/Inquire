module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks'],
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},

	rules: {
		'no-use-before-define': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/prop-types': 'off',
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'never',
			{
				svg: 'always',
				png: 'always',
				jpg: 'always',
			},
		],
		quotes: ['error', 'single'],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
	},
	settings: {
		pragma: 'React',
		react: {
			version: 'detect',
		},
	},
}
