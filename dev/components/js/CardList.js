;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.CardList = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isFunction, toSelector, extend, appendClass
    },
    ClassName: {
      CARD_LIST_ITEM_INNER_CLASS, CARD_LIST_ITEM_CLASS
    }
  } = global;
  
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

  function CardList (selector, options) {
    const defaultOptions = {
      dataSource: [],
      lineItemNumber: 3,
      ratio: 0.57,
      border: false,
      style: null,
      renderItem: null
    }

    this.options = extend({}, defaultOptions, options);
    this.$container = $(selector);

    this.super();
  }

  $.inherit(Component, CardList);

  extend(CardList.prototype, {
    render () {
      const { dataSource, renderItem, lineItemNumber } = this.options;
      const { $container } = this;

      const itemPercent = Math.floor(100/lineItemNumber);

      const CardItems = dataSource.map((data) => {
        const itemDom = isFunction(renderItem) ? renderItem(data) : data;
        const itemInner = $.node('div', itemDom, CARD_LIST_ITEM_INNER_CLASS);

        return $.node('div', itemInner, appendClass(CARD_LIST_ITEM_CLASS, `flex-percent-${itemPercent}`));
      });

      return [{
        html: CardItems.join(''),
        container: $container
      }];
    },

    style () {
      const { $container, options: { ratio, border } } = this;

      $container.addClass('flex');

      const $item = $container.find(toSelector(CARD_LIST_ITEM_INNER_CLASS));
      $item.css({
        height: 0,
        paddingBottom: `${ratio * 100}%`,
        border: border ? '1px solid #eee' : 'none'
      });
    }
  });

  return CardList;
});