;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Modal = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $, Icon,
    util: { 
      isString, isObject, isFunction, isUndefined, isNull, toSelector, extend,
      removeUndef, appendClass, getRandomClassName, propsChecker
    },
    ClassName: {
      MODAL_FOOTER_CONTAINER_CLASS, MODAL_FOOTER_WRAP_CLASS, MODAL_FOOTER_OK_BTN_CLASS, MODAL_FOOTER_CANCEL_BTN_CLASS,
      MODAL_HEADER_CONTAINER_CLASS, MODAL_HEADER_WRAP_CLASS, MODAL_CLOSE_ICON_CLASS, MODAL_BODY_CLASS,
      MODAL_CONTAINER_CLASS, MODAL_CONTAINER_CENTERED_CLASS, MODAL_CONTAINER_INVISIBLE_CLASS,
      MODAL_MASK_CLASS, MODAL_MASK_INVISIBLE_CLASS,

      /* Button */
      DEFAULT_BTN_CLASS, PRIMARY_BTN_CLASS,

      /* for info/error/success/warn/confirm Modal */
      MODAL_CONFIRM_CONTAINER_CLASS, MODAL_INFO_CONTAINER_CLASS, MODAL_ERROR_CONTAINER_CLASS,MODAL_SUCCESS_CONTAINER_CLASS, MODAL_WARN_CONTAINER_CLASS, SPECIAL_MODAL_TITLE, SPECIAL_MODAL_CONTENT,
    }
  } = global,
  
  MODAL_TYPE_MAP = ['info', 'warn', 'error', 'success', 'confirm'],
  MODAL_COMMON_TYPE_MAP = ['info', 'warn', 'error', 'success'];

  function Modal(props) {
    propsChecker(props, {
      bodyStyle: 'object',
      defaultVisible: 'boolean',
      cancelText: 'string',
      centered: 'boolean',
      closable: 'boolean',
      keyboard: 'boolean',
      mask: 'boolean',
      maskStyle: 'object',
      okText: 'string',
      okType: 'string',
      okButtonProps: 'object',
      cancelButtonProps: 'object',
      style: 'object',
      title: 'string',
      wrapClassName: 'string',
      zIndex: 'number',
      bodyContent: 'string',
      footer: 'string',
      onCancel: 'function',
      afterClose: 'function',
      onOk: 'function'
    });

    removeUndef(props);

    // 默认 footer
    const cancelText = isUndefined(props.cancelText) ? '取消': props.cancelText;
    const cancelButtonProps = {};
    const cancelButtonClass = appendClass(
      DEFAULT_BTN_CLASS,
      MODAL_FOOTER_CANCEL_BTN_CLASS
    );

    const okText = isUndefined(props.okText) ? '确认' : props.okText;
    const okButtonProps = {};
    const okButtonClass = appendClass(
      DEFAULT_BTN_CLASS,
      PRIMARY_BTN_CLASS,
      MODAL_FOOTER_OK_BTN_CLASS
    );
    
    // 通过设置为null来配置不显示按钮
    const cancelBtn = isNull(cancelText) ? '' : $.node('button', cancelText, cancelButtonClass, cancelButtonProps);
    const okBtn = isNull(okText) ? '' : $.node('button', okText, okButtonClass, okButtonProps);

    const defaultProps = {
      defaultVisible: false,
      cancelText,
      centered: false,
      closable: false,
      keyboard: true, // 未实现
      mask: true,
      okText,
      okType: 'primary', // 未实现
      okButtonProps,
      cancelButtonProps,
      zIndex: 1000,
      footer: $.node('div', cancelBtn + okBtn, MODAL_FOOTER_WRAP_CLASS)
    };

    this.props = extend({}, defaultProps, props);
    this.super();
  }

  $.inherit(Component, Modal);

  extend(Modal.prototype, {
    render () {
      const { 
        title, closable, bodyContent, footer, bodyStyle, centered, style, wrapClassName, zIndex, defaultVisible
      } = this.props;

      let closeDOM = '';
      if (closable) {
        const closeIcon = (new Icon('close', { size: 20 })).html;
        closeDOM = $.node('div', closeIcon, MODAL_CLOSE_ICON_CLASS);
        this.isModalClosable = true;
      }
      
      let titleDOM = '';
      if (title && title !== '') {
        const titleWrap = $.node('div', title + closeDOM, MODAL_HEADER_WRAP_CLASS);
        titleDOM = $.node('div', titleWrap, MODAL_HEADER_CONTAINER_CLASS);
      }
      
      const bodyContentDOM = $.node('div', bodyContent, MODAL_BODY_CLASS, bodyStyle ? { style: bodyStyle } : null);

      let footerDOM = '';
      if (isString(footer) && footer !== '') {
        footerDOM = $.node('div', footer, MODAL_FOOTER_CONTAINER_CLASS);
      }

      const RANDOM_CLASS = getRandomClassName();
      this.RANDOM_CLASS = RANDOM_CLASS;
      const klass = appendClass(
        MODAL_CONTAINER_CLASS, 
        centered ? MODAL_CONTAINER_CENTERED_CLASS : '',
        wrapClassName ? wrapClassName : '',
        RANDOM_CLASS,
        defaultVisible ? '' : MODAL_CONTAINER_INVISIBLE_CLASS
      );
      
      const html = $.node('div', titleDOM + bodyContentDOM + footerDOM, klass, {
        style: extend(isObject(style) ? style : {}, { zIndex })
      });

      return [{
        html: this.handleMask(html),
        container: 'body',
        type: 'append'
      }];
    },

    componentDidMount () {
      const { isIncludeMask, isModalClosable } = this;

      if (isIncludeMask) {
        this.$mask = $(toSelector(`${this.RANDOM_CLASS}_mask`));
      }
      this.$container = $(toSelector(this.RANDOM_CLASS));
      this.$cancelBtn = this.$container.find(toSelector(MODAL_FOOTER_CANCEL_BTN_CLASS));
      this.$okBtn = this.$container.find(toSelector(MODAL_FOOTER_OK_BTN_CLASS));

      isModalClosable && ( this.$modalCloseBtn = this.$container.find(toSelector(MODAL_CLOSE_ICON_CLASS)) );
    },

    bindEvents () {
      const { 
        isModalClosable, $modalCloseBtn, $cancelBtn, $okBtn,
        props: { afterClose, onCancel, onOk, keyboard }
      } = this;

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

      const closeModalHandler = function (e) {
        const { key } = e;
        
        if (isUndefined(key) || (key.toLowerCase() === 'escape' && __this__.visible === true)) {
          __this__.visible = false;

          const $this = $(this);
          if ($this.hasClass(MODAL_FOOTER_CANCEL_BTN_CLASS)) {
            isFunction(onCancel) && onCancel.call(__this__);
          } else if ($this.hasClass(MODAL_FOOTER_OK_BTN_CLASS)) {
            isFunction(onOk) && onOk.call(__this__);
          }

          isFunction(afterClose) && afterClose.call(__this__);
        }
      }

      if (isModalClosable) {
        $modalCloseBtn.on('click', closeModalHandler);
      }
      
      if (keyboard) {
        $(document).keyup(closeModalHandler);
      }

      $cancelBtn.on('click', closeModalHandler);
      $okBtn.on('click', closeModalHandler);
    },

    show () {
      const { 
        isIncludeMask, $mask, $container, $okBtn, visible,
        props: { defaultVisible }
      } = this;

      if (visible === true || defaultVisible === false) {
        $okBtn[0].focus();
        $container.removeClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.removeClass(MODAL_MASK_INVISIBLE_CLASS);
      }
    },

    hide() {
      const { 
        isIncludeMask, $mask, $container, visible,
        props: { defaultVisible }
      } = this;
      
      if (visible === false || defaultVisible === true) {
        $container.addClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.addClass(MODAL_MASK_INVISIBLE_CLASS);
      }
    },

    handleMask (dom) {
      const { maskStyle, mask, centered, defaultVisible } = this.props;

      if (!mask) return dom;

      this.isIncludeMask = true;

      const klass = appendClass(
        MODAL_MASK_CLASS,
        `${this.RANDOM_CLASS}_mask`,
        centered ? MODAL_CONTAINER_CENTERED_CLASS : '',
        defaultVisible ? '' : MODAL_MASK_INVISIBLE_CLASS
      );
      return $.node('div', dom, klass, maskStyle ? { style: maskStyle } : null);
    }
  });

  Modal.method = function(type, props) {
    if (!MODAL_TYPE_MAP.includes(type)) {
      throw new Error(`${type} is not a correct Modal type`);
    }

    const { title, content, centered, mask, zIndex, onCancel, onOk } = props;
    let { okText, cancelText } = props;

    // modal title
    const icon = new Icon(type, { size: 22 }).html;
    const titleDOM = $.node('div', icon + $.node('span', title), SPECIAL_MODAL_TITLE);

    // modal content
    const contentDOM = $.node('div', content, SPECIAL_MODAL_CONTENT);

    // modal footer
    if (MODAL_COMMON_TYPE_MAP.includes(type)) {
      cancelText = null;
      !isString(okText) && (okText = '知道了');
    }

    let wrapClassName;
    switch (type) {
      case 'info':
        wrapClassName = MODAL_INFO_CONTAINER_CLASS; break;
      case 'warn':
        wrapClassName = MODAL_WARN_CONTAINER_CLASS; break;
      case 'error':
        wrapClassName = MODAL_ERROR_CONTAINER_CLASS; break;
      case 'success':
        wrapClassName = MODAL_SUCCESS_CONTAINER_CLASS; break;
      case 'confirm':
        wrapClassName = MODAL_CONFIRM_CONTAINER_CLASS; break;
    }

    return new Modal({
      title: null,
      wrapClassName,
      defaultVisible: true,
      okText,
      cancelText,
      bodyContent: titleDOM + contentDOM,
      centered,
      mask,
      zIndex,
      onCancel,
      onOk,
      closable: false,
      keyboard: false,
    });
  };

  /**
   * Modal.info, Modal.warn, Modal.error, Modal.success, Modal.confirm
   */
  MODAL_TYPE_MAP.forEach((type) => {
    Modal[type] = function (props) {
      return Modal.method(type, props);
    }
  });

  return Modal;
});