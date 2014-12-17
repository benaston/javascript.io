(function (app, invertebrate, _) {
  'use strict';

  function App(env, router) {
    if (!(this instanceof app.App)) {
      return new app.App(env, router);
    }

    var that = this;

    function init() {
      if (!env) {
        throw 'env not supplied';
      }

      if (!router) {
        throw 'router not supplied';
      }

      that.env = env;
      that.router = router;

      return _.extend(that, new invertebrate.App(app.mod('templates').templateUrlHelper));
    }

    return init();
  }

  app.App = App;

}(wizerati, invertebrate, _));
