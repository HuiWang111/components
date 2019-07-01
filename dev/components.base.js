;!function (win, $, Swiper, Component, Util) {

  /* utils */
  const {
    isString,
    isObject,
    isObjectLike,
    isEmpty,
    isFunction,
    isNumber,
    isNumeric,
    isDom,
    isUndefined,
    isNull,
    isNil,
    isArray,
    toSelector,
    appendStyle,
    insertElementToBody,
    domAfterLoad,
    tagOf,
    remove,
    uniq,
    ins,
    makeArray,
    findKey,
    removeKey,
    removeKeys,
    dateFormater,
    buildRandomString,
    toNumber,
    SetMock,
    appendClass,
    getRandomClassName
  } = Util;
  
  /* svg */
  const getPrevSvg = (color) => {
    const fill = isString(color) ? ` fill="${color}"` : '';
    return `<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"${fill}></path></svg>`;
  }
  const getNextSvg = (color) => {
    const fill = isString(color) ? ` fill="${color}"` : ``;
    return `<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"${fill}></path></svg>`;
  }
  const getWarnSvg = (color = '#faad14') => {
    color = String(color);
    return `<svg t="1560646481235" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1083" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M560 528C560 554.496 538.624 576 512 576l0 0C485.568 576 464 554.496 464 528l0-224C464 277.44 485.568 256 512 256l0 0c26.624 0 48 21.44 48 48L560 528zM560 720c0-26.496-21.376-48-48-48-26.432 0-48 21.504-48 48S485.568 768 512 768C538.624 768 560 746.496 560 720zM512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 896.768c-212.48 0-384.768-172.224-384.768-384.768S299.52 127.232 512 127.232 896.64 299.52 896.64 512 724.48 896.768 512 896.768z" fill="${color}" p-id="1084"></path></svg>`;
  }
  const getWarnFilledSvg = (color = '#faad14') => {
    color = String(color);
    return `<svg t="1560646462555" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 768c-26.432 0-48-21.504-48-48S485.568 672 512 672c26.624 0 48 21.504 48 48S538.624 768 512 768zM560 528C560 554.56 538.624 576 512 576 485.568 576 464 554.56 464 528l0-224C464 277.44 485.568 256 512 256c26.624 0 48 21.44 48 48L560 528z" fill="${color}" p-id="968"></path></svg>`;
  }
  const getSuccessSvg = (color = '#52c41a') => {
    color = String(color);
    return `<svg t="1560648151229" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1026" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M530.305 957.452C283.818 968.12 75.361 776.97 64.692 530.483c-10.67-246.476 180.486-454.93 426.953-465.6 246.489-10.67 454.924 180.484 465.614 426.959 10.668 246.465-180.486 454.94-426.954 465.61z m-36.63-845.591c-220.526 9.553-391.56 196.061-382.007 416.584 9.553 220.532 196.064 391.564 416.608 382.03 220.528-9.574 391.56-196.06 382.004-416.604-9.551-220.523-196.06-391.554-416.606-382.01z m-14.687 582.005v0.022l-21.602 21.925c-5.964 6.066-15.742 6.188-21.846 0.264l-22.069-21.44v-0.02L278.34 543.941c-6.085-5.922-6.206-15.628-0.243-21.682l21.602-21.947c5.963-6.065 15.76-6.167 21.845-0.254L445.6 640.035l248.374-273.088c5.966-6.065 15.74-6.165 21.847-0.253l22.067 21.43c6.107 5.923 6.208 15.628 0.245 21.693l-259.145 284.05z" fill="${color}" p-id="1027"></path></svg>`;
  }
  const getSuccessFilledSvg = (color = '#52c41a') => {
    color = String(color);
    return `<svg t="1560648134097" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="904" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.998465 66.320475c-245.76131 0-444.98777 199.22646-444.98777 444.98777 0 245.750053 199.22646 444.979584 444.98777 444.979584 245.762333 0 444.988794-199.228507 444.988794-444.979584C956.987259 265.546935 757.760798 66.320475 511.998465 66.320475L511.998465 66.320475zM787.323091 400.624377l-298.918997 298.907741c-2.929726 2.932796-8.197706 7.458879-8.197706 7.458879s-4.611018 5.345752-7.54279 8.277524l-15.727193 15.72617c-8.689916 8.689916-22.774703 8.689916-31.467689 0L236.678956 542.207999c-8.691963-8.689916-8.691963-22.774703 0-31.457456l15.730263-15.730263c8.692986-8.686846 22.775726-8.686846 31.466666 0l157.325142 157.319002L740.127186 353.422332c8.686846-8.68173 22.775726-8.68173 31.462572 0l15.732309 15.739473C796.011984 377.844557 796.011984 391.935484 787.323091 400.624377L787.323091 400.624377zM787.323091 400.624377" fill="${color}" p-id="905"></path></svg>`;
  }
  const getErrorSvg = (color = '#f5222d') => {
    color = String(color);
    return `<svg t="1560649076559" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1387" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z" fill="#f5222d" p-id="1388"></path><path d="M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z" fill="${color}" p-id="1389"></path></svg>`;
  }
  const getErrorFilledSvg = (color = '#f5222d') => {
    color = String(color);
    return `<svg t="1560649069618" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1265" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462 0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102 447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499 12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997 9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924 0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z" fill="${color}" p-id="1266"></path></svg>`;
  }
  const getInfoSvg = (color = '#1890ff') => {
    color = String(color);
    return `<svg t="1560649574256" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1632" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480S674.752 832 480 832A351.552 351.552 0 0 1 128 480C128 285.248 285.248 128 480 128zM448 256v64h64V256z m0 128v320h64V384z" fill="${color}" p-id="1633"></path></svg>`;
  }
  const getInfoFilledSvg = (color = '#1890ff') => {
    color = String(color);
    return `<svg t="1560649562228" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512s190.933333 426.666667 426.666667 426.666667 426.666667-190.933333 426.666667-426.666667S747.733333 85.333333 512 85.333333z m42.666667 640h-85.333334V469.333333h85.333334v256z m0-341.333333h-85.333334v-85.333333h85.333334v85.333333z" fill="${color}" p-id="1511"></path></svg>`;
  }
  const getCloseSvg = (color) => {
    color = String(color);
    return `<svg t="1560650069724" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="936" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" fill="${color}" p-id="937"></path></svg>`;
  }
  const getLoadingSvg = (color) => {
    color = String(color);
    return `<svg t="1561267146231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2830" width="200" height="200"><path d="M980.752 313.697c-25.789-60.972-62.702-115.725-109.713-162.736-47.012-47.011-101.764-83.924-162.736-109.713C645.161 14.542 578.106 1 509 1c-2.242 0-4.48 0.015-6.715 0.043-16.567 0.211-29.826 13.812-29.615 30.38 0.209 16.438 13.599 29.618 29.99 29.618l0.39-0.002c1.98-0.026 3.963-0.039 5.95-0.039 61.033 0 120.224 11.947 175.93 35.508 53.82 22.764 102.162 55.359 143.683 96.879s74.115 89.862 96.88 143.683C949.054 392.776 961 451.967 961 513c0 16.568 13.432 30 30 30s30-13.432 30-30c0-69.106-13.541-136.162-40.248-199.303z" p-id="2831" fill="${color}"></path></svg>`;
  }

  const prevSvg = getPrevSvg();
  const nextSvg = getNextSvg();
  const disableColor = '#ccc';
  const prevSvgDisable = getPrevSvg(disableColor);
  const nextSvgDisable = getNextSvg(disableColor);
  
  /* 全局缓存区 */
  const GlobalCache = {};
  
  /* ========Components======== */

  /**
   * @description Icon
   * @param options = {
   *    size: Number | String,
   *    className: String,
   *    theme: 'wireframe' | 'filled',
   *    color: String,
   *    spin: Boolen
   * }
   */

  const iconTypes = ['warn', 'success', 'info', 'error', 'close', 'loading'];
  const themes = ['outline', 'filled'];

  const ICON_CLASS = 'cpts-icon',
        FILLED_CLASS = 'cpts-icon-filled',
        WARNING_ICON_CLASS = 'cpts-warn-icon',
        SUCCESS_ICON_CLASS = 'cpts-success-icon',
        INFO_ICON_CLASS = 'cpts-info-icon',
        ERROR_ICON_CLASS = 'cpts-error-icon',
        CLOSE_ICON_CLASS = 'cpts-close-icon',
        SPIN_ICON_CLASS = 'cpts-spin-icon',
        LOADING_ICON_CLASS = 'cpts-loading-icon';

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
      case 'close': defaultSize = 16;break;
    }

    const defaultOptions = {
      size: defaultSize,
      className: '',
      color: '#cccccc',
      theme: 'outline',
      spin: false
    }

    this.options = Object.assign({}, defaultOptions, options);
    
    this.type = type;
    this.html = this.render();
    this.destroy();
  }

  win.Icon = Icon;

  Object.assign(Icon.prototype, {
    render () {
      const { type, options: { size, className, theme, color, spin } } = this;
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
        isDefaultTheme ? '' : FILLED_CLASS,
        spin ? SPIN_ICON_CLASS : ''
      );

      const icon = $.node('i', svg, klass, {
        style: {
          width: isNumber(size) ? `${size}px` : size,
          height: isNumber(size) ? `${size}px` : size
        }
      });

      return icon;
    },

    destroy () {
      removeKey(this, 'options');
    }
  });

  const DEFAULT_BTN_CLASS = 'cpts-btn',
        GHOST_BTN_CLASS = 'cpts-ghost-btn',
        PRIMARY_BTN_CLASS = 'cpts-primary-btn',
        DANGER_BTN_CLASS = 'cpts-danger-btn',
        DASHED_BTN_CLASS = 'cpts-dashed-btn',
        LINK_BTN_CLASS = 'cpts-link-btn',
        CIRCLE_BTN_CLASS = 'cpts-circle-btn',
        ROUND_BTN_CLASS = 'cpts-round-btn',
        LARGE_BTN_CLASS = 'cpts-large-btn',
        SMALL_BTN_CLASS = 'cpts-small-btn',
        BLOCK_BTN_CLASS = 'cpts-block-btn',
        WITHICON_BTN_CLASS = 'cpts-with-icon-btn',
        LOADING_BTN_CLASS = 'cpts-loading-btn';
  /**
   * @description 将页面上已有的元素定义成components-button 注：必须是页面中已有的元素
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

    this.options = Object.assign({}, defaultOptions, options);

    const RANDOM_CLASS = getRandomClassName();
    $(selector).eq(0).addClass(RANDOM_CLASS);
    this.$el = $(toSelector(RANDOM_CLASS));

    this.render();
    this.bindEvents();
    this.destroy();
  }

  win.Button = Button;

  Object.assign(Button.prototype, {
    render () {
      const { $el, options: { type, shape, ghost, disabled, iconType, iconOptions, block, className, htmlType, size, text } } = this;

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
        Object.assign(iconOptions, { size: iconSize });

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
      const _this = this;
      isFunction(onClick) && $el.on('click', function () {
        onClick.call(_this);
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
  
  /* Tabs组件 */
  ;!function (win, $, Component) {
  
    //className
    const TAB_ITEM_CLASS = 'cpts-tabs-tab-item',
          TAB_ITEM_CLASS_ACTIVE = 'cpts-tabs-tab-item-active',
          TAB_ITEM_CARD_CLASS = 'cpts-tabs-tab-card-item',
          TAB_ITEM_WRAP_CLASS = 'cpts-tabs-tab-wrapper',
          TAB_ITEM_INNER_CLASS = 'cpts-tabs-tab-inner',
          TAB_ITEM_CARD_INNER_CALSS = 'cpts-tabs-tab-card-inner',
          TAB_ITEM_CONTAINER_CLASS = 'cpts-tabs-tab-container',
          TAB_ITEM_CONTAINER_WITH_ARROW_CLASS = 'cpts-tabs-tab-with-arrow-container',
  
          PANE_ITEM_CLASS = 'cpts-tabs-pane-item',
          PANE_ITEM_CLASS_ACTIVE = 'cpts-tabs-pane-item-active',
          PANE_ITEM_WRAP_CLASS = 'cpts-tabs-pane-wrapper',
  
          TAB_ARROW_CLASS = 'cpts-tabs-arrow',
          TAB_ARROW_CLASS_DISABLE = 'cpts-tabs-arrow-disable',
          TAB_ARROW_CLASS_INVISIBLE = 'cpts-tabs-arrow-invisible',
          TAB_PREVIOUS_ARROW_CLASS = 'cpts-tabs-prev-arrow',
          TAB_NEXT_ARROW_CLASS = 'cpts-tabs-next-arrow',

          TAB_CONTAINER_CLASS = 'cpts-tabs-container',
  
          UNDERLINE_CLASS = 'cpts-tabs-underline';

      const TAB_ITEM_GAP = 32;
    
    /**
     *  @param options: {
     *    type: 'line' | 'card', // default is 'line' 
     *    tabPanes: Array, // => [{tab: String, key: String, forceRender: Boolen}]
     *    defaultKey: String,
     *    editab;e: Boolen, // 仅type='card'时有效
     *    onChange: Function(index),
     *    renderPaneItem: Function(tabName, index)
     *  }
     * 
     *  bug:
     *  type为card时的active tab下方应该没有下划线，有待优化
     *  在关闭一个tab后切换tab时pane会出现位置错乱，有待优化
     * 
     *  instance methods:
     *  changeTo(index); // index从1开始
     */
    function Tabs(selector, options) {

      this.$container = $(selector);
      if (this.$container.length < 1) throw new Error(`not found ${selector} Element`);

      const { type } = options;
      if (!isUndefined(type) && !['line', 'card'].includes(type)) {
        throw new Error(`${type} is not a correct tabs type`);
      }
  
      //default
      const defaultKey = options.tabPanes[0].key;
      const defaultOptions = {
        type: 'line',
        tabPanes: [],
        defaultKey,
        editable: false,
        onChange: null,
        renderPaneItem: null
      };
  
      this.options = Object.assign({}, defaultOptions, options);
      this.super();
    };
  
    $.inherit(Component, Tabs);
  
    win.Tabs = Tabs;
  
    Object.assign(Tabs.prototype, {
      render () {
        const { $container, options: { tabPanes, renderPaneItem, defaultKey, type, editable } } = this;
  
        let tabsDOM = '', panesDOM = '', isDefaultFirst = false, isDefaultLast = false;
        const unRenderPanes = {}, isRenderedRecords = {}, panesCount = tabPanes.length;
        const isEditableCard = type === 'card' && editable;
  
        tabPanes.forEach((pane, index) => {
          const { tab, key } = pane;
          let { forceRender } = pane;

          isNil(forceRender) && (forceRender = true);

          const isActive = key === defaultKey;

          if (isActive && index === 0) isDefaultFirst = true;
          if (isActive && index === panesCount) isDefaultLast = true;
          
          // tab
          const klass = appendClass(
            TAB_ITEM_CLASS,
            isActive ? TAB_ITEM_CLASS_ACTIVE : '',
            type === 'card' ? TAB_ITEM_CARD_CLASS : ''
          );
          const closeIcon = isEditableCard ? (
            (new Icon('close')).html
          ) : '';

          let tabDOM = $.node('div', tab + closeIcon, klass);
          tabsDOM += tabDOM;
          
          // pane
          const paneClass = appendClass(
            PANE_ITEM_CLASS,
            isActive ? PANE_ITEM_CLASS_ACTIVE : ''
          );

          const paneInner = isFunction(renderPaneItem) ? renderPaneItem(tab, key) : '';

          let paneDOM;
          if (forceRender || isActive) {
            paneDOM = $.node('div', paneInner, paneClass);
            isRenderedRecords[key] = true;
          } else {
            paneDOM = $.node('div', '', paneClass);
            unRenderPanes[key] = paneInner;
            isRenderedRecords[key] = false;
          }
          
          panesDOM += paneDOM;
        });
        
        const underlineDOM = $.node('div', '', UNDERLINE_CLASS);
    
        const tabsInnerDOM = $.node('div', tabsDOM + underlineDOM, appendClass(
          TAB_ITEM_INNER_CLASS,
          type === 'card' ? TAB_ITEM_CARD_INNER_CALSS : ''
        ));
        const tabsWrapDOM = $.node('div', tabsInnerDOM, TAB_ITEM_WRAP_CLASS);
    
        const prevDOM = $.node('div', prevSvgDisable, appendClass(
          TAB_PREVIOUS_ARROW_CLASS,
          TAB_ARROW_CLASS,
          isDefaultFirst ? TAB_ARROW_CLASS_DISABLE : '',
          TAB_ARROW_CLASS_INVISIBLE
        ));
        const nextDOM = $.node('div', nextSvg, appendClass(
          TAB_NEXT_ARROW_CLASS,
          TAB_ARROW_CLASS,
          isDefaultLast ? TAB_ARROW_CLASS_DISABLE : '',
          TAB_ARROW_CLASS_INVISIBLE
        ));

        const tabsContainerDOM = $.node('div', [prevDOM, tabsWrapDOM, nextDOM], appendClass(
          TAB_ITEM_CONTAINER_CLASS
        ));

        const panesWrapDOM = $.node('div', panesDOM, PANE_ITEM_WRAP_CLASS);

        this.unRenderPanes = unRenderPanes;
        this.isRenderedRecords = isRenderedRecords;
        
        return [{
          html: $.node('div', [tabsContainerDOM, panesWrapDOM], TAB_CONTAINER_CLASS),
          container: $container
        }];
      },

      componentDidMount () {
        const { $container, options: { tabPanes } } = this;

        // tab
        this.$tabContainer = $container.find(toSelector(TAB_ITEM_CONTAINER_CLASS));
        this.$tabWrap = this.$tabContainer.find(toSelector(TAB_ITEM_WRAP_CLASS));
        this.$tabInner = this.$tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
        this.$tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
        this.$underline = this.$tabWrap.find(toSelector(UNDERLINE_CLASS));
        this.$arrow = $container.find(toSelector(TAB_ARROW_CLASS));

        // pane
        this.$paneWrap = $container.find(toSelector(PANE_ITEM_WRAP_CLASS));
        this.$panes = this.$paneWrap.find(toSelector(PANE_ITEM_CLASS));

        // attr
        this.containerWidth = $container.width();
        this.tabItemsWidthList = this.$tabItems.map((_, tabItem) => {
          return $(tabItem).outerWidth();
        });

        this.tabCount = tabPanes.length;
      },
  
      style () {

        const { containerWidth, $panes } = this;
        
        $panes.width(containerWidth + 'px');
        this.setPaneWrapWidth();
      },
  
      bindEvents () {
        const { $tabItems, $panes, options: { editable } } = this;
  
        this.setUnderLineWidth(0);

        this.checkArrowVisibleStatus();
        
        const __this__ = this;

        //click tab item
        const { options: { type } } = this;

        $tabItems.on('click', function() {
          const $this = $(this);
          if ( !$this.hasClass(TAB_ITEM_CLASS_ACTIVE) ) {
            const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
            const current = $tabItems.indexOf($active);
            const index = $tabItems.indexOf($this);
  
            __this__.handleTabChange(current, index);
          }
        });

        // close tab item by closeIcon
        const isEditableCard = type === 'card' && editable;
        isEditableCard && $tabItems.children(toSelector(CLOSE_ICON_CLASS)).on('click', function () {
          const $tabItem = $(this).parent();
          const current = $tabItems.indexOf($tabItem);
          const currentIsActive = $tabItem.hasClass(TAB_ITEM_CLASS_ACTIVE);

          const $nextItems = $tabItem.next();
          const $prevItems = $tabItem.prev();

          $tabItem.remove();
          $panes.eq(current).remove();

          if (currentIsActive) {
            if ($nextItems.length > 0) {
              __this__.handleTabChange(null, current, true);
            } else if ($prevItems.length > 0) {
              __this__.handleTabChange(null, current - 1, true);
            }
          }

          __this__.setPaneWrapWidth('sub');
          __this__.checkArrowVisibleStatus();
        });
      },
      
      /**
       * @description index从1开始
       */
      changeTo (index) {
        const { $tabItems } = this;
        const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
        const current = $tabItems.indexOf($active);
        
        this.handleTabChange(current, index - 1);

        /* 计算当前active基于父元素的left值 */
        const activeOffsetLeft = $tabItems.reduce((value, item, i) => {
          return value + ( i < (index - 1) ? $(item).outerWidth() : 0 )
        }, 0);
        $tabItems.parent().translateX(-activeOffsetLeft);
      },

      setUnderLineWidth (activeIndex) {
        const { $underline, tabItemsWidthList } = this;
        $underline.width(`${tabItemsWidthList[activeIndex]}px`);
      },

      /**
       * @action 'add' | 'sub' 表示增加或者减少tab
       */
      setPaneWrapWidth (action) {
        const { $paneWrap, containerWidth } = this;

        if (action === 'add') {
          this.tabCount++;
        } else if (action === 'sub') {
          this.tabCount--;
        }
        $paneWrap.width(containerWidth * this.tabCount + 'px');
      },

      checkArrowVisibleStatus () {
        const { $arrow, $tabWrap, $tabInner, $tabContainer } = this;

        let wrapWidth = $tabWrap.width();
        const innerWidth = $tabInner.outerWidth();
        if (innerWidth > wrapWidth) { // 显示tab左右切换箭头
          $arrow.hasClass(TAB_ARROW_CLASS_INVISIBLE) && $arrow.removeClass(TAB_ARROW_CLASS_INVISIBLE);
          !$tabContainer.hasClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS) && $tabContainer.addClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS);

          wrapWidth = $tabWrap.width();
          this.bindArrowEvent(wrapWidth, innerWidth); // 绑定事件
        } else { // 隐藏左右切换箭头
          !$arrow.hasClass(TAB_ARROW_CLASS_INVISIBLE) && $arrow.addClass(TAB_ARROW_CLASS_INVISIBLE);
          $tabContainer.hasClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS) && $tabContainer.removeClass(TAB_ITEM_CONTAINER_WITH_ARROW_CLASS);
        }
      },

      bindArrowEvent (wrapWidth, innerWidth) {
        const { $arrow, $tabInner } = this;
        let isMoving = false;
        const $next = $arrow.filter(toSelector(TAB_NEXT_ARROW_CLASS));
        const $prev = $arrow.filter(toSelector(TAB_PREVIOUS_ARROW_CLASS));
        let prevDistance = 0, nextDistance = innerWidth - wrapWidth;

        $next.off();
        $next.on('click', function () {
          const $this = $(this);

          if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE) && !isMoving) {
            isMoving = true;

            const innerWidth = $tabInner.outerWidth();
            const translateXValue = $tabInner.translateX();
            nextDistance = innerWidth - wrapWidth - Math.abs(translateXValue);

            $tabInner.translateX(() => {
              const distance = nextDistance < wrapWidth ? nextDistance : wrapWidth;
              prevDistance += distance;
              nextDistance -= distance;
              return translateXValue - distance;
            });

            if (nextDistance === 0) {
              $this.addClass(TAB_ARROW_CLASS_DISABLE);
              $this.html(nextSvgDisable);
            }
            
            if ($prev.hasClass(TAB_ARROW_CLASS_DISABLE)) {
              $prev.removeClass(TAB_ARROW_CLASS_DISABLE)
              $prev.html(prevSvg);
            }

            setTimeout(() => { isMoving = false; }, 500);
          }
        });

        $prev.off();
        $prev.on('click', function () {
          const $this = $(this);

          if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE) && !isMoving) {
            isMoving = true;

            const translateXValue = $tabInner.translateX();
            $tabInner.translateX(() => {
              const distance = prevDistance < wrapWidth ? prevDistance : wrapWidth;
              prevDistance -= distance;
              nextDistance += distance;
              return translateXValue + distance;
            });

            if (prevDistance === 0) {
              $this.addClass(TAB_ARROW_CLASS_DISABLE);
              $this.html(prevSvgDisable);
              // 计算精度误差导致了当prevDistance为0时tabInner的translateX值不为0，为了纠正精度误差，因此强制设为0
              $tabInner.translateX(0);
            }

            if ($next.hasClass(TAB_ARROW_CLASS_DISABLE)) {
              $next.removeClass(TAB_ARROW_CLASS_DISABLE);
              $next.html(nextSvg);
            }

            setTimeout(() => { isMoving = false; }, 500);
          }
        });
      },

      /**
       * @description static为true时不会改变pane和underline的translateX值
       */
      handleTabChange (current, index, isOnClose) {
        const { unRenderPanes, isRenderedRecords, $underline, $paneWrap, $panes, containerWidth, options: { type, onChange, tabPanes } } = this;
        let { $tabItems } = this;

        if (isOnClose) {
          $tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
          this.$tabItems = $tabItems;
        }

        // change active
        !isNil(current) && $tabItems.eq(current).removeClass(TAB_ITEM_CLASS_ACTIVE);
        $tabItems.eq(index).addClass(TAB_ITEM_CLASS_ACTIVE);

        // move underline
        if (type === 'line') {
          this.setUnderLineWidth(index);
          $underline.translateX(() => {
            let i, distance = 0;
            for (i = 0; i < index; i++) {
              distance += this.tabItemsWidthList[i] + TAB_ITEM_GAP;
            }
            return distance;
          });
        }

        // change pane
        $paneWrap.translateX(-(containerWidth * index));
        !isNil(current) && $panes.eq(current).removeClass(PANE_ITEM_CLASS_ACTIVE);
        $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE);

        /* 渲染未在初始化时渲染的pane */
        if (index < tabPanes.length) {
          const { key } = tabPanes[index];
          if (!isRenderedRecords[key]) {
            $panes.eq(index).html(unRenderPanes[key]);
            isRenderedRecords[key] = true;
          }
        }

        isFunction(onChange) && onChange(index);
      },
  
      destroy () {
        removeKeys(this, 'isIncludePane, paneWidth');
      }
    });
  
  }(window, jQuery, Component)
  
  /**
   * Pagination
   */
  ;!function (win, $, Component) {
  
    //className
    var PAGINATION_ITEM_CLASS = 'cpts_pagination_item';
    var PAGINATION_ITEM_CLASS_ACTIVE = 'cpts_pagination_item_active';
    var PAGINATION_ITEM_CLASS_BORDER = 'cpts_pagination_item_border';
    // var PAGINATION_ITEM_CLASS_MORE = 'cpts_pagination_item_more';
    var PAGINATION_ITEM_CLASS_DISABLE = 'cpts_pagination_item_disable';
    var PAGINATION_ITEM_CLASS_PREV = 'cpts_pagination_item_previous';
    var PAGINATION_ITEM_CLASS_NEXT = 'cpts_pagination_item_next';
    
    /**
     *  @param options: {
     *    total: Numer,
     *    pageSize: Number,
     *    current: Number,
     *    bordered: true | false, // 页码是否需要边框
     *    onChange: Function (current),
     *    itemRender: Function (current, type, originalElement)
     *  }
     */
    function Pagination(selector, options) {
  
      //default
      const defaultOptions = {
        total: 0,
        pageSize: 10,
        current: 1,
        bordered: true,
        onChange: null,
        itemRender: null
      };
  
      const opts = Object.assign({}, defaultOptions, options);
  
      var mustBeNumber = ['total', 'pageSize', 'current'];
      for (var key in opts) {
        if (mustBeNumber.indexOf(key) > -1) {
          if (!isNumber(opts[key])) throw new Error(`${key} is not a number`);
        }
      }
  
      this.options = opts;
      this.$container = $(selector);
      if (tagOf(this.$container) !== 'ul') throw new Error(`${selector} is not a <ul> Element`);
  
      this.super();
    };
  
    $.inherit(Component, Pagination);
  
    win.Pagination = Pagination;
  
    Object.assign(Pagination.prototype, {
      render () {
        const { $container, options } = this;
        const { current, total, pageSize, itemRender, bordered } = options;
  
        const totalPage = Math.ceil(total/pageSize);
        this.totalPage = totalPage;
  
        //pagination
        let i, ulInner = '';
        for (i = 1; i <= totalPage; i++) {
          let klass = i === current ? (
            appendClass(PAGINATION_ITEM_CLASS, PAGINATION_ITEM_CLASS_ACTIVE)
          ) : PAGINATION_ITEM_CLASS;
          klass = bordered ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const originalElement = $.node('a', i);
          const element = isFunction(itemRender) ? itemRender(i, 'pagination', originalElement) : originalElement;
  
          klass = appendClass(klass, PAGINATION_ITEM_CLASS + '-' + i);
          const pagination = $.node('li', element, klass);
  
          ulInner += pagination;
        }
  
        //previous
        const previous = () => {
          let klass = current === 1 ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = bordered ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const svg = current === 1 ? prevSvgDisable : prevSvg;
          const originalElement = $.node('a', svg);
          const element = isFunction(itemRender) ? (
            itemRender(null, 'prev', originalElement)
          ) : originalElement;
          this.prevEl = element;
          this.prevOriginEl = originalElement;
  
          return $.node('li', element, appendClass(klass, PAGINATION_ITEM_CLASS_PREV));
        }
        var prevItem = previous();
  
        //next
        const next = () => {
          let klass = current === totalPage ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = bordered ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const svg = current === totalPage ? nextSvgDisable : nextSvg;
          const originalElement = $.node('a', svg);
  
          const element = isFunction(itemRender) ? (
            itemRender(null, 'next', originalElement)
          ) : originalElement;
          this.nextEl = element;
          this.nextOriginEl = originalElement;
  
          return $.node('li', element, appendClass(klass, PAGINATION_ITEM_CLASS_NEXT));
        }
        var nextItem = next();
  
        return [{
          html: prevItem + ulInner + nextItem,
          container: $container
        }];
      },
  
      bindEvents () {
  
        const Pagination = this;
        const { $container, totalPage, options } = this;
        const { onChange } = options;
  
        const $next = $container.find(toSelector(PAGINATION_ITEM_CLASS_NEXT));
        const $prev = $container.find(toSelector(PAGINATION_ITEM_CLASS_PREV));
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        this.$pagination = $pagination;
        
        GlobalCache.paginationChanging = (current, index) => {
  
          $pagination.eq(current).removeClass(PAGINATION_ITEM_CLASS_ACTIVE);
          $pagination.eq(index).addClass(PAGINATION_ITEM_CLASS_ACTIVE);
  
          index += 1; // index 转为 页码
          if ( (index !== totalPage) && ($next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.nextEl === Pagination.nextOriginEl) && $next.children('a').html(nextSvg);
            $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if ( (index === totalPage) && (!$next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.nextEl === Pagination.nextOriginEl) && $next.children('a').html(nextSvgDisable);
            $next.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if ( (index === 1) && (!$prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.prevEl === Pagination.prevOriginEl) && $prev.children('a').html(prevSvgDisable);
            $prev.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if ( (index !== 1) && ($prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.prevEl === Pagination.prevOriginEl) && $prev.children('a').html(prevSvg);
            $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
  
          isFunction(onChange) && onChange(index);
        };
  
        //click previous button
        $prev.on('click', function () {
          const $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            let current = $pagination.indexOf($active);
  
            GlobalCache.paginationChanging(current, current - 1, $pagination, onChange);
          }
        });
  
        //click next button
        $next.on('click', function () {
          const $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            let current = $pagination.indexOf($active);
  
            GlobalCache.paginationChanging(current, current + 1, $pagination, onChange);
          }
        });
  
        //click paginations
        $pagination.on('click', function () {
          const $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_ACTIVE)) {
            const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            const current = $pagination.indexOf($active);
            const index = $pagination.indexOf($this);
  
            if (current !== index) {
              GlobalCache.paginationChanging(current, index, $pagination, onChange);
            }
          }
        });
      },
  
      /**
       * @param { Number } index 页码，从1开始
       */
      changeTo (index) {
        const { $pagination, options } = this;
        const { onChange } = options;
        const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
        const current = $pagination.indexOf($active);
        if (current !== index) {
          GlobalCache.paginationChanging(current, index - 1, $pagination, onChange);
        }
      },
  
      destroy () {
        removeKeys(this, 'nextEl, nextOriginEl, prevEl, prevOriginEl, totalPage');
      }
    });
  
  }(window, jQuery, Component)
  
  /**
   * Message
   */
  ;!function (win, $) {
  
    // className
    const TEXTCLASS = 'message_text_box';
    const CONTAINERCLASS = 'message_contaier';
    const ICONCLASS = 'message_icon';
  
    // default
    const defaultOptions = {
      FirstMessagePosTop: 16, //第一个message元素的top值
      GapOfMessage: 10 //多个message同时出现时，message之间的间隙
    };
    
    /**
     *  @param options: {
     *    FirstMessagePosTop: Number,
     *    GapOfMessage: Number
     *  }
     */
    var Message = function(type) {
      this.GapOfMessage = defaultOptions.GapOfMessage;
      this.FirstMessagePosTop = defaultOptions.FirstMessagePosTop;
  
      this.type = type;
  
      //为每个Message实例的容器创建一个随机className
      const RANDOM_CLASS = getRandomClassName();
      
      const classPrefix = `message_${type}_`;
      const icon = new Icon(type === 'warning' ? 'warn' : type, {
        className: ICONCLASS,
        theme: 'filled'
      });
      const text = $.node('span', '', appendClass(TEXTCLASS, `${classPrefix}text_box`));
      const container = $.node('div', icon.html + text, appendClass(CONTAINERCLASS, RANDOM_CLASS, `${classPrefix}container`));
      insertElementToBody($(container));
      
      domAfterLoad(toSelector(RANDOM_CLASS),  () => {
        this.$el = $(toSelector(RANDOM_CLASS));
        this.$text = this.$el.find(toSelector(TEXTCLASS));
      });
    };

    Object.assign(Message.prototype, {
      show (content, duration, onClose) {
        const { $el, $text, FirstMessagePosTop, GapOfMessage } = this;
        
        $el[0].style = "";
  
        let time;
        if (isFunction(duration)) { // 当第二个参数为函数时，将函数赋值给onClose, 显示时间使用默认
          onClose = duration; 
          time = 3;
        } else {
          duration = parseFloat(duration);
          time = isNaN(duration) ? 3 : duration; // 默认显示3秒后隐藏
        }
  
        const elHeight = $el.outerHeight();
        
        setTimeout(() => {
          $text.text(content);
          $el.addClass('comedown');
  
          const index = messageList.indexOf(this);
          $el.css({
            top: `${FirstMessagePosTop + index*elHeight + index*GapOfMessage}px` // 计算当前实例top值
          });
  
          setTimeout(() => {
            this.hide(onClose);
          }, time * 1000);
        }, 0);
      },
  
      hide (onClose) {
        const { $el, $text } = this;
        
        messageList.delete(this);
  
        ($el[0].style.top !== '') && ($el[0].style.top = '');
        $el.removeClass('comedown');
        isFunction(onClose) && onClose();
        setTimeout(() => {
          $text.text('');
        }, 1000);
      }
    });
  
    const message = {};
    message.setting = function (options) {
      Object.assign(defaultOptions, options);
    };
  
    const messageList = new SetMock();
    const warningList = new SetMock();
    message.warning = function (content, duration, onClose) {
      //获取页面中隐藏的warning提示框
      const hiddenWarning = warningList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });
      
      //有隐藏的提示框就直接用该实例，否则创建新实例
      if (hiddenWarning.size > 0) {
        messageList.add(hiddenWarning[0]);
        hiddenWarning[0].show(content, duration, onClose);
      } else {
        const warning = new Message('warning');
        messageList.add(warning);
        warning.show(content, duration, onClose);
        warningList.add(warning);
      }
    };
  
    const successList = new SetMock();
    message.success = function (content, duration, onClose) {
      const hiddenSuccess = successList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });
  
      if (hiddenSuccess.size > 0) {
        messageList.add(hiddenSuccess[0]);
        hiddenSuccess[0].show(content, duration, onClose);
      } else {
        const success = new Message('success');
        messageList.add(success);
        success.show(content, duration, onClose);
        successList.add(success);
      }
    };
  
    const errorList = new SetMock();
    message.error = function (content, duration, onClose) {
      const hiddenError = errorList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });
  
      if (hiddenError.size > 0) {
        messageList.add(hiddenError[0]);
        hiddenError[0].show(content, duration, onClose);
      } else {
        const error = new Message('error');
        messageList.add(error);
        error.show(content, duration, onClose);
        errorList.add(error);
      }
    };
  
    const infoList = new SetMock();
    message.info = function (content, duration, onClose) {
      const hiddenInfo = infoList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });
  
      if (hiddenInfo.size > 0) {
        messageList.add(hiddenInfo[0]);
        hiddenInfo[0].show(content, duration, onClose);
      } else {
        const info = new Message('info');
        messageList.add(info);
        info.show(content, duration, onClose);
        infoList.add(info);
      }
    };
  
    win.message = message;
  
  }(window, jQuery)
  
  /**
   * Gallery
   */
  ;!function (win, $, Swiper, Component) {  
    
    // tools
    function isImgEl(el) {
      return tagOf(el) === 'img';
    }
  
    // className
    const GALLERY_BUTTON_NEXT_CLASS = 'gallery-swiper-button-next';
    const GALLERY_BUTTON_PREV_CLASS = 'gallery-swiper-button-prev';
    const GALLERY_PAGINATION_CLASS = 'gallery-swiper-pagination';
    const GALLERY_SWIPER_CONTAINER_CLASS = 'gallery-swiper-container';
    const GALLERY_WRAPPER_CLASS = 'gallery-wrapper';
    const GALLERY_CONTAINER_CLASS = 'gallery-contaier';
    const GALLERY_CONTAINER_CLASS_HIDDEN = 'gallery-contaier-invisible';
    
    /**
     *  @param options: {
     *    navgation: true | false, // 是否需要导航箭头
     *    pagination: true | false, // 是否需要分页器
     *    width: String | Number, // 百分比或者px, 移动端宽高通常使用默认的100%
     *    height: String | Number,
     *    bgColor: String,
     *    swiperOptions: {}
     *  }
     */
    function Gallery(selector, options) {
  
      // default
      const defaultOptions = {
        navgation: false,
        pagination: true,
        width: '100%',
        height: '100%',
        bgColor: 'transparent',
        swiperOptions: {}
      };
  
      const opts = Object.assign({}, defaultOptions, options);
      if ( (opts.width === '100%') && opts.navgation ) {
        opts.navgation = false; // 宽度100%时不使用导航箭头
      }

      this.options = opts;
      this.$source = $(selector);
  
      // 为每个实例容器创建一个随机className
      const RANDOM_CLASS = getRandomClassName();
      this.RANDOM_CLASS = RANDOM_CLASS;
  
      this.super();
  
    };

    $.inherit(Component, Gallery);
  
    win.Gallery = Gallery;
  
    Object.assign(Gallery.prototype, {
      componentWillMount () {
        // handle swiper options
        this.swiperOptionsHandler();
      },

      render: function () {
        const srcList = this.createSrcList();
        const { RANDOM_CLASS, options: { pagination, navgation } } = this;
        
        const slideList = srcList.map(function (src) {
          return $.node('div', `<img src=${src} />`, 'swiper-slide', );
        });
    
        let swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
        if (pagination) {
          swiperWrapper += $.node('div', '', appendClass(GALLERY_PAGINATION_CLASS, 'swiper-pagination'));
        }
    
        let swiperContainer = $.node('div', swiperWrapper, appendClass(GALLERY_SWIPER_CONTAINER_CLASS, 'swiper-container'));
        if (navgation) {
          const prevBtn = $.node('div', '', appendClass(GALLERY_BUTTON_PREV_CLASS, 'swiper-button-prev'));
          const nextBtn = $.node('div', '', appendClass(GALLERY_BUTTON_NEXT_CLASS, 'swiper-button-next'));
          swiperContainer += (prevBtn + nextBtn);
        }
    
        const galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
    
        const galleryContainer = $.node('section', galleryWrappper, appendClass(GALLERY_CONTAINER_CLASS, GALLERY_CONTAINER_CLASS_HIDDEN, RANDOM_CLASS));
        
        return [{
          html: galleryContainer,
          container: 'body'
        }];
      },

      componentDidMount () {
        this.$container = $(toSelector(this.RANDOM_CLASS));
      },

      style: function () {
        const maxZIndex = this.getMaxZIndex();
        let { width, height, bgColor, navgation } = this.options;
        const $container = this.$container;

        // 设置gallery元素的z-index为当前页面z-index最大值+1
        $container.css({
          'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
        });
    
        // 设置swiper容器宽高
        const containerWidth = $container.width();
        const percentReg = /%$/;
        let widthValue = percentReg.test(width) ? containerWidth*(parseFloat(width)/100) : parseFloat(width);
        
        if (widthValue > containerWidth) {
          width = '100%';
          widthValue = containerWidth;
        }
        const diff = containerWidth - widthValue;
        const wider = diff > 0 ? (diff > 100 ? 100 : wider) : 0;
        
        width = isNumber(width) ? `${width}px` : width;
        height =  isNumber(height) ? `${height}px` : height;
    
        const $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
        $galleryWrapper.css({
          'width': navgation ? (percentReg.test(width) ? `${widthValue + wider}px` : `${parseFloat(width) + wider}px`) : width,
          'height': height
        });
        $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
          'width': width,
          'height': height
        });
    
        // 设置gallery容器宽高，默认透明背景
        $container.css({
          backgroundColor: bgColor
        });
      },

      bindEvents () {
        const { RANDOM_CLASS, $container, $source, options: { swiperOptions } } = this;
    
        // 点击初始化gallery swiper
        const GALLERY = this;
        GALLERY.$swiper = null;
        $source.on('click', function () {
          const target = this;
          const index = $source.indexOf(target);
    
          if (!GALLERY.$swiper) {
            (index > 0) && (swiperOptions.initialSlide = index);
            GALLERY.$swiper = new Swiper(appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
          } else {
            GALLERY.$swiper.slideTo(index, 0, false);
          }
    
          $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
        });
    
        // 隐藏gallery容器
        const close = function () {
          $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
        }
        $container.on('click', close);
    
        const stopPropagation = function (e) {
          e.stopPropagation();
        }
        $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
      },

      createSrcList: function () {
        let eleList = Array.from(this.$source);
  
        //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
        eleList = eleList.filter(function (item) {
          const isImg = isImgEl(item);
          const $img = !isImg ? $(item).find('img') : null;
          return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
        });
  
        //生成img元素的src列表
        const srcList  = eleList.map(function (item) {
          return item.src || $(item).find('img')[0].src;
        });
    
        return srcList;
      },

      getMaxZIndex () {
        // 获取当前页面最大的z-index值
        const $hasZIndex = $('*').filter(function (_, item) {
          const zIndex = toNumber($(item).css('z-index'));
          return zIndex !== false && zIndex > 0;
        });
        const maxZIndex = $hasZIndex.length === 0 ? null : $hasZIndex.reduce(function (max, item) {
          const zIndex = parseFloat($(item).css('z-index'));
          return zIndex > max ? zIndex : max;
        }, -1000000);

        return maxZIndex;
      },
  
      swiperOptionsHandler: function () {
        const { RANDOM_CLASS, options: { swiperOptions, pagination, navgation } } = this;
    
        if (swiperOptions.pagination) delete swiperOptions.pagination;
        if (swiperOptions.nextButton) delete swiperOptions.nextButton;
        if (swiperOptions.prevButton) delete swiperOptions.prevButton;
    
        if (pagination) swiperOptions.pagination = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_PAGINATION_CLASS));
        if (navgation) {
          swiperOptions.nextButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_NEXT_CLASS));
          swiperOptions.prevButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_PREV_CLASS));
        }

        swiperOptions.observer = true;
        swiperOptions.observeParents = true;

        this.options.swiperOptions = swiperOptions;
      }
    });
  
  }(window, jQuery, Swiper, Component)

  ;!function (win, $, Component) {

    /**
     * @param options: {
     *    dataSource: Array,
     *    lineItemNumber: Number, // 每行Card的数量
     *    ratio: Number, // 宽高比
     *    border: Boolen, // 是否需要边框
     *    style: Object, // 添加到Card容器的style标签内容
     *    renderItem: Function(data) // Card内容的渲染回调，data为dataSource中的某一项
     * }
     */

    const CARD_LIST_ITEM_INNER_CLASS = 'cardList-item-inner';
    const CARD_LIST_ITEM_CLASS = 'cardList-item';

    function CardList (selector, options) {
      const defaultOptions = {
        dataSource: [],
        lineItemNumber: 3,
        ratio: 0.57,
        border: false,
        style: null,
        renderItem: null
      }

      this.options = Object.assign({}, defaultOptions, options);
      this.$container = $(selector);

      this.super();
    }

    $.inherit(Component, CardList);

    win.CardList = CardList;

    Object.assign(CardList.prototype, {
      render () {
        const { dataSource, renderItem, lineItemNumber } = this.options;
        const { $container } = this;

        const itemPercent = Math.floor(100/lineItemNumber);

        const CardItems = dataSource.map((data) => {
          const itemDom = isFunction(renderItem) ? renderItem(data) : data;
          const itemInner = $.node('div', itemDom, CARD_LIST_ITEM_INNER_CLASS);

          return $.node('div', itemInner, appendClass(CARD_LIST_ITEM_CLASS, `flex-percent-${itemPercent}`));
        });

        return [{
          html: CardItems.join(''),
          container: $container
        }];
      },

      style () {
        const { $container } = this;
        const { ratio, border } = this.options;

        $container.addClass('flex');

        const $item = $container.find(toSelector(CARD_LIST_ITEM_INNER_CLASS));
        $item.css({
          height: 0,
          paddingBottom: `${ratio * 100}%`,
          border: border ? '1px solid #eee' : 'none'
        });
      }
    });

  }(window, jQuery, Component)

  ;!function (win, $, Component) {

    /**
     * @param options = {
     *    closable: Boolen,
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

    const ALERT_MESSAGE_CLASS = 'alert_message',
          ALERT_DESCRIPTION_CLASS = 'alert_description',
          ALERT_ICON_CLASS = 'alert_icon',
          ALERT_CLOSE_ICON = 'alert_close_icon',
          ALERT_WARN_CLASS = 'alert_warn',
          ALERT_SUCCESS_CLASS = 'alert_success',
          ALERT_ERROR_CLASS = 'alert_error',
          ALERT_INFO_CLASS = 'alert_info',
          ALERT_CONTAINER_CLASS = 'alert_container',
          ALERT_WITH_ICON_CLASS = 'alert_with_icon',
          ALERT_WITH_DESC_CLASS = 'alert_with_desc',
          ALERT_WITH_CLOSE_CLASS = 'alert_with_close',
          ALERT_INVISIBLE_CLASS = 'alert_invisible',
          ALERT_SLIDEUP_CLASS = 'alert_slideUp',
          ALERT_SLIDEDOWN_CLASS = 'alert_slideDown';

    function Alert(selector, type, options) {
      if (!['warn', 'success', 'error', 'info'].includes(type)) {
        throw new Error(`${type} is not a correct Alert type`);
      }

      const defaultOptions = {
        closable: false,
        closeText: '',
        showIcon: false,
        description: '',
        message: '',
        defaultVisible: true,
        style: {},
        onClose: null,
        afterClose: null
      }

      this.options = Object.assign({}, defaultOptions, options);
      this.type = type;
      this.$container = $(selector);
      this.super();
    }

    $.inherit(Component, Alert);
    win.Alert = Alert;

    Object.assign(Alert.prototype, {
      render () {
        const { type, $container, options } = this;
        const { closable, closeText, showIcon, description, message, defaultVisible, style } = options;
        const withDesc = isString(description) && description !== '';
        const iconOptions = {};
        if (withDesc) {
          iconOptions.size = 24;
        } else {
          iconOptions.size = 14;
          iconOptions.theme = 'filled';
        }

        this.isVisible = !!defaultVisible;

        const icon = showIcon ? ( new Icon(type, Object.assign({ className: ALERT_ICON_CLASS }, iconOptions)) ).html : '';
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
        const klass = appendClass(wrapClass, RANDOM_CLASS, ALERT_CONTAINER_CLASS, showIcon ? ALERT_WITH_ICON_CLASS : '', withDesc ? ALERT_WITH_DESC_CLASS : '', closable ? ALERT_WITH_CLOSE_CLASS : '', defaultVisible ? '' : ALERT_INVISIBLE_CLASS);
        const wrapper = $.node('div', icon + msg + desc + closeIcon, klass, {
          style,
        });
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
        const { onClose, closable, afterClose } = this.options;
        this.afterClose = afterClose;
        const _this = this;
        if (closable) {
          this.$closeIcon.on('click', function () {
            isFunction(onClose) && onClose();
            _this.hide();
          });
        }
      },

      show () {
        const { isVisible, $alertContainer } = this;
        if (!isVisible) {
          $alertContainer.removeClass(ALERT_INVISIBLE_CLASS);
          $alertContainer.removeClass(ALERT_SLIDEUP_CLASS);
          $alertContainer.addClass(ALERT_SLIDEDOWN_CLASS);
          this.isVisible = true;
        }
      },

      hide () {
        const { isVisible, $alertContainer, afterClose} = this;
        if (isVisible) {
          $alertContainer.removeClass(ALERT_SLIDEDOWN_CLASS);
          $alertContainer.addClass(ALERT_SLIDEUP_CLASS);
          setTimeout(() => {
            $alertContainer.addClass(ALERT_INVISIBLE_CLASS);
            this.isVisible = false;
            isFunction(afterClose) && afterClose();
          }, 200);
        }
      },

      destroy () {
        removeKeys(this, 'options, $container, $closeIcon');
      }
    });

  }(window, jQuery, Component)

  ;!function (win, $, Component) {
    /**
     * @param options = {
     *   bodyStyle: Object,
     *   defaultVisible: Boolen,
     *   cancelText: String,
     *   centered: Boolen,
     *   centered: Boolen,
     *   closable: Boolen,
     *   destroyOnClose: Boolen,
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

    const MODAL_FOOTER_CONTAINER_CLASS = 'modal_footer_container',
          MODAL_FOOTER_WRAP_CLASS = 'modal_footer_wrapper',
          MODAL_FOOTER_OK_BTN_CLASS = 'modal_footer_ok_button',
          MODAL_FOOTER_CANCEL_BTN_CLASS = 'modal_footer_cancel_button',

          MODAL_HEADER_CONTAINER_CLASS = 'modal_header_container',
          MODAL_HEADER_WRAP_CLASS = 'modal_header_wrapper',

          MODAL_CLOSE_ICON_CLASS = 'modal_close_icon',

          MODAL_BODY_CLASS = 'modal_body',

          MODAL_CONTAINER_CLASS = 'modal_container',
          MODAL_CONTAINER_CENTERED_CLASS = 'modal_centered',
          MODAL_CONTAINER_INVISIBLE_CLASS = 'modal_container_invisible',
          
          MODAL_MASK_CLASS = 'modal_mask',
          MODAL_MASK_INVISIBLE_CLASS = 'modal_mask_invisible';

    function Modal(options) {
      const defaultOptions = {
        bodyStyle: {},
        defaultVisible: false,
        cancelText: '取消',
        centered: false,
        closable: false,
        destroyOnClose: false, // 未实现
        keyboard: true, // 未实现
        mask: true,
        maskStyle: {},
        okText: '确认',
        okType: 'primary', // 未实现
        okButtonProps: {},
        cancelButtonProps: {},
        style: {},
        title: '',
        wrapClassName: '',
        zIndex: 1000,
        bodyContent: '',
        onCancel: null,
        afterClose: null,
        onOk: null
      };

      // 默认 footer
      const cancelText = isString(options.cancelText) && options.cancelText !== '' ? options.cancelText : defaultOptions.cancelText;
      const cancelButtonProps = isObject(options.cancelButtonProps) ? options.cancelButtonProps : defaultOptions.cancelButtonProps;
      const okText = isString(options.okText) && options.okText !== '' ? options.okText : defaultOptions.okText;
      const okButtonProps = isObject(options.okButtonProps) ? options.okButtonProps : defaultOptions.okButtonProps;

      const cancelBtn = $.node('button', cancelText, appendClass(DEFAULT_BTN_CLASS, MODAL_FOOTER_CANCEL_BTN_CLASS));
      const okBtn = $.node('button', okText, appendClass(DEFAULT_BTN_CLASS, PRIMARY_BTN_CLASS, MODAL_FOOTER_OK_BTN_CLASS));

      defaultOptions.footer = $.node('div', cancelBtn + okBtn, MODAL_FOOTER_WRAP_CLASS);

      this.options = Object.assign({}, defaultOptions, options);
      this.super();
    }

    $.inherit(Component, Modal);
    win.Modal = Modal;

    Object.assign(Modal.prototype, {
      render () {
        const { title, closable, bodyContent, footer, bodyStyle, centered, style, wrapClassName, zIndex, defaultVisible } = this.options;
        
        let titleDOM = '';
        if (isString(title) && title !== '') {
          const titleWrap = $.node('div', title, MODAL_HEADER_WRAP_CLASS);
          titleDOM = $.node('div', titleWrap, MODAL_HEADER_CONTAINER_CLASS);
        }

        let closeDOM = '';
        if (closable) {
          const closeIcon = (new Icon('close')).html;
          closeDOM = $.node('div', closeIcon, MODAL_CLOSE_ICON_CLASS);
          this.isModalClosable = true;
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
        
        const html = $.node('div', titleDOM + closeDOM + bodyContentDOM + footerDOM, klass, {
          style: Object.assign(isObject(style) ? style : {}, { zIndex })
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
        isModalClosable && ( this.$modalCloseBtn = this.$container.find(toSelector(MODAL_CLOSE_ICON_CLASS)) );
        this.$container = $(toSelector(this.RANDOM_CLASS));
        this.$cancelBtn = this.$container.find(toSelector(MODAL_FOOTER_CANCEL_BTN_CLASS));
        this.$okBtn = this.$container.find(toSelector(MODAL_FOOTER_OK_BTN_CLASS));
      },

      bindEvents () {
        const { isModalClosable, $modalCloseBtn, $cancelBtn, $okBtn, options: { afterClose, onCancel, onOk } } = this;

        const _this = this;
        const closeModalHandler = function () {
          _this.hide();

          const $this = $(this);
          if ($this.hasClass(MODAL_FOOTER_CANCEL_BTN_CLASS)) {
            isFunction(onCancel) && onCancel();
          }
          if ($this.hasClass(MODAL_FOOTER_OK_BTN_CLASS)) {
            isFunction(onOk) && onOk();
          }

          isFunction(afterClose) && afterClose();
        }

        if (isModalClosable) {
          $modalCloseBtn.on('click', closeModalHandler);
        }

        $cancelBtn.on('click', closeModalHandler);
        $okBtn.on('click', closeModalHandler);

      },

      show () {
        const { isIncludeMask, $mask, $container, $okBtn } = this;
        $okBtn[0].focus();
        $container.removeClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.removeClass(MODAL_MASK_INVISIBLE_CLASS);
      },

      hide() {
        const { isIncludeMask, $mask, $container } = this;
        $container.addClass(MODAL_CONTAINER_INVISIBLE_CLASS);
        isIncludeMask && $mask.addClass(MODAL_MASK_INVISIBLE_CLASS);
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

    const MODAL_CONFIRM_BODY_CLASS = 'modal_confirm_body',
          MODAL_CONFIRM_BTNS_CLASS = 'modal_confirm_buttons',
          MODAL_CONFIRM_TITLE_CLASS = 'modal_confirm_title',
          MODAL_CONFIRM_CONTENT_CLASS = 'modal_confirm_content';

    Modal.error = function (options) {
      const defaultOptions = {
        title: '',
        content: '',
        okText: '确定',
        cancelText: '取消',
        centered: false,
        icon: ( new Icon('error', { size:  22 }) ).html,
        mask: true,
        width: 500,
        zIndex: 1000,
        onOk: null,
        onCancel: null
      }
    }


  }(window, jQuery, Component)

}(window, window.jQuery, window.Swiper, window.Component, window.Util)