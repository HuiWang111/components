;!function (global, factory) {
  typeof exports === 'object' && module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Alert = factory(global);
}(this, function (global) {
  const {
    Component, jQuery: $, Icon, Observer,
    util: { 
      isString, isFunction, toSelector, tagOf, extend, removeKeys, appendClass, getRandomClassName,
      propsChecker
    },
    ClassName: {
      ALERT_MESSAGE_CLASS ,ALERT_DESCRIPTION_CLASS, ALERT_ICON_CLASS, ALERT_CLOSE_ICON, ALERT_WARN_CLASS,
      ALERT_SUCCESS_CLASS, ALERT_ERROR_CLASS, ALERT_INFO_CLASS, ALERT_CONTAINER_CLASS, ALERT_WITH_ICON_CLASS,
      ALERT_WITH_DESC_CLASS, ALERT_WITH_CLOSE_CLASS, ALERT_INVISIBLE_CLASS, ALERT_SLIDEUP_CLASS,
      ALERT_SLIDEDOWN_CLASS
    }
  } = global,
  
  alertTypes = ['warn', 'success', 'error', 'info'];

  /**
   * @param props = {
   *    closable: Boolean,
   *    closeText: String,
   *    showIcon: Boolen,
   *    description: String,
   *    message: String,
   *    defaultVisible: Boolen, // 默认是否显示
   *    style: Object, // Alert容器style
   *    onClose: Function,
   *    afterClose: Function
   * }
   */

  function Alert(selector, type, props) {
    propsChecker(props, {
      closable: 'boolean',
      closeText: 'string',
      showIcon: 'boolean',
      description: 'string',
      message: 'string.require',
      defaultVisible: 'boolean',
      style: 'object',
      onClose: 'function',
      afterClose: 'function'
    });

    if (!alertTypes.includes(type)) {
      throw new Error(`${type} is not a correct Alert type`);
    }

    const defaultProps = {
      closable: false,
      showIcon: false,
      defaultVisible: false,
    }

    this.props = extend({}, defaultProps, props);
    this.type = type;
    this.$container = $(selector);
    this.super();
  }

  $.inherit(Component, Alert);

  extend(Alert.prototype, {
    render () {
      const { 
        type, $container,
        props: { closable, closeText, showIcon, description, message, defaultVisible, style }
      } = this;
      const withDesc = isString(description) && description !== '';
      const iconProps = {};
      if (withDesc) {
        iconProps.size = 24;
      } else {
        iconProps.size = 14;
        iconProps.theme = 'filled';
      }

      const icon = showIcon ? ( new Icon(type, extend({ className: ALERT_ICON_CLASS }, iconProps)) ).html : '';
      const msg = $.node('p', message, ALERT_MESSAGE_CLASS);
      const desc = $.node('p', description, ALERT_DESCRIPTION_CLASS);

      const closeIcon = closable ? (
        isString(closeText) && closeText !== '' ? closeText : (new Icon('close', {
          className: ALERT_CLOSE_ICON
        })).html
      ) : '';

      let wrapClass;
      switch (type) {
        case 'warn': wrapClass = ALERT_WARN_CLASS; break;
        case 'success': wrapClass = ALERT_SUCCESS_CLASS; break;
        case 'error': wrapClass = ALERT_ERROR_CLASS; break;
        case 'info': wrapClass = ALERT_INFO_CLASS; break;
      }
      const RANDOM_CLASS = getRandomClassName();
      const klass = appendClass(
        wrapClass,
        RANDOM_CLASS,
        ALERT_CONTAINER_CLASS,
        showIcon ? ALERT_WITH_ICON_CLASS : '',
        withDesc ? ALERT_WITH_DESC_CLASS : '',
        closable ? ALERT_WITH_CLOSE_CLASS : '',
        defaultVisible ? '' : ALERT_INVISIBLE_CLASS
      );
      const wrapper = $.node('div', icon + msg + desc + closeIcon, klass, style ? { style } : null);
      this.RANDOM_CLASS = RANDOM_CLASS;

      return [{
        html: wrapper,
        container: tagOf($container) === 'body' ? 'body' : $container,
        type: 'append'
      }];
    },

    componentDidMount () {
      this.$alertContainer = $(toSelector(this.RANDOM_CLASS));
      this.$closeIcon = this.$alertContainer.find(toSelector(ALERT_CLOSE_ICON));
    },

    bindEvents () {
      const { onClose, closable } = this.props;
      const __this__ = this;

      new Observer(this, 'visible', {
        set (newValue) {
          if (newValue === true) {
            __this__.show();
          } else {
            __this__.hide();
          }
        }
      });

      if (closable) {
        this.$closeIcon.on('click', function () {
          isFunction(onClose) && onClose();
          __this__.visible = false;
        });
      }
    },

    show () {
      const { visible, $alertContainer, props: { defaultVisible } } = this;
      
      if (visible === true || defaultVisible === false) {
        $alertContainer.removeClass(ALERT_INVISIBLE_CLASS);
        $alertContainer.removeClass(ALERT_SLIDEUP_CLASS);
        $alertContainer.addClass(ALERT_SLIDEDOWN_CLASS);
      }
    },

    hide () {
      const { $alertContainer, visible, props: { afterClose, defaultVisible } } = this;

      if (visible === false || defaultVisible === true) {
        $alertContainer.removeClass(ALERT_SLIDEDOWN_CLASS);
        $alertContainer.addClass(ALERT_SLIDEUP_CLASS);
        setTimeout(() => {
          $alertContainer.addClass(ALERT_INVISIBLE_CLASS);
          isFunction(afterClose) && afterClose();
        }, 200);
      }
    },

    destroy () {
      removeKeys(this, '$container, $closeIcon');
    }
  });

  return Alert;
});