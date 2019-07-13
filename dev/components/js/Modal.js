;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Modal = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isString, isObject, isFunction, isUndefined, isNull, toSelector, extend,
      removeUndef, appendClass, getRandomClassName
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

  /**
   * @param options = {
   *   bodyStyle: Object,
   *   defaultVisible: Boolen,
   *   cancelText: String,
   *   centered: Boolen,
   *   centered: Boolen,
   *   closable: Boolen,
   *   footer: DOMElement,
   *   keyboard: Boolen,
   *   mask: Boolen,
   *   maskStyle: Object,
   *   okText: String,
   *   okType: String,
   *   okButtonProps: Object,
   *   cancelButtonProps: Object,
   *   style: Object,
   *   title: String,
   *   wrapClassName: String,
   *   zIndex: Number,
   *   bodyContent: String,
   *   afterClose: Function,
   *   onCancel: Function,
   *   onOk: Function
   * }
   */

  function Modal(options) {
    removeUndef(options);

    // 默认 footer
    const cancelText = isUndefined(options.cancelText) ? '取消': options.cancelText;
    const cancelButtonProps = {};
    const cancelButtonClass = appendClass(
      DEFAULT_BTN_CLASS,
      MODAL_FOOTER_CANCEL_BTN_CLASS
    );

    const okText = isUndefined(options.okText) ? '确认' : options.okText;
    const okButtonProps = {};
    const okButtonClass = appendClass(
      DEFAULT_BTN_CLASS,
      PRIMARY_BTN_CLASS,
      MODAL_FOOTER_OK_BTN_CLASS
    );
    
    const cancelBtn = isNull(cancelText) ? '' : $.node('button', cancelText, cancelButtonClass, cancelButtonProps);
    const okBtn = isNull(okText) ? '' : $.node('button', okText, okButtonClass, okButtonProps);

    const defaultOptions = {
      bodyStyle: {},
      defaultVisible: false,
      cancelText,
      centered: false,
      closable: false,
      keyboard: true, // 未实现
      mask: true,
      maskStyle: {},
      okText,
      okType: 'primary', // 未实现
      okButtonProps,
      cancelButtonProps,
      style: {},
      title: '',
      wrapClassName: '',
      zIndex: 1000,
      bodyContent: '',
      footer: $.node('div', cancelBtn + okBtn, MODAL_FOOTER_WRAP_CLASS),
      onCancel: null,
      afterClose: null,
      onOk: null
    };

    this.options = extend({}, defaultOptions, options);
    this.super();
  }

  $.inherit(Component, Modal);

  extend(Modal.prototype, {
    render () {
      const { 
        title, closable, bodyContent, footer, bodyStyle, centered, style, wrapClassName, zIndex, defaultVisible
      } = this.options;

      let closeDOM = '';
      if (closable) {
        const closeIcon = (new Icon('close', { size: 20 })).html;
        closeDOM = $.node('div', closeIcon, MODAL_CLOSE_ICON_CLASS);
        this.isModalClosable = true;
      }
      
      let titleDOM = '';
      if (isString(title) && title !== '') {
        const titleWrap = $.node('div', title + closeDOM, MODAL_HEADER_WRAP_CLASS);
        titleDOM = $.node('div', titleWrap, MODAL_HEADER_CONTAINER_CLASS);
      }

      const bodyContentDOM = $.node('div', bodyContent, MODAL_BODY_CLASS, {
        style: isObject(bodyStyle) ? bodyStyle : {}
      });

      let footerDOM = '';
      if (isString(footer) && footer !== '') {
        footerDOM = $.node('div', footer, MODAL_FOOTER_CONTAINER_CLASS);
      }

      const RANDOM_CLASS = getRandomClassName();
      this.RANDOM_CLASS = RANDOM_CLASS;
      const klass = appendClass(
        MODAL_CONTAINER_CLASS, 
        centered ? MODAL_CONTAINER_CENTERED_CLASS : '',
        isString(wrapClassName) ? wrapClassName : '',
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
        options: { afterClose, onCancel, onOk, keyboard }
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
            isFunction(onCancel) && onCancel();
          } else if ($this.hasClass(MODAL_FOOTER_OK_BTN_CLASS)) {
            isFunction(onOk) && onOk();
          }

          isFunction(afterClose) && afterClose();
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
        options: { defaultVisible }
      } = this;

      if (visible === false || defaultVisible === false) {
        $okBtn[0].focus();
        $container.removeClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.removeClass(MODAL_MASK_INVISIBLE_CLASS);
      }
    },

    hide() {
      const { 
        isIncludeMask, $mask, $container, visible,
        options: { defaultVisible }
      } = this;

      if (visible === true || defaultVisible === true) {
        $container.addClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.addClass(MODAL_MASK_INVISIBLE_CLASS);
      }
    },

    handleMask (dom) {
      const { maskStyle, mask, centered, defaultVisible } = this.options;

      if (!mask) return dom;

      this.isIncludeMask = true;

      const klass = appendClass(
        MODAL_MASK_CLASS,
        `${this.RANDOM_CLASS}_mask`,
        centered ? MODAL_CONTAINER_CENTERED_CLASS : '',
        defaultVisible ? '' : MODAL_MASK_INVISIBLE_CLASS
      );
      return $.node('div', dom, klass, {
        style: isObject(maskStyle) ? maskStyle : {}
      });
    }
  });

  Modal.method = function(type, options) {
    if (!MODAL_TYPE_MAP.includes(type)) {
      throw new Error(`${type} is not a correct Modal type`);
    }

    const { title, content, centered, mask, zIndex, onCancel, onOk } = options;
    let { okText, cancelText } = options;

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
    Modal[type] = function (options) {
      return Modal.method(type, options);
    }
  });

  return Modal;
});