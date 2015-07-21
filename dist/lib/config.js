'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var args = (0, _minimist2['default'])(process.argv.slice(2), {
	string: 'env',
	boolean: ['daemon', 'verbose'],
	alias: { 'env': 'p' },
	'default': {
		env: process.env.NODE_ENV || 'dev',
		verbose: false,
		daemon: false
	}
});

var ServeConfig = function ServeConfig() {
	var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	_classCallCheck(this, ServeConfig);

	var config = _lodash2['default'].cloneDeep(ServeConfig.DEFAULTS[args.env]);
	_lodash2['default'].defaultsDeep(config, ServeConfig.DEFAULTS.common, options);
	_lodash2['default'].extend(this, args, config);
	console.log(this);
};

ServeConfig.DEFAULTS = {
	common: {
		bs: {
			host: 'localhost',
			port: 9000,
			logConnections: true,
			logPrefix: 'gulp-serve'
		},
		nodemon: {
			script: 'app.js',
			delayTime: 1,
			ext: 'js html'
		},
		// options object as expected by http-proxy-middleware
		// see: https://github.com/chimurai/http-proxy-middleware#options
		proxies: []
	},
	prod: {
		bs: {
			server: {
				baseDir: './dist',
				directory: true
			}
		}
	},
	dev: {
		bs: {
			server: {
				baseDir: ['.tmp', './src/app', './src/assets', './bower_components']
			}
		}
	}
};

exports['default'] = ServeConfig;
module.exports = exports['default'];
//# sourceMappingURL=../lib/config.js.map