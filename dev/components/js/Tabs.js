;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Tabs = factory(global);
}(this, function (global) {
  const {
    Component, jQuery: $,
    util: { 
      isFunction, isUndefined, isNil, toSelector, extend, removeKeys, appendClass,
      propsChecker, debounce, isEmpty
    },
    ClassName: {
      TAB_ITEM_CLASS, TAB_ITEM_CLASS_ACTIVE, TAB_ITEM_CARD_CLASS, TAB_ITEM_WRAP_CLASS, TAB_ITEM_INNER_CLASS,
      TAB_ITEM_CARD_INNER_CALSS, TAB_ITEM_CONTAINER_CLASS, TAB_ITEM_CONTAINER_WITH_ARROW_CLASS, PANE_ITEM_CLASS,
      PANE_ITEM_CLASS_ACTIVE, PANE_ITEM_WRAP_CLASS, TAB_ARROW_CLASS, TAB_ARROW_CLASS_DISABLE, TAB_ARROW_CLASS_INVISIBLE, TAB_PREVIOUS_ARROW_CLASS, TAB_NEXT_ARROW_CLASS, TAB_CONTAINER_CLASS, UNDERLINE_CLASS, TAB_ANIMATE_CLASS, TAB_ITEM_CONTAINER_WRAP_CLASS, TAB_ITEM_EXTRA_CLASS,

      /* Icon */
      CLOSE_ICON_CLASS,

      /* Dropdown */
      DROPDOWN_CONTAINER_CLASS, DROPDOWN_ITEM_CLASS, DROPDOWN_ACTIVE_ITEM_CLASS
    },
    Color: { DISABLE_COLOR },
    SVG: { getPrevSvg, getNextSvg },
    Dropdown
  } = global,
  
  prevSvg = getPrevSvg(),
  nextSvg = getNextSvg()
  prevSvgDisable = getPrevSvg(DISABLE_COLOR),
  nextSvgDisable = getNextSvg(DISABLE_COLOR),
  
  TAB_ITEM_GAP = 32;
  
  /**
   *  @param props: {
   *    type: 'line' | 'card', // default is 'line' 
   *    tabPanes: Array, // => [{tab: String, key: String, forceRender: Boolen}]
   *    defaultKey: String,
   *    editable: Boolean, // 仅type='card'时有效
   *    animated: true,
   *    tabBarExtraContent: string,
   *    block: Boolean, // 宽度自适应父元素，设置此配置为true还会额外监听window.resize事件
   *    insertElementJQueryFunc: string, // 将元素插入到文档的jQuery方法
   *    onChange: Function(index),
   *    renderPaneItem: Function(tabName, index)
   *  }
   * 
   *  bug:
   *  type为card时的active tab下方应该没有下划线，有待优化
   *  在关闭一个tab后切换tab时pane会出现位置错乱，有待优化
   */

  function Tabs(selector, props) {
    propsChecker(props, {
      type: 'string',
      tabPanes: 'array.require',
      editable: 'boolean',
      animated: 'boolean',
      block: 'boolean',
      insertElementJQueryFunc: 'string',
      tabBarExtraContent: 'string',
      onChange: 'function',
      renderPaneItem: 'function',
      onClickDropdownItem: 'function'
    });

    if (props.tabPanes.length === 0) return;

    this.$container = $(selector);
    if (this.$container.length < 1) throw new Error(`not found ${selector} Element`);

    const { type } = props;
    if (!isUndefined(type) && !['line', 'card'].includes(type)) {
      throw new Error(`${type} is not a correct tabs type`);
    }

    //default
    const defaultKey = props.tabPanes[0] && props.tabPanes[0].key;
    const defaultProps = {
      type: 'line',
      tabPanes: [],
      defaultKey,
      editable: false,
      animated: true,
      block: false,
      insertElementJQueryFunc: 'html',
      onChange: null,
      renderPaneItem: null
    };

    this.props = extend({}, defaultProps, props);
    this.super();
  };

  $.inherit(Component, Tabs);

  extend(Tabs.prototype, {
    render () {
      const { 
        $container,
        props: { tabPanes, renderPaneItem, defaultKey, type, editable, insertElementJQueryFunc, animated }
      } = this;

      let tabsDOM = '', panesDOM = '', isDefaultFirst = false, isDefaultLast = false;
      const unRenderPanes = {}, isRenderedRecords = {}, panesCount = tabPanes.length;
      const isEditableCard = type === 'card' && editable;

      tabPanes.forEach((pane, index) => {
        const { tab, key, menus } = pane;
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
        
        let dropdownHtml = '';
        if (menus && menus.length > 0) {
          const dropdown = new Dropdown({
            dataSource: menus
          });
          dropdownHtml = dropdown.html;
        }

        let tabDOM = $.node('div', tab + closeIcon + dropdownHtml, klass);
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

      const tabsContainerDOM = this.getExtra(
        $.node('div', [prevDOM, tabsWrapDOM, nextDOM], appendClass(
          TAB_ITEM_CONTAINER_CLASS
        ))
      );

      const panesWrapDOM = $.node('div', panesDOM, appendClass(
        PANE_ITEM_WRAP_CLASS,
        animated ? TAB_ANIMATE_CLASS : ''
      ));

      this.unRenderPanes = unRenderPanes;
      this.isRenderedRecords = isRenderedRecords;
      
      return [{
        html: $.node('div', [tabsContainerDOM, panesWrapDOM], TAB_CONTAINER_CLASS),
        container: $container,
        type: insertElementJQueryFunc
      }];
    },

    componentDidMount () {
      const { $container, props: { tabPanes } } = this;

      // tab
      this.$tabContainer = $container.find(toSelector(TAB_ITEM_CONTAINER_CLASS));
      this.$tabWrap = this.$tabContainer.find(toSelector(TAB_ITEM_WRAP_CLASS));
      this.$tabInner = this.$tabWrap.find(toSelector(TAB_ITEM_INNER_CLASS));
      this.$tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
      this.$underline = this.$tabWrap.find(toSelector(UNDERLINE_CLASS));
      this.$arrow = $container.find(toSelector(TAB_ARROW_CLASS));
      this.$dropdownItems = this.$tabItems.find(toSelector(DROPDOWN_ITEM_CLASS));

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
      const {
        $tabItems, $panes, $paneWrap, $container, $dropdownItems,
        props: { editable, block, animated, onClickDropdownItem, tabPanes }
      } = this;

      this.setUnderLineWidth(0);

      this.checkArrowVisibleStatus();
      
      const __this__ = this;

      //click tab item
      const { props: { type } } = this;

      $tabItems.on('click', function() {
        const $this = $(this);
        if ( !$this.hasClass(TAB_ITEM_CLASS_ACTIVE) ) {
          const $active = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
          const current = $tabItems.indexOf($active);
          const index = $tabItems.indexOf($this);

          __this__.handleTabChange(current, index);
        }
      });

      $tabItems.hover(function() {
        const $this = $(this);
        const index = $tabItems.indexOf($this);

        if (tabPanes[index]) {
          const { menus } = tabPanes[index];

          if (!menus || menus.length === 0) return;

          const $dropdown = $this.find(toSelector(DROPDOWN_CONTAINER_CLASS));
          console.log($this);
          $dropdown.addClass('show')
        }
      }, function() {
        const $this = $(this);
        const index = $tabItems.indexOf($this);

        if (tabPanes[index]) {
          const { menus } = tabPanes[index];

          if (!menus || menus.length === 0) return;

          const $dropdown = $this.find(toSelector(DROPDOWN_CONTAINER_CLASS));
          $dropdown.removeClass('show')
        }
      });

      // click dropdown item
      $dropdownItems.on('click', function() {
        const $this = $(this);
        const $tabItem = $this.parents(toSelector(TAB_ITEM_CLASS));
        const index = $tabItems.indexOf($tabItem);
        if (!$this.hasClass(DROPDOWN_ACTIVE_ITEM_CLASS)) {
          $(toSelector(DROPDOWN_ACTIVE_ITEM_CLASS)).removeClass(DROPDOWN_ACTIVE_ITEM_CLASS);
          $this.addClass(DROPDOWN_ACTIVE_ITEM_CLASS);
          const key = $this.attr('data-key');
          if (onClickDropdownItem) {
            onClickDropdownItem(key, tabPanes[index] && tabPanes[index].key, index);
          }
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

      // resize
      if (block) {
        const debounced = debounce(function () {
          const newWidth = $container.width();

          const $tabItems = __this__.$tabItems;
          const $currentTab = $tabItems.filter(toSelector(TAB_ITEM_CLASS_ACTIVE));
          const index = $tabItems.indexOf($currentTab);
  
          $panes.width(newWidth);
          if (animated) {
            $paneWrap.width(newWidth * __this__.tabCount);
            $paneWrap.translateX(-(newWidth * index));
          }
          __this__.containerWidth = newWidth;
  
          __this__.checkArrowVisibleStatus();
        }, 200);
  
        window.addEventListener('resize', debounced);
      }
    },

    setUnderLineWidth (activeIndex) {
      const { $underline, tabItemsWidthList } = this;
      $underline.width(`${tabItemsWidthList[activeIndex]}px`);
    },

    /**
     * @action 'add' | 'sub' 表示增加或者减少tab
     */
    setPaneWrapWidth (action) {
      const { $paneWrap, containerWidth, props: { animated } } = this;

      if (!animated) return;

      if (action === 'add') {
        this.tabCount++;
      } else if (action === 'sub') {
        this.tabCount--;
      }
      $paneWrap.width(containerWidth * this.tabCount + 'px');
    },

    checkArrowVisibleStatus () {
      const { $arrow, $tabWrap, $tabInner, $tabContainer } = this;

      let wrapWidth = $tabWrap.width() + 60; // 加上左右两边各30的padding去计算更为准确
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
      const { 
        unRenderPanes, isRenderedRecords, $underline, $paneWrap, $panes, containerWidth,
        props: { type, onChange, tabPanes, animated }
      } = this;
      let { $tabItems } = this;

      if (isOnClose) {
        $tabItems = this.$tabInner.find(toSelector(TAB_ITEM_CLASS));
        this.$tabItems = $tabItems;
      }

      // change tab active
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
      animated && $paneWrap.translateX(-(containerWidth * index));
      !isNil(current) && $panes.eq(current).removeClass(PANE_ITEM_CLASS_ACTIVE);
      $panes.eq(index).addClass(PANE_ITEM_CLASS_ACTIVE);

      const { key } = tabPanes[index];

      /* 渲染未在初始化时渲染的pane */
      if (index < tabPanes.length) {
        if (!isRenderedRecords[key]) {
          $panes.eq(index).html(unRenderPanes[key]);
          isRenderedRecords[key] = true;
        }
      }

      isFunction(onChange) && onChange(key, index);
    },

    getExtra: function(html) {
      const { tabBarExtraContent } = this.props;
      if (isEmpty(tabBarExtraContent)) return html;

      const extra = $.node('div', tabBarExtraContent, TAB_ITEM_EXTRA_CLASS);

      return $.node('div', html + extra, TAB_ITEM_CONTAINER_WRAP_CLASS);
    },

    destroy () {
      removeKeys(this, 'isIncludePane, paneWidth');
    }
  });

  return Tabs;
});