;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Icon = factory(global);
}(this, function (global) {
  const { 
    jQuery: $,
    util: { 
      isNumber, isUndefined, propsChecker, extend, removeKey, appendClass,
    },
    ClassName: { 
      ICON_CLASS, FILLED_ICON_CLASS, WARNING_ICON_CLASS, SUCCESS_ICON_CLASS, INFO_ICON_CLASS, ERROR_ICON_CLASS,
      CONFIRM_ICON_CLASS, CLOSE_ICON_CLASS, SPIN_ICON_CLASS, LOADING_ICON_CLASS
    },
    SVG: {
      getWarnSvg, getWarnFilledSvg, getSuccessSvg, getSuccessFilledSvg, getInfoSvg, getInfoFilledSvg,
      getErrorSvg, getErrorFilledSvg, getConfirmSvg, getFilledConfirmSvg, getCloseSvg, getLoadingSvg
    },
    Color: { WARNING_COLOR }
  } = global,
  
  iconTypes = ['warn', 'success', 'info', 'error', 'close', 'loading', 'confirm'],
  themes = ['outlined', 'filled'];

  /**
   * @description Icon
   * @param props = {
   *    size: Number,
   *    className: String,
   *    theme: 'outlined' | 'filled',
   *    color: String,
   *    spin: Boolen,
   *    style: Object
   * }
   */

  function Icon(type, props) {
    propsChecker(props, {
      size: 'number',
      className: 'string',
      theme: 'string',
      color: 'string',
      spin: 'boolean',
      style: 'object'
    });

    if (!iconTypes.includes(type)) {
      throw new Error(`${type} is not a correct icon type`);
    }
    if (!isUndefined(props.theme) && !themes.includes(props.theme)) {
      throw new Error(`${props.theme} is not a correct theme`);
    }
    
    let defaultSize;
    switch (type) {
      case 'warn':
      case 'success':
      case 'info':
      case 'error':
      case 'confirm':
      case 'loading':
      case 'close': defaultSize = 16;break;
    }

    const defaultProps = {
      size: defaultSize,
      color: '#cccccc',
      theme: 'outline',
      spin: false
    }

    this.props = extend({}, defaultProps, props);
    
    this.type = type;
    this.html = this.render();
    this.destroy();
  }

  extend(Icon.prototype, {
    render () {
      const { type, props: { size, className, theme, color, spin, style } } = this;
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
          svg = isDefaultTheme ? getConfirmSvg(WARNING_COLOR) : getFilledConfirmSvg(WARNING_COLOR);
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
          width: `${size}px`,
          height: `${size}px`
        }, style ? style : {})
      });

      return icon;
    },

    destroy () {
      removeKey(this, 'props');
    }
  });

  return Icon;
});