;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory() : typeof define === 'function' && define.amd
  ? define(factory) : global.Color = factory();
}(this, function () {
  const PRIMARY_COLOR = '#1890ff';
  const DISABLE_COLOR = '#ccc';

  return Object.freeze({
    PRIMARY_COLOR, DISABLE_COLOR
  });
});