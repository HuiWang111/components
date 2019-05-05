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

  /* 
    options:
    {
      total: Numer,
      pageSize: Number,
      current: Number,
      border: true | false, // 页码是否需要边框
      themeColor: String,
      useStyle: true | false, // 不引入css文件，使用<style>标签
      onChange: Function (current),
      itemRender: Function (current, type, originalElement)
    }
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