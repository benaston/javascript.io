(function (app, invertebrate, _) {
  'use strict';

  function Config(env) {
    if (!(this instanceof app.Config)) {
      return new app.Config(env);
    }

    var that = this,
        devConfig = {
          wizeratiUri: '/',
          templateServerUris: {
            '1': './template-server/contract/',
            '2': './template-server/contractor/',
            '3': './template-server/contract/',
            '4': './template-server/contractor/',
            'shared': './template-server/shared/'
          },
          'enableTrace': 'false'
        },
        prodConfig = {
          wizeratiUri: 'https://www.wizerati.com/',
          templateServerUris: { Contractor: 'https://contract.croni.cl/',
            Employer: 'https://contractor.croni.cl/' }
        },
        sharedConfig = {
          templatesUriPart: 'templates/',
          templatePostRenderScriptsUriPart: 'template-post-render-scripts/',
          metadataUriPart: 'metadata'
        };

    function init() {
      if (!env) {
        throw 'env not supplied';
      }

      var config = _.extend(that, new invertebrate.Config(env));
      config.devConfig = devConfig;
      config.prodConfig = prodConfig;
      config.sharedConfig = sharedConfig;
      config.collateConfiguration();
      return config;
    }

    return init();
  }

  app.Config = Config;

}(wizerati, invertebrate, _));
