;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && typeof define.amd !== 'undefined'
  ? define([global], factory) : global.Menu = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isUndefined, extend, appendClass, toSelector, propsChecker, isString
    },
    ClassName: { 
      MENU_CONTAINER_CLASS , MENU_ITEM_CLASS, MENU_SUBMENU_CLASS, MENU_VERTICAL_CLASS,
      MENU_HORIZONTAL_CLASS, MENU_DARK_CLASS, MENU_LIGHT_CLASS, MENU_DISABLED_CLASS,
      MENU_SUBMENU_TITLE_CLASS, MENU_SUBMENU_TITLE_WRAP_CLASS, MENU_SUBMENU_ARROW_CLASS,
      MENU_SUB_CLASS, MENU_HIDDEN_CLASS, MENU_SUBMENU_OPEN_CLASS, MENU_SUBMENU_CLOSE_CLASS
    }
  } = global,
  
  menuMode = ['vertical', 'horizontal'],
  menuTheme = ['light', 'dark'];

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
    if (!isUndefined(props.mode) && !menuTheme.includes(props.theme)) {
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
        MENU_SUB_CLASS,
        MENU_HIDDEN_CLASS
      );
      const child = children.map(c => isString(c) ? c : c.html);
      const menuSub = $.node('ul', child.join(''), menuSubClass, {
        dataKey: key
      });

      onTitleClick && (this.onTitleClick = onTitleClick);

      const klass = appendClass(
        MENU_SUBMENU_CLASS,
        disabled ? MENU_DISABLED_CLASS : '',
        MENU_SUBMENU_CLOSE_CLASS
      );
      return $.node('li', subMenuTitle + menuSub, klass);
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

    bindEvents () {
      this.handleSubMenuEvents();
      this.handleItemClick();
    },

    handleSubMenuEvents () {
      const { subMenuCloseDelay, subMenuOpenDelay, mode } = this.props;

      const isVertical = mode === 'vertical';

      if (isVertical) {
        this.subMenuClick(subMenuOpenDelay, subMenuCloseDelay);
      } else {
        this.subMenuHover(subMenuOpenDelay, subMenuCloseDelay);
      }
    },

    subMenuClick (subMenuOpenDelay, subMenuCloseDelay) {
      const { $subMenu } = this;

      $subMenu.on('click', function () {
        const $this = $(this);

        if ($this.hasClass(MENU_SUBMENU_CLOSE_CLASS)) { // close => open
          setTimeout(() => {

            $this
              .removeClass(MENU_SUBMENU_CLOSE_CLASS)
              .addClass(MENU_SUBMENU_OPEN_CLASS)
              .children(toSelector(MENU_SUB_CLASS))
              .removeClass(MENU_HIDDEN_CLASS)

          }, subMenuOpenDelay * 1000);
        } else { // open => close
          setTimeout(() => {

            $this
              .removeClass(MENU_SUBMENU_CLOSE_CLASS)
              .addClass(MENU_SUBMENU_CLOSE_CLASS)
              .children(toSelector(MENU_SUB_CLASS))
              .addClass(MENU_HIDDEN_CLASS);

          }, subMenuCloseDelay * 1000);
        }
      });
    },

    subMenuHover (subMenuOpenDelay, subMenuCloseDelay) {
      const { $subMenu } = this;

      $subMenu.on('hover', function () {
        setTimeout(() => {

          $(this).removeClass(MENU_HIDDEN_CLASS);

        }, subMenuOpenDelay * 1000);
      }, function () {
        setTimeout(() => {

          $(this).addClass(MENU_HIDDEN_CLASS);

        }, subMenuCloseDelay * 1000);
      });
    },

    handleItemClick () {
      const {
        props: { onClick },
        $item, $subMenuItem
      } = this;

      function clickFunc () {
        onClick && onClick($(this).attr('data-key'));
      }

      $item.on('click', clickFunc);
      $subMenuItem.on('click', clickFunc);
    }
  });

  return Menu;
});