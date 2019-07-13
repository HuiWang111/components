;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Icon = factory(global);
}(this, function (global) {
  const { 
    jQuery: $,
    util: { 
      isNumber, isUndefined, isNil, extend, removeKey, appendClass
    },
    ClassName: { 
      ICON_CLASS, FILLED_ICON_CLASS, WARNING_ICON_CLASS, SUCCESS_ICON_CLASS, INFO_ICON_CLASS, ERROR_ICON_CLASS,
      CONFIRM_ICON_CLASS, CLOSE_ICON_CLASS, SPIN_ICON_CLASS, LOADING_ICON_CLASS
    },
    SVG: {
      getWarnSvg, getWarnFilledSvg, getSuccessSvg, getSuccessFilledSvg, getInfoSvg, getInfoFilledSvg,
      getErrorSvg, getErrorFilledSvg, getConfirmSvg, getFilledConfirmSvg, getCloseSvg, getLoadingSvg
    }
  } = global,
  
  iconTypes = ['warn', 'success', 'info', 'error', 'close', 'loading', 'confirm'],
  themes = ['outline', 'filled'];

  /**
   * @description Icon
   * @param options = {
   *    size: Number | String,
   *    className: String,
   *    theme: 'wireframe' | 'filled',
   *    color: String,
   *    spin: Boolen,
   *    style: Object
   * }
   */

  function Icon(type, options) {
    isNil(options) && (options = {});

    if (!iconTypes.includes(type)) {
      throw new Error(`${type} is not a correct icon type`);
    }
    if (!isUndefined(options.theme) && !themes.includes(options.theme)) {
      throw new Error(`${options.theme} is not a correct theme`);
    }
    
    let defaultSize;
    switch (type) {
      case 'warn':
      case 'success':
      case 'info':
      case 'error':
      case 'confirm':
      case 'close': defaultSize = 16;break;
    }

    const defaultOptions = {
      size: defaultSize,
      className: '',
      color: '#cccccc',
      theme: 'outline',
      spin: false,
      style: {}
    }

    this.options = extend({}, defaultOptions, options);
    
    this.type = type;
    this.html = this.render();
    this.destroy();
  }

  extend(Icon.prototype, {
    render () {
      const { type, options: { size, className, theme, color, spin, style } } = this;
      const isDefaultTheme = theme === 'outline';

      let typeClass, svg;
      switch (type) {
        case 'warn': 
          typeClass = WARNING_ICON_CLASS;
          svg = isDefaultTheme ? getWarnSvg() : getWarnFilledSvg();
          break;
        case 'success': 
          typeClass = SUCCESS_ICON_CLASS;
          svg = isDefaultTheme ? getSuccessSvg() : getSuccessFilledSvg();
          break;
        case 'info': 
          typeClass = INFO_ICON_CLASS;
          svg = isDefaultTheme ? getInfoSvg() : getInfoFilledSvg();
          break;
        case 'error': 
          typeClass = ERROR_ICON_CLASS;
          svg = isDefaultTheme ? getErrorSvg() : getErrorFilledSvg();
          break;
        case 'confirm':
          typeClass = CONFIRM_ICON_CLASS;
          svg = isDefaultTheme ? getConfirmSvg('#faad14') : getFilledConfirmSvg('#faad14');
          break;
        case 'close': 
          typeClass = CLOSE_ICON_CLASS;
          svg = getCloseSvg(color);
          break;
        case 'loading':
          typeClass = LOADING_ICON_CLASS;
          svg = getLoadingSvg(color);
          break;
      }

      const klass = appendClass(
        className,
        ICON_CLASS,
        typeClass,
        isDefaultTheme ? '' : FILLED_ICON_CLASS,
        spin ? SPIN_ICON_CLASS : ''
      );

      const icon = $.node('i', svg, klass, {
        style: extend({
          width: isNumber(size) ? `${size}px` : size,
          height: isNumber(size) ? `${size}px` : size
        }, style)
      });

      return icon;
    },

    destroy () {
      removeKey(this, 'options');
    }
  });

  return Icon;
});