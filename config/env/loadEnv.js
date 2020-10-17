const rootPath = require('app-root-path');

function loadEnv() {
	try {
		// Load Local Environmental Variables Only in Development Mode
		if (process.env.NODE_ENV !== 'production') {
			const dotenv = require('dotenv');
			const customPath = { path: rootPath + '/config/env/.env' };
			
			const result = dotenv.config(customPath);
		
			if (result.error) {
				throw new Error(result.error);
			}
		}		
	} catch (err) {
		console.error('error loading .env file:', err.message);
	}
}

module.exports = loadEnv; 
