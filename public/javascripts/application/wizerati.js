//order of declaration matters here.
window.wizerati = {
  //refactor away - clients should use equivalent functionality on instance
  mod: function () {
    var mods = {};

    return function (name) {
      if (mods[name]) {

        return mods[name];
      }

      return mods[name] = {};
    };
  }()
};
