'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gulpNodemon = require('gulp-nodemon');

var _gulpNodemon2 = _interopRequireDefault(_gulpNodemon);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _httpProxyMiddleware = require('http-proxy-middleware');

var _httpProxyMiddleware2 = _interopRequireDefault(_httpProxyMiddleware);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var GulpServer = (function () {
  function GulpServer() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, GulpServer);

    this.config = config;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  _createClass(GulpServer, [{
    key: 'static',

    /**
     * Configures and initializes a static BrowserSync HTTP server.
     */
    value: function _static(cb) {
      var bs = _browserSync2['default'].create();
      var proxies = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.config.proxies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;

          proxies.push((0, _httpProxyMiddleware2['default'])(p.context, p));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var options = _lodash2['default'].defaults({
        middleware: proxies,
        logLevel: this.config.verbose ? 'debug' : 'info'
      }, this.config.bs);

      // Register watches
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.config.watches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var w = _step2.value;

          _gulp2['default'].watch(w.glob, _gulp2['default'].series(w.tasks || [], bs.reload));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      bs.init(options, cb);
    }
  }, {
    key: 'daemon',

    /**
     * Configures and starts a nodemon daemon.
     */
    value: function daemon(cb) {
      var options = _lodash2['default'].defaults({
        verbose: this.config.verbose,
        env: {
          'NODE_ENV': this.config.env
        }
      }, this.config.nodemon);
      (0, _gulpNodemon2['default'])(options);
      cb();
    }
  }, {
    key: 'serve',
    value: function serve(cb) {
      if (this.config.daemon) {
        this.daemon(cb);
      } else {
        this['static'](cb);
      }
    }
  }]);

  return GulpServer;
})();

exports['default'] = GulpServer;
module.exports = exports['default'];
//# sourceMappingURL=../lib/serve.js.map