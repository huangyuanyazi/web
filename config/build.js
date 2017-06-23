let path = require('path')

module.exports = {
	build: {
        production: {
            outputPath: path.join(__dirname, '..', '..', 'cdn'),
            publicPath: 'http://cdn.taoquanw.com/'
        },
        testing: {
            outputPath: path.join(__dirname, '..', '..', 'static'),
            publicPath: 'http://cdn.tqtest.com/'
        },
        development: {
            outputPath: '',
            publicPath: ''
        }
	}
};