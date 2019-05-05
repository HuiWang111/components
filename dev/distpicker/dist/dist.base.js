(function (win, $) {

  $.extend({
    node: function (wrapper, item, klass, attr) {
      if (item == null) return '';

      item = $.isArray(item) ? item.join('') : item;

      klass = klass ? ' class="' + klass + '"' : '';

      attr = attr ? ' ' + attr : '';

      return '<' + wrapper + klass + attr + '>' + item + '</' + wrapper + '>';
    }
  });

  /*=========
    移动端区域选择
    =========*/
  var distpicker = {

    initKey: 100000,

    DISTS: {},

    isInit: false,

    config: function (setting) {
      if ((typeof setting === 'object') && !(setting instanceof Array)) {
        Object.assign(this, setting);
      }

      if (!this.isInit) this.init();
    },

    initDOM: function () {
      // header
      var headerLeft = $.node('div', '', 'header_left');
      var headerTitle = $.node('div', '配送至', 'header_title');
      var headerRight = $.node('div', '', 'header_right iconfont');

      var headerContainer = $.node('div', headerLeft + headerTitle + headerRight, 'header_container');

      // title
      var titleItem = $.node('li', '请选择', 'active');
      var underline = $.node('i', '');
      var titleList = $.node('ul', titleItem + underline);
      var titleContainer = $.node('div', titleList, 'picker_result_display');

      //dist list
      var distList = $.node('ul', '');
      var distContainer = $.node('div', distList, 'dist_list');

      var distpickerWrap = $.node('div', headerContainer + titleContainer + distContainer, 'dispicker_wrapper');
      var distpickerContainer = $.node('section', distpickerWrap, 'distpicker_container');

      var body = $('body');
      var script = body.find('script');

      if (script.length > 0) {
        script.eq(0).before($(distpickerContainer));
      } else {
        body.append($(distpickerContainer));
      }
    },

    moveUnderline: function (el) {
      var elWidth = el.width();
      var leftValue = this.computeLeftValue(el);
      this.underline.css({
        'width': (elWidth / 100) + 'rem',
        'left': (leftValue / 100) + 'rem'
      });
    },

    distSetActive: function (el) {
      var textNode = document.createTextNode(' √');
      el.addClass('active').append($(textNode)).siblings('.active').removeClass('active');
    },

    titleSetActive: function (el) {
      el.addClass('active').siblings('.active').removeClass('active');
      this.moveUnderline(el);
    },

    init: function () {

      /*======
        初始化组件元素
        ======*/
      this.initDOM();

      /*====
        初始化样式
        ====*/
      if (!this.container) this.container = $('section.distpicker_container');
      if (!this.wrap) this.wrap = this.container.find('.dispicker_wrapper');
      this.wrap.css({
        'bottom': (-467 / 100) + 'rem'
      });

      /*=======
        初始化省列表
        =======*/
      if (!this.distContainer) this.distContainer = this.wrap.find('.dist_list');
      var DISTS = this.DISTS, initKey = this.initKey, li, ul = this.distContainer.find('ul');
      for (var key in DISTS[initKey]) {
        li = $.node('li', DISTS[initKey][key], null, 'data-key="' + key + '"');

        ul.append(li);
      }

      if (!this.distListCache) this.distListCache = {};
      if (!this.distTitleList) this.distTitleList = this.wrap.find('.picker_result_display ul');
      if (!this.underline) this.underline = this.distTitleList.find('i');
      this.textCache = "";
      var self = this;

      /*=======
        绑定事件
        =======*/

      /* 显示 */
      self.target.on('click', function () {
        self.show();
      });

      /* 隐藏 */
      self.headerContainer = self.wrap.find('.header_container');
      self.container.on('click', function () {
        self.hide();
      });
      self.wrap.on('click', function (e) {
        e.stopPropagation();
      });
      self.headerContainer.find('.header_right').on('click', function () {
        self.hide();
      });

      /* 点击区域项 */
      self.distContainer.on('click', 'ul li', function () {

        var textNode = document.createTextNode(' √');
        var isActive = $(this).hasClass('active');
        var distListCurrIndex = Array.from(self.distContainer.find('ul')).indexOf(this.parentNode);
        if (!isActive) {
          self.distTitleList.find('li').eq(distListCurrIndex).text($(this).text());
          if (!self.textCache) {
            self.textCache = $(this).text();
            self.distSetActive($(this));
          } else {
            $(this).siblings('.active').text(self.textCache).removeClass('active');
            self.textCache = $(this).text();
            $(this).addClass('active').append($(textNode));
          }
        }

        var distkey = parseInt($(this).attr('data-key'));
        if (DISTS[distkey]) {
          /* 显示下一级区域 */
          self.next(distkey, distListCurrIndex, isActive);
        } else {
          var fullDist = "";
          self.distTitleList.find('li').each(function (i, t) {
            fullDist += ' ' + $(t).text();
          });
          self.target.text(fullDist);

          var elWidth = self.distTitleList.find('li').eq(distListCurrIndex).width();
          self.underline.css({
            'width': (elWidth / 100) + 'rem'
          });

          self.hide();
        }

      });

      /* 点击区域title */
      self.distTitleList.on('click', 'li', function () {
        var index = Array.from(self.distTitleList.find('li')).indexOf(this);
        self.distContainer.find('ul').eq(index).removeClass('none').siblings().addClass('none');

        self.titleSetActive($(this));
      });

      self.isInit = true;

    },

    next: function (distkey, i, isActive) {
      i = parseInt(i);
      this.distTitleList.find('li').eq(i).removeClass('active');

      var distListNewIndex = i + 1, el;

      /* new title */
      if (this.distListCache[distListNewIndex]) {
        el = this.distTitleList.find('li').eq(distListNewIndex);
        el.addClass('active');
        if (!isActive) el.text('请选择');
      } else {
        var newel = $.node('li', '请选择', 'active');
        this.underline.before($(newel));
        el = this.distTitleList.find('li.active');
      }
      this.moveUnderline(el);

      /* new dist list */
      if (!isActive) {
        var DISTS = this.DISTS, newlistInner = "", li;
        distkey = parseInt(distkey);

        for (var key in DISTS[distkey]) {
          li = $.node('li', DISTS[distkey][key], null, 'data-key="' + key + '"');

          newlistInner += li;
        }
      }
      var ul;
      if (this.distListCache[distListNewIndex]) {
        ul = this.distContainer.find('ul');
        if (!isActive) ul.eq(distListNewIndex).empty().append($(newlistInner));
        ul.addClass('none').eq(distListNewIndex).removeClass('none');
      } else {
        var newDistList = $.node('ul', newlistInner);
        this.distContainer.append($(newDistList));
        ul = this.distContainer.find('ul');
        ul.addClass('none').eq(distListNewIndex).removeClass('none');
        /* 记录一下这一级的区域已经渲染过 */
        this.distListCache[distListNewIndex] = true;
      }

    },

    computeLeftValue: function (el) {

      var leftValue = 0, i = 0;
      while (el.length > 0) {
        if (i === 0) {
          leftValue += 10;
        } else {
          leftValue += el.width() + 20;
        }

        el = el.prev();
        i++;
      }
      return leftValue;
    },

    show: function () {
      var self = this;

      self.container.addClass('show');

      /*=======
        读取默认的区域
        =======*/
      if (!this.hasRead) {
        var defaultDist = this.target.text().trim();
        var DISTS = this.DISTS, key;
        if ((typeof defaultDist === 'string') && (defaultDist.trim() !== '') && (this.placeholder ? (defaultDist.trim() !== this.placeholder) : true)) {
          var arr = defaultDist.split(' ');

          /* 设置默认省份 */
          var provinceList = this.distContainer.find('ul').eq(0);
          provinceList.find('li').each(function (i, t) {
            if ($(t).text() === arr[0]) {
              self.textCache = $(t).text();
              self.distSetActive($(t));
              return false;
            }
          });
          self.distTitleList.find('li').eq(0).text(arr[0]);

          /* 设置默认市 */
          if (arr[1]) {
            var provinceActiveKey = provinceList.find('li.active').attr('data-key');
            if (DISTS[provinceActiveKey]) {
              var inner = "";
              for (key in DISTS[provinceActiveKey]) {
                var value = DISTS[provinceActiveKey][key];
                li = $.node('li', value, null, 'data-key="' + key + '"');
                inner += li;
              }
              var newlist = $.node('ul', inner);
              self.distContainer.append($(newlist));
              self.distListCache[1] = true;
              self.distContainer.find('ul').eq(1).find('li').each(function (i, t) {
                if ($(t).text() === arr[1]) {
                  self.textCache = $(t).text();
                  self.distSetActive($(t));
                  return false;
                }
              });
              self.distContainer.find('ul').eq(1).siblings().addClass('none');

              self.distTitleList.find('li').removeClass('active');
              var newtitle = $.node('li', arr[1], 'active');
              self.underline.before($(newtitle));
              self.moveUnderline(self.distTitleList.find('li').eq(1));
            }
          }

          /* 设置默区县 */
          if (arr[2]) {
            var activeCityKey = this.distContainer.find('ul').eq(1).find('li.active').attr('data-key');
            var inner = "", li;
            if (DISTS[activeCityKey]) {
              for (key in DISTS[activeCityKey]) {
                var value = DISTS[activeCityKey][key];
                li = $.node('li', value, null, 'data-key="' + key + '"');
                inner += li;
              }
              var newlist = $.node('ul', inner);
              self.distContainer.append($(newlist));
              self.distListCache[2] = true;
              self.distContainer.find('ul').eq(2).find('li').each(function (i, t) {
                if ($(t).text() === arr[2]) {
                  self.textCache = $(t).text();
                  self.distSetActive($(t));
                  return false;
                }
              });
              self.distContainer.find('ul').eq(2).siblings().addClass('none');

              self.distTitleList.find('li').removeClass('active');
              var newtitle = $.node('li', arr[2], 'active');
              self.underline.before($(newtitle));
              self.moveUnderline(self.distTitleList.find('li').eq(2));
            }
          }
        }

        this.hasRead = true;
      }

      setTimeout(function () {
        self.wrap.css({
          'bottom': '0rem'
        });
      }, 0);
    },

    hide: function () {
      var self = this;
      self.wrap.css({
        'bottom': (-467 / 100) + 'rem'
      });
      setTimeout(function () {
        self.container.removeClass('show');
      }, 500);
    }
  };

  win.distpicker = distpicker;

})(window, jQuery)