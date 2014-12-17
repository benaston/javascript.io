'use strict';

(function registerModules(w){
  with(w) {
    enumRegistrar.run(w);
    compatibilityRegistrar.run(w);
    configRegistrar.run(w);
    clientRegistrar.run(w);
    cacheRegistrar.run(w);
    decoratorRegistrar.run(w);
    modelRegistrar.run(w);
    iServiceRegistrar.run(w, mod('config'));
    templateRegistrar.run(w, mod('config'), mod('i-services'));
    repositoryRegistrar.run(w, mod('i-services'));
    serviceRegistrar.run(w, mod('clients'), mod('caches'), mod('i-services'), mod('models'), mod('repositories'));
    packRegistrar.run(w, mod('models'), mod('services'));
    factoryRegistrar.run(w, mod('i-services'), mod('models'), mod('repositories'), mod('packs'));
    connectorRegistrar.run(w, mod('clients'), mod('factories'));
    layoutRegistrar.run(w, mod('models'));
    viewRegistrar.run(w, mod('factories'), mod('layout'), mod('models'), mod('packs'));
    helperRegistrar.run(w, mod('packs'), mod('factories'), mod('layout'), mod('models'), mod('services'));
    controllerRegistrar.run(w, mod('factories'), mod('layout'), mod('models'), mod('services'), mod('packs'), mod('helpers'), mod('repositories'));
    uiRegistrar.run(w);
    routingRegistrar.run(w);
  }
}(wizerati));

