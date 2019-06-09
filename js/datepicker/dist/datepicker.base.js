(function (win, $) {

  var dateHandler = {

    fill: function (number) {

      number = parseInt(number);

      if (isNaN(number)) throw new Error('input is not a number');

      return number < 10 ? ('0' + number) : number;

    },

    format: function (date) {

      var fill = this.fill;

      if (date == null) {
        date = new Date();
      } else if (!isNaN(parseInt(date))) {

        date = parseInt(date);
        if (date.toString().length === 13) {
          date = new Date(date);
        } else {
          date = new Date(date * 1000);
        }

      }

      var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(),

        hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();

      return year + '-' + fill(month) + '-' + fill(day) + ' ' + fill(hour) + ':' + fill(minute) + ':' + fill(second);
    }

  };

  $.extend({
    node: function (wrapper, item, klass, attr) {
      if (item == null) return '';

      item = $.isArray(item) ? item.join('') : item;

      klass = klass ? ' class="' + klass + '"' : '';

      attr = attr ? ' ' + attr : '';

      return '<' + wrapper + klass + attr + '>' + item + '</' + wrapper + '>';
    }
  });

  var datepicker = {

    dateCache: [],

    config: function (setting) {
      var self = this;
      if (typeof setting === 'object' && !(setting instanceof Array)) {
        Object.keys(setting).forEach(function (key) {
          self[key] = setting[key]
        });
      }
    },

    getMonthData: function (year, month) {

      var days = [];

      if (!year || !month) {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth() + 1;
      }

      /* 本月第一天 */
      var firstDay = new Date(year, month - 1, 1);
      var weekOfFirstDay = firstDay.getDay();
      if (weekOfFirstDay === 0) weekOfFirstDay = 7;

      /* 本月最后一天 */
      var lastDay = new Date(year, month, 0);
      var dateOfLastDay = lastDay.getDate();

      /* 上月最后一天 */
      var lastDayOfLastMonth = new Date(year, month - 1, 0);
      var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
      var prevMonthDayCount = weekOfFirstDay - 1;

      for (var i = 0; i < 42; i++) {
        var date = i + 1 - prevMonthDayCount;
        var showDate = date;
        var thisMonth = month;
        var thisYear = year;
        if (date <= 0) {
          showDate = lastDateOfLastMonth + date;
          thisMonth = month - 1;
        } else if (date > dateOfLastDay) {
          showDate = date - dateOfLastDay;
          thisMonth = month + 1;
        }

        if (thisMonth <= 0) {
          thisMonth = 12;
          thisYear = year - 1;
        } else if (thisMonth > 12) {
          thisMonth = 1;
          thisYear = year + 1;
        }

        var isForbid = false;
        if (date < 1 || date > dateOfLastDay) {
          isForbid = true;
        }

        var fill = dateHandler.fill;
        days.push({
          date: date,
          year: thisYear,
          month: thisMonth,
          showDate: showDate,
          dateStr: thisYear + '-' + fill(thisMonth) + '-' + fill(showDate),
          forbid: isForbid ? 1 : 0
        });
      }
      
      return days;
    },

    renderOneMonthDom: function (monthData) {
      var newestDate = new Date();
      var newestYear = newestDate.getFullYear();
      var newsetMonth = newestDate.getMonth() + 1;
      var newestDay = newestDate.getDate();

      var i = 0, j = 0, k = 0;
      var tableInner = "";
      /* 日历表头部 */
      var weeks = ['一', '二', '三', '四', '五', '六', '日'], theadInner = "";
      weeks.forEach(function (week) {
        var th = $.node('th', week);
        theadInner += th;
      });
      var thead = $.node('tr', theadInner);
      tableInner += thead;

      /* 日历表主体 */
      for (i = 0; i < 6; i++) {
        var trInner = "";
        for (j = 0; j < 7; j++) {
          var data = monthData[k];
          var thisYear = data.year;
          var thisMonth = data.month;
          var thisDate = data.showDate;
          var forbid = data.forbid;
          var dateStr = data.dateStr;
          var isCurrent = (thisYear === newestYear) && (thisMonth === newsetMonth) && (thisDate === newestDay);
          var td = $.node('td', '<span>' + thisDate + '</span>', 'forbid' + forbid + (j > 4 ? ' weekend' : '') + (isCurrent ? ' current' : ''), 'data-date="' + dateStr + '"');
          trInner += td;

          k++;
        }
        var tr = $.node('tr', trInner);
        tableInner += tr;
      }

      var table = $.node('table', tableInner);
      var swiperSlide = $.node('div', table, 'swiper-slide');

      return swiperSlide;
    },

    initMonthDom: function () {
      var monthData = this.getMonthData();

      var newestDate = new Date();
      var newestYear = newestDate.getFullYear();
      var newsetMonth = newestDate.getMonth() + 1;
      var newestDay = newestDate.getDate();

      if (this.isDebug) {
        console.log('当前日期为：' + newestYear + '-' + dateHandler.fill(newsetMonth) + '-' + dateHandler.fill(newestDay));
      }

      /* ===
        日历头部
        ===*/
      var prevBtn = $.node('div', '', 'ui_datepicker_btn ui-datepicker_prev_btn');
      var dateDisplay = $.node('div', newestYear + '-' + dateHandler.fill(newsetMonth), 'ui_datepicker_date_display');
      var nextBtn = $.node('div', '', 'ui_datepicker_btn ui-datepicker_next_btn');

      var datepickerHeader = $.node('div', prevBtn + dateDisplay + nextBtn, 'ui_datepicker_header');

      /* ===
        日历主体
         ===*/
      
      /* 当月数据 */
      var swiperSlide = this.renderOneMonthDom(monthData);
      this.dateCache.push(newestYear + '-' + dateHandler.fill(newsetMonth));
      
      /* 上月数据 */
      var prevMonth = newsetMonth - 1;
      var prevYear = newestYear;
      if (prevMonth < 1) {
        prevMonth = 12;
        prevYear--;
      }
      var prevSwiperSlide = this.renderOneMonthDom(this.getMonthData(prevYear, prevMonth));
      this.dateCache.push(prevYear + '-' + dateHandler.fill(prevMonth));

      /* 下月数据 */
      var nextMonth = newsetMonth + 1;
      var nextYear = newestYear;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear++;
      }
      var nextSwiperSlide = this.renderOneMonthDom(this.getMonthData(nextYear, nextMonth));
      this.dateCache.push(nextYear + '-' + dateHandler.fill(nextMonth));
      
      var swiperWrap = $.node('div', prevSwiperSlide + swiperSlide + nextSwiperSlide, 'swiper-wrapper');
      var swiperContainer = $.node('div', swiperWrap, 'swiper-container calendar_swiper');

      var datepickerBody = $.node('div', swiperContainer, 'ui_datepicker_body');

      var backToToday = $.node('button', '返回今天', 'back_to_today');

      var datepickerWrap = $.node('div', datepickerHeader + datepickerBody + backToToday, 'ui_datepicker_wrapper');

      return datepickerWrap;
    },

    changeMonth: function (direction/* number: -1|1 */) {

      var dateDisplay = this.datepickerHeader.find('.ui_datepicker_date_display');
      var currentDate = dateDisplay.text().split('-');
      var nowYear = parseInt(currentDate[0]);
      var nowMonth = parseInt(currentDate[1]);

      nowMonth = nowMonth + direction;
      if (direction === -1) {
        if (nowMonth < 1) {
          nowMonth = 12;
          nowYear--;
        }
      } else if (direction === 1) {
        if (nowMonth > 12) {
          nowMonth = 1;
          nowYear++;
        }
      }

      var nowDateStr = nowYear + '-' + dateHandler.fill(nowMonth);
      dateDisplay.text(nowDateStr);

      var newPrevMonth = nowMonth - 1;
      var newPrevYear = nowYear;
      if (newPrevMonth < 1) {
        newPrevMonth = 12;
        newPrevYear--;
      }
      if (this.dateCache.indexOf(newPrevYear + '-' + dateHandler.fill(newPrevMonth)) === -1) {
        var newPrevMonthData = this.getMonthData(newPrevYear, newPrevMonth);
        var newPrevMonthDom = this.renderOneMonthDom(newPrevMonthData);
        this.calendarSwiper.prependSlide(newPrevMonthDom);
        this.dateCache.push(newPrevYear + '-' + dateHandler.fill(newPrevMonth));
      }

      var newNextMonth = nowMonth + 1;
      var newNextYear = nowYear;
      if (newNextMonth > 12) {
        newNextMonth = 1;
        newNextYear++;
      }
      if (this.dateCache.indexOf(newNextYear + '-' + dateHandler.fill(newNextMonth)) === -1) {
        var newNextMonthData = this.getMonthData(newNextYear, newNextMonth);
        var newNextMonthDom = this.renderOneMonthDom(newNextMonthData);
        this.calendarSwiper.appendSlide(newNextMonthDom);
        this.dateCache.push(newNextYear + '-' + dateHandler.fill(newNextMonth));
      }

    },

    refresh: function () {

      var self = this;

      self.container.empty();

      self.calendarSwiperWrap = null;
      self.datepickerHeader = null;
      self.dateCache = [];

      self.init(self.callback);

    },

    bindEvent: function (callback) {

      var self = this;

      if (self.calendarSwiperWrap == null) self.calendarSwiperWrap = $('.ui_datepicker_wrapper .ui_datepicker_body .swiper-container .swiper-wrapper');

      if (self.datepickerHeader == null) self.datepickerHeader = $('.ui_datepicker_wrapper .ui_datepicker_header');

      self.calendarSwiper = new Swiper('.calendar_swiper', {
        initialSlide: 1,
        speed: 150
      });

      /* 点击日期项 */
      self.calendarSwiperWrap.on('click', '.swiper-slide table td', function () {
        if (typeof callback === 'function') {
          callback(this);
        }
        if (!$(this).hasClass('current')) {
          $(this).addClass('current').siblings('.current').removeClass('current');
          
          $(this).parent().siblings().find('.current').removeClass('current');

          $(this).parents('.swiper-slide').siblings().find('td.current').removeClass('current');
        }
      });

      /* 向后滑动 */
      self.calendarSwiper.on('slideNextTransitionStart', function () {
        if (self.isDebug) console.log('划动了' + 1);
        self.changeMonth(1);
      });

      /* 向前划动 */
      self.calendarSwiper.on('slidePrevTransitionStart', function () {
        if (self.isDebug) console.log('划动了' + -1);
        self.changeMonth(-1);
      });

      /* 返回今天 */
      var backToToday = $('.ui_datepicker_wrapper button.back_to_today');
      backToToday.on('click', function () {
        self.refresh();
      });
    },

    init: function (callback) {

      var html = this.initMonthDom();
      this.container.append($(html));

      datepicker.bindEvent(callback);
      if (this.callback == null) this.callback = callback;

    }

  };


  win.datepicker = datepicker;

})(window, jQuery)