import _ from 'lodash';
import minimist from 'minimist';

let args = minimist(process.argv.slice(2), {
  string: 'env',
  boolean: ['daemon', 'verbose'],
  alias: {
    'env': 'p'
  },
  default: {
    env: process.env.NODE_ENV || 'dev',
    verbose: false,
    daemon: false
  }
});

class ServeConfig {
  constructor(options = {}) {
    let config = _.cloneDeep(ServeConfig.DEFAULTS[args.env]);
    _.defaultsDeep(config, ServeConfig.DEFAULTS.common, options);
    _.extend(this, args, config);
  }
}

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
    proxies: [],
    watches: []
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
    },
    watches: [{
      glob: '*.*',
      tasks: []
    }]
  }
};


export default ServeConfig;
