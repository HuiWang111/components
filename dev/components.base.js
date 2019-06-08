;!function (window, jQuery, Swiper, Component, Util) {

  /* utils */
  const {
    isString,
    isObject,
    isEmptyObject,
    isFunction,
    isNumber,
    isNumeric,
    isDom,
    toSelector,
    appendStyle,
    insertElementToBody,
    domAfterLoad,
    tagOf,
    remove,
    difference,
    uniq,
    ins,
    makeArray,
    keyOf,
    deleteKeys,
    dateFormater,
    buildRandomString,
    toNumber,
    SetMock
  } = Util;
  
  /* icons */
  const prevSvg = '<svg t="1556267832953" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="12284"></path></svg>';
  
  const nextSvg = '<svg t="1556267747828" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11819" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11820"></path></svg>';
  
  const prevSvgDisable = '<svg t="1556266968537" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11039" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M340.01899999 512l416.35800001 416.332-36.198 36.224-452.557-452.557 452.557-452.557 36.198 36.224z" p-id="11040" fill="#e6e6e6"></path></svg>';
  
  const nextSvgDisable = '<svg t="1556267327201" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11183" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M683.981 511.9999999999999l-416.3580000000001-416.3319999999998 36.197999999999986-36.224000000000004 452.55700000000013 452.55699999999985-452.55699999999985 452.55700000000013-36.198000000000015-36.223999999999975z" p-id="11184" fill="#e6e6e6"></path></svg>';
  
  /* 全局缓存区 */
  const GlobalCache = {};
  
  /* ========Components======== */
  
  /* Tab组件 */
  !function (win, $, Component) {
  
    //className
    const TAB_ITEM_CLASS = 'tabs-tab-item';
    const TAB_ITEM_CLASS_ACTIVE = 'tabs-tab-item-active';
    const TAB_ITEM_WRAP_CLASS = 'tabs-tab-wrapper';
    const TAB_ITEM_INNER_CLASS = 'tabs-tab-inner';
  
    const PANE_ITEM_CLASS = 'tabs-pane-item';
    const PANE_ITEM_CLASS_ACTIVE = 'tabs-pane-item-active';
    const PANE_ITEM_WRAP_CLASS = 'tabs-pane-wrapper';
  
    const TAB_ARROW_CLASS = 'tabs-arrow';
    const TAB_ARROW_CLASS_DISABLE = 'tabs-arrow-disable';
    const TAB_ARROW_CLASS_INVISIBLE = 'tabs-arrow-invisible';
    const TAB_PREVIOUS_ARROW_CLASS = 'tabs-prev-arrow';
    const TAB_NEXT_ARROW_CLASS = 'tabs-next-arrow';
  
    const UNDERLINE_CLASS = 'tabs-underline';
    
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
      const defaultOptions = {
        tabsText: [],
        paneContainerSelector: null,
        themeColor: '#1890ff',
        onChange: null,
        renderPaneItem: null
      };
  
      this.options = Object.assign({}, defaultOptions, options);
      this.$container = $(selector);
      if (this.$container.length < 1) throw new Error('not found `' + selector + '` Element');
      this.super();
    };
  
    $.inherit(Component, Tabs);
  
    win.Tabs = Tabs;
  
    Object.assign(Tabs.prototype, {
      render () {
        const { tabsText, renderPaneItem, themeColor, paneContainerSelector } = this.options;
  
        let tabs = '', panes = '';
        const $container = this.$container;
        const $paneContainer = $(paneContainerSelector);
        const isIncludePane = $paneContainer.length > 0;
  
        this.isIncludePane = isIncludePane;
        this.$paneContainer = $paneContainer;
  
        tabsText.forEach(function (tabText, index) {
          const klass = index === 0 ? TAB_ITEM_CLASS.appendClass(TAB_ITEM_CLASS_ACTIVE) : TAB_ITEM_CLASS;
          
          //tab
          let tab = $.node('div', tabText, klass);
          tabs += tab;
          
          //pane
          if (isIncludePane) {
            const paneClass = index === 0 ? PANE_ITEM_CLASS.appendClass(PANE_ITEM_CLASS_ACTIVE) : PANE_ITEM_CLASS;
            const paneInner = isFunction(renderPaneItem) ? renderPaneItem(tabText, index) : '';
            const pane = $.node('div', paneInner, paneClass);
            panes += pane;
          }
        });
        
        const underline = $.node('div', '', UNDERLINE_CLASS, { style: {'background-color': themeColor} });
    
        const tabsInner = $.node('div', tabs + underline, TAB_ITEM_INNER_CLASS);
        const tabsWrap = $.node('div', tabsInner, TAB_ITEM_WRAP_CLASS);
    
        const prev = $.node('div', prevSvgDisable, TAB_PREVIOUS_ARROW_CLASS.appendClass(TAB_ARROW_CLASS).appendClass(TAB_ARROW_CLASS_DISABLE).appendClass(TAB_ARROW_CLASS_INVISIBLE));
        const next = $.node('div', nextSvg, TAB_NEXT_ARROW_CLASS.appendClass(TAB_ARROW_CLASS).appendClass(TAB_ARROW_CLASS_INVISIBLE));
        
        return [{
          html: prev + tabsWrap + next,
          container: $container
        }, {
          html: $.node('div', panes, PANE_ITEM_WRAP_CLASS),
          container: $paneContainer,
          condition: isIncludePane
        }];
      },
  
      style () {
  
        /* tabs style */
        const { themeColor } = this.options;
        const { isIncludePane, $container, $paneContainer } = this;
  
        $container.addClass('flex');
        $container.css({
          'overflow': 'hidden'
        });
  
        appendStyle({
          '.tabs-tab-item-active': {
            'color': themeColor
          },
          '.tabs-tab-item:hover': {
            'color': themeColor
          }
        });
  
        /* panes style */
        if (isIncludePane) {
          $paneContainer.css({
            'overflow': 'hidden'
          });
          this.$paneContainer = $paneContainer;
  
          const paneWidth = $paneContainer.width();
          const paneHeight = $paneContainer.height();
          this.paneWidth = paneWidth;
    
          const $paneWrap = $paneContainer.find(toSelector(PANE_ITEM_WRAP_CLASS));
          const $panes = $paneContainer.find(toSelector(PANE_ITEM_CLASS));
    
          $panes.width(paneWidth);
          $panes.height(paneHeight);
          $paneWrap.width(paneWidth*($panes.length));
          $paneWrap.height(paneHeight);
        }
      },
  
      bindEvents () {
        const { $container, $paneContainer, paneWidth, options } = this;
        const { onChange } = options;
  
        const $tabWrap = $container.find(toSelector(TAB_ITEM_WRAP_CLASS));
        const $tabItems = $tabWrap.find(toSelector(TAB_ITEM_CLASS));
        const $underline = $tabWrap.find(toSelector(UNDERLINE_CLASS));
        const isIncludePane = this.isIncludePane;
  
        this.$tabItems = $tabItems;
  
        // 计算每个tab的宽度
        const tabItemsWidthList = $tabItems.map((_, tabItem) => {
          return $(tabItem).outerWidth();
        });
  
        // underline宽度 = tab宽度
        $underline.width(tabItemsWidthList[0]);
  
        //arrow
        const $arrow = $container.find(toSelector(TAB_ARROW_CLASS));
  
        const $tabInner = $tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
        let wrapWidth = $tabWrap.width();
        const innerWidth = $tabInner.width();
        if (wrapWidth < innerWidth) { // 显示左右切换箭头
          $arrow.removeClass(TAB_ARROW_CLASS_INVISIBLE);
  
          wrapWidth = $tabWrap.width(); //重新计算外包元素宽度
          let prevDistance = 0, nextDistance = innerWidth - wrapWidth;
          $arrow.on('click', function () {
            const $this = $(this);
  
            if ($this.hasClass(TAB_PREVIOUS_ARROW_CLASS)) { // 点击左箭头
              if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
  
                const translateXValue = $tabInner.translateX();
                $tabInner.translateX(() => {
                  const distance = prevDistance < wrapWidth ? prevDistance : wrapWidth;
                  prevDistance -= distance;
                  nextDistance += distance;
                  return translateXValue + distance;
                });
  
                if (prevDistance === 0 && !$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $this.addClass(TAB_ARROW_CLASS_DISABLE);
                  $this.html(prevSvgDisable);
                }
                
                const $next = $this.nextAll(toSelector(TAB_NEXT_ARROW_CLASS));
                if ($next.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $next.removeClass(TAB_ARROW_CLASS_DISABLE);
                  $next.html(nextSvg);
                }
              }
            } else if ($this.hasClass(TAB_NEXT_ARROW_CLASS)) { // 点击右箭头
              if (!$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
  
                let translateXValue = $tabInner.translateX();
                translateXValue = isNaN(translateXValue) ? 0 : translateXValue;
                $tabInner.translateX(() => {
                  const distance = nextDistance < wrapWidth ? nextDistance : wrapWidth;
                  prevDistance += distance;
                  nextDistance -= distance;
                  return translateXValue + (-distance);
                });
  
                if (nextDistance === 0 && !$this.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $this.addClass(TAB_ARROW_CLASS_DISABLE);
                  $this.html(nextSvgDisable);
                }
    
                const $prev = $this.prevAll(toSelector(TAB_PREVIOUS_ARROW_CLASS));
                if ($prev.hasClass(TAB_ARROW_CLASS_DISABLE)) {
                  $prev.removeClass(TAB_ARROW_CLASS_DISABLE);
                  $prev.html(prevSvg);
                }
              }
            }
          });
        };
        
        const $paneWrap = $paneContainer.find(toSelector(PANE_ITEM_WRAP_CLASS));
        const $panes = $paneWrap.find(toSelector(PANE_ITEM_CLASS));

        GlobalCache.TabsChanging = (current, index) => {
          // change active
          $tabItems.eq(current).removeClass(TAB_ITEM_CLASS_ACTIVE);
          $tabItems.eq(index).addClass(TAB_ITEM_CLASS_ACTIVE);

          // move underline
          $underline.width(tabItemsWidthList[index]);
          $underline.translateX(() => {
            let i, distance = 0;
            for (i = 0; i < index; i++) {
              distance += tabItemsWidthList[i];
            }
            return distance;
          });

          // change pane
          if (isIncludePane) {
            $paneWrap.translateX(-(paneWidth*index));
            $panes.eq(current).removeClass(PANE_ITEM_CLASS_ACTIVE);
            $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE);
          }

          isFunction(onChange) && onChange(index);
        };
  
        //click tab item
        $tabItems.on('click', function() {
          const $this = $(this);
          if ( !$this.hasClass(TAB_ITEM_CLASS_ACTIVE) ) {
  
            const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
            const current = $tabItems.indexOf($active);
            const index = $tabItems.indexOf($this);
  
            GlobalCache.TabsChanging(current, index);
          }
        });
      },
      
      /**
       * @description index从1开始
       */
      changeTo (index) {
        const { $tabItems } = this;
        const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
        const current = $tabItems.indexOf($active);

        GlobalCache.TabsChanging(current, index - 1);

        /* 计算当前active基于父元素的left值 */
        const activeOffsetLeft = $tabItems.reduce((value, item, i) => {
          return value + ( i < (index - 1) ? $(item).outerWidth() : 0 )
        }, 0);
        $tabItems.parent().translateX(-activeOffsetLeft);
        
      },
  
      destroy () {
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
      const defaultOptions = {
        total: 0,
        pageSize: 10,
        current: 1,
        border: true,
        themeColor: '#1890ff',
        onChange: null,
        itemRender: null
      };
  
      const opts = Object.assign({}, defaultOptions, options);
  
      var mustBeNumber = ['total', 'pageSize', 'current'];
      for (var key in opts) {
        if (mustBeNumber.indexOf(key) > -1) {
          if (!isNumber(opts[key])) throw new Error('`' + key + '` is not a number');
        }
      }
  
      this.options = opts;
      this.$container = $(selector);
      if (tagOf(this.$container) !== 'ul') throw new Error('`' + selector + '` is not a <ul> element');
  
      this.super();
    };
  
    $.inherit(Component, Pagination);
  
    win.Pagination = Pagination;
  
    Object.assign(Pagination.prototype, {
      render () {
        const { $container, options } = this;
        const { current, total, pageSize, itemRender, border } = options;
  
        const totalPage = Math.ceil(total/pageSize);
        this.totalPage = totalPage;
  
        //pagination
        let i, ulInner = '';
        for (i = 1; i <= totalPage; i++) {
          let klass = i === current ? (
            PAGINATION_ITEM_CLASS.appendClass(PAGINATION_ITEM_CLASS_ACTIVE)
          ) : PAGINATION_ITEM_CLASS;
          klass = border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const originalElement = $.node('a', i);
          const element = isFunction(itemRender) ? itemRender(i, 'pagination', originalElement) : originalElement;
  
          klass = klass.appendClass(PAGINATION_ITEM_CLASS + '-' + i);
          const pagination = $.node('li', element, klass);
  
          ulInner += pagination;
        }
  
        //previous
        const previous = () => {
          let klass = current === 1 ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const svg = current === 1 ? prevSvgDisable : prevSvg;
          const originalElement = $.node('a', svg);
          const element = isFunction(itemRender) ? (
            itemRender(null, 'prev', originalElement)
          ) : originalElement;
          this.prevEl = element;
          this.prevOriginEl = originalElement;
  
          return $.node('li', element, klass.appendClass(PAGINATION_ITEM_CLASS_PREV));
        }
        var prevItem = previous();
  
        //next
        const next = () => {
          let klass = current === totalPage ? PAGINATION_ITEM_CLASS_DISABLE : '';
          klass = border ? klass.appendClass(PAGINATION_ITEM_CLASS_BORDER) : klass;
  
          const svg = current === totalPage ? nextSvgDisable : nextSvg;
          const originalElement = $.node('a', svg);
  
          const element = isFunction(itemRender) ? (
            itemRender(null, 'next', originalElement)
          ) : originalElement;
          this.nextEl = element;
          this.nextOriginEl = originalElement;
  
          return $.node('li', element, klass.appendClass(PAGINATION_ITEM_CLASS_NEXT));
        }
        var nextItem = next();
  
        return [{
          html: prevItem + ulInner + nextItem,
          container: $container
        }];
      },
  
      style () {
        const { themeColor } = this.options;
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
        deleteKeys(this, 'nextEl,nextOriginEl,prevEl,prevOriginEl,totalPage');
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
      const RANDOM_CLASS = buildRandomString();
  
      const icon = $.node('i', '', ICONCLASS.appendClass('message_' + type + '_icon'));
      const text = $.node('span', '', TEXTCLASS.appendClass('message_' + type + '_text_box'));
      const container = $.node('div', icon + text, CONTAINERCLASS.appendClass(RANDOM_CLASS).appendClass('message_' + type + '_container'));
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
            'top': FirstMessagePosTop + index*elHeight + index*GapOfMessage + 'px' // 计算当前实例top值
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
      const RANDOM_CLASS = buildRandomString();
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
          return $.node('div', '<img src="' + src + '" />', 'swiper-slide');
        });
    
        let swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
        if (pagination) {
          swiperWrapper += $.node('div', '', GALLERY_PAGINATION_CLASS.appendClass('swiper-pagination'));
        }
    
        let swiperContainer = $.node('div', swiperWrapper, GALLERY_SWIPER_CONTAINER_CLASS.appendClass('swiper-container'));
        if (navgation) {
          const prevBtn = $.node('div', '', GALLERY_BUTTON_PREV_CLASS.appendClass('swiper-button-prev'));
          const nextBtn = $.node('div', '', GALLERY_BUTTON_NEXT_CLASS.appendClass('swiper-button-next'));
          swiperContainer += (prevBtn + nextBtn);
        }
    
        const galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
    
        const galleryContainer = $.node('section', galleryWrappper, GALLERY_CONTAINER_CLASS.appendClass(GALLERY_CONTAINER_CLASS_HIDDEN).appendClass(RANDOM_CLASS));
        
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
        
        width = isNumber(width) ? width + 'px' : width;
        height =  isNumber(height) ? height + 'px' : height;
    
        const $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
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
            GALLERY.$swiper = new Swiper(toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
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
    
        if (pagination) swiperOptions.pagination = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_PAGINATION_CLASS));
        if (navgation) {
          swiperOptions.nextButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_NEXT_CLASS));
          swiperOptions.prevButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_PREV_CLASS));
        }

        swiperOptions.observer = true;
        swiperOptions.observeParents = true;

        this.options.swiperOptions = swiperOptions;
      }
    });
  
  }(window, jQuery, Swiper, Component)

  ;!function (win, $, Component) {

    const CARD_LIST_ITEM_INNER_CLASS = 'cardList-item-inner';
    const CARD_LIST_ITEM_CLASS = 'cardList-item';

    function CardList (selector, options) {
      const defaultOptions = {
        dataSource: [],
        lineItemNumber: 3,
        ratio: 0.57,
        bordered: false,
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

          return $.node('div', itemInner, CARD_LIST_ITEM_CLASS.appendClass(`flex-percent-${itemPercent}`));
        });

        return [{
          html: CardItems.join(''),
          container: $container
        }];
      },

      style () {
        const { $container } = this;
        const { ratio, bordered } = this.options;

        $container.addClass('flex');

        const $item = $container.find(toSelector(CARD_LIST_ITEM_INNER_CLASS));
        $item.css({
          height: 0,
          paddingBottom: ratio*100 + '%',
          border: bordered ? '1px solid #eee' : 'none'
        });
      }
    });

  }(window, jQuery, Component)

}(window, window.jQuery, window.Swiper, window.Component, window.Util)
