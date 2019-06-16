'use strict';

;!function (window, jQuery, Swiper, Component, Util) {

  /* utils */
  var isString = Util.isString,
      isObject = Util.isObject,
      isEmptyObject = Util.isEmptyObject,
      isFunction = Util.isFunction,
      isNumber = Util.isNumber,
      isNumeric = Util.isNumeric,
      isDom = Util.isDom,
      toSelector = Util.toSelector,
      appendStyle = Util.appendStyle,
      insertElementToBody = Util.insertElementToBody,
      domAfterLoad = Util.domAfterLoad,
      tagOf = Util.tagOf,
      remove = Util.remove,
      uniq = Util.uniq,
      ins = Util.ins,
      makeArray = Util.makeArray,
      keyOf = Util.keyOf,
      deleteKeys = Util.deleteKeys,
      dateFormater = Util.dateFormater,
      buildRandomString = Util.buildRandomString,
      toNumber = Util.toNumber,
      SetMock = Util.SetMock,
      appendClass = Util.appendClass;

  /* icons */

  var getPrevSvg = function getPrevSvg(color) {
    var fill = isString(color) ? ' fill="' + color + '"' : '';
    return '<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"' + fill + '></path></svg>';
  };
  var getNextSvg = function getNextSvg(color) {
    var fill = isString(color) ? ' fill="' + color + '"' : '';
    return '<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"' + fill + '></path></svg>';
  };
  var getWarnSvg = function getWarnSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#faad14';

    color = String(color);
    return '<svg t="1560646481235" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1083" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M560 528C560 554.496 538.624 576 512 576l0 0C485.568 576 464 554.496 464 528l0-224C464 277.44 485.568 256 512 256l0 0c26.624 0 48 21.44 48 48L560 528zM560 720c0-26.496-21.376-48-48-48-26.432 0-48 21.504-48 48S485.568 768 512 768C538.624 768 560 746.496 560 720zM512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 896.768c-212.48 0-384.768-172.224-384.768-384.768S299.52 127.232 512 127.232 896.64 299.52 896.64 512 724.48 896.768 512 896.768z" fill="' + color + '" p-id="1084"></path></svg>';
  };
  var getWarnFilledSvg = function getWarnFilledSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#faad14';

    color = String(color);
    return '<svg t="1560646462555" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="967" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64C264.64 64 64 264.64 64 512c0 247.424 200.64 448 448 448 247.488 0 448-200.576 448-448C960 264.64 759.488 64 512 64zM512 768c-26.432 0-48-21.504-48-48S485.568 672 512 672c26.624 0 48 21.504 48 48S538.624 768 512 768zM560 528C560 554.56 538.624 576 512 576 485.568 576 464 554.56 464 528l0-224C464 277.44 485.568 256 512 256c26.624 0 48 21.44 48 48L560 528z" fill="' + color + '" p-id="968"></path></svg>';
  };
  var getSuccessSvg = function getSuccessSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#52c41a';

    color = String(color);
    return '<svg t="1560648151229" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1026" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M530.305 957.452C283.818 968.12 75.361 776.97 64.692 530.483c-10.67-246.476 180.486-454.93 426.953-465.6 246.489-10.67 454.924 180.484 465.614 426.959 10.668 246.465-180.486 454.94-426.954 465.61z m-36.63-845.591c-220.526 9.553-391.56 196.061-382.007 416.584 9.553 220.532 196.064 391.564 416.608 382.03 220.528-9.574 391.56-196.06 382.004-416.604-9.551-220.523-196.06-391.554-416.606-382.01z m-14.687 582.005v0.022l-21.602 21.925c-5.964 6.066-15.742 6.188-21.846 0.264l-22.069-21.44v-0.02L278.34 543.941c-6.085-5.922-6.206-15.628-0.243-21.682l21.602-21.947c5.963-6.065 15.76-6.167 21.845-0.254L445.6 640.035l248.374-273.088c5.966-6.065 15.74-6.165 21.847-0.253l22.067 21.43c6.107 5.923 6.208 15.628 0.245 21.693l-259.145 284.05z" fill="' + color + '" p-id="1027"></path></svg>';
  };
  var getSuccessFilledSvg = function getSuccessFilledSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#52c41a';

    color = String(color);
    return '<svg t="1560648134097" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="904" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M511.998465 66.320475c-245.76131 0-444.98777 199.22646-444.98777 444.98777 0 245.750053 199.22646 444.979584 444.98777 444.979584 245.762333 0 444.988794-199.228507 444.988794-444.979584C956.987259 265.546935 757.760798 66.320475 511.998465 66.320475L511.998465 66.320475zM787.323091 400.624377l-298.918997 298.907741c-2.929726 2.932796-8.197706 7.458879-8.197706 7.458879s-4.611018 5.345752-7.54279 8.277524l-15.727193 15.72617c-8.689916 8.689916-22.774703 8.689916-31.467689 0L236.678956 542.207999c-8.691963-8.689916-8.691963-22.774703 0-31.457456l15.730263-15.730263c8.692986-8.686846 22.775726-8.686846 31.466666 0l157.325142 157.319002L740.127186 353.422332c8.686846-8.68173 22.775726-8.68173 31.462572 0l15.732309 15.739473C796.011984 377.844557 796.011984 391.935484 787.323091 400.624377L787.323091 400.624377zM787.323091 400.624377" fill="' + color + '" p-id="905"></path></svg>';
  };
  var getErrorSvg = function getErrorSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#f5222d';

    color = String(color);
    return '<svg t="1560649076559" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1387" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M516.461 20.457c-274.346 0-496.742 222.394-496.742 496.742s222.394 496.742 496.742 496.742 496.742-222.394 496.742-496.742-222.394-496.742-496.742-496.742zM516.461 964.278c-246.527 0-447.079-200.547-447.079-447.079s200.547-447.079 447.079-447.079 447.079 200.547 447.079 447.079-200.547 447.079-447.079 447.079z" fill="#f5222d" p-id="1388"></path><path d="M741.978 291.67c-12.099-12.117-31.79-12.117-43.905 0l-181.633 181.633-181.633-181.633c-12.102-12.117-31.795-12.117-43.905 0-12.117 12.102-12.117 31.79 0 43.905l181.633 181.633-181.633 181.633c-12.117 12.102-12.117 31.79 0 43.905 6.032 6.061 13.984 9.073 21.942 9.073 7.926 0 15.886-3.03 21.942-9.073l181.633-181.633 181.633 181.633c6.061 6.061 14.002 9.073 21.942 9.073s15.886-3.03 21.942-9.073c12.117-12.102 12.117-31.79 0-43.905l-181.669-181.633 181.633-181.633c12.117-12.102 12.117-31.79 0-43.905z" fill="' + color + '" p-id="1389"></path></svg>';
  };
  var getErrorFilledSvg = function getErrorFilledSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#f5222d';

    color = String(color);
    return '<svg t="1560649069618" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1265" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462 0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102 447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499 12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997 9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924 0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z" fill="' + color + '" p-id="1266"></path></svg>';
  };
  var getInfoSvg = function getInfoSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#1890ff';

    color = String(color);
    return '<svg t="1560649574256" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1632" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M480 64A416.64 416.64 0 0 0 64 480 416.64 416.64 0 0 0 480 896 416.64 416.64 0 0 0 896 480 416.64 416.64 0 0 0 480 64z m0 64C674.752 128 832 285.248 832 480S674.752 832 480 832A351.552 351.552 0 0 1 128 480C128 285.248 285.248 128 480 128zM448 256v64h64V256z m0 128v320h64V384z" fill="' + color + '" p-id="1633"></path></svg>';
  };
  var getInfoFilledSvg = function getInfoFilledSvg() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#1890ff';

    color = String(color);
    return '<svg t="1560649562228" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512s190.933333 426.666667 426.666667 426.666667 426.666667-190.933333 426.666667-426.666667S747.733333 85.333333 512 85.333333z m42.666667 640h-85.333334V469.333333h85.333334v256z m0-341.333333h-85.333334v-85.333333h85.333334v85.333333z" fill="' + color + '" p-id="1511"></path></svg>';
  };
  var getCloseSvg = function getCloseSvg(color) {
    color = String(color);
    return '<svg t="1560650069724" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="936" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z" fill="' + color + '" p-id="937"></path></svg>';
  };

  var prevSvg = getPrevSvg();
  var nextSvg = getNextSvg();
  var disableColor = '#ccc';
  var prevSvgDisable = getPrevSvg(disableColor);
  var nextSvgDisable = getNextSvg(disableColor);

  /* 全局缓存区 */
  var GlobalCache = {};

  !function (win, $) {
    /**
     * @description Icon
     * @param options = {
     *    size: Number | String,
     *    className: String,
     *    theme: 'wireframe' | 'filled',
     *    
     *    // warn, success, info, error不支持以下属性
     *    color: String,
     *    onClick: Function
     * }
     */
    var iconTypes = ['warn', 'success', 'info', 'error', 'close'];
    var themes = ['wireframe', 'filled'];
    var tipIconTypes = iconTypes.slice(0, 4);

    var ICON_CLASS = 'components_icon';
    var FILLED_CLASS = 'icon_filled';
    var WARNING_ICON_CLASS = 'warn_icon',
        SUCCESS_ICON_CLASS = 'success_icon',
        INFO_ICON_CLASS = 'info_icon',
        ERROR_ICON_CLASS = 'error_icon',
        CLOSE_ICON_CLASS = 'close_icon';

    function Icon(type, options) {
      if (!iconTypes.includes(type)) {
        throw new Error(type + ' is not a correct icon type');
      }
      if (typeof options.theme !== 'undefined' && !themes.includes(options.theme)) {
        throw new Error(options.theme + ' is not a correct theme');
      }

      var defaultSize = void 0;
      switch (type) {
        case 'warn':
        case 'success':
        case 'info':
        case 'error':
        case 'close':
          defaultSize = 16;break;
      }

      var defaultOptions = {
        size: defaultSize,
        className: '',
        color: '#cccccc',
        theme: 'wireframe',
        onClick: null
      };

      this.options = Object.assign({}, defaultOptions, options);

      this.type = type;
      this.html = this.render();
      !tipIconTypes.includes(type) && (this.onClick = this.options.onClick);
      this.destroy();
    }

    win.Icon = Icon;

    Object.assign(Icon.prototype, {
      render: function render() {
        var type = this.type,
            _options = this.options,
            size = _options.size,
            className = _options.className,
            theme = _options.theme,
            color = _options.color;

        var isDefaultTheme = theme === 'wireframe';

        var klass = void 0,
            svg = void 0;
        switch (type) {
          case 'warn':
            klass = WARNING_ICON_CLASS;
            svg = isDefaultTheme ? getWarnSvg() : getWarnFilledSvg();
            break;
          case 'success':
            klass = SUCCESS_ICON_CLASS;
            svg = isDefaultTheme ? getSuccessSvg() : getSuccessFilledSvg();
            break;
          case 'info':
            klass = INFO_ICON_CLASS;
            svg = isDefaultTheme ? getInfoSvg() : getInfoFilledSvg();
            break;
          case 'error':
            klass = ERROR_ICON_CLASS;
            svg = isDefaultTheme ? getErrorSvg() : getErrorFilledSvg();
            break;
          case 'close':
            klass = CLOSE_ICON_CLASS;
            svg = getCloseSvg(color);
            break;
        }

        var filledClass = isDefaultTheme ? '' : FILLED_CLASS;

        var icon = $.node('i', svg, appendClass(className, ICON_CLASS, klass, filledClass), {
          style: {
            width: isNumber(size) ? size + 'px' : size,
            height: isNumber(size) ? size + 'px' : size
          }
        });

        return icon;
      },
      destroy: function destroy() {
        deleteKeys(this, 'options');
      }
    });
  }(window, $)

  /* ========Components======== */

  /* Tab组件 */
  ;!function (win, $, Component) {

    //className
    var TAB_ITEM_CLASS = 'tabs-tab-item';
    var TAB_ITEM_CLASS_ACTIVE = 'tabs-tab-item-active';
    var TAB_ITEM_WRAP_CLASS = 'tabs-tab-wrapper';
    var TAB_ITEM_INNER_CLASS = 'tabs-tab-inner';

    var PANE_ITEM_CLASS = 'tabs-pane-item';
    var PANE_ITEM_CLASS_ACTIVE = 'tabs-pane-item-active';
    var PANE_ITEM_WRAP_CLASS = 'tabs-pane-wrapper';

    var TAB_ARROW_CLASS = 'tabs-arrow';
    var TAB_ARROW_CLASS_DISABLE = 'tabs-arrow-disable';
    var TAB_ARROW_CLASS_INVISIBLE = 'tabs-arrow-invisible';
    var TAB_PREVIOUS_ARROW_CLASS = 'tabs-prev-arrow';
    var TAB_NEXT_ARROW_CLASS = 'tabs-next-arrow';

    var UNDERLINE_CLASS = 'tabs-underline';

    /**
     *  @param options: {
     *    tabsText: Array,
     *    paneContainerSelector: String,
     *    themeColor: String,
     *    onChange: Function(index),
     *    renderPaneItem: Function(tabName, index)
     *  }
     */
    function Tabs(selector, options) {

      //default
      var defaultOptions = {
        tabsText: [],
        paneContainerSelector: null,
        themeColor: '#1890ff',
        onChange: null,
        renderPaneItem: null
      };

      this.options = Object.assign({}, defaultOptions, options);
      this.$container = $(selector);
      if (this.$container.length < 1) throw new Error('not found ' + selector + ' Element');
      this.super();
    };

    $.inherit(Component, Tabs);

    win.Tabs = Tabs;

    Object.assign(Tabs.prototype, {
      render: function render() {
        var _options2 = this.options,
            tabsText = _options2.tabsText,
            renderPaneItem = _options2.renderPaneItem,
            themeColor = _options2.themeColor,
            paneContainerSelector = _options2.paneContainerSelector;


        var tabs = '',
            panes = '';
        var $container = this.$container;
        var $paneContainer = $(paneContainerSelector);
        var isIncludePane = $paneContainer.length > 0;

        this.isIncludePane = isIncludePane;
        this.$paneContainer = $paneContainer;

        tabsText.forEach(function (tabText, index) {
          var klass = index === 0 ? appendClass(TAB_ITEM_CLASS, TAB_ITEM_CLASS_ACTIVE) : TAB_ITEM_CLASS;

          //tab
          var tab = $.node('div', tabText, klass);
          tabs += tab;

          //pane
          if (isIncludePane) {
            var paneClass = index === 0 ? appendClass(PANE_ITEM_CLASS, PANE_ITEM_CLASS_ACTIVE) : PANE_ITEM_CLASS;
            var paneInner = isFunction(renderPaneItem) ? renderPaneItem(tabText, index) : '';
            var pane = $.node('div', paneInner, paneClass);
            panes += pane;
          }
        });

        var underline = $.node('div', '', UNDERLINE_CLASS, { style: { backgroundColor: themeColor } });

        var tabsInner = $.node('div', tabs + underline, TAB_ITEM_INNER_CLASS);
        var tabsWrap = $.node('div', tabsInner, TAB_ITEM_WRAP_CLASS);

        var prev = $.node('div', prevSvgDisable, appendClass(TAB_PREVIOUS_ARROW_CLASS, TAB_ARROW_CLASS, TAB_ARROW_CLASS_DISABLE, TAB_ARROW_CLASS_INVISIBLE));
        var next = $.node('div', nextSvg, appendClass(TAB_NEXT_ARROW_CLASS, TAB_ARROW_CLASS, TAB_ARROW_CLASS_INVISIBLE));

        return [{
          html: prev + tabsWrap + next,
          container: $container
        }, {
          html: $.node('div', panes, PANE_ITEM_WRAP_CLASS),
          container: $paneContainer,
          condition: isIncludePane
        }];
      },
      style: function style() {

        /* tabs style */
        var themeColor = this.options.themeColor;
        var isIncludePane = this.isIncludePane,
            $container = this.$container,
            $paneContainer = this.$paneContainer;


        $container.addClass('flex');
        $container.css({
          overflow: 'hidden'
        });

        appendStyle({
          '.tabs-tab-item-active': {
            color: themeColor
          },
          '.tabs-tab-item:hover': {
            color: themeColor
          }
        });

        /* panes style */
        if (isIncludePane) {
          $paneContainer.css({
            overflow: 'hidden'
          });
          this.$paneContainer = $paneContainer;

          var paneWidth = $paneContainer.width();
          var paneHeight = $paneContainer.height();
          this.paneWidth = paneWidth;

          var $paneWrap = $paneContainer.find(toSelector(PANE_ITEM_WRAP_CLASS));
          var $panes = $paneContainer.find(toSelector(PANE_ITEM_CLASS));

          $panes.width(paneWidth);
          $panes.height(paneHeight);
          $paneWrap.width(paneWidth * $panes.length);
          $paneWrap.height(paneHeight);
        }
      },
      bindEvents: function bindEvents() {
        var $container = this.$container,
            $paneContainer = this.$paneContainer,
            paneWidth = this.paneWidth,
            options = this.options;
        var onChange = options.onChange;


        var $tabWrap = $container.find(toSelector(TAB_ITEM_WRAP_CLASS));
        var $tabItems = $tabWrap.find(toSelector(TAB_ITEM_CLASS));
        var $underline = $tabWrap.find(toSelector(UNDERLINE_CLASS));
        var isIncludePane = this.isIncludePane;

        this.$tabItems = $tabItems;

        // 计算每个tab的宽度
        var tabItemsWidthList = $tabItems.map(function (_, tabItem) {
          return $(tabItem).outerWidth();
        });

        // underline宽度 = tab宽度
        $underline.width(tabItemsWidthList[0]);

        //arrow
        var $arrow = $container.find(toSelector(TAB_ARROW_CLASS));

        var $tabInner = $tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
        var wrapWidth = $tabWrap.width();
        var innerWidth = $tabInner.width();
        if (wrapWidth < innerWidth) {
          // 显示左右切换箭头
          $arrow.removeClass(TAB_ARROW_CLASS_INVISIBLE);

          wrapWidth = $tabWrap.width(); //重新计算外包元素宽度
          var prevDistance = 0,
              nextDistance = innerWidth - wrapWidth;
          $arrow.on('click', function () {
            var $this = $(this);

            if ($this.hasClass(TAB_PREVIOUS_ARROW_CLASS)) {
              // 点击左箭头
              if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {

                var translateXValue = $tabInner.translateX();
                $tabInner.translateX(function () {
                  var distance = prevDistance < wrapWidth ? prevDistance : wrapWidth;
                  prevDistance -= distance;
                  nextDistance += distance;
                  return translateXValue + distance;
                });

                if (prevDistance === 0 && !$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $this.addClass(TAB_ARROW_CLASS_DISABLE);
                  $this.html(prevSvgDisable);
                }

                var $next = $this.nextAll(toSelector(TAB_NEXT_ARROW_CLASS));
                if ($next.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $next.removeClass(TAB_ARROW_CLASS_DISABLE);
                  $next.html(nextSvg);
                }
              }
            } else if ($this.hasClass(TAB_NEXT_ARROW_CLASS)) {
              // 点击右箭头
              if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {

                var _translateXValue = $tabInner.translateX();
                _translateXValue = isNaN(_translateXValue) ? 0 : _translateXValue;
                $tabInner.translateX(function () {
                  var distance = nextDistance < wrapWidth ? nextDistance : wrapWidth;
                  prevDistance += distance;
                  nextDistance -= distance;
                  return _translateXValue + -distance;
                });

                if (nextDistance === 0 && !$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $this.addClass(TAB_ARROW_CLASS_DISABLE);
                  $this.html(nextSvgDisable);
                }

                var $prev = $this.prevAll(toSelector(TAB_PREVIOUS_ARROW_CLASS));
                if ($prev.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $prev.removeClass(TAB_ARROW_CLASS_DISABLE);
                  $prev.html(prevSvg);
                }
              }
            }
          });
        };

        var $paneWrap = $paneContainer.find(toSelector(PANE_ITEM_WRAP_CLASS));
        var $panes = $paneWrap.find(toSelector(PANE_ITEM_CLASS));

        GlobalCache.TabsChanging = function (current, index) {
          // change active
          $tabItems.eq(current).removeClass(TAB_ITEM_CLASS_ACTIVE);
          $tabItems.eq(index).addClass(TAB_ITEM_CLASS_ACTIVE);

          // move underline
          $underline.width(tabItemsWidthList[index]);
          $underline.translateX(function () {
            var i = void 0,
                distance = 0;
            for (i = 0; i < index; i++) {
              distance += tabItemsWidthList[i];
            }
            return distance;
          });

          // change pane
          if (isIncludePane) {
            $paneWrap.translateX(-(paneWidth * index));
            $panes.eq(current).removeClass(PANE_ITEM_CLASS_ACTIVE);
            $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE);
          }

          isFunction(onChange) && onChange(index);
        };

        //click tab item
        $tabItems.on('click', function () {
          var $this = $(this);
          if (!$this.hasClass(TAB_ITEM_CLASS_ACTIVE)) {

            var $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
            var current = $tabItems.indexOf($active);
            var index = $tabItems.indexOf($this);

            GlobalCache.TabsChanging(current, index);
          }
        });
      },


      /**
       * @description index从1开始
       */
      changeTo: function changeTo(index) {
        var $tabItems = this.$tabItems;

        var $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
        var current = $tabItems.indexOf($active);

        GlobalCache.TabsChanging(current, index - 1);

        /* 计算当前active基于父元素的left值 */
        var activeOffsetLeft = $tabItems.reduce(function (value, item, i) {
          return value + (i < index - 1 ? $(item).outerWidth() : 0);
        }, 0);
        $tabItems.parent().translateX(-activeOffsetLeft);
      },
      destroy: function destroy() {
        deleteKeys(this, 'options,isIncludePane,paneWidth');
      }
    });
  }(window, jQuery, Component)

  /**
   * Pagination
   */
  ;!function (win, $, Component) {

    //className
    var PAGINATION_ITEM_CLASS = 'pagination-item';
    var PAGINATION_ITEM_CLASS_ACTIVE = 'pagination-item-active';
    var PAGINATION_ITEM_CLASS_BORDER = 'pagination-item-border';
    // var PAGINATION_ITEM_CLASS_MORE = 'pagination-item-more';
    var PAGINATION_ITEM_CLASS_DISABLE = 'pagination-item-disable';
    var PAGINATION_ITEM_CLASS_PREV = 'pagination-item-previous';
    var PAGINATION_ITEM_CLASS_NEXT = 'pagination-item-next';

    /**
     *  @param options: {
     *    total: Numer,
     *    pageSize: Number,
     *    current: Number,
     *    border: true | false, // 页码是否需要边框
     *    themeColor: String,
     *    onChange: Function (current),
     *    itemRender: Function (current, type, originalElement)
     *  }
     */
    function Pagination(selector, options) {

      //default
      var defaultOptions = {
        total: 0,
        pageSize: 10,
        current: 1,
        border: true,
        themeColor: '#1890ff',
        onChange: null,
        itemRender: null
      };

      var opts = Object.assign({}, defaultOptions, options);

      var mustBeNumber = ['total', 'pageSize', 'current'];
      for (var key in opts) {
        if (mustBeNumber.indexOf(key) > -1) {
          if (!isNumber(opts[key])) throw new Error(key + ' is not a number');
        }
      }

      this.options = opts;
      this.$container = $(selector);
      if (tagOf(this.$container) !== 'ul') throw new Error(selector + ' is not a <ul> Element');

      this.super();
    };

    $.inherit(Component, Pagination);

    win.Pagination = Pagination;

    Object.assign(Pagination.prototype, {
      render: function render() {
        var _this2 = this;

        var $container = this.$container,
            options = this.options;
        var current = options.current,
            total = options.total,
            pageSize = options.pageSize,
            itemRender = options.itemRender,
            border = options.border;


        var totalPage = Math.ceil(total / pageSize);
        this.totalPage = totalPage;

        //pagination
        var i = void 0,
            ulInner = '';
        for (i = 1; i <= totalPage; i++) {
          var klass = i === current ? appendClass(PAGINATION_ITEM_CLASS, PAGINATION_ITEM_CLASS_ACTIVE) : PAGINATION_ITEM_CLASS;
          klass = border ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;

          var originalElement = $.node('a', i);
          var element = isFunction(itemRender) ? itemRender(i, 'pagination', originalElement) : originalElement;

          klass = appendClass(klass, PAGINATION_ITEM_CLASS + '-' + i);
          var pagination = $.node('li', element, klass);

          ulInner += pagination;
        }

        //previous
        var previous = function previous() {
          var klass = current === 1 ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = border ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;

          var svg = current === 1 ? prevSvgDisable : prevSvg;
          var originalElement = $.node('a', svg);
          var element = isFunction(itemRender) ? itemRender(null, 'prev', originalElement) : originalElement;
          _this2.prevEl = element;
          _this2.prevOriginEl = originalElement;

          return $.node('li', element, appendClass(klass, PAGINATION_ITEM_CLASS_PREV));
        };
        var prevItem = previous();

        //next
        var next = function next() {
          var klass = current === totalPage ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = border ? appendClass(klass, PAGINATION_ITEM_CLASS_BORDER) : klass;

          var svg = current === totalPage ? nextSvgDisable : nextSvg;
          var originalElement = $.node('a', svg);

          var element = isFunction(itemRender) ? itemRender(null, 'next', originalElement) : originalElement;
          _this2.nextEl = element;
          _this2.nextOriginEl = originalElement;

          return $.node('li', element, appendClass(klass, PAGINATION_ITEM_CLASS_NEXT));
        };
        var nextItem = next();

        return [{
          html: prevItem + ulInner + nextItem,
          container: $container
        }];
      },
      style: function style() {
        var themeColor = this.options.themeColor;

        appendStyle({
          '.pagination-item.pagination-item-active > a': {
            color: themeColor
          },
          '.pagination-item.pagination-item-active.pagination-item-border': {
            borderColor: themeColor
          },
          '.pagination-item:hover > a': {
            color: themeColor
          }
        });
      },
      bindEvents: function bindEvents() {

        var Pagination = this;
        var $container = this.$container,
            totalPage = this.totalPage,
            options = this.options;
        var onChange = options.onChange;


        var $next = $container.find(toSelector(PAGINATION_ITEM_CLASS_NEXT));
        var $prev = $container.find(toSelector(PAGINATION_ITEM_CLASS_PREV));
        var $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        this.$pagination = $pagination;

        GlobalCache.paginationChanging = function (current, index) {

          $pagination.eq(current).removeClass(PAGINATION_ITEM_CLASS_ACTIVE);
          $pagination.eq(index).addClass(PAGINATION_ITEM_CLASS_ACTIVE);

          index += 1; // index 转为 页码
          if (index !== totalPage && $next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            Pagination.nextEl === Pagination.nextOriginEl && $next.children('a').html(nextSvg);
            $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if (index === totalPage && !$next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            Pagination.nextEl === Pagination.nextOriginEl && $next.children('a').html(nextSvgDisable);
            $next.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if (index === 1 && !$prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            Pagination.prevEl === Pagination.prevOriginEl && $prev.children('a').html(prevSvgDisable);
            $prev.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }
          if (index !== 1 && $prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            Pagination.prevEl === Pagination.prevOriginEl && $prev.children('a').html(prevSvg);
            $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }

          isFunction(onChange) && onChange(index);
        };

        //click previous button
        $prev.on('click', function () {
          var $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            var current = $pagination.indexOf($active);

            GlobalCache.paginationChanging(current, current - 1, $pagination, onChange);
          }
        });

        //click next button
        $next.on('click', function () {
          var $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            var current = $pagination.indexOf($active);

            GlobalCache.paginationChanging(current, current + 1, $pagination, onChange);
          }
        });

        //click paginations
        $pagination.on('click', function () {
          var $this = $(this);
          if (!$this.hasClass(PAGINATION_ITEM_CLASS_ACTIVE)) {
            var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
            var current = $pagination.indexOf($active);
            var index = $pagination.indexOf($this);

            if (current !== index) {
              GlobalCache.paginationChanging(current, index, $pagination, onChange);
            }
          }
        });
      },


      /**
       * @param { Number } index 页码，从1开始
       */
      changeTo: function changeTo(index) {
        var $pagination = this.$pagination,
            options = this.options;
        var onChange = options.onChange;

        var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
        var current = $pagination.indexOf($active);
        if (current !== index) {
          GlobalCache.paginationChanging(current, index - 1, $pagination, onChange);
        }
      },
      destroy: function destroy() {
        deleteKeys(this, 'nextEl,nextOriginEl,prevEl,prevOriginEl,totalPage');
      }
    });
  }(window, jQuery, Component)

  /**
   * Message
   */
  ;!function (win, $) {

    // className
    var TEXTCLASS = 'message_text_box';
    var CONTAINERCLASS = 'message_contaier';
    var ICONCLASS = 'message_icon';

    // default
    var defaultOptions = {
      FirstMessagePosTop: 16, //第一个message元素的top值
      GapOfMessage: 10 //多个message同时出现时，message之间的间隙
    };

    /**
     *  @param options: {
     *    FirstMessagePosTop: Number,
     *    GapOfMessage: Number
     *  }
     */
    var Message = function Message(type) {
      var _this3 = this;

      this.GapOfMessage = defaultOptions.GapOfMessage;
      this.FirstMessagePosTop = defaultOptions.FirstMessagePosTop;

      this.type = type;

      //为每个Message实例的容器创建一个随机className
      var RANDOM_CLASS = buildRandomString();

      var classPrefix = 'message_' + type + '_';
      var icon = new Icon(type === 'warning' ? 'warn' : type, {
        className: ICONCLASS,
        theme: 'filled'
      });
      var text = $.node('span', '', appendClass(TEXTCLASS, classPrefix + 'text_box'));
      var container = $.node('div', icon.html + text, appendClass(CONTAINERCLASS, RANDOM_CLASS, classPrefix + 'container'));
      insertElementToBody($(container));

      domAfterLoad(toSelector(RANDOM_CLASS), function () {
        _this3.$el = $(toSelector(RANDOM_CLASS));
        _this3.$text = _this3.$el.find(toSelector(TEXTCLASS));
      });
    };

    Object.assign(Message.prototype, {
      show: function show(content, duration, onClose) {
        var _this4 = this;

        var $el = this.$el,
            $text = this.$text,
            FirstMessagePosTop = this.FirstMessagePosTop,
            GapOfMessage = this.GapOfMessage;


        $el[0].style = "";

        var time = void 0;
        if (isFunction(duration)) {
          // 当第二个参数为函数时，将函数赋值给onClose, 显示时间使用默认
          onClose = duration;
          time = 3;
        } else {
          duration = parseFloat(duration);
          time = isNaN(duration) ? 3 : duration; // 默认显示3秒后隐藏
        }

        var elHeight = $el.outerHeight();

        setTimeout(function () {
          $text.text(content);
          $el.addClass('comedown');

          var index = messageList.indexOf(_this4);
          $el.css({
            top: FirstMessagePosTop + index * elHeight + index * GapOfMessage + 'px' // 计算当前实例top值
          });

          setTimeout(function () {
            _this4.hide(onClose);
          }, time * 1000);
        }, 0);
      },
      hide: function hide(onClose) {
        var $el = this.$el,
            $text = this.$text;


        messageList.delete(this);

        $el[0].style.top !== '' && ($el[0].style.top = '');
        $el.removeClass('comedown');
        isFunction(onClose) && onClose();
        setTimeout(function () {
          $text.text('');
        }, 1000);
      }
    });

    var message = {};
    message.setting = function (options) {
      Object.assign(defaultOptions, options);
    };

    var messageList = new SetMock();
    var warningList = new SetMock();
    message.warning = function (content, duration, onClose) {
      //获取页面中隐藏的warning提示框
      var hiddenWarning = warningList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });

      //有隐藏的提示框就直接用该实例，否则创建新实例
      if (hiddenWarning.size > 0) {
        messageList.add(hiddenWarning[0]);
        hiddenWarning[0].show(content, duration, onClose);
      } else {
        var warning = new Message('warning');
        messageList.add(warning);
        warning.show(content, duration, onClose);
        warningList.add(warning);
      }
    };

    var successList = new SetMock();
    message.success = function (content, duration, onClose) {
      var hiddenSuccess = successList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });

      if (hiddenSuccess.size > 0) {
        messageList.add(hiddenSuccess[0]);
        hiddenSuccess[0].show(content, duration, onClose);
      } else {
        var success = new Message('success');
        messageList.add(success);
        success.show(content, duration, onClose);
        successList.add(success);
      }
    };

    var errorList = new SetMock();
    message.error = function (content, duration, onClose) {
      var hiddenError = errorList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });

      if (hiddenError.size > 0) {
        messageList.add(hiddenError[0]);
        hiddenError[0].show(content, duration, onClose);
      } else {
        var error = new Message('error');
        messageList.add(error);
        error.show(content, duration, onClose);
        errorList.add(error);
      }
    };

    var infoList = new SetMock();
    message.info = function (content, duration, onClose) {
      var hiddenInfo = infoList.filter(function (instance) {
        return !instance.$el.hasClass('comedown');
      });

      if (hiddenInfo.size > 0) {
        messageList.add(hiddenInfo[0]);
        hiddenInfo[0].show(content, duration, onClose);
      } else {
        var info = new Message('info');
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
    var GALLERY_BUTTON_NEXT_CLASS = 'gallery-swiper-button-next';
    var GALLERY_BUTTON_PREV_CLASS = 'gallery-swiper-button-prev';
    var GALLERY_PAGINATION_CLASS = 'gallery-swiper-pagination';
    var GALLERY_SWIPER_CONTAINER_CLASS = 'gallery-swiper-container';
    var GALLERY_WRAPPER_CLASS = 'gallery-wrapper';
    var GALLERY_CONTAINER_CLASS = 'gallery-contaier';
    var GALLERY_CONTAINER_CLASS_HIDDEN = 'gallery-contaier-invisible';

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
      var defaultOptions = {
        navgation: false,
        pagination: true,
        width: '100%',
        height: '100%',
        bgColor: 'transparent',
        swiperOptions: {}
      };

      var opts = Object.assign({}, defaultOptions, options);
      if (opts.width === '100%' && opts.navgation) {
        opts.navgation = false; // 宽度100%时不使用导航箭头
      }

      this.options = opts;
      this.$source = $(selector);

      // 为每个实例容器创建一个随机className
      var RANDOM_CLASS = buildRandomString();
      this.RANDOM_CLASS = RANDOM_CLASS;

      this.super();
    };

    $.inherit(Component, Gallery);

    win.Gallery = Gallery;

    Object.assign(Gallery.prototype, {
      componentWillMount: function componentWillMount() {
        // handle swiper options
        this.swiperOptionsHandler();
      },


      render: function render() {
        var srcList = this.createSrcList();
        var RANDOM_CLASS = this.RANDOM_CLASS,
            _options3 = this.options,
            pagination = _options3.pagination,
            navgation = _options3.navgation;


        var slideList = srcList.map(function (src) {
          return $.node('div', '<img src=' + src + ' />', 'swiper-slide');
        });

        var swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
        if (pagination) {
          swiperWrapper += $.node('div', '', appendClass(GALLERY_PAGINATION_CLASS, 'swiper-pagination'));
        }

        var swiperContainer = $.node('div', swiperWrapper, appendClass(GALLERY_SWIPER_CONTAINER_CLASS, 'swiper-container'));
        if (navgation) {
          var prevBtn = $.node('div', '', appendClass(GALLERY_BUTTON_PREV_CLASS, 'swiper-button-prev'));
          var nextBtn = $.node('div', '', appendClass(GALLERY_BUTTON_NEXT_CLASS, 'swiper-button-next'));
          swiperContainer += prevBtn + nextBtn;
        }

        var galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);

        var galleryContainer = $.node('section', galleryWrappper, appendClass(GALLERY_CONTAINER_CLASS, GALLERY_CONTAINER_CLASS_HIDDEN, RANDOM_CLASS));

        return [{
          html: galleryContainer,
          container: 'body'
        }];
      },

      componentDidMount: function componentDidMount() {
        this.$container = $(toSelector(this.RANDOM_CLASS));
      },


      style: function style() {
        var maxZIndex = this.getMaxZIndex();
        var _options4 = this.options,
            width = _options4.width,
            height = _options4.height,
            bgColor = _options4.bgColor,
            navgation = _options4.navgation;

        var $container = this.$container;

        // 设置gallery元素的z-index为当前页面z-index最大值+1
        $container.css({
          'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
        });

        // 设置swiper容器宽高
        var containerWidth = $container.width();
        var percentReg = /%$/;
        var widthValue = percentReg.test(width) ? containerWidth * (parseFloat(width) / 100) : parseFloat(width);

        if (widthValue > containerWidth) {
          width = '100%';
          widthValue = containerWidth;
        }
        var diff = containerWidth - widthValue;
        var wider = diff > 0 ? diff > 100 ? 100 : wider : 0;

        width = isNumber(width) ? width + 'px' : width;
        height = isNumber(height) ? height + 'px' : height;

        var $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
        $galleryWrapper.css({
          'width': navgation ? percentReg.test(width) ? widthValue + wider + 'px' : parseFloat(width) + wider + 'px' : width,
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

      bindEvents: function bindEvents() {
        var RANDOM_CLASS = this.RANDOM_CLASS,
            $container = this.$container,
            $source = this.$source,
            swiperOptions = this.options.swiperOptions;

        // 点击初始化gallery swiper

        var GALLERY = this;
        GALLERY.$swiper = null;
        $source.on('click', function () {
          var target = this;
          var index = $source.indexOf(target);

          if (!GALLERY.$swiper) {
            index > 0 && (swiperOptions.initialSlide = index);
            GALLERY.$swiper = new Swiper(appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
          } else {
            GALLERY.$swiper.slideTo(index, 0, false);
          }

          $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
        });

        // 隐藏gallery容器
        var close = function close() {
          $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
        };
        $container.on('click', close);

        var stopPropagation = function stopPropagation(e) {
          e.stopPropagation();
        };
        $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
      },


      createSrcList: function createSrcList() {
        var eleList = Array.from(this.$source);

        //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
        eleList = eleList.filter(function (item) {
          var isImg = isImgEl(item);
          var $img = !isImg ? $(item).find('img') : null;
          return isImg && item.src || $img && $img.length > 0 && $img[0].src;
        });

        //生成img元素的src列表
        var srcList = eleList.map(function (item) {
          return item.src || $(item).find('img')[0].src;
        });

        return srcList;
      },

      getMaxZIndex: function getMaxZIndex() {
        // 获取当前页面最大的z-index值
        var $hasZIndex = $('*').filter(function (_, item) {
          var zIndex = toNumber($(item).css('z-index'));
          return zIndex !== false && zIndex > 0;
        });
        var maxZIndex = $hasZIndex.length === 0 ? null : $hasZIndex.reduce(function (max, item) {
          var zIndex = parseFloat($(item).css('z-index'));
          return zIndex > max ? zIndex : max;
        }, -1000000);

        return maxZIndex;
      },


      swiperOptionsHandler: function swiperOptionsHandler() {
        var RANDOM_CLASS = this.RANDOM_CLASS,
            _options5 = this.options,
            swiperOptions = _options5.swiperOptions,
            pagination = _options5.pagination,
            navgation = _options5.navgation;


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
  }(window, jQuery, Swiper, Component);!function (win, $, Component) {

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

    var CARD_LIST_ITEM_INNER_CLASS = 'cardList-item-inner';
    var CARD_LIST_ITEM_CLASS = 'cardList-item';

    function CardList(selector, options) {
      var defaultOptions = {
        dataSource: [],
        lineItemNumber: 3,
        ratio: 0.57,
        border: false,
        style: null,
        renderItem: null
      };

      this.options = Object.assign({}, defaultOptions, options);
      this.$container = $(selector);

      this.super();
    }

    $.inherit(Component, CardList);

    win.CardList = CardList;

    Object.assign(CardList.prototype, {
      render: function render() {
        var _options6 = this.options,
            dataSource = _options6.dataSource,
            renderItem = _options6.renderItem,
            lineItemNumber = _options6.lineItemNumber;
        var $container = this.$container;


        var itemPercent = Math.floor(100 / lineItemNumber);

        var CardItems = dataSource.map(function (data) {
          var itemDom = isFunction(renderItem) ? renderItem(data) : data;
          var itemInner = $.node('div', itemDom, CARD_LIST_ITEM_INNER_CLASS);

          return $.node('div', itemInner, appendClass(CARD_LIST_ITEM_CLASS, 'flex-percent-' + itemPercent));
        });

        return [{
          html: CardItems.join(''),
          container: $container
        }];
      },
      style: function style() {
        var $container = this.$container;
        var _options7 = this.options,
            ratio = _options7.ratio,
            border = _options7.border;


        $container.addClass('flex');

        var $item = $container.find(toSelector(CARD_LIST_ITEM_INNER_CLASS));
        $item.css({
          height: 0,
          paddingBottom: ratio * 100 + '%',
          border: border ? '1px solid #eee' : 'none'
        });
      }
    });
  }(window, jQuery, Component);!function (win, $, Component) {

    var ALERT_MESSAGE_CLASS = 'alert_message',
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
        throw new Error(type + ' is not a correct Alert type');
      }

      var defaultOptions = {
        closable: false,
        closeText: '',
        showIcon: false,
        description: '',
        message: '',
        defaultVisible: true,
        style: {},
        onClose: null,
        afterClose: null
      };

      this.options = Object.assign({}, defaultOptions, options);
      this.type = type;
      this.$container = $(selector);
      this.super();
    }

    $.inherit(Component, Alert);
    win.Alert = Alert;

    Object.assign(Alert.prototype, {
      render: function render() {
        var type = this.type,
            $container = this.$container,
            options = this.options;
        var closable = options.closable,
            closeText = options.closeText,
            showIcon = options.showIcon,
            description = options.description,
            message = options.message,
            defaultVisible = options.defaultVisible,
            style = options.style;

        var withDesc = isString(description) && description !== '';
        var iconOptions = {};
        if (withDesc) {
          iconOptions.size = 24;
        } else {
          iconOptions.size = 14;
          iconOptions.theme = 'filled';
        }

        this.isVisible = !!defaultVisible;

        var icon = showIcon ? new Icon(type, Object.assign({ className: ALERT_ICON_CLASS }, iconOptions)).html : '';
        var msg = $.node('p', message, ALERT_MESSAGE_CLASS);
        var desc = $.node('p', description, ALERT_DESCRIPTION_CLASS);

        var closeIcon = closable ? isString(closeText) && closeText !== '' ? closeText : new Icon('close', {
          className: ALERT_CLOSE_ICON
        }).html : '';

        var wrapClass = void 0;
        switch (type) {
          case 'warn':
            wrapClass = ALERT_WARN_CLASS;break;
          case 'success':
            wrapClass = ALERT_SUCCESS_CLASS;break;
          case 'error':
            wrapClass = ALERT_ERROR_CLASS;break;
          case 'info':
            wrapClass = ALERT_INFO_CLASS;break;
        }
        var RANDOM_CLASS = buildRandomString();
        var klass = appendClass(wrapClass, RANDOM_CLASS, ALERT_CONTAINER_CLASS, showIcon ? ALERT_WITH_ICON_CLASS : '', withDesc ? ALERT_WITH_DESC_CLASS : '', closable ? ALERT_WITH_CLOSE_CLASS : '', defaultVisible ? '' : ALERT_INVISIBLE_CLASS);
        var wrapper = $.node('div', icon + msg + desc + closeIcon, klass, {
          style: style
        });
        this.RANDOM_CLASS = RANDOM_CLASS;

        return [{
          html: wrapper,
          container: tagOf($container) === 'body' ? 'body' : $container,
          type: 'append'
        }];
      },
      componentDidMount: function componentDidMount() {
        this.$alertContainer = $(toSelector(this.RANDOM_CLASS));
        this.$closeIcon = this.$alertContainer.find(toSelector(ALERT_CLOSE_ICON));
      },
      bindEvents: function bindEvents() {
        var _options8 = this.options,
            onClose = _options8.onClose,
            closable = _options8.closable,
            afterClose = _options8.afterClose;

        this.afterClose = afterClose;
        var _this = this;
        if (closable) {
          this.$closeIcon.on('click', function () {
            isFunction(onClose) && onClose();
            _this.hide();
          });
        }
      },
      show: function show() {
        var isVisible = this.isVisible,
            $alertContainer = this.$alertContainer;

        if (!isVisible) {
          $alertContainer.removeClass(ALERT_INVISIBLE_CLASS);
          $alertContainer.removeClass(ALERT_SLIDEUP_CLASS);
          $alertContainer.addClass(ALERT_SLIDEDOWN_CLASS);
          this.isVisible = true;
        }
      },
      hide: function hide() {
        var _this5 = this;

        var isVisible = this.isVisible,
            $alertContainer = this.$alertContainer,
            afterClose = this.afterClose;

        if (isVisible) {
          $alertContainer.removeClass(ALERT_SLIDEDOWN_CLASS);
          $alertContainer.addClass(ALERT_SLIDEUP_CLASS);
          setTimeout(function () {
            $alertContainer.addClass(ALERT_INVISIBLE_CLASS);
            _this5.isVisible = false;
            isFunction(afterClose) && afterClose();
          }, 200);
        }
      },
      destroy: function destroy() {
        deleteKeys(this, 'options,$container,$closeIcon');
      }
    });
  }(window, jQuery, Component);
}(window, window.jQuery, window.Swiper, window.Component, window.Util);