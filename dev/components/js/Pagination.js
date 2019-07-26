;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Pagination = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isFunction, checkType, toSelector, extend, removeKeys, appendClass,
      getRandomClassName
    },
    ClassName: {
      PAGINATION_ITEM_CLASS, PAGINATION_ITEM_CLASS_ACTIVE, PAGINATION_ITEM_CLASS_BORDER, PAGINATION_ITEM_CLASS_DISABLE,
      PAGINATION_ITEM_CLASS_PREV, PAGINATION_ITEM_CLASS_NEXT, PAGINATION_CONTAINER_CLASS, PAGINATION_ITEM_MORE_CLASS,
      PAGINATION_ITEM_NEXT_MORE_CLASS, PAGINATION_ITEM_PREV_MORE_CLASS
    },
    SVG: { getPrevSvg, getNextSvg, getEllipsisSvg, getDoublePrevArrowSvg, getDoubleNextArrowSvg },
    Color: { DISABLE_COLOR, PRIMARY_COLOR }
  } = global,
  
  MAX_DISPLAY_TOTAL = 9, LEFTMODEINDEXMAP = [2, 3, 4, 5, 6], INDEXMAP = [1, 2, 3, 4, 5],
  
  prevSvg = getPrevSvg(),
  nextSvg = getNextSvg()
  prevSvgDisable = getPrevSvg(DISABLE_COLOR),
  nextSvgDisable = getNextSvg(DISABLE_COLOR);
  
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

    const opts = extend({}, defaultOptions, options);

    var mustBeNumber = ['total', 'pageSize', 'current'];
    mustBeNumber.forEach(key => {
      checkType(opts[key], 'number');
    });

    this.options = opts;
    this.selector = selector;
    this.RANDOM_CLASS = getRandomClassName();

    this.super();
  };

  $.inherit(Component, Pagination);

  extend(Pagination.prototype, {
    render () {
      const { selector, RANDOM_CLASS, options: { current, total, pageSize } } = this;

      const totalPage = Math.ceil(total/pageSize);
      Object.defineProperty(this, 'totalPage', {
        writable: false,
        configurable: true,
        enumerable: false,
        value: totalPage
      });

      //pagination
      let i, ulInner = '';
      if (totalPage <= MAX_DISPLAY_TOTAL) {
        for (i = 1; i <= totalPage; i++) {
          const pagination = this.createPagination(i, i === current);
          ulInner += pagination;
        }
      } else {
        const prevMore = this.createMore('prev');
        const nextMore = this.createMore('next');
        const first = this.createPagination(1);
        const last = this.createPagination(totalPage);
        
        if (current < 8) {
          for (i = 1; i < 8; i++) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }

          ulInner += nextMore + last;

          this.currentMode = 'left';
        } else if ( current > (totalPage - 6) ) {
          ulInner += first + prevMore;

          for (i = totalPage - 6; i < totalPage + 1; i++ ) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }

          this.currentMode = 'right';
        } else {
          ulInner += first + prevMore;

          for (i = current - 2; i < current + 3; i++) {
            const pagination = this.createPagination(i, i === current);
            ulInner += pagination;
          }
          
          ulInner += nextMore + last;

          this.currentMode = 'symmetrical';
        }
      }

      //previous
      const prevItem = this.createPrevious();

      //next
      const nextItem = this.createNext();

      const klass = appendClass(
        RANDOM_CLASS,
        PAGINATION_CONTAINER_CLASS
      );

      return [{
        html: $.node('ul', prevItem + ulInner + nextItem, klass),
        container: $(selector),
        type: 'append'
      }];
    },

    componentDidMount () {
      this.$container = $(toSelector(this.RANDOM_CLASS));

      this.$next = this.$container.find(toSelector(PAGINATION_ITEM_CLASS_NEXT));
      this.$prev = this.$container.find(toSelector(PAGINATION_ITEM_CLASS_PREV));
    },

    bindEvents () {
      const { $next, $prev, $container } = this;
      const __this__ = this;

      // click previous button
      $prev.on('click', function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = current - 1;
          
          __this__.toggleMode(index);
          __this__.handlePaginationChange(current, index);
        }
      });

      // click next button
      $next.on('click', function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = current + 1;

          __this__.toggleMode(index);
          __this__.handlePaginationChange(current, index);
        }
      });

      // click paginations
      $container.on('click', `${toSelector(PAGINATION_ITEM_CLASS)}`, function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        if (!$this.hasClass(PAGINATION_ITEM_CLASS_ACTIVE)) {
          const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
          const current = __this__.getPage($active);
          const index = __this__.getPage($this);

          if (current !== index) {
            __this__.toggleMode(index);
            __this__.handlePaginationChange(current, index);
          }
        }
      });

      // click more
      const moreSelector = `${toSelector(PAGINATION_ITEM_NEXT_MORE_CLASS)},${toSelector(PAGINATION_ITEM_PREV_MORE_CLASS)}`;
      $container.on('click', moreSelector, function () {
        const $this = $(this);
        const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
        const $active = $pagination.filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE));
        const current = __this__.getPage($active);
        const variable = $this.hasClass(PAGINATION_ITEM_PREV_MORE_CLASS) ? -5 : 5;
        const index = current + variable;

        __this__.toggleMode(index);
        __this__.handlePaginationChange(current, index);
      });
    },

    createPagination (page, isActive) {

      const { bordered, itemRender } = this.options;

      const klass = appendClass(
        PAGINATION_ITEM_CLASS,
        isActive ? PAGINATION_ITEM_CLASS_ACTIVE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const originalElement = $.node('a', page);
      const element = isFunction(itemRender) ? itemRender(page, 'pagination', originalElement) : originalElement;
      
      const pagination = $.node('li', element, klass, {
        title: page
      });

      return pagination;
    },

    createPrevious () {
      const { current, itemRender, bordered } = this.options;
      const isDisable = current === 1;
      
      const klass = appendClass(
        PAGINATION_ITEM_CLASS_PREV,
        isDisable ? PAGINATION_ITEM_CLASS_DISABLE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const svg = isDisable ? prevSvgDisable : prevSvg;
      const originalElement = $.node('a', svg);
      const element = isFunction(itemRender) ? (
        itemRender(null, 'prev', originalElement)
      ) : originalElement;
      this.isPrevOriginal = element === originalElement;

      return $.node('li', element, klass, {
        title: '上一页'
      });
    },

    createNext () {
      const { options: { current, itemRender, bordered }, totalPage } = this;
      const isDisable = current === totalPage;

      const klass = appendClass(
        PAGINATION_ITEM_CLASS_NEXT,
        isDisable ? PAGINATION_ITEM_CLASS_DISABLE : '',
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      const svg = current === totalPage ? nextSvgDisable : nextSvg;
      const originalElement = $.node('a', svg);

      const element = isFunction(itemRender) ? (
        itemRender(null, 'next', originalElement)
      ) : originalElement;
      this.isNextOriginal = element === originalElement;

      return $.node('li', element, klass, {
        title: '下一页'
      });
    },

    createMore (type) {
      const isPrev = type === 'prev';

      const klass = appendClass(
        PAGINATION_ITEM_MORE_CLASS,
        isPrev ? PAGINATION_ITEM_PREV_MORE_CLASS : PAGINATION_ITEM_NEXT_MORE_CLASS
      );

      const svg = getEllipsisSvg('#aaaaaa');
      const hoverSvg = isPrev ? getDoublePrevArrowSvg(PRIMARY_COLOR) : getDoubleNextArrowSvg(PRIMARY_COLOR);
      const element = $.node('a', svg + hoverSvg);

      return $.node('li', element, klass, {
        title: isPrev ? '向前跳5页' : '向后跳5页'
      });
    },

    getPage ($el) {
      return parseInt($el.attr('title'));
    },

    handlePaginationChange (current, index) {
      const { 
        totalPage, $container, $prev, $next, isPrevOriginal, isNextOriginal, currentMode,
        options: { onChange }
      } = this;
      const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));

      if (currentMode === 'symmetrical') {
        [1, 2, 3, 4, 5].forEach(i => {
          const page = index + (i - 3);
          $pagination.eq(i).children('a').text(page);
          $pagination.eq(i).attr('title', page);
        });
      } else {
        this.filterByTitle($pagination, current).removeClass(PAGINATION_ITEM_CLASS_ACTIVE);
        this.filterByTitle($pagination, index).addClass(PAGINATION_ITEM_CLASS_ACTIVE);

        if ( (index !== totalPage) && ($next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isNextOriginal && $next.children('a').html(nextSvg);
          $next.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index === totalPage) && (!$next.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isNextOriginal && $next.children('a').html(nextSvgDisable);
          $next.addClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index === 1) && (!$prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isPrevOriginal && $prev.children('a').html(prevSvgDisable);
          $prev.addClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
        if ( (index !== 1) && ($prev.hasClass(PAGINATION_ITEM_CLASS_DISABLE)) ) {
          isPrevOriginal && $prev.children('a').html(prevSvg);
          $prev.removeClass(PAGINATION_ITEM_CLASS_DISABLE);
        }
      }

      isFunction(onChange) && onChange(index);
    },

    filterByTitle ($el, page) {
      const __this__ = this;
      return $el.filter(function () {
        return __this__.getPage($(this)) === page;
      });
    },

    toggleMode (index) {
      const { totalPage, currentMode, $container } = this;
      const willMode = index < 8 ? 'left' : (
        index > totalPage - 7 ? 'right' : 'symmetrical'
      );
      
      if (currentMode === willMode) return;

      const $pagination = $container.find(toSelector(PAGINATION_ITEM_CLASS));
      const $prevMore = $container.find(toSelector(PAGINATION_ITEM_PREV_MORE_CLASS));
      const $nextMore = $container.find(toSelector(PAGINATION_ITEM_NEXT_MORE_CLASS));
      
      if (currentMode === 'left') {

        if (willMode === 'symmetrical') {
          this.paginationToMore($pagination, 'prev');
          LEFTMODEINDEXMAP.forEach(i => {
            // 索引2, 3, 4, 5, 6分别对应6, 7, 8, 9, 10
            const page = index + (i - 4);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'right') {
          this.paginationToMore($pagination, 'prev');
          this.moreToPagination($nextMore, 'next');
          LEFTMODEINDEXMAP.forEach(i => {
            // 索引2, 3, 4, 5, 6分别对应totalPage -6, -5, -4, -3, -2
            const page = (totalPage - 4) + (i - 4);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      } else if (currentMode === 'symmetrical') {

        if (willMode === 'left') {
          this.moreToPagination($prevMore, 'prev');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应3, 4, 5, 6, 7
            const page = i + 2;
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'right') {
          this.moreToPagination($nextMore, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应totalPage -6, -5, -4, -3, -2
            const page = (totalPage - 4) + (i - 3);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      } else if (currentMode === 'right') {

        if (willMode === 'symmetrical') {
          this.paginationToMore($pagination, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应totalPage -7, -6, -5, -4, -3
            const page = index + (i - 3);
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        } else if (willMode === 'left') {
          this.moreToPagination($prevMore, 'prev');
          this.paginationToMore($pagination, 'next');
          INDEXMAP.forEach(i => {
            // 索引1, 2, 3, 4, 5分别对应3, 4, 5, 6, 7
            const page = i + 2;
            const $page = $pagination.eq(i);
            $page.children('a').text(page);
            $page.attr('title', page);
          });
        }

      }

      $pagination
        .filter(toSelector(PAGINATION_ITEM_CLASS_ACTIVE))
        .removeClass(PAGINATION_ITEM_CLASS_ACTIVE);

      this
        .filterByTitle($container.find(toSelector(PAGINATION_ITEM_CLASS)), index)
        .addClass(PAGINATION_ITEM_CLASS_ACTIVE);
        
      this.currentMode = willMode;
    },

    paginationToMore ($pagination, type) {
      const { totalPage } = this;
      const svg = getEllipsisSvg('#aaaaaa');
      const isPrev = type === 'prev';
      const page = isPrev ? 2 :  totalPage - 1;
      const $currentPage = this.filterByTitle($pagination, page);
      const hoverSvg = isPrev ? getDoublePrevArrowSvg(PRIMARY_COLOR) : getDoubleNextArrowSvg(PRIMARY_COLOR);

      $currentPage.children('a').html(svg + hoverSvg);

      const klass = appendClass(
        PAGINATION_ITEM_MORE_CLASS,
        isPrev ? PAGINATION_ITEM_PREV_MORE_CLASS : PAGINATION_ITEM_NEXT_MORE_CLASS
      );
      
      $currentPage.attr('class', klass).attr('title', isPrev ? '向前跳5页' : '向后跳5页');
    },

    moreToPagination ($more, type) {
      const { totalPage, options: { bordered } } = this;
      const isPrev = type === 'prev';
      const page = isPrev ? 2 :  totalPage - 1;
      const $anchor = $more.children('a');

      $anchor.text(page);

      const klass = appendClass(
        PAGINATION_ITEM_CLASS,
        bordered ? PAGINATION_ITEM_CLASS_BORDER : ''
      );

      $more.attr('class', klass).attr('title', page);
    },

    destroy () {
      removeKeys(this, 'selector');
    }
  });

  return Pagination;
});