'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (win, $) {

  var emptyArray = [];
  if (!emptyArray.map) {
    alert('您的浏览器过旧，请升级浏览器！');
    return;
  }

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
      for (var key in arrayLike) {
        object[parseFloat(key)] = arrayLike[key];
      }

      var array = [];
      for (var i in object) {
        if (isNaN(i)) {
          array.push(undefined);
        } else {
          var item = isFunction(callback) ? callback(object[i], i, object) : object[i];
          array.push(item);
        }
      }

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
      includes: function includes(target, start) {
        var array = this,
            len = array.length;
        start = typeof start === 'number' ? start : 0;
        start = start >= 0 ? start : len + start;

        var result = false;
        for (var i = start; i < len; i++) {
          if (Object.is(target, array[i])) {
            result = true;
            break;
          }
        }

        return result;
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
   * @description 组件的通用父类
   */
  function Component() {
    this.init();
  }
  Object.assign(Component.prototype, {
    constructor: Component,
    init: function init() {
      this.render();
      this.setStyle();
      this.mount();
    },
    render: function render() {},
    setStyle: function setStyle() {},

    /**
     * @description 将组件元素挂载到dom
     * @param { Array } array 需要被挂载的元素列表
     * [{
     *    html: String, //需要挂载的dom字符串
     *    selector: String, //需要挂载最外层容器的选择器
     *    container: Node | String, //挂载目标容器
     *    condition: true | false //挂载条件
     * }]
     */
    mount: function mount(array) {
      var _this = this;

      if (!array) return;
      if (!Array.isArray(array)) throw new Error(array + ' is not a Array');

      this.componentWillMount();

      for (var i = 0, len = array.length; i < len; i++) {
        var _array$i = array[i],
            container = _array$i.container,
            html = _array$i.html,
            condition = _array$i.condition;


        if (!(container === 'body' || isDom(container))) {
          throw new Error(container + ' is not a DOMElement');
        }

        if (condition) {
          if (container === 'body') {
            insertElementToBody($(html));
          } else {
            $(container).html(html);
          }
        }
      }

      /* 判断挂载完成后执行绑定事件 */
      var last = lastOf(array);
      domAfterLoad(last.selector, function () {
        _this.componentDidMount();
        _this.bindEvents();
      });
    },
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    bindEvents: function bindEvents() {}
  });
  win.Component = Component;

  // utils function
  function isString(target) {
    return typeof target === 'string';
  }
  function isObject(target) {
    return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && !(target instanceof Array);
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
   * @description 将样式内容添加到<style>标签
   * @param { Object } object
   */
  function appendStyle(object) {
    if (!isObject(object) || isEmptyObject(object) || object === null) {
      return;
    }

    var style = "",
        key = void 0;
    for (key in object) {
      var obj = object[key],
          k = void 0,
          styl = "";
      for (k in obj) {
        styl += k + ': ' + obj[k] + ';';
      }
      style = style === '' ? key + ' { ' + styl + ' }' : style + '\n' + (key + ' { ' + styl + ' }');
    }

    var oldStyleTag = document.querySelector('style');
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
      if (date.toString().length === 13) {
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
      for (var _i = 97; _i < 123; _i++) {
        letters.push(String.fromCharCode(_i));
      }

      var result = letters[Math.floor(Math.random() * letters.length)];
      if (isNumeric(size)) {
        size = parseInt(size);
        if (size > 1) {
          for (var _i2 = 1; _i2 < size; _i2++) {
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
  function domAfterLoad(selector, loadedCallback) {
    var _arguments = arguments;
    var maxTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    var times = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!isNumber(maxTimes)) return;

    var timer = null;
    var dom = document.querySelectorAll(selector);
    if (dom.length > 0) {
      timer && clearTimeout(timer);
      isFunction(loadedCallback) && loadedCallback();
    } else {
      if (times >= maxTimes) {
        //超过最大尝试检测次数
        isFunction(loadedCallback) && console.warn('`' + selector + '`未加载到dom，回调未执行');
        return;
      }
      times++;

      timer = setTimeout(function () {
        _arguments.callee(selector, loadedCallback, maxTimes, times);
      }, 0);
    }
  }

  /**
   * @description 通过value值在对象中查找key
   * @param { Object } object
   * @param { * } target
   * @param { String } excludes 排除不查找的键值，以逗号分割多个键值
   * @returns target对应的key
   */
  function keyOf(object, target, excludes) {
    if (!isObject(object)) throw new Error(object + ' is not a object');

    var isNil = excludes == null;
    if (!isNil && !isString(excludes)) throw new Error(excludes + ' is not a string');

    !isNil && (excludes = excludes.split(','));
    for (var key in object) {
      if (isNil) {
        if (Object.is(object[key], target)) return key;
      } else {
        if (!excludes.includes(key)) {
          if (Object.is(object[key], target)) return key;
        }
      }
    }
    return;
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

    for (var key in object) {
      if (keyList == null && excludeList == null) {
        delete object[key];
      } else if (keyList != null && excludeList == null) {
        keyList.includes(key) && delete object[key];
      } else if (keyList == null && excludeList != null) {
        !excludeList.includes(key) && delete object[key];
      }
    }
  }

  /**
   * @description 返回元素的标签
   * @param { Node | NodeList | jQuery } el
   */
  function tagOf(el) {
    if (typeof el === 'undefined') {
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

    var result = [];
    array.forEach(function (item) {
      if (!result.includes(item)) {
        result.push(item);
      }
    });

    return result;
  }

  /**
   * @description  去除第一个数组中与后一个数组相同的元素
   * @param { Array } array
   * @param { Array } list
   */
  function remove(array, list) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a function');
    if (!Array.isArray(list)) throw new Error(list + ' is not a function');

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
    if (!Array.isArray(array)) throw new Error(array + ' is not a function');
    if (!Array.isArray(list)) throw new Error(list + ' is not a function');

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

  /**
   * @description 获取元素(带有length属性的对象都可以)的最后一个元素
   */
  function lastOf(object) {
    var len = object.length;
    if (!object || !isLength(len)) return;

    return object[len - 1];
  }

  /**
   * @description ES5 Set集合简易版
   */
  function rSet() {
    var set = void 0;
    if (Array.isArray(arguments[0])) {
      set = arguments[0];
    } else {
      set = Array.from(arguments);
    }

    set = uniq(set);

    var len = set.length;
    for (var i = 0; i < len; i++) {
      var value = set[i];
      this[i] = value;
    }

    Object.defineProperties(this, {
      size: {
        configurable: false,
        value: len,
        enumerable: false,
        writable: true
      },

      nextKey: {
        configurable: false,
        value: len,
        enumerable: false,
        writable: true
      }
    });
  }

  rSet.prototype = {
    constructor: rSet,

    has: function has(item) {
      var key = keyOf(this, item, 'size,nextKey');
      return typeof key !== 'undefined';
    },

    forEach: function forEach(callback) {
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      for (var key in this) {
        callback(this[key], key, this);
      }
    },

    add: function add(item) {
      if (!this.has(item)) {
        this[this.nextKey++] = item;
        this.size++;
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

    // 数组方法
    uniq: uniq,
    remove: remove,
    ins: ins,
    difference: difference,
    makeArray: makeArray,

    // 对象方法
    deleteKeys: deleteKeys,
    keyOf: keyOf,
    lastOf: lastOf,

    // 其他方法
    dateFormater: dateFormater,
    buildRandomString: buildRandomString,
    rSet: rSet

  };
  win.Util = Util; //export Util

  /* ========String======== */
  /**
   * @description 合并类名，自动以空格分割
   */
  String.prototype.appendClass = function (className) {
    var string = this;

    if (className.length !== 0) {
      string += string.length === 0 ? className : ' ' + className;
    }

    return string;
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
          for (var key in attr) {
            if (key.trim() === 'style' && isObject(attr[key]) && attr[key] !== null) {
              attributes += key + '=';
              for (var k in attr[key]) {
                attributes += '"' + k + ': ' + attr[key][k] + ';"';
              }
            } else {
              var thisAttr = key + '="' + attr[key] + '"';
              attributes += ' ' + thisAttr;
            }
          }
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