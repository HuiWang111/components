!function (win, $, Component, _) {

  function TimeTree (selector, options) {
    this.$container = $(selector);
    this.options = options;
  }

  win.TimeTree = TimeTree;

  Object.assign(TimeTree.prototype, {
    html () {
      
    }
  });

}(window, window.jQuery, window.Component, window.Util)