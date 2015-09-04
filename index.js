import DefaultRegistry from 'undertaker-registry';
import GulpServer from './lib/serve';
import ServeConfig from './lib/config';

class GulpServeRegistry extends DefaultRegistry {
  constructor(options) {
    super();
    this.config = new ServeConfig(options);
  }

  init(taker) {
    let server = new GulpServer(this.config);
    let recipes = {
      serve: taker.series(function start(cb) {
        server.serve(cb);
      })
    };
    taker.task('serve', recipes.serve);
  }
}

export default GulpServeRegistry;
