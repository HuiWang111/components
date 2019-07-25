;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && typeof define.amd !== 'undefined'
  ? define([global], factory) : global.Menu = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isUndefined, extend, appendClass, toSelector, propsChecker, isString, toArray
    },
    ClassName: { 
      MENU_CONTAINER_CLASS , MENU_ITEM_CLASS, MENU_SUBMENU_CLASS, MENU_VERTICAL_CLASS,
      MENU_HORIZONTAL_CLASS, MENU_DARK_CLASS, MENU_LIGHT_CLASS, MENU_DISABLED_CLASS,
      MENU_SUBMENU_TITLE_CLASS, MENU_SUBMENU_TITLE_WRAP_CLASS, MENU_SUBMENU_ARROW_CLASS,
      MENU_SUB_CLASS, MENU_HIDDEN_CLASS, MENU_SUBMENU_OPEN_CLASS, MENU_SUBMENU_CLOSE_CLASS, MENU_SUBMENU_ACTIVE_CLASS,
      MENU_SELECTED_ITEM_CLASS
    }
  } = global,
  
  menuMode = ['vertical', 'horizontal'],
  menuTheme = ['light', 'dark'],
  
  SUB_ITEM_HEIGHT = 40;

  /**
   * @deprecated Menu
   * props type:
   *  children: string[],
   *  defaultOpenKeys: string[],
   *  defaultSelectedKeys: string[],
   *  mode: string: vertical horizontal,
   *  multiple: boolean,
   *  openKeys: string[],
   *  selectedKeys: string[],
   *  style: object,
   *  subMenuCloseDelay: number,
   *  subMenuOpenDelay: number,
   *  theme: string: light dark,
   *  onClick: function(key),
   *  onDeselect: function(key),
   *  onOpenChange: function(openKeys: string[]),
   *  onSelect: function(key)
   */
  function Menu(selector, props) {
    propsChecker(props, {
      children: 'require.array',
      defaultOpenKeys: 'array',
      defaultSelectedKeys: 'array',
      mode: 'string',
      multiple: 'boolean',
      openKeys: 'array',
      selectedKeys: 'array',
      style: 'object',
      subMenuCloseDelay: 'number',
      subMenuOpenDelay: 'number',
      theme: 'string',
      onClick: 'function',
      onDeselect: 'function',
      onOpenChange: 'function',
      onSelect: 'function'
    });

    if (!isUndefined(props.mode) && !menuMode.includes(props.mode)) {
      throw new Error(`'${props.mode}' is not a correct Menu Mode`);
    }
    if (!isUndefined(props.theme) && !menuTheme.includes(props.theme)) {
      throw new Error(`'${props.mode}' is not a correct Menu theme`);
    }

    const defaultProps = {
      mode: 'vertical',
      multiple: false,
      subMenuCloseDelay: 0.1,
      subMenuOpenDelay: 0,
      theme: 'light'
    };

    this.props = extend({}, defaultProps, props);
    this.selector = selector;
    this.super();
  }

  $.inherit(Component, Menu);

  /**
   * @description Menu.Item
   * props type:
   *  disabled: Boolean
   *  key: String,
   *  title: String
   */
  Menu.Item = function (props) {
    propsChecker(props, {
      disabled: 'boolean',
      key: 'require.string',
      title: 'require.string'
    });

    const defaultProps = {
      disabled: false
    };

    this.props = extend({}, defaultProps, props);
    this.html = this.render();
  };

  extend(Menu.Item.prototype, {
    render () {
      const { disabled, title, key } = this.props;


      const klass = appendClass(
        MENU_ITEM_CLASS,
        disabled ? MENU_DISABLED_CLASS : ''
      );
      return $.node('li', title, klass, {
        dataKey: key
      });
    }
  });

  /**
   * @description Menu.SubMenu
   * props type:
   *  children: Array,
   *  disabled: Boolean,
   *  key: String,
   *  title: String,
   *  onTitleClick: Function
   */
  Menu.SubMenu = function (props) {
    propsChecker(props, {
      children: 'require.array',
      disabled: 'boolean',
      key: 'require.string',
      title: 'require.string',
      onTitleClick: 'function'
    });

    const defaultProps = {
      disabled: false
    };

    this.props = extend({}, defaultProps, props);
    this.html = this.render();
  }

  extend(Menu.SubMenu.prototype, {
    render () {
      const { children, disabled, key, onTitleClick } = this.props;

      const subMenuTitle = this.getSubMenuTitle();

      const menuSubClass = appendClass(
        MENU_SUB_CLASS
      );
      const child = children.map(c => isString(c) ? c : c.html);
      const menuSub = $.node('ul', child.join(''), menuSubClass);

      onTitleClick && (this.onTitleClick = onTitleClick);

      const klass = appendClass(
        MENU_SUBMENU_CLASS,
        disabled ? MENU_DISABLED_CLASS : '',
        MENU_SUBMENU_CLOSE_CLASS
      );
      return $.node('li', subMenuTitle + menuSub, klass, {
        dataKey: key
      });
    },

    getSubMenuTitle () {
      const { title } = this.props;

      const titleWrap = $.node('span', title, MENU_SUBMENU_TITLE_WRAP_CLASS);
      const arrow = $.node('i', '', MENU_SUBMENU_ARROW_CLASS);
      
      return $.node('div', titleWrap + arrow, MENU_SUBMENU_TITLE_CLASS);
    }
  });

  /**
   * Menu
   *  defaultOpenKeys: string[],
   *  defaultSelectedKeys: string[],
   *  multiple: boolean,
   *  openKeys: string[],
   *  selectedKeys: string[],
   *  theme: string: light dark,
   *  
   *  onDeselect: function(key),
   *  onOpenChange: function(openKeys: string[]),
   *  onSelect: function(key)
   */
  extend(Menu.prototype, {
    render () {
      const {
        children, mode, style, theme
      } = this.props;

      const klass = appendClass(
        MENU_CONTAINER_CLASS,
        mode === 'vertical' ? MENU_VERTICAL_CLASS : MENU_HORIZONTAL_CLASS,
        theme === 'light' ? MENU_LIGHT_CLASS : MENU_DARK_CLASS
      );
      
      const child = children.map(c => isString(c) ? c : c.html);
      const menu = $.node('ul', child.join(''), klass, {
        style: style ? style : ''
      });
      
      return [{
        html: menu,
        container: this.selector === 'body' ? 'body' : $(this.selector),
        type: 'append'
      }];
    },

    componentDidMount () {
      this.$container = $(toSelector(MENU_CONTAINER_CLASS));
      this.$item = this.$container.children(toSelector(MENU_ITEM_CLASS));
      this.$subMenu = this.$container.children(toSelector(MENU_SUBMENU_CLASS));
      this.$subMenuItem = this.$subMenu.find(toSelector(MENU_ITEM_CLASS));
    },

    style () {
      const { $subMenu } = this;
      $subMenu.each((_, submenu) => {
        const $sub = $(submenu).children(toSelector(MENU_SUB_CLASS));
        $sub
          .addClass(MENU_HIDDEN_CLASS)
          .css('height', 0);
      });
    },

    bindEvents () {
      this.handleSubMenuEvents();
      this.handleItemClick();
    },

    handleSubMenuEvents () {
      const { $subMenu, props: { mode } } = this;

      const subChildrenCount = toArray($subMenu.children(toSelector(MENU_SUB_CLASS))).map(item => $(item).children(toSelector(MENU_ITEM_CLASS)).length);
      const subHeight = subChildrenCount.map(count => count * SUB_ITEM_HEIGHT);

      const isVertical = mode === 'vertical';
      if (isVertical) {
        this.subMenuClick(subHeight);
      } else {
        this.subMenuHover(subHeight);
      }
    },

    subMenuClick (subHeight) {
      const {
        $subMenu, props: { subMenuOpenDelay, subMenuCloseDelay }
      } = this;

      $subMenu.on('click', function () {
        const $this = $(this);
        const index = $subMenu.indexOf($this);

        if ($this.hasClass(MENU_SUBMENU_CLOSE_CLASS)) { // close => open
          setTimeout(() => {

            $this
              .removeClass(MENU_SUBMENU_CLOSE_CLASS)
              .addClass(MENU_SUBMENU_OPEN_CLASS)
              .children(toSelector(MENU_SUB_CLASS))
              .removeClass(MENU_HIDDEN_CLASS)
              .css('height', subHeight[index] + 'px');

          }, subMenuOpenDelay * 1000);
        } else { // open => close
          setTimeout(() => {

            $this
              .removeClass(MENU_SUBMENU_OPEN_CLASS)
              .addClass(MENU_SUBMENU_CLOSE_CLASS)
              .children(toSelector(MENU_SUB_CLASS))
              .addClass(MENU_HIDDEN_CLASS)
              .css('height', 0);

          }, subMenuCloseDelay * 1000);
        }
      });
    },

    subMenuHover (subHeight) {
      const {
        $subMenu,
        props: { subMenuOpenDelay, subMenuCloseDelay }
      } = this;

      $subMenu.hover(function () {
        const $this = $(this);
        const index = $subMenu.indexOf($this);
        
        setTimeout(() => {
          $this
            .removeClass(MENU_SUBMENU_CLOSE_CLASS)
            .addClass(MENU_SUBMENU_OPEN_CLASS)
            .children(toSelector(MENU_SUB_CLASS))
            .removeClass(MENU_HIDDEN_CLASS)
            .css('height', subHeight[index] + 'px');
        }, subMenuOpenDelay * 1000);
      }, function () {
        const $this = $(this);

        setTimeout(() => {
          $this
            .removeClass(MENU_SUBMENU_OPEN_CLASS)
            .addClass(MENU_SUBMENU_CLOSE_CLASS)
            .children(toSelector(MENU_SUB_CLASS))
            .addClass(MENU_HIDDEN_CLASS)
            .css('height', 0);
        }, subMenuCloseDelay * 1000);
      });
    },

    handleItemClick () {
      const {
        props: { onClick },
        $item, $subMenuItem, $container, $subMenu
      } = this;

      function clickFunc(e) {
        e.stopPropagation();

        const $this = $(this);
        const $active = $container.find(toSelector(MENU_SELECTED_ITEM_CLASS));

        $active.removeClass(MENU_SELECTED_ITEM_CLASS);
        $this.addClass(MENU_SELECTED_ITEM_CLASS);

        const $parentEl = $this.parent().parent();
        if ($parentEl.hasClass(MENU_SUBMENU_CLASS)) {
          $parentEl.hasClass(MENU_SUBMENU_ACTIVE_CLASS) ||$parentEl.addClass(MENU_SUBMENU_ACTIVE_CLASS);
        } else {
          $subMenu
            .filter(toSelector(MENU_SUBMENU_ACTIVE_CLASS))
            .removeClass(MENU_SUBMENU_ACTIVE_CLASS);
        }
          
        onClick && onClick($this.attr('data-key'));
      }

      $item.on('click', clickFunc);
      $subMenuItem.on('click', clickFunc);
    },

    /**
     * 判断是否有子元素是已经被选中的状态
     */
    hasSelectedChildren (index) {
      const { $subMenu } = this;
      const $subMenuItem = $subMenu.eq(index).find(toSelector(MENU_ITEM_CLASS));

      return toArray($subMenuItem).some(item => {
        return $(item).hasClass(MENU_SELECTED_ITEM_CLASS);
      });
    }
  });

  return Menu;
});