$(function appStart() {
  'use strict';

  if (!wizerati.mod('compatibility').browserCompatibilityChecker.isBrowserCompatible()) {
    $('head').append('<link rel="stylesheet" type="text/css" href="stylesheets/no-compatibility.css">');
    return;
  }

  window.wizerati.instance = new wizerati.App(window.env, new window.invertebrate.Router('Wizerati', new window.invertebrate.History()));
  for (var v in window.wizerati.mod('views')) {
    window.wizerati.mod('views')[v].onDomReady();
  }
  //TODO read application state from local storage, before applying this first layout calculation
  window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  window.addEventListener('resize', function () {
    window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  });
  //We need to recalculate the layout when an iOS device changes orientation.
  window.addEventListener('orientationchange', function () {
    window.wizerati.mod('layout').layoutCoordinator.applyLayout(window.wizerati.mod('layout').layoutCalculator.calculate());
  });

  wizerati.mod('routing').routeRegistry.registerRoutes(window.wizerati.instance.router); //happens last to ensure init complete before routing start

  //Due to a change in the W3C spec, pop state is no longer triggered on page load, so we manually invoke it to trigger the initial route.
  //In a settimout because this prevents a duplicate event being triggered.
  setTimeout(function () {
    $(window).trigger("popstate", { isTriggeredManually: true });
  }, 0)
});
