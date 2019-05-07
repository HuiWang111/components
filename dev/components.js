/**
 * Tabs
 */
;!function (win, $, Util) {

  //tools
  var appendStyle = Util.appendStyle;
  var toSelector = Util.toSelector;
  var isFunction = Util.isFunction;
  var domAfterLoad = Util.domAfterLoad;

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

  //icon
  var prevSvg = '<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"></path></svg>';

  var nextSvg = '<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"></path></svg>';

  var prevSvgDisable = '<svg t="1556266968537" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11039" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="11040" fill="#e6e6e6"></path></svg>';

  var nextSvgDisable = '<svg t="1556267327201" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11183" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11184" fill="#e6e6e6"></path></svg>';
  
  /**
   *  options: {
   *    tabsText: Array,
   *    paneContainerSelector: String,
   *    themeColor: String,
   *    useStyle: true | false, //不引入css文件，js生成<style>标签,弊端：display:flex;兼容写法无法处理
   *    onChange: Function(index),
   *    renderPaneItem: Function(tabName, index)
   *  }
   */
  function Tabs(container, options) {

    //default
    var defaultOptions = {
      tabsText: null,
      paneContainerSelector: null,
      themeColor: '#1890ff',
      useStyle: false,
      onChange: null,
      renderPaneItem: null
    };

    Object.assign(defaultOptions, options);

    if (Array.isArray(defaultOptions.tabsText)) {

      var $container = $(container);
      $container.addClass('flex');
      $container.css({
        'overflow': 'hidden'
      });
      this.$container = $container;
  
      this.initStyle(defaultOptions);
      
      this.createDom(defaultOptions);
  
      var TABS = this;
      domAfterLoad(toSelector(TAB_ITEM_WRAP_CLASS), function () { // 判断元素是否挂载完成
  
        TABS.$wrap = $(toSelector(TAB_ITEM_WRAP_CLASS));
        
        TABS.onChange = defaultOptions.onChange;
  
        TABS.bindEvent();
  
      });
    }

  };

  win.Tabs = Tabs;

  Tabs.prototype = {

    initStyle: function (options) {

      if (options.useStyle) {
        appendStyle({".flex":{"display":"-webkit-box","display":"-moz-box","display":"-webkit-flex","display":"-moz-flex","display":"-ms-flexbox","display":"flex"},".flex-1":{"-webkit-box-flex":1,"-moz-box-flex":1,"-webkit-flex":1,"-ms-flex":1,"flex":1,},".flex-column":{"-moz-flex-direction":"column","-webkit-flex-direction":"column","-ms-flex-direction":"column","flex-direction":"column",},".tabs-tab-wrapper":{"overflow":"hidden","white-space":"nowrap"},".tabs-tab-wrapper .tabs-tab-inner":{"display":"inline-block","transition":"all .5s"},".tabs-tab-wrapper .tabs-tab-item":{"display":"inline-block","padding":"12px 16px","cursor":"pointer"},".tabs-tab-wrapper .tabs-underline":{"height":"2px","transition":"all .5s"},".tabs-arrow":{"width":"30px","position":"relative"},".tabs-arrow.tabs-arrow-invisible":{"display":"none"},".tabs-arrow svg":{"width":"15px","height":"15px","position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)","cursor":"pointer"},".tabs-arrow.tabs-arrow-disable svg":{"cursor":"not-allowed"},".tabs-pane-wrapper":{"transition":"all .5s"},".tabs-pane-item":{"display":"inline-block","vertical-align":"top"}});
      }

      var $paneContainer = $(options.paneContainerSelector);
      var isIncludePane = $paneContainer.length > 0;
      this.isIncludePane = isIncludePane;
      if (isIncludePane) {
        $paneContainer.css({
          'overflow': 'hidden'
        });
        this.$paneContainer = $paneContainer;
      }

      var color = options.themeColor;
      appendStyle({
        '.tabs-tab-item-active': {
          'color': color
        },
        '.tabs-tab-item:hover': {
          'color': color
        }
      });
    },

    createDom: function (options) {
      var tabs = '', panes = '';
      var $container = this.$container;
      var $paneContainer = this.$paneContainer;
      var isIncludePane = this.isIncludePane;

      options.tabsText.forEach(function (tabText, index) {
        var klass = index === 0 ? TAB_ITEM_CLASS.appendClass(TAB_ITEM_CLASS_ACTIVE) : TAB_ITEM_CLASS;
        
        //tab
        var tab = $.node('div', tabText, klass);
        tabs += tab;
  
        //pane
        if (isIncludePane) {
          var paneClass = index === 0 ? PANE_ITEM_CLASS.appendClass(PANE_ITEM_CLASS_ACTIVE) : PANE_ITEM_CLASS;
          var paneInner = isFunction(options.renderPaneItem) ? options.renderPaneItem(tabText, index) : '';
          var pane = $.node('div', paneInner, paneClass);
          panes += pane;
        }
      });
      
      var underline = $.node('div', '', UNDERLINE_CLASS, { style: {'background-color': options.themeColor} });
  
      var tabsInner = $.node('div', tabs + underline, TAB_ITEM_INNER_CLASS);
      var tabsWrap = $.node('div', tabsInner, TAB_ITEM_WRAP_CLASS.appendClass('flex-1'));
  
      var prev = $.node('div', prevSvgDisable, TAB_PREVIOUS_ARROW_CLASS.appendClass(TAB_ARROW_CLASS).appendClass(TAB_ARROW_CLASS_DISABLE).appendClass(TAB_ARROW_CLASS_INVISIBLE));
      var next = $.node('div', nextSvg, TAB_NEXT_ARROW_CLASS.appendClass(TAB_ARROW_CLASS).appendClass(TAB_ARROW_CLASS_INVISIBLE));
  
      $container.html(prev + tabsWrap + next);
      isIncludePane && $paneContainer.html($.node('div', panes, PANE_ITEM_WRAP_CLASS));
    },

    bindEvent: function () {
      var tabs = this;
      var $tabWrap = tabs.$wrap;
      var $tabItems = $tabWrap.find(toSelector(TAB_ITEM_CLASS));
      var $underline = $tabWrap.find(toSelector(UNDERLINE_CLASS));
      var isIncludePane = tabs.isIncludePane;

      // 计算每个tab的宽度
      var tabItemsWidthList = $tabItems.map(function (_, tabItem) {
        return $(tabItem).outerWidth();
      });

      // underline宽度 = tab宽度
      $underline.width(tabItemsWidthList[0]);

      //pane宽度
      if (isIncludePane) {
        var paneWidth = tabs.$paneContainer.width();
        var paneHeight = tabs.$paneContainer.height();
  
        var $paneWrap = tabs.$paneContainer.find(toSelector(PANE_ITEM_WRAP_CLASS));
        var $panes = tabs.$paneContainer.find(toSelector(PANE_ITEM_CLASS));
  
        $panes.width(paneWidth);
        $panes.height(paneHeight);
        $paneWrap.width(paneWidth*($panes.length));
        $paneWrap.height(paneHeight);
      }

      //arrow
      var $arrow = tabs.$container.find(toSelector(TAB_ARROW_CLASS));

      var $tabInner = $tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
      var wrapWidth = $tabWrap.width();
      var innerWidth = $tabInner.width();
      if (wrapWidth < innerWidth) {
        $arrow.removeClass(TAB_ARROW_CLASS_INVISIBLE);

        wrapWidth = $tabWrap.width(); //重新计算外包元素宽度
        var prevDistance = 0, nextDistance = innerWidth - wrapWidth;
        $arrow.on('click', function () {
          var $this = $(this);

          if ($this.hasClass(TAB_PREVIOUS_ARROW_CLASS)) {
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
            if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {

              var translateXValue = $tabInner.translateX();
              translateXValue = isNaN(translateXValue) ? 0 : translateXValue;
              $tabInner.translateX(function () {
                var distance = nextDistance < wrapWidth ? nextDistance : wrapWidth;
                prevDistance += distance;
                nextDistance -= distance;
                return translateXValue + (-distance);
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
      }

      //click tab item
      $tabItems.on('click', function() {
        
        if ( !$(this).hasClass(TAB_ITEM_CLASS_ACTIVE) ) {

          // change active
          $(this).addClass(TAB_ITEM_CLASS_ACTIVE).siblings(toSelector(TAB_ITEM_CLASS_ACTIVE)).
            removeClass(TAB_ITEM_CLASS_ACTIVE);

          var index = Array.from($tabItems).indexOf(this);

          // move underline
          $underline.width(tabItemsWidthList[index]);
          $underline.translateX(function () {
            var i, distance = 0;
            for (i = 0; i < index; i++) {
              distance += tabItemsWidthList[i];
            }
            return distance;
          });

          // change pane
          if (isIncludePane) {
            $paneWrap.translateX(-(paneWidth*index));
            $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE).siblings(toSelector(PANE_ITEM_CLASS_ACTIVE)).
              removeClass(PANE_ITEM_CLASS_ACTIVE);
          }

          isFunction(tabs.onChange) && tabs.onChange(index);

        }
      });
    }

  }

}(window, jQuery, Util)

/**
 * Pagination
 */
;!function (win, $, Util) {

  var isNumber = Util.isNumber;
  var appendStyle = Util.appendStyle;
  var toSelector = Util.toSelector;
  var isFunction = Util.isFunction;


  //className
  var PAGINATION_ITEM_CLASS = 'pagination-item';
  var PAGINATION_ITEM_CLASS_ACTIVE = 'pagination-item-active';
  var PAGINATION_ITEM_CLASS_BORDER = 'pagination-item-border';
  // var PAGINATION_ITEM_CLASS_MORE = 'pagination-item-more';
  var PAGINATION_ITEM_CLASS_DISABLE = 'pagination-item-disable';
  var PAGINATION_ITEM_CLASS_PREV = 'pagination-item-previous';
  var PAGINATION_ITEM_CLASS_NEXT = 'pagination-item-next';


  //icon
  var prevSvg = '<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"></path></svg>';

  var nextSvg = '<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"></path></svg>';

  var prevSvgDisable = '<svg t="1556266968537" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11039" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="11040" fill="#e6e6e6"></path></svg>';

  var nextSvgDisable = '<svg t="1556267327201" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11183" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11184" fill="#e6e6e6"></path></svg>';
  
  /**
   *  options: {
   *    total: Numer,
   *    pageSize: Number,
   *    current: Number,
   *    border: true | false, // 页码是否需要边框
   *    themeColor: String,
   *    useStyle: true | false, // 不引入css文件，使用<style>标签
   *    onChange: Function (current),
   *    itemRender: Function (current, type, originalElement)
   *  }
   */
  function Pagination(container, options) {

    //default
    var defaultOptions = {
      total: 0,
      pageSize: 10,
      current: 1,
      border: true,
      themeColor: '#1890ff',
      useStyle: false,
      onChange: null,
      itemRender: null
    };

    Object.assign(defaultOptions, options);

    var mustBeNumber = ['total', 'pageSize', 'current'];
    for (var key in defaultOptions) {
      if (mustBeNumber.indexOf(key) > -1) {
        if (!isNumber(defaultOptions[key])) throw new Error('`' + key + '` must be a number or string number');
      }
    }

    var total = parseInt(defaultOptions.total);

    if (total > 0) {

      //initStyle
      var themeColor = defaultOptions.themeColor;
      appendStyle({
        '.pagination-item.pagination-item-active > a': {
          'color': themeColor
        },
        '.pagination-item.pagination-item-active.pagination-item-border': {
          'border-color': themeColor
        },
        '.pagination-item:hover > a': {
          'color': themeColor
        }
      });
  
      //useStyle
      if (defaultOptions.useStyle) {
        appendStyle({"ul":{"list-style":"none","padding":0,"margin":0},".pagination-item, .pagination-item-previous,.pagination-item-next":{"display":"inline-block","width":"30px","height":"30px","line-height":"30px","text-align":"center","border-radius":"4px","cursor":"pointer","vertical-align":"top","box-sizing":"border-box"},".pagination-item-previous, .pagination-item-next":{"width":"auto","min-width":"30px"},".pagination-item.pagination-item-border":{"border":"solid #d9d9d9 1px"},".pagination-item + .pagination-item,.pagination-item-next":{"margin-left":"8px"},".pagination-item-previous":{"margin-right":"8px"},".pagination-item > a, .pagination-item-previous > a, .pagination-item-next > a":{"display":"inline-block","width":"100%","height":"100%","color":"rgba(0, 0, 0, 0.65)","font-weight":100,"vertical-align":"top"},".pagination-item-previous > a > svg, .pagination-item-next > a > svg":{"width":"12px","height":"12px"},".pagination-item-previous.pagination-item-disable > a,.pagination-item-next.pagination-item-disable > a":{"color":"#d9d9d9","cursor":"not-allowed"}});
      }
      
      var $container = $(container);
      if ($container[0].tagName.toLowerCase() !== 'ul') throw new Error('`container` must be a ul element');
      this.$container = $container;
  
      pageSize = parseInt(defaultOptions.pageSize);
      current = parseInt(defaultOptions.current);
  
      var totalPage = Math.ceil(total/pageSize);
      this.totalPage = totalPage;
  
      var itemRender = defaultOptions.itemRender;
      this.createDom(defaultOptions, current, totalPage, itemRender);
      
      this.onChange = defaultOptions.onChange;
      this.bindEvent();

    }
  }

  win.Pagination = Pagination;

  Pagination.prototype = {

    createDom: function (options, current, totalPage, itemRender) {
      var $container = this.$container;

      //pagination
      var i, ulInner = '';
      for (i = 1; i <= totalPage; i++) {
        var klass = i === current ? PAGINATION_ITEM_CLASS.appendClass(PAGINATION_ITEM_CLASS_ACTIVE) : PAGINATION_ITEM_CLASS;
        klass = options.border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;

        var originalElement = $.node('a', i);
        var element = isFunction(itemRender) ? itemRender(i, 'pagination', originalElement) : originalElement;

        var pagination;
        klass = klass.appendClass(PAGINATION_ITEM_CLASS + '-' + i);
        pagination = $.node('li', element, klass);
        /* 
        if (totalPage < 10) {
          klass = klass.appendClass(PAGINATION_ITEM_CLASS + '-' + i);
          pagination = $.node('li', element, klass);
        } else {
          if (current < 5) {
            if (i <= 5) {
              klass = klass.appendClass(PAGINATION_ITEM_CLASS + '-' + i);
              pagination = $.node('li', element, klass);
            } else {

            }
          }
        } 
        */

        ulInner += pagination;
      }

      //previous
      var Pagination = this;
      var previous = function () {
        var klass = current === 1 ? PAGINATION_ITEM_CLASS_DISABLE : '';
        klass = options.border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;

        var svg = current === 1 ? prevSvgDisable : prevSvg;
        var originalElement = $.node('a', svg);

        var element = isFunction(itemRender) ? itemRender(null, 'prev', originalElement) : originalElement;
        Pagination.prevEl = element;
        Pagination.prevOriginEl = originalElement;

        return $.node('li', element, klass.appendClass(PAGINATION_ITEM_CLASS_PREV));
      }
      var prevItem = previous();

      //next
      var next = function () {
        var klass = current === totalPage ? PAGINATION_ITEM_CLASS_DISABLE : '';
        klass = options.border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;

        var svg = current === totalPage ? nextSvgDisable : nextSvg;
        var originalElement = $.node('a', svg);

        var element = isFunction(itemRender) ? itemRender(null, 'next', originalElement) : originalElement;
        Pagination.nextEl = element;
        Pagination.nextOriginEl = originalElement;

        return $.node('li', element, klass.appendClass(PAGINATION_ITEM_CLASS_NEXT));
      }
      var nextItem = next();

      $container.html(prevItem + ulInner + nextItem);

    },

    bindEvent: function () {

      var Pagination = this;
      var $container = Pagination.$container;
      var onChange = Pagination.onChange;
      var totalPage = Pagination.totalPage;

      var $next = $container.find(toSelector(PAGINATION_ITEM_CLASS_NEXT));
      var $prev = $container.find(toSelector(PAGINATION_ITEM_CLASS_PREV));
      var $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
      

      //click previous button
      $prev.on('click', function () {
        var $this = $(this);
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          var current = parseInt($active.children('a').text());

          $active.removeClass(PAGINATION_ITEM_CLASS_ACTIVE).prev().addClass(PAGINATION_ITEM_CLASS_ACTIVE);

          current = current - 1;

          if ( (current !== totalPage) && ($next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.nextEl === Pagination.nextOriginEl) && $next.children('a').html(nextSvg);
            $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }

          if ( (current === 1) && (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.prevEl === Pagination.prevOriginEl) && $this.children('a').html(prevSvgDisable);
            $this.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }

          isFunction(onChange) && onChange(current);
        }
      });

      //click next button
      $next.on('click', function () {
        var $this = $(this);
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          var $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          var current = parseInt($active.children('a').text());

          $active.removeClass(PAGINATION_ITEM_CLASS_ACTIVE).next().addClass(PAGINATION_ITEM_CLASS_ACTIVE);

          current = current + 1;

          if ( (current !== 1) && ($prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.prevEl === Pagination.prevOriginEl) && $prev.children('a').html(prevSvg);
            $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
          }

          if ( (current === totalPage) && (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
            (Pagination.nextEl === Pagination.nextOriginEl) && $this.children('a').html(nextSvgDisable);
            $this.addClass(PAGINATION_ITEM_CLASS_DISABLE);
          }

          isFunction(onChange) && onChange(current);
        }
      });

      //click paginations
      $pagination.on('click', function () {
        var $this = $(this);
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_ACTIVE)) {
          $this.addClass(PAGINATION_ITEM_CLASS_ACTIVE)
            .siblings(toSelector(PAGINATION_ITEM_CLASS_ACTIVE)).removeClass(PAGINATION_ITEM_CLASS_ACTIVE);

          var current = parseInt($this.children('a').text());

          if ($prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            if (current !== 1) {
              $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
              (Pagination.prevEl === Pagination.prevOriginEl) && $prev.children('a').html(prevSvg);
            }
          } else {
            if (current === 1) {
              $prev.addClass(PAGINATION_ITEM_CLASS_DISABLE);
              (Pagination.prevEl === Pagination.prevOriginEl) && $prev.children('a').html(prevSvgDisable);
            }
          }

          if ($next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
            if (current !== totalPage) {
              $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
              (Pagination.nextEl === Pagination.nextOriginEl) && $next.children('a').html(nextSvg);
            }
          } else {
            if (current === totalPage) {
              $next.addClass(PAGINATION_ITEM_CLASS_DISABLE);
              (Pagination.nextEl === Pagination.nextOriginEl) && $next.children('a').html(nextSvgDisable);
            }
          }

          isFunction(onChange) && onChange(current);
        }
      });

    }

  };

}(window, jQuery, Util)

/**
 * Message
 */
;!function (win, $, Util) {

  // tools
  var insertElementToBody = Util.insertElementToBody;
  var isFunction = Util.isFunction;
  var toSelector = Util.toSelector;
  var buildRandomString = Util.buildRandomString;
  var domAfterLoad = Util.domAfterLoad;

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
   *  options: {
   *    FirstMessagePosTop: Number,
   *    GapOfMessage: Number
   *  }
   */
  var Message = function(type) {

    this.GapOfMessage = defaultOptions.GapOfMessage;
    this.FirstMessagePosTop = defaultOptions.FirstMessagePosTop;

    this.type = type;

    //为每个Message实例的容器创建一个随机className
    var RANDOM_CLASS = buildRandomString();

    var icon = $.node('i', '', ICONCLASS.appendClass('message_' + type + '_icon'));
    var text = $.node('span', '', TEXTCLASS.appendClass('message_' + type + '_text_box'));
    var container = $.node('div', icon + text, CONTAINERCLASS.appendClass(RANDOM_CLASS).appendClass('message_' + type + '_container'));
    insertElementToBody($(container));
    
    var MESSAGE = this;
    domAfterLoad(toSelector(RANDOM_CLASS), function () {
      MESSAGE.$el = $(toSelector(RANDOM_CLASS));
      MESSAGE.$text = MESSAGE.$el.find(toSelector(TEXTCLASS));
    });
    
  };

  Message.prototype = {

    show: function(content, duration, onClose) {

      var $el = this.$el;
      var $text = this.$text;
      
      $el[0].style = "";

      var time;
      if (isFunction(duration)) { // 当第二个参数为函数时，将函数赋值给onClose, 显示时间使用默认
        onClose = duration; 
        time = 3;
      } else {
        duration = parseFloat(duration);
        time = isNaN(duration) ? 3 : duration; // 默认显示3秒后隐藏
      }

      var elHeight = $el.outerHeight();

      var message = this;
      var FirstMessagePosTop = this.FirstMessagePosTop;
      var GapOfMessage = this.GapOfMessage;
      setTimeout(function () {

        $text.text(content);
        $el.addClass('comedown');

        var index = messageList.indexOf(message);
        $el.css({
          'top': FirstMessagePosTop + index*elHeight + index*GapOfMessage + 'px' // 计算当前实例top值
        });

        setTimeout(function () {
          message.hide(onClose);
        }, time * 1000);

      }, 0);

    },

    hide: function (onClose) {

      var $el = this.$el;
      var $text = this.$text;

      var index = messageList.indexOf(this);
      messageList.splice(index, 1);

      ($el[0].style.top !== '') && ($el[0].style.top = '');
      $el.removeClass('comedown');
      isFunction(onClose) && onClose();
      setTimeout(function () {
        $text.text('');
      }, 1000);

    }

  };

  var message = {};
  message.setting = function (options) {
    Object.assign(defaultOptions, options);
  };

  var messageList = [];
  var warningList = [];
  message.warning = function (content, duration, onClose) {
    //获取页面中隐藏的warning提示框
    var hiddenWarning = warningList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });
    
    //有隐藏的提示框就直接用该实例，否则创建新实例
    if (hiddenWarning.length > 0) {
      messageList.push(hiddenWarning[0]);
      hiddenWarning[0].show(content, duration, onClose);
    } else {
      var warning = new Message('warning');
      messageList.push(warning);
      warning.show(content, duration, onClose);
      warningList.push(warning);
    }

  };

  var successList = [];
  message.success = function (content, duration, onClose) {

    var hiddenSuccess = successList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenSuccess.length > 0) {
      messageList.push(hiddenSuccess[0]);
      hiddenSuccess[0].show(content, duration, onClose);
    } else {
      var success = new Message('success');
      messageList.push(success);
      success.show(content, duration, onClose);
      successList.push(success);
    }

  };

  var errorList = [];
  message.error = function (content, duration, onClose) {
    
    var hiddenError = errorList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenError.length > 0) {
      messageList.push(hiddenError[0]);
      hiddenError[0].show(content, duration, onClose);
    } else {
      var error = new Message('error');
      messageList.push(error);
      error.show(content, duration, onClose);
      errorList.push(error);
    }

  };

  var infoList = [];
  message.info = function (content, duration, onClose) {

    var hiddenInfo = infoList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenInfo.length > 0) {
      messageList.push(hiddenInfo[0]);
      hiddenInfo[0].show(content, duration, onClose);
    } else {
      var info = new Message('info');
      messageList.push(info);
      info.show(content, duration, onClose);
      infoList.push(info);
    }

  };

  win.message = message;

}(window, jQuery, Util)

/**
 * Gallery
 */
;!function (win, $, Swiper, Util) {  
  
  // tools
  function isImgEl(el) {
    if (typeof el.length !== 'undefined') {
      return el[0].tagName.toLowerCase() === 'img';
    }
    return el.tagName.toLowerCase() === 'img';
  }
  var insertElementToBody = Util.insertElementToBody;
  var toSelector = Util.toSelector;
  var isTrueNumber = Util.isTrueNumber;
  var isNumber = Util.isNumber;
  var appendStyle = Util.appendStyle;
  var buildRandomString = Util.buildRandomString;
  var domAfterLoad = Util.domAfterLoad;

  // className
  var GALLERY_BUTTON_NEXT_CLASS = 'gallery-swiper-button-next';
  var GALLERY_BUTTON_PREV_CLASS = 'gallery-swiper-button-prev';
  var GALLERY_PAGINATION_CLASS = 'gallery-swiper-pagination';
  var GALLERY_SWIPER_CONTAINER_CLASS = 'gallery-swiper-container';
  var GALLERY_WRAPPER_CLASS = 'gallery-wrapper';
  var GALLERY_CONTAINER_CLASS = 'gallery-contaier';
  var GALLERY_CONTAINER_CLASS_HIDDEN = 'gallery-contaier-invisible';
  
  /**
   *  options: {
   *    navgation: true | false, // 是否需要导航箭头
   *    pagination: true | false, // 是否需要分页器
   *    width: String | Number, // 百分比或者px, 移动端宽高通常使用默认的100%
   *    height: String | number,
   *    bgColor: String,
   *    useStyle: true | false,
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
      useStyle: false,
      swiperOptions: {}
    };

    Object.assign(defaultOptions, options);

    if ( (defaultOptions.width === '100%') && defaultOptions.navgation ) defaultOptions.navgation = false; // 宽度100%时不使用导航箭头

    if (defaultOptions.useStyle) {
      appendStyle({"html, body":{"height":"100%"},".gallery-contaier":{"width":"100%","height":"100%","position":"fixed","left":0,"top":0,},".gallery-contaier.gallery-contaier-invisible":{"display":"none"},".gallery-contaier .gallery-wrapper":{"position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)","z-index":1},".gallery-contaier .gallery-wrapper .gallery-swiper-container":{"width":"100%","height":"100%","margin":"0 auto"},".gallery-contaier .gallery-swiper-container .swiper-slide":{"position":"relative"},".gallery-contaier .gallery-swiper-container .swiper-slide img":{"width":"100%","position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)"},".swiper-pagination-bullet-active":{"background-color":"#fff"},".swiper-button-next":{"right":0},".swiper-button-prev":{"left":0}});
    }

    // $source = $(selector);
    this.$source = $(selector);

    // 为每个实例容器创建一个随机className
    var RANDOM_CLASS = buildRandomString();
    this.randomClassName = RANDOM_CLASS;

    // 获取当前页面最大的z-index值
    var $hasZIndex = $('*').filter(function (_, item) {
      return isNumber($(item).css('z-index')) && parseInt($(item).css('z-index')) > 0;
    });
    var maxZIndex = $hasZIndex.length === 0 ? null : Array.from($hasZIndex).reduce(function (prev, item) {
      var zIndex = parseFloat($(item).css('z-index'));
      return zIndex > prev ? zIndex : prev;
    }, -1000000);

    // srcList
    var srcList = this.createSrcList();

    // 创建html元素，并合并到body下
    var pagination = defaultOptions.pagination;
    var navgation = defaultOptions.navgation;
    this.createDom(srcList, pagination, navgation);

    // 处理swiper配置
    swiperOptions = defaultOptions.swiperOptions;
    this.swiperOptionsHandler(swiperOptions, pagination, navgation);

    var GALLERY = this;
    domAfterLoad(toSelector(RANDOM_CLASS), function () { // 判断元素是否挂载完成
      // gallery实例容器
      GALLERY.$container = $(toSelector(RANDOM_CLASS));

      // 初始化样式
      var width = defaultOptions.width, height = defaultOptions.height;
      var bgColor = defaultOptions.bgColor;
      GALLERY.setStyle(maxZIndex, width, height, bgColor, navgation);

      GALLERY.bindEvent(swiperOptions);

    });

  }

  win.Gallery = Gallery;

  Gallery.prototype = {

    createSrcList: function () {

      var eleList = Array.from(this.$source);

      //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
      eleList = eleList.filter(function (item) {
        var isImg = isImgEl(item);
        var $img = !isImg ? $(item).find('img') : null;
        return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
      });

      //生成img元素的src列表
      var srcList  = eleList.map(function (item) {
        return item.src || $(item).find('img')[0].src;
      });
  
      return srcList;
    },

    createDom: function (srcList, pagination, navgation) {

      var RANDOM_CLASS = this.randomClassName;
      
      var slideList = srcList.map(function (src) {
        return $.node('div', '<img src="' + src + '" />', 'swiper-slide');
      });
  
      var swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
  
      if (pagination) {
        swiperWrapper += $.node('div', '', GALLERY_PAGINATION_CLASS.appendClass('swiper-pagination'));
      }
  
      var swiperContainer = $.node('div', swiperWrapper, GALLERY_SWIPER_CONTAINER_CLASS.appendClass('swiper-container'));
  
      if (navgation) {
        swiperContainer += $.node('div', '', GALLERY_BUTTON_PREV_CLASS.appendClass('swiper-button-prev')) + $.node('div', '', GALLERY_BUTTON_NEXT_CLASS.appendClass('swiper-button-next'));
      }
  
      var galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
  
      var galleryContainer = $.node('section', galleryWrappper, GALLERY_CONTAINER_CLASS.appendClass(GALLERY_CONTAINER_CLASS_HIDDEN).appendClass(RANDOM_CLASS));
  
      // 将gallery容器添加到body
      var $gallery = $(galleryContainer);
      insertElementToBody($gallery);
  
    },

    swiperOptionsHandler: function (swiperOptions, pagination, navgation) {

      var RANDOM_CLASS = this.randomClassName;
  
      if (swiperOptions.pagination) delete swiperOptions.pagination;
      if (swiperOptions.nextButton) delete swiperOptions.nextButton;
      if (swiperOptions.prevButton) delete swiperOptions.prevButton;
  
      if (pagination) swiperOptions.pagination = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_PAGINATION_CLASS));
      if (navgation) {
        swiperOptions.nextButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_NEXT_CLASS));
        swiperOptions.prevButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_PREV_CLASS));
      }
      swiperOptions.observer = true;
      swiperOptions.observeParents = true;
  
    },

    setStyle: function (maxZIndex, width, height, bgColor, navgation) {

      var $container = this.$container;
      // 设置gallery元素的z-index为当前页面z-index最大值+1
      $container.css({
        'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
      });
  
      // 设置swiper容器宽高
      var containerWidth = $container.width();
      var percentReg = /%$/;
      var widthValue = percentReg.test(width) ? containerWidth*(parseFloat(width)/100) : parseFloat(width);
      
      if (widthValue > containerWidth) {
        width = '100%';
        widthValue = containerWidth;
      }
      var diff = containerWidth - widthValue;
      var wider = diff > 0 ? (diff > 100 ? 100 : wider) : 0;
      
      width = isTrueNumber(width) ? width + 'px' : width;
      height =  isTrueNumber(height) ? height + 'px' : height;
  
      var $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
      $galleryWrapper.css({
        'width': navgation ? (percentReg.test(width) ? (widthValue + wider) + 'px' : (parseFloat(width) + wider) + 'px') : width,
        'height': height
      });
      $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
        'width': width,
        'height': height
      });
  
      // 设置gallery容器宽高，默认透明背景
      $container.css({
        'background-color': bgColor
      });
  
    },

    bindEvent: function (swiperOptions) {
      var $container = this.$container;
      var RANDOM_CLASS = this.randomClassName;
  
      // 点击初始化gallery swiper
      var GALLERY = this;
      GALLERY.$swiper = null;
      var $source = this.$source;
      $source.on('click', function () {
        var target = this;
        var index = Array.from($source).indexOf(target);
  
        if (!GALLERY.$swiper) {
          (index > 0) && (swiperOptions.initialSlide = index);
          GALLERY.$swiper = new Swiper(toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
        } else {
          GALLERY.$swiper.slideTo(index, 0, false);
        }
  
        $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      });
  
      // 隐藏gallery容器
      var close = function () {
        $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      }
      $container.on('click', close);
  
      var stopPropagation = function (e) {
        e.stopPropagation();
      }
      $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
  
    }

  };

}(window, jQuery, Swiper, Util)