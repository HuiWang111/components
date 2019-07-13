;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory() : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Button = factory(global);
}(this, function (global) {
  const { 
    jQuery: $,
    util: { 
      isEmpty, isFunction, isUndefined, toSelector, extend, removeKey, appendClass, getRandomClassName
    },
    ClassName: {
      DEFAULT_BTN_CLASS, GHOST_BTN_CLASS, PRIMARY_BTN_CLASS, DANGER_BTN_CLASS, DASHED_BTN_CLASS, LINK_BTN_CLASS,
      CIRCLE_BTN_CLASS, ROUND_BTN_CLASS, LARGE_BTN_CLASS, SMALL_BTN_CLASS, BLOCK_BTN_CLASS, WITHICON_BTN_CLASS,
      LOADING_BTN_CLASS,

      /* Icon */
      ICON_CLASS
    }
  } = global;

  /**
   * @description 将页面上已有的元素定义成components-button 注：必须是页面中已有的元素
   * 
   * 可以通过实例的loading属性设置button的loading状态
   */
  function Button(selector, options) {
    if ($(selector).length === 0) {
      throw new Error(`not found ${selector} elemet in Button`);
    }
    if (!isUndefined(options.size) && !['large', 'default', 'small'].includes(options.size)) {
      throw new Error(`${options.size} in not correct Button size`);
    }

    const defaultOptions = {
      type: '',
      disabled: false,
      ghost: false,
      htmlType: 'button',
      iconType: '',
      iconOptions: {},
      shape: '',
      onClick: null,
      block: false,
      size: 'default',
      className: '',
      text: ''
    }

    this.options = extend({}, defaultOptions, options);

    const RANDOM_CLASS = getRandomClassName();
    $(selector).eq(0).addClass(RANDOM_CLASS);
    this.$el = $(toSelector(RANDOM_CLASS));

    this.render();
    this.bindEvents();
    this.destroy();
  }

  extend(Button.prototype, {
    render () {
      const { 
        $el, 
        options: { type, shape, ghost, disabled, iconType, iconOptions, block, className, htmlType, size, text }
      } = this;

      let typeClass;
      switch (type) {
        case 'primary': typeClass = PRIMARY_BTN_CLASS; break;
        case 'danger': typeClass = DANGER_BTN_CLASS; break;
        case 'dashed': typeClass = DASHED_BTN_CLASS; break;
        case 'link': typeClass = LINK_BTN_CLASS; break;
      }

      let sizeClass = '';
      switch(size) {
        case 'large': sizeClass = LARGE_BTN_CLASS; break;
        case 'small': sizeClass = SMALL_BTN_CLASS; break;
      }

      let shapeClass = '';
      switch (shape) {
        case 'circle': shapeClass = CIRCLE_BTN_CLASS; break;
        case 'round': shapeClass = ROUND_BTN_CLASS; break;
      }

      const children = $el[0].childNodes;
      if (children.length === 1 && children[0].nodeType === 3) {
        const span = $.node('span', children[0].nodeValue);
        $el.html(span);
      } else if (children.length === 0 && !isEmpty(text)) {
        const span = $.node('span', text);
        $el.html(span);
      }

      let iconSize = 16;
        switch(size) {
          case 'large': iconSize = 18; break;
          case 'small': iconSize = 14; break;
        }
        this.iconSize = iconSize;
      
      if (!isEmpty(iconType)) {
        extend(iconOptions, { size: iconSize });

        const icon = new Icon(iconType, iconOptions);
        $el.prepend(icon.html);

        this.icon = icon.html;
      }

      $el.addClass(appendClass(
        DEFAULT_BTN_CLASS,
        typeClass,
        ghost ? GHOST_BTN_CLASS : '',
        shapeClass,
        block ? BLOCK_BTN_CLASS : '',
        isEmpty(className) ? '' : className,
        sizeClass,
        !isEmpty(iconType) ? WITHICON_BTN_CLASS : ''
      ));

      disabled && $el.attr('disabled', 'disabled');

      $el.attr('type', htmlType);
    },

    bindEvents() {
      const { $el, options: { onClick } } = this;
      const __this__ = this;
      isFunction(onClick) && $el.on('click', function () {
        onClick.call(__this__);
      });

      // loading
      this.loading = false;
      new Observer(this, 'loading', {
        set (newValue) {
          if (newValue) {
            __this__.setLoading();
          } else {
            __this__.removeLoading();
          }
        }
      });
    },

    setLoading () {
      const { $el, icon, iconSize } = this;
      let { loadingIcon } = this;
      
      if (isEmpty(loadingIcon)) {
        loadingIcon = (
          new Icon('loading', { size: iconSize, spin: true })
        ).html;
        this.loadingIcon = loadingIcon;
      }

      if (isEmpty(icon)) {
        $el.addClass(appendClass(WITHICON_BTN_CLASS, LOADING_BTN_CLASS));
        $el.prepend(loadingIcon);
      } else {
        $el.addClass(LOADING_BTN_CLASS);
        $el.children(toSelector(ICON_CLASS)).replaceWith(loadingIcon);
      }
    },

    removeLoading () {
      const { $el, icon } = this;
      if (isEmpty(icon)) {
        $el.removeClass(appendClass(WITHICON_BTN_CLASS, LOADING_BTN_CLASS));
        $el.children(toSelector(ICON_CLASS)).remove();
      } else {
        $el.removeClass(LOADING_BTN_CLASS);
        $(toSelector(ICON_CLASS)).replaceWith(icon);
      }
    },

    destroy () {
      removeKey(this, 'options');
    }
  });

  return Button;
});