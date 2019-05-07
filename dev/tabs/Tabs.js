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