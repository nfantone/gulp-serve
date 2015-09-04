import _ from 'lodash';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import proxy from 'http-proxy-middleware';
import gulp from 'gulp';

class GulpServer {
  constructor(config = {}) {
    this.config = config;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  /**
   * Configures and initializes a static BrowserSync HTTP server.
   */
  static(cb) {
    let bs = browserSync.create();
    let proxies = [];
    for (let p of this.config.proxies) {
      proxies.push(proxy(p.context, p));
    }
    let options = _.defaults({
      middleware: proxies,
      logLevel: this.config.verbose ? 'debug' : 'info'
    }, this.config.bs);

    // Register watches
    for (let w of this.config.watches) {
      gulp.watch(w.glob, gulp.series(w.tasks || [], bs.reload));
    }

    bs.init(options, cb);
  }

  /**
   * Configures and starts a nodemon daemon.
   */
  daemon(cb) {
    let options = _.defaults({
      verbose: this.config.verbose,
      env: {
        'NODE_ENV': this.config.env
      }
    }, this.config.nodemon);
    nodemon(options);
    cb();
  }

  serve(cb) {
    if (this.config.daemon) {
      this.daemon(cb);
    } else {
      this.static(cb);
    }
  }

}

export default GulpServer;
