'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _undertakerRegistry = require('undertaker-registry');

var _undertakerRegistry2 = _interopRequireDefault(_undertakerRegistry);

var _libServe = require('./lib/serve');

var _libServe2 = _interopRequireDefault(_libServe);

var _libConfig = require('./lib/config');

var _libConfig2 = _interopRequireDefault(_libConfig);

var GulpServeRegistry = (function (_DefaultRegistry) {
	_inherits(GulpServeRegistry, _DefaultRegistry);

	function GulpServeRegistry(options) {
		_classCallCheck(this, GulpServeRegistry);

		_get(Object.getPrototypeOf(GulpServeRegistry.prototype), 'constructor', this).call(this);
		this.config = new _libConfig2['default'](options);
	}

	_createClass(GulpServeRegistry, [{
		key: 'init',
		value: function init(taker) {
			var server = new _libServe2['default'](this.config);
			var recipes = {
				serve: taker.series(function start(cb) {
					server.serve(cb);
				})
			};
			taker.task('serve', recipes.serve);
		}
	}]);

	return GulpServeRegistry;
})(_undertakerRegistry2['default']);

exports['default'] = GulpServeRegistry;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map