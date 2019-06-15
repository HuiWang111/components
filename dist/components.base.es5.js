'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  var prevSvg = '<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"></path></svg>';

  var nextSvg = '<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"></path></svg>';

  var prevSvgDisable = '<svg t="1556266968537" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11039" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="11040" fill="#e6e6e6"></path></svg>';

  var nextSvgDisable = '<svg t="1556267327201" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11183" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11184" fill="#e6e6e6"></path></svg>';

  /* 全局缓存区 */
  var GlobalCache = {};

  /* ========Private Components======== */
  var Private = {};
  !function (Private, $) {

    /**
     * @description close icon
     * @param options: {
     *    size: String | Number,
     *    bgColor: String,
     *    color: String,
     *    className: String,
     *    onClick: Function
     * }
     */
    var CLOSEBTN_CONTAINER_CLASS = 'close_icon_container';

    function CloseIcon(options) {
      var defaultOptions = {
        size: 14,
        bgColor: 'transparent',
        color: '#ccc',
        className: '',
        onClick: null
      };

      this.options = Object.assign({}, defaultOptions, options);
      this.onClick = this.options.onClick;
      this.html = this.render();
    }

    Private.CloseIcon = CloseIcon;

    Object.assign(CloseIcon.prototype, {
      render: function render() {
        var _options = this.options,
            size = _options.size,
            bgColor = _options.bgColor,
            color = _options.color,
            className = _options.className;

        var sizeNumber = parseFloat(size);
        // 等腰直角三角形求底公式
        var lineSize = Math.sqrt(sizeNumber * sizeNumber + sizeNumber * sizeNumber).toFixed(2) + 'px';

        this.style(className, lineSize, color);

        var container = $.node('div', '', appendClass(className, CLOSEBTN_CONTAINER_CLASS), {
          style: {
            backgroundColor: bgColor,
            width: isNumber(size) ? size + 'px' : size,
            height: isNumber(size) ? size + 'px' : size
          }
        });

        return container;
      },
      style: function style(className, lineSize, color) {
        var selector = toSelector(className) + toSelector(CLOSEBTN_CONTAINER_CLASS);
        appendStyle(_defineProperty({}, selector + ':before,' + selector + ':after', {
          width: lineSize,
          backgroundColor: color
        }));
      }
    });

    /**
     * @description 提示性icon
     * @param options = {
     *    style: Object,
     *    className: String
     * }
     */
    var TIP_ICON_CLASS = 'tip_icon';
    var WARNING_ICON_CLASS = 'warn_icon',
        SUCCESS_ICON_CLASS = 'success_icon',
        INFO_ICON_CLASS = 'info_icon',
        ERROR_ICON_CLASS = 'error_icon';

    function TipIcon(type, options) {
      var iconTypes = ['warn', 'success', 'info', 'error'];
      if (!iconTypes.includes(type)) {
        throw new Error(type + ' is not a correct icon type');
      }

      var defaultOptions = {
        size: 16,
        className: ''
      };

      this.options = Object.assign({}, defaultOptions, options);
      this.type = type;
      this.html = this.render();
    }

    Private.TipIcon = TipIcon;

    Object.assign(TipIcon.prototype, {
      render: function render() {
        var _options2 = this.options,
            size = _options2.size,
            className = _options2.className;


        this.style(size);

        var klass = void 0;
        switch (this.type) {
          case 'warn':
            klass = WARNING_ICON_CLASS;break;
          case 'success':
            klass = SUCCESS_ICON_CLASS;break;
          case 'info':
            klass = INFO_ICON_CLASS;break;
          default:
            klass = ERROR_ICON_CLASS;
        }
        var icon = $.node('i', '', appendClass(className, TIP_ICON_CLASS, klass), {
          style: {
            width: isNumber(size) ? size + 'px' : size,
            height: isNumber(size) ? size + 'px' : size
          }
        });

        return icon;
      },
      style: function style(size) {
        var _appendStyle2;

        var selector = toSelector(TIP_ICON_CLASS);
        var warnSelector = selector + toSelector(WARNING_ICON_CLASS);
        var succSelector = selector + toSelector(SUCCESS_ICON_CLASS);
        var errSelector = selector + toSelector(ERROR_ICON_CLASS);
        var infoSelector = selector + toSelector(INFO_ICON_CLASS);
        size = parseFloat(size);

        appendStyle((_appendStyle2 = {}, _defineProperty(_appendStyle2, warnSelector + ':before', {
          width: size * 0.125 + 'px',
          height: size * 0.4 + 'px',
          top: size * 0.17 + 'px'
        }), _defineProperty(_appendStyle2, warnSelector + ':after', {
          width: size * 0.125 + 'px',
          height: size * 0.125 + 'px',
          bottom: size * 0.2 + 'px'
        }), _defineProperty(_appendStyle2, succSelector + ':before', {
          width: size * 0.3 + 'px',
          height: size * 0.125 + 'px'
        }), _defineProperty(_appendStyle2, succSelector + ':after', {
          width: size * 0.5 + 'px',
          height: size * 0.125 + 'px'
        }), _defineProperty(_appendStyle2, errSelector + ':before, ' + errSelector + ':after', {
          width: size * 0.5 + 'px',
          height: size * 0.125 + 'px'
        }), _defineProperty(_appendStyle2, infoSelector + ':before', {
          width: size * 0.125 + 'px',
          height: size * 0.125 + 'px',
          top: size * 0.2 + 'px'
        }), _defineProperty(_appendStyle2, infoSelector + ':after', {
          width: size * 0.125 + 'px',
          height: size * 0.4 + 'px',
          bottom: size * 0.17 + 'px'
        }), _appendStyle2));
      }
    });
  }(Private, $);

  window.Private = Private;

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
        var _options3 = this.options,
            tabsText = _options3.tabsText,
            renderPaneItem = _options3.renderPaneItem,
            themeColor = _options3.themeColor,
            paneContainerSelector = _options3.paneContainerSelector;


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
        var _this = this;

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
          _this.prevEl = element;
          _this.prevOriginEl = originalElement;

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
          _this.nextEl = element;
          _this.nextOriginEl = originalElement;

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
      var _this2 = this;

      this.GapOfMessage = defaultOptions.GapOfMessage;
      this.FirstMessagePosTop = defaultOptions.FirstMessagePosTop;

      this.type = type;

      //为每个Message实例的容器创建一个随机className
      var RANDOM_CLASS = buildRandomString();

      var classPrefix = 'message_' + type + '_';
      var icon = new Private.TipIcon(type === 'warning' ? 'warn' : type, {
        className: ICONCLASS
      });
      var text = $.node('span', '', appendClass(TEXTCLASS, classPrefix + 'text_box'));
      var container = $.node('div', icon.html + text, appendClass(CONTAINERCLASS, RANDOM_CLASS, classPrefix + 'container'));
      insertElementToBody($(container));

      domAfterLoad(toSelector(RANDOM_CLASS), function () {
        _this2.$el = $(toSelector(RANDOM_CLASS));
        _this2.$text = _this2.$el.find(toSelector(TEXTCLASS));
      });
    };

    Object.assign(Message.prototype, {
      show: function show(content, duration, onClose) {
        var _this3 = this;

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

          var index = messageList.indexOf(_this3);
          $el.css({
            top: FirstMessagePosTop + index * elHeight + index * GapOfMessage + 'px' // 计算当前实例top值
          });

          setTimeout(function () {
            _this3.hide(onClose);
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
            _options4 = this.options,
            pagination = _options4.pagination,
            navgation = _options4.navgation;


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
        var _options5 = this.options,
            width = _options5.width,
            height = _options5.height,
            bgColor = _options5.bgColor,
            navgation = _options5.navgation;

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
            _options6 = this.options,
            swiperOptions = _options6.swiperOptions,
            pagination = _options6.pagination,
            navgation = _options6.navgation;


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
        var _options7 = this.options,
            dataSource = _options7.dataSource,
            renderItem = _options7.renderItem,
            lineItemNumber = _options7.lineItemNumber;
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
        var _options8 = this.options,
            ratio = _options8.ratio,
            border = _options8.border;


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

    function Alert() {}
  }(window, jQuery, Component);
}(window, window.jQuery, window.Swiper, window.Component, window.Util);