'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * ES6可用方法：Object.is, Object.assign, Array.from, String.prototype.repeat, String.prototype.includes,
 *  Array.prototype.find, Array.prototype.findIndex
 * 
 * ES7可用方法：Array.prototype.includes
 */
;!function (win, $) {

  var emptyArray = [];
  if (!emptyArray.map) {
    alert('您的浏览器过旧，请升级浏览器！');
    return;
  }

  /**
   * @description ES6方法
   */
  if (!emptyArray.fill) {

    Object.is = function (x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y; // +0不等于-0
      } else {
        return x !== x && y !== y; // NaN === NaN => true
      }
    };

    Object.assign = function () {
      var receiver = emptyArray.slice.call(arguments).slice(0, 1)[0],
          suppliers = emptyArray.slice.call(arguments).slice(1);

      suppliers.forEach(function (supplier) {
        Object.keys(supplier).forEach(function (key) {
          receiver[key] = supplier[key];
        });
      });

      return receiver;
    };

    Array.from = function (arrayLike, callback) {
      var len = arrayLike.length || arrayLike.size;
      if (typeof len !== 'number') return [];

      var object = {};
      forInOwn(arrayLike, function (__, key) {
        object[parseFloat(key)] = arrayLike[key];
      });

      var array = [];
      forInOwn(object, function (value, i, self) {
        if (isNaN(i)) {
          array.push(undefined);
        } else {
          var item = isFunction(callback) ? callback(value, i, self) : value;
          array.push(item);
        }
      });

      return array;
    };

    Object.assign(String.prototype, {
      repeat: function repeat(count) {
        count = parseInt(count);
        if (count < 0) throw new Error('Invalid count value');
        if (isNaN(count) || count === 0) return '';

        var string = this;
        var result = "";
        for (var i = 0; i < count; i++) {
          result += string;
        }

        return result;
      },
      startsWith: function startsWith(search, start) {
        if (search instanceof RegExp) {
          throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }

        search = String(search);
        start = isNumeric(start) ? parseInt(start) : 0;

        var len = search.length;
        if (start + search.length > len) {
          return false;
        } else {
          var str = this.substring(start, start + len);
          return str === search;
        }
      },
      endsWith: function endsWith(search, pos) {
        if (search instanceof RegExp) {
          throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }

        search = String(search);
        var len = search.length;
        var length = this.length;

        var start = isNumeric(pos) ? parseInt(pos) - len : length - 1;

        if (start + len > length) {
          return false;
        } else {
          var str = this.substring(start, start + len);
          return str === search;
        }
      },
      includes: function includes(search, start) {
        if (search instanceof RegExp) {
          throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }

        start = isNumber(start) ? start : 0;
        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, indexOf) !== -1;
        }
      }
    });

    Object.assign(Array.prototype, {
      find: function find(callback, context) {
        if (typeof callback !== 'function') throw new Error(callback + ' is not a function');

        var array = this;
        for (var i = 0, len = array.length; i < len; i++) {
          var found = typeof context === 'undefined' ? callback(array[i], i, array) : callback.call(context, array[i], i, array);

          if (found === true) return array[i];
        }
      },
      findIndex: function findIndex(callback, context) {
        if (typeof callback !== 'function') throw new Error(callback + ' is not a function');

        var array = this;
        for (var i = 0, len = array.length; i < len; i++) {
          var found = typeof context === 'undefined' ? callback(array[i], i, array) : callback.call(context, array[i], i, array);

          if (found === true) return i;
        }

        return -1;
      },
      fill: function fill(_fill, start, end) {
        var isNumeric = function isNumeric(target) {
          return !isNaN(parseFloat(target));
        };

        var array = this;
        var len = array.length;
        if (start == null && end == null) {
          array = array.map(function () {
            return _fill;
          });
          return array;
        } else if (start == null && end != null) {
          if (!isNumeric(end)) throw new Error(end + ' is not a number');

          end = parseInt(end);
          end = end < 0 ? len + end : end;
          if (end < 0) {
            return array;
          } else {
            array = array.map(function (item, index) {
              return index < end ? _fill : item;
            });
            return array;
          }
        } else if (start != null && end == null) {
          if (!isNumeric(start)) throw new Error(start + ' is not a number');

          start = parseInt(start);
          start = start < 0 ? len + start : start;
          if (start < 0) {
            array = array.map(function () {
              return _fill;
            });
            return array;
          } else {
            array = array.map(function (item, index) {
              return index >= start ? _fill : item;
            });
            return array;
          }
        } else {
          if (!isNumeric(start) || !isNumeric(end)) throw new Error(start + ' or ' + end + 'is not a number');

          start = parseInt(start);
          end = parseInt(end);

          start = start < 0 ? len + start : start;
          end = end < 0 ? len + end : end;
          if (start < 0 && end < 0) {
            return array;
          } else if (start > 0 && end < 0) {
            //存疑虑
            return array;
          } else if (start < 0 && end > 0) {
            array = array.map(function (item, index) {
              return index < end ? _fill : item;
            });
            return array;
          } else {
            array = array.map(function (item, index) {
              return index >= start && index < end ? _fill : item;
            });
            return array;
          }
        }
      }
    });
  }

  /**
   * @description ES7方法
   */
  if (!emptyArray.includes) {
    Object.assign(Array.prototype, {
      includes: function includes(target, start) {
        var array = this,
            len = array.length;
        start = isNumeric(start) ? parseInt(start) : 0;
        start = start >= 0 ? start : 0;

        var result = false;
        for (var i = start; i < len; i++) {
          if (Object.is(target, array[i])) {
            result = true;
            break;
          }
        }

        return result;
      }
    });
  }

  /**
   * @description ES8方法
   */
  if (!Object.entries) {
    Object.entries = function (object) {
      if (object == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var entries = [];
      var keys = Object.keys(object);
      for (var key in object) {
        if (keys.includes(key)) {
          entries.push([String(key), object[key]]);
        }
      }

      return entries;
    };

    Object.values = function (object) {
      if (object == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var values = [];
      var keys = Object.keys(object);
      for (var key in object) {
        if (keys.includes(key)) {
          values.push(object[key]);
        }
      }

      return values;
    };
  }

  /**
   * @description 组件的通用父类
   */
  function Component() {
    this.init();
  }

  /**
   * @description 将组件元素挂载到dom
   * @param { Array } doms 需要挂载的dom列表
   * [{
   *   html: String, // 需要被挂载的dom字符串
   *   container: DOMElement | 'body', // 挂载的目标容器
   *   condition: Boolen, // 挂载的条件，默认挂载
   *   type: 'html' // 挂载的jQuery方法, append | prepend | before | after | html 等, 默认html
   * }]
   */
  Object.defineProperty(Component.prototype, 'mount', {
    value: function value(doms) {
      var _this = this;

      if (!doms || !isLength(doms.length) || doms.length < 1) return;

      doms.forEach(function (dom) {
        var condition = dom.condition,
            container = dom.container,
            html = dom.html,
            type = dom.type;

        if (dom.html == null) throw new Error('缺少需挂载的dom字符串');
        if (dom.container == null) throw new Error('缺少挂载目标容器');

        // condition默认为true
        typeof condition === 'undefined' && (condition = true);
        if (condition) {
          if (container === 'body') {
            insertElementToBody($(html));
          } else {
            type = type || 'html';
            !(container instanceof jQuery) && (container = $(container));
            container[type](html);
          }
        }
      });

      var last = lastOf(doms);
      var classIndex = last.html.indexOf('class');
      var selector = '';
      if (classIndex > -1) {
        selector = getSelector(last.html);
      } else {
        selector = getSelector(last.html, 'id');
      }

      domAfterLoad(selector, function () {
        _this.componentDidMount();
        _this.style();
        _this.bindEvents();
        _this.destroy();
      });
    },
    writable: false,
    configurable: false,
    enumerable: true
  });

  Object.defineProperty(Component.prototype, 'init', {
    value: function value() {
      var doms = this.render();
      this.componentWillMount();
      this.mount(doms);
    },
    writable: false,
    configurable: false,
    enumerable: true
  });

  Object.assign(Component.prototype, {
    constructor: Component,
    render: function render() {
      return [];
    },
    style: function style() {},
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    bindEvents: function bindEvents() {},

    /**
     * @description 删除一些无用的实例属性
     */
    destroy: function destroy() {}
  });

  win.Component = Component;

  // utils function
  function isString(target) {
    return typeof target === 'string';
  }
  function isObject(target) {
    return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object';
  }
  function isEmptyObject(target) {
    for (var _ in target) {
      return !1;
    }return !0;
  }
  /**
   * @description 判断是否是数字，包括字符串数值
   */
  function isNumeric(target) {
    return !isNaN(parseFloat(target));
  }
  /**
   * @description 判断是否是Number实例
   */
  function isNumber(target) {
    return typeof target === 'number';
  }
  function isFunction(target) {
    return typeof target === 'function';
  }
  function toNumber(target) {
    var number = parseFloat(target);
    return isNaN(number) ? false : number;
  }
  function isInteger(target) {
    return isNumber(target) && target % 1 === 0;
  }
  function isLength(target) {
    return isInteger(target) && target > -1;
  }
  /**
   * @description 判断是否为dom元素
   * @param Other 除了HTMLCollection/jQuery/HTMLElement/NodeList/Zepto以外的也可以算作dom的原型对象
   */
  function isDom(target, Other) {
    return target instanceof HTMLCollection || target instanceof jQuery || target instanceof HTMLElement || target instanceof NodeList || target instanceof Zepto || Other && target instanceof Other;
  }

  /**
   * @description 将普通类名变为选择器 'className' => '.className', 'id' => '#id'
   * @param { String } string
   * @param { String } type 'class' || 'id'
   */
  function toSelector(string) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'class';

    if (!isString(string) || string === '') return;
    if (type !== 'class' && type !== 'id') return string;
    return (type === 'class' ? '.' : '#') + string;
  }
  function makeArray(arrayLike) {
    return emptyArray.slice.call(arrayLike);
  }

  /**
   * @description 从dom字符串中获取className或id
   */
  function getSelector(string) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'class';

    var selector = '';

    if (type !== 'class' && type !== 'id') return selector;
    if (!isString(string)) throw new Error(string + ' is not a string');
    if (string.length === 0) return selector;

    if (type === 'class') {
      var _classIndex = string.indexOf('class');
      if (_classIndex < 0) return selector;

      var start = string.indexOf('"', _classIndex + 5);
      var end = string.indexOf('"', start + 1);
      var className = string.substring(start + 1, end);
      var klasses = className.split(' ');
      klasses.forEach(function (klass) {
        selector += toSelector(klass);
      });
    } else {
      var idIndex = string.indexOf('id');
      if (idIndex < 0) return selector;

      var _start = string.indexOf('"', classIndex + 2);
      var _end = string.indexOf('"', _start + 1);
      var ID = string.substring(_start + 1, _end);
      selector = toSelector(ID, 'id');
    }

    return selector;
  }

  /**
   * @description 将样式内容添加到<style>标签
   * @param { Object } object
   */
  function appendStyle(object) {
    if (!isObject(object) || isEmptyObject(object) || object === null) {
      return;
    }

    var style = "";
    forInOwn(object, function (obj, key) {
      var styl = "";
      forInOwn(obj, function (value, k) {
        styl += k + ': ' + value + ';';
      });
      style = style === '' ? key + ' { ' + styl + ' }' : style + '\n' + key + ' { ' + styl + ' }';
    });
    var oldStyleTag = document.querySelector('head').querySelector('style');
    if (oldStyleTag) {
      var oldStyle = oldStyleTag.innerHTML;
      var newStyle = oldStyle === '' ? style : oldStyle + '\n' + style;
      oldStyleTag.innerHTML = newStyle;
    } else {
      var styleTag = document.createElement('style');
      styleTag.type = 'text/css';
      styleTag.innerHTML = style;
      document.querySelector('head').appendChild(styleTag);
    }
  }

  /**
   * @description 将元素挂在到body下
   * @param { Node | NodeList | jQuery } el
   */
  function insertElementToBody(el) {
    var script = document.querySelector('script');
    var parent = script ? script.parentNode : document.querySelector('body');

    var insert = function insert(v) {
      if (script) {
        parent.insertBefore(v, script);
      } else {
        parent.appendChild(v);
      }
    };

    var len = el.length;
    if (typeof len !== 'undefined') {
      for (var i = 0; i < len; i++) {
        el[i] && insert(el[i]);
      }
    } else {
      el && insert(el);
    }
  }

  /**
   * @description 生成规定格式的日期
   * @param { * } date 时间戳
   * @param { String } format 格式
   * @returns 日期字符串
   */
  function dateFormater(date) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/mm/dd hh:mm:ss';

    var full = function full(number) {
      if (!isNumeric(number)) throw new Error(number + ' is not a number');
      number = parseInt(number);
      return number < 10 ? '0' + number : number;
    };

    if (!isNumeric(date)) {
      date = new Date();
    } else {
      date = parseInt(date);
      if (String(date).length === 13) {
        date = new Date(date);
      } else {
        date = new Date(date * 1000);
      }
    }

    var year = date.getFullYear(),
        month = full(date.getMonth() + 1),
        day = full(date.getDate()),
        hour = full(date.getHours()),
        minute = full(date.getMinutes()),
        second = full(date.getSeconds());

    var result = void 0;
    switch (format) {
      case 'yyyy-mm-dd hh:mm:ss':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;break;
      case 'yyyy-mm-dd hh:mm':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;break;
      case 'mm-dd yyyy':
        result = month + '-' + day + ' ' + year;break;
      case 'yyyy-mm-dd':
        result = year + '-' + month + '-' + day;break;
      case 'yyyy/mm/dd hh:mm:ss':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;break;
      case 'yyyy/mm/dd hh:mm':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;break;
      case 'yyyy/mm/dd':
        result = year + '/' + month + '/' + day;break;
      case 'hh:mm:ss':
        result = hour + ':' + minute + ':' + second;break;
      case 'hh:mm':
        result = hour + ':' + minute;break;

      default:
        throw new Error('not support this format:`' + format + '`');
    }

    return result;
  }

  /**
   * @description 获取某个月份的数据
   * @param { Number | String } year 年份
   * @param { Number | String } month 月份
   */
  function getMonthData(year, month) {
    year = toNumber(year);
    month = toNumber(month);

    var today = new Date();
    if (year === false || month === false) {
      year === false && (year = today.getFullYear());
      month === false && (month = today.getMonth() + 1);
    }

    if (year < 1970 || year > today.getFullYear()) return;
    if (month < 1 || month > 12) return;

    var days = [];

    /* 该月第一天 */
    var firstDay = new Date(year, month - 1, 1);
    var weekOfFirstDay = firstDay.getDay();
    // if (weekOfFirstDay === 0) weekOfFirstDay = 7;

    /* 该月最后一天 */
    var lastDay = new Date(year, month, 0);
    var dateOfLastDay = lastDay.getDate();

    /* 上个月的最后一天 */
    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate(); // 上个月最后一天的日期
    /* 本月日历上包含的上个月的日期个数(日历上显示的灰色部分) */
    var previousMonthDaysCount = weekOfFirstDay;

    var nextMonthDaysCount = 42 - (previousMonthDaysCount + dateOfLastDay);
    /* 如果显示的下月日期数量大于6个，显示总数设为35，否则设为42 */
    var total = nextMonthDaysCount > 6 ? 35 : 42;

    for (var i = 0; i < total; i++) {
      var date = i + 1 - previousMonthDaysCount;
      var showDate = date,
          thisYear = year,
          thisMonth = month;
      if (date < 1) {
        showDate = lastDateOfLastMonth + date;
        thisMonth--;
      } else if (date > dateOfLastDay) {
        showDate = date - dateOfLastDay;
        thisMonth++;
      }

      if (thisMonth === 0) {
        thisMonth = 12;
        thisYear--;
      } else if (thisMonth === 13) {
        thisMonth = 1;
        thisYear++;
      }

      /* 上一个月或下一个月的数据时isForbid为true */
      var isForbid = date < 1 || date > dateOfLastDay ? true : false;

      days.push({
        date: date,
        year: thisYear,
        month: thisMonth,
        showDate: showDate,
        dateStr: dateFormater(new Date(thisYear, thisMonth - 1, showDate).getTime(), 'yyyy-mm-dd'),
        forbid: isForbid ? 1 : 0
      });
    }
    return days;
  }

  /**
   * @description 创建一个规定长度的随机字符串，默认长度随机
   * @param { Number } length
   * @returns 随机字符串
   */
  function buildRandomString(length) {

    var randomLetter = function randomLetter(size) {
      var letters = [];
      for (var i = 65; i < 91; i++) {
        letters.push(String.fromCharCode(i));
      }
      for (var j = 97; j < 123; j++) {
        letters.push(String.fromCharCode(j));
      }

      var result = letters[Math.floor(Math.random() * letters.length)];
      if (isNumeric(size)) {
        size = parseInt(size);
        if (size > 1) {
          for (var _i = 1; _i < size; _i++) {
            result += letters[Math.floor(Math.random() * letters.length)];
          }
        }
      }

      return result;
    };

    var randomString = Math.random().toString(36).substr(2);
    var letter = randomLetter();
    randomString = letter + randomString; //保证第一位一定是字母
    if (isNumeric(length)) {
      length = parseInt(length);
      if (randomString.length > length) {
        randomString = randomString.substr(0, length);
      } else if (randomString.length < length) {
        var diff = length - randomString.length;
        var letters = randomLetter(diff);
        randomString += letters;
      }
    }
    return randomString;
  }

  /**
   * @description 检测元素挂载完成后执行回调
   * @param { String } selector
   * @param { Function } loadedCallback 挂载完成回调
   * @param { Number } maxTimes 最大尝试检测次数，默认500
   */
  var domAfterLoad = function fn(selector, loadedCallback) {
    var maxTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    var times = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!isNumber(maxTimes)) return;
    if (!isString(selector)) {
      throw new Error('`' + selector + '` is not a string');
    }
    if (selector.length < 1) return;

    var timer = null;
    var dom = document.querySelectorAll(selector);
    if (dom.length > 0) {
      timer && clearTimeout(timer);
      isFunction(loadedCallback) && loadedCallback();
    } else {
      if (times >= maxTimes) {
        //超过最大尝试检测次数
        isFunction(loadedCallback) && console.warn('`' + selector + '`未挂载到dom，回调未执行');
        return;
      }
      times++;

      timer = setTimeout(function () {
        fn(selector, loadedCallback, maxTimes, times);
      }, 0);
    }
  };

  /**
   * @description 通过value值在对象中查找key
   * @param { Object } object
   * @param { * } target
   * @param { String } excludes 排除不查找的键值，以逗号分割多个键值
   * @returns target对应的key
   */
  function keyOf(object, target, excludes, isOwn) {
    if (!isObject(object)) throw new Error(object + ' is not a object');

    var isNil = excludes == null;
    if (!isNil && !isString(excludes)) throw new Error(excludes + ' is not a string');

    !isNil && (excludes = excludes.split(','));
    for (var key in object) {
      if (isNil) {
        if (Object.is(object[key], target)) return isOwn ? object.hasOwnProperty(key) ? key : undefined : key;
      } else {
        if (!excludes.includes(key)) {
          if (Object.is(object[key], target)) return isOwn ? object.hasOwnProperty(key) ? key : undefined : key;
        }
      }
    }
    return undefined;
  }

  /**
   * @description 删除对象中的键值
   * @param { Object } object
   * @param { String | undefined } keys 需要删除的键值,以逗号分割多个键值
   * @param { String | undefined } excludes 排除不删的键值,以逗号分割多个键值
   * keys和excludes同时存在，keys取两者的差集
   */
  function deleteKeys(object, keys, excludes) {
    if (!isObject(object)) throw new Error(object + ' is not a object');
    if (keys != null && !isString(keys)) throw new Error(keys + ' is not a string');
    if (excludes != null && !isString(excludes)) throw new Error(excludes + ' is not a string');

    var keyList = void 0,
        excludeList = void 0;
    if (keys == null) {
      keyList = null;
      excludeList = excludes == null ? null : excludes.split(',');
    } else {
      if (excludes == null) {
        keyList = keys.split(',');
      } else {
        keyList = remove(keys.split(','), excludes.split(','));
      }
      excludeList = null;
    }

    forInOwn(object, function (_, key, self) {
      if (keyList == null && excludeList == null) {
        delete self[key];
      } else if (keyList != null && excludeList == null) {
        keyList.includes(key) && delete self[key];
      } else if (keyList == null && excludeList != null) {
        !excludeList.includes(key) && delete self[key];
      }
    });
  }

  /**
   * @description for-in循环
   */
  function forIn(object, callback) {
    if (!isFunction(callback)) throw new Error(callback + ' is not a function');

    for (var key in object) {
      var isBreak = callback(object[key], key, object);
      if (isBreak === false) break;
    }
  }
  function forInOwn(object, callback) {
    if (!isFunction(callback)) throw new Error(callback + ' is not a function');

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var isBreak = callback(object[key], key, object);
        if (isBreak === false) break;
      }
    }
  }

  /**
   * @description 返回元素的标签
   * @param { Node | NodeList | jQuery } el
   */
  function tagOf(el) {
    if (!isLength(el.length)) {
      return el.tagName.toLowerCase();
    }
    return el[0].tagName.toLowerCase();
  }

  /**
   * @description 数组去重
   * @param { Array } array
   */
  function uniq(array) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');

    return array.reduce(function (arr, item) {
      return arr.includes(item) ? arr : [].concat(_toConsumableArray(arr), [item]);
    }, []);
  }

  /**
   * @description  移除除第一个数组中与后一个数组重复的元素
   * @param { Array } array
   * @param { Array } list
   */
  function remove(array, list) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');
    if (!Array.isArray(list)) throw new Error(list + ' is not a Array');

    var result = [];
    uniq(array).forEach(function (item) {
      !list.includes(item) && result.push(item);
    });

    return result;
  }

  /**
   * @description 两数组的交集
   */
  function ins(array, list) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');
    if (!Array.isArray(list)) throw new Error(list + ' is not a Array');

    var result = [];
    array.forEach(function (item) {
      list.includes(item) && result.push(item);
    });

    return uniq(result);
  }

  /**
   * @description 两数组的差集  
   */
  function difference(array, list) {

    var insection = ins(array, list);
    var arr1 = remove(array, insection);
    var arr2 = remove(list, insection);

    return arr1.concat(arr2);
  }

  function sum(array) {
    var sum = 0;
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 1) return sum;

    return array.reduce(function (sum, current) {
      return sum + current;
    });
  }

  function sumBy(array, iteratee) {
    var sum = 0;
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return sum;

    if (isString(iteratee)) {
      return array.reduce(function (sum, item) {
        return sum + (iteratee in item ? item[iteratee] : 0);
      }, 0);
    } else if (isFunction(iteratee)) {
      return array.reduce(function (sum, item, index, self) {
        return sum + iteratee(item, index, self);
      }, 0);
    }
    return 0;
  }

  function max(array) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return array.reduce(function (max, current) {
      return max >= current ? max : current;
    });
  }

  function maxBy(array, iteratee) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    var initialValue = void 0;
    if (isString(iteratee)) {
      initialValue = array[0][iteratee];

      return array.reduce(function (max, current) {
        var currentValue = current[iteratee];
        return max >= currentValue ? max : currentValue;
      }, initialValue);
    } else if (isFunction(iteratee)) {
      initialValue = iteratee(array[0], 0, array);

      return array.reduce(function (max, current, index, self) {
        var currentValue = iteratee(current, index, self);
        return max >= currentValue ? max : currentValue;
      }, initialValue);
    }
  }

  function min(array) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return array.reduce(function (min, current) {
      return min <= current ? min : current;
    });
  }

  function minBy(array, iteratee) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    var initialValue = void 0;
    if (isString(iteratee)) {
      initialValue = array[0][iteratee];

      return array.reduce(function (min, current) {
        var currentValue = current[iteratee];
        return min <= currentValue ? min : currentValue;
      }, initialValue);
    } else if (isFunction(iteratee)) {
      initialValue = iteratee(array[0], 0, array);

      return array.reduce(function (min, current, index, self) {
        var currentValue = iteratee(current, index, self);
        return min <= currentValue ? min : currentValue;
      }, initialValue);
    }
  }

  function mean(array) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sum(array) / len;
  }

  function meanBy(array, iteratee) {
    var len = array == null ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sumBy(array, iteratee) / len;
  }

  /**
   * @description 获取元素(带有length属性的对象都可以)的最后一个元素
   */
  function lastOf(object) {
    var len = object.length;
    if (!object || !isLength(len)) return;

    return object[len - 1];
  }

  /**
   * @description ES5版Set集合
   */
  function SetMock() {

    Object.defineProperties(this, {
      size: {
        configurable: false,
        value: 0,
        enumerable: false,
        writable: true
      },

      nextKey: {
        configurable: false,
        value: 0,
        enumerable: false,
        writable: true
      }
    });
  }

  SetMock.prototype = {
    constructor: SetMock,

    has: function has(item) {
      var key = keyOf(this, item, 'size,nextKey');
      return typeof key !== 'undefined';
    },
    forEach: function forEach(callback, context) {
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      forInOwn(this, function (value, key, self) {
        isObject(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
      });
    },
    add: function add(item) {
      var _this2 = this;

      var addSet = function addSet(target) {
        if (!_this2.has(target)) {
          _this2[_this2.nextKey++] = target;
          _this2.size++;
        }
      };

      if (Array.isArray(item)) {
        var set = uniq(item);
        set.forEach(function (setItem) {
          addSet(setItem);
        });
      } else {
        addSet(item);
      }

      return this;
    },
    delete: function _delete(item) {
      var key = keyOf(this, item);
      if (typeof key !== 'undefined') {
        delete this[key];
        this.size--;
        return !0;
      }
      return !1;
    },


    clear: function clear() {
      deleteKeys(this);
      this.size = 0;
      this.nextKey = 0;
    },

    /**
     * 额外的，不同于ES6 Set集合的方法
     */
    filter: function filter(callback) {
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      var result = new SetMock();
      forInOwn(this, function (value, key, self) {
        var state = callback(value, key, self);
        if (state === true) result.add(value);
      });

      return result;
    },
    toArray: function toArray() {
      var array = [];
      forInOwn(this, function (value) {
        array.push(value);
      });

      return array;
    },
    indexOf: function indexOf(item) {
      return this.toArray().indexOf(item);
    }
  };

  /**
   * @description ES5版Map集合
   */
  function MapMock(entries) {
    var _this3 = this;

    Object.defineProperty(this, 'size', {
      configurable: false,
      value: 0,
      enumerable: false,
      writable: true
    });

    if (entries != null) {
      if (!Array.isArray(entries)) {
        throw new Error(entries + ' is not a Array');
      } else {
        entries.forEach(function (entry) {
          if (!Array.isArray(entry)) {
            throw new Error(entry + ' is not a Array');
          } else {
            var key = entry[0],
                value = entry[1];
            _this3[key] = value;
            _this3.size++;
          }
        });
      }
    }
  }

  MapMock.prototype = {
    constructor: MapMock,

    set: function set(key, value) {
      this[key] = value;
      this.size++;
      return this;
    },
    get: function get(key) {
      return this[key];
    },
    has: function has(key) {
      var has = false;
      forInOwn(this, function (_, k) {
        if (Object.is(key, k)) {
          has = true;
          return false;
        }
      });

      return has;
    },
    delete: function _delete(key) {
      if (this.has(key)) {
        delete this[key];
        this.size--;
        return true;
      }
      return false;
    },
    clear: function clear() {
      deleteKeys(this);
      this.size = 0;
    },
    forEach: function forEach(callback, context) {
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      forInOwn(this, function (value, key, self) {
        isObject(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
      });
    }
  };

  var Util = {

    // 类型方法
    isString: isString,
    isObject: isObject,
    isEmptyObject: isEmptyObject,
    isFunction: isFunction,
    isNumber: isNumber,
    isNumeric: isNumeric,
    isDom: isDom,
    isInteger: isInteger,
    isLength: isLength,

    // number方法
    toNumber: toNumber,

    // dom方法
    toSelector: toSelector,
    appendStyle: appendStyle,
    insertElementToBody: insertElementToBody,
    domAfterLoad: domAfterLoad,
    tagOf: tagOf,
    getSelector: getSelector,

    // 数组方法
    uniq: uniq,
    remove: remove,
    ins: ins,
    difference: difference,
    makeArray: makeArray,
    sum: sum,
    sumBy: sumBy,
    max: max,
    maxBy: maxBy,
    min: min,
    minBy: minBy,
    mean: mean,
    meanBy: meanBy,

    // 对象方法
    deleteKeys: deleteKeys,
    keyOf: keyOf,
    lastOf: lastOf,
    forIn: forIn,
    forInOwn: forInOwn,

    // 其他方法
    dateFormater: dateFormater,
    getMonthData: getMonthData,
    buildRandomString: buildRandomString,
    SetMock: SetMock,
    MapMock: MapMock

  };
  win.Util = Util; //export Util

  ;!function (win) {

    function mouseWheelListener(callback) {
      addMouseWheelHandler(function (e) {
        e = e || window.event;
        var value = e.wheelDelta || -e.deltaY || -e.detail;
        var delta = Math.max(-1, Math.min(1, value));
        var direction = delta < 0 ? 'down' : 'up';
        isFunction(callback) && callback(direction);
      });
    }

    win.mouseWheelListener = mouseWheelListener;

    var g_supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          g_supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}

    function addMouseWheelHandler(callback) {
      var prefix = '';
      var _addEventListener = void 0;

      if (window.addEventListener) {
        _addEventListener = "addEventListener";
      } else {
        _addEventListener = "attachEvent";
        prefix = 'on';
      }

      var support = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';

      var passiveEvent = g_supportsPassive ? { passive: false } : false;

      if (support == 'DOMMouseScroll') {
        document[_addEventListener](prefix + 'MozMousePixelScroll', callback, passiveEvent);
      } else {
        document[_addEventListener](prefix + support, callback, passiveEvent);
      }
    }
  }(win);

  /* ========String======== */
  /**
   * @description 合并类名，自动以空格分割
   */
  function appendClass(string, className) {
    if (className.length !== 0) {
      string += string.length === 0 ? className : ' ' + className;
    }

    return string;
  }
  String.prototype.appendClass = function (className) {
    return appendClass(this, className);
  };

  /* ========jQuery======== */
  /**
   * @description 设置或获取元素的translate值
   * @param { Number | Function } x
   * @param { Number | Function } y
   */
  $.prototype.translate = function (x, y) {
    if (x == null && y == null) {
      return [parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]), parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5])];
    }

    var xValue = void 0,
        yValue = void 0;
    if (y == null) {
      xValue = isFunction(x) ? parseFloat(x()) : parseFloat(x);
      if (!isNaN(xValue)) {
        this.css({
          'transform': 'translateX(' + xValue + 'px)'
        });
      }
      return this;
    } else if (x == null) {
      yValue = isFunction(y) ? parseFloat(y()) : parseFloat(y);
      if (!isNaN(yValue)) {
        this.css({
          'transform': 'translateY(' + yValue + 'px)'
        });
      }
      return this;
    } else {
      xValue = isFunction(x) ? parseFloat(x()) : parseFloat(x);
      yValue = isFunction(y) ? parseFloat(y()) : parseFloat(y);
      if (!isNaN(xValue) && !isNaN(yValue)) {
        this.css({
          'transform': 'translate(' + xValue + 'px, ' + yValue + 'px)'
        });
      }
      return this;
    }
  };
  $.prototype.translateX = function (value) {
    if (value == null) {
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
    }
    this.translate(value);
  };
  $.prototype.translateY = function (value) {
    if (value == null) {
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5]);
    }
    this.translate(null, value);
  };

  /**
   * @description 查找元素的index
   * @param { Function } callback
   */
  $.prototype.findIndex = function (callback) {
    if (!isFunction(callback)) throw new Error('`callback` must be a function');

    var $el = this;
    for (var i = 0, len = $el.length; i < len; i++) {
      var found = callback(i, $el[i], $el);
      if (found === true) return i;
    }

    return -1;
  };

  $.prototype.indexOf = function (jq) {
    if (!(jq instanceof jQuery)) jq = $(jq);

    var index = -1;
    var $el = this;
    for (var i = 0, len = $el.length; i < len; i++) {
      if ($el[i] === jq[0]) {
        index = i;
        break;
      }
    }

    return index;
  };

  $.prototype.reduce = function (callback, initialValue) {
    if (!isFunction(callback)) throw new Error('`' + callback + '` is not a function');
    if (this.length === 0 && typeof initialValue === 'undefined') {
      throw new Error('TypeError: Reduce of empty jQuery with no initial value');
    }

    var $el = this;
    var i = -1;
    var result = initialValue;
    if (typeof result === 'undefined') {
      result = $el[0];
      i = 0;
    }
    var len = $el.length;
    while (++i < len) {
      result = callback(result, $el[i], i, $el);
    }
    return result;
  };

  $.extend({

    /**
     * @description 生成html字符串
     * @param {String} wrapper tagName
     * @param {String} item 元素子集
     * @param {String} klass className
     * @param {String | Object} attributes
     */
    node: function node(wrapper, item, klass, attr) {
      if (item == null) return '';

      // If the item is an array, do a join
      item = Array.isArray(item) ? item.join('') : item;

      // Check for the class
      klass = klass ? ' class="' + klass + '"' : '';

      // Check for any attributes
      var attributes = '';
      if (attr) {
        if (isString(attr)) {
          attributes = ' ' + attr;
        } else if (isObject(attr)) {
          forInOwn(attr, function (obj, key) {
            if (key.trim() === 'style' && isObject(obj) && obj !== null) {
              attributes += key + '=';
              forInOwn(obj, function (value, k) {
                attributes += '"' + k + ': ' + value + ';"';
              });
            } else {
              var thisAttr = key + '="' + obj + '"';
              attributes += ' ' + thisAttr;
            }
          });
        }
      }

      return '<' + wrapper + klass + attributes + '>' + item + '</' + wrapper + '>';
    },

    /**
     * @description 子类使用this.super()继承父类
     */
    inherit: function inherit(SuperClass, SubClass) {
      SubClass.prototype = new SuperClass();
      SubClass.prototype.constructor = SubClass;
      SubClass.prototype.super = SuperClass;
    }

  });
}(window, jQuery);