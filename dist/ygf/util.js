var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;!function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : typeof global._ === 'undefined' ? global._ = global.util = factory() : global.util = factory();
}(this, function () {

  var emptyArray = Object.freeze([]);
  var _slice = emptyArray.slice;

  if (!emptyArray.map) {
    alert('您的浏览器过旧，请升级浏览器！');
    return;
  }

  var ARRAY_TAG = '[object Array]',
      OBJECT_TAG = '[object Object]',
      REGEXP_TAG = '[object RegExp]',
      DATE_TAG = '[object Date]',
      STRING_TAG = '[object String]',
      NUMBER_TAG = '[object Number]',
      BOOLEAN_TAG = '[object Boolean]',
      FUNCTION_TAG = '[object Function]',
      UNDEFINED_TAG = '[object Undefined]',
      NULL_TAG = '[object Null]';

  /**
   * Object.assign
   */
  var extend = Object.assign || function () {
    var receiver = _slice.call(arguments, 0, 1)[0],
        suppliers = _slice.call(arguments, 1);

    suppliers.forEach(function (supplier) {
      Object.keys(supplier).forEach(function (key) {
        receiver[key] = supplier[key];
      });
    });

    return receiver;
  };

  /**
   * Object.is
   */
  var _is = Object.is || function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };

  /**
   * Array.from
   */
  var toArray = Array.from || function (arrayLike, callback) {
    var len = arrayLike.length || arrayLike.size;
    if (!isLength(len)) return [];

    var array = [];
    forInOwn(arrayLike, function (value, key, self) {
      if (isNumeric(key)) {
        var item = isFunction(callback) ? callback(value, parseInt(key), self) : value;
        array.push(item);
      } else {
        array.push(undefined);
      }
    });

    return array;
  };

  /**
   * Array.prototype.includes
   */
  if (!emptyArray.includes) {
    Array.prototype.includes = function (target, start) {
      var array = this,
          len = array.length;
      start = isNumeric(start) ? parseInt(start) : 0;
      start = start >= 0 ? start : 0;

      var result = false;
      for (var i = start; i < len; i++) {
        if (_is(target, array[i])) {
          result = true;
          break;
        }
      }

      return result;
    };
  }

  /* ======== 私有方法，不添加到Util全局对象 ======== */

  function baseUnion(args, isSample) {
    var array = [];
    var prop = null;
    for (var i = 0, len = args.length; i < len; i++) {
      if (isArray(args[i])) {
        array.push.apply(array, _toConsumableArray(args[i]));
      } else {
        prop = args[i];
        break;
      }
    }

    return !isSample ? { array: array, prop: prop } : array;
  }

  /**
   * @description 在对象中查找需要的key值
   * @param { Object } object
   * @param { Boolean } deep 是否第一次查找到后继续遍历查找
   */
  function baseKeyOf(object, iteratee, deep) {
    checkObjectLike(object);

    var keys = [];
    for (key in object) {
      if (isFunction(iteratee)) {
        var result = iteratee(object[key], key, object);
        if (result === true) {
          keys.push(key);
          if (!deep) break;
        }
      } else {
        if (_is(object[key], iteratee)) {
          keys.push(key);
          if (!deep) break;
        }
      }
    }

    return keys;
  }

  /**
   * @description 删除对象中的键值对
   * @param iteratee 函数或者需要删除的键值
   * @param deep 是否删除第一个后继续往下遍历
   */
  function baseRemoveKey(object, iteratee, deep) {
    checkObjectLike(object);

    var isFunc = isFunction(iteratee);

    var obj = {},
        flag = false;
    if (isFunc) {
      for (var _key in object) {
        var result = iteratee(object[_key], _key, object);
        if (result === true) {
          var value = object[_key];
          delete object[_key];
          flag = true;
          extend(obj, _defineProperty({}, _key, value));
          if (!deep) break;
        }
      }
    } else {
      if (iteratee in object) {
        var _value = object[iteratee];
        delete object[iteratee];
        flag = true;
        extend(obj, _defineProperty({}, iteratee, _value));
      }
    }

    return flag ? obj : flag;
  }

  function baseRemoveAt(array, indexes) {
    var length = array && isLength(array.length) ? array.length : 0;
    indexes = uniq(indexes);

    for (var i = length - 1; i > -1; i--) {
      var index = indexes[i];
      if (isIndex(index)) {
        emptyArray.splice.call(array, index, 1);
      } else {
        if (index in array) delete array[index];
      }
    }
  }

  function baseRemove(array, iteratee) {
    checkType(array, 'array');

    var isFunc = isFunction(iteratee);
    var isArr = isArray(iteratee);
    var indexes = [],
        result = [];

    for (var i = 0, len = array.length; i < len; i++) {
      var value = array[i];
      switch (true) {
        case isFunc:
          var ifRemove = iteratee(value, i, array);
          if (ifRemove === true) {
            result.push(value);
            indexes.push(i);
          }
          break;

        case isArr:
          if (iteratee.includes(value)) {
            result.push(value);
            indexes.push(i);
          }
          break;

        default:
          if (_is(iteratee, value)) {
            result.push(value);
            indexes.push(i);
          }
      }
    }

    baseRemoveAt(array, indexes);
    return result;
  }

  function getLetters() {
    var letters = [];
    for (var i = 65; i < 91; i++) {
      letters.push(String.fromCharCode(i));
    }
    for (var j = 97; j < 123; j++) {
      letters.push(String.fromCharCode(j));
    }
    return letters;
  }

  function baseRandomLetter(size) {
    var letters = getLetters();

    var result = letters[Math.floor(Math.random() * letters.length)];
    size = toInteger(size);

    if (size && size > 1) {
      for (var i = 1; i < size; i++) {
        result += letters[Math.floor(Math.random() * letters.length)];
      }
    }

    return result;
  }

  /**
   * @description 创建一个规定长度的随机字符串，默认长度随机
   * @param { Number } length
   * @returns 随机字符串
   */
  function buildRandomString(length) {
    var randomString = Math.random().toString(36).substr(2);
    var letter = baseRandomLetter();
    randomString = letter + randomString; //保证第一位一定是字母

    length = toInteger(length);
    if (length) {
      var size = randomString.length;
      if (length > size) {
        var diff = length - size;
        var letters = baseRandomLetter(diff);
        randomString += letters;
      } else if (length < size) {
        randomString = randomString.substr(0, length);
      }
    }

    return randomString;
  }

  function baseClone(object, deep) {
    checkObjectLike(object);

    var result = isArray(object) ? [] : {};
    for (var _key2 in object) {
      var value = object[_key2];
      if (isObjectLike(value) && deep) {
        result[_key2] = baseClone(value, true);
      } else {
        result[_key2] = value;
      }
    }

    return result;
  }

  var _toString = Object.prototype.toString;
  function getTag(value) {
    return _toString.call(value);
  }

  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return _hasOwnProperty.call(obj, key);
  }

  function getType(value) {
    var tag = getTag(value);

    return tag.slice(8, tag.length - 1).toLowerCase();
  }

  function checkObjectLike(value) {
    if (!isObjectLike(value)) throw new TypeError('Excepted a \'objectLike\', You given a ' + getType(value));
  }

  /**
   * Date
   */
  function baseNow() {
    return new Date();
  }

  function baseHandleYear(year) {
    year = toNumber(year) || baseNow().getFullYear();

    if (year < 1970) throw new Error('year:' + year + ' is not in range');

    return year;
  }

  function baseHandleMonth(month) {
    month = toNumber(month) || baseNow().getMonth() + 1;

    if (month < 1 || month > 12) throw new Error('month:' + month + ' is not in range');

    return month;
  }

  function baseDateFull(number) {
    checkType(number, 'number');

    return number < 10 ? '0' + number : number;
  }

  function baseFlatten(array, deep, depth) {
    var currentDepth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    checkType(array, 'array');
    checkType(deep, 'boolean');
    checkType(depth, 'number');

    var newArray = [];
    for (var i = 0, len = array.length; i < len; i++) {
      var value = array[i];
      if (!isArray(value)) {
        newArray.push(value);
      } else {
        if (deep || !isNil(depth) && depth > currentDepth) {
          var arr = baseFlatten(value, deep, depth, currentDepth + 1);
          for (var j = 0, size = arr.length; j < size; j++) {
            newArray.push(arr[j]);
          }
        } else {
          for (var _j = 0, _size = value.length; _j < _size; _j++) {
            newArray.push(value[_j]);
          }
        }
      }
    }

    return newArray;
  }

  /* ======== Util全局对象中的方法 ======== */

  function isString(value) {
    return getTag(value) === STRING_TAG;
  }
  function isObjectLike(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !isNull(value);
  }
  function isObject(value) {
    return getTag(value) === OBJECT_TAG;
  }
  function isNil(value) {
    return value == null;
  }
  function isEmpty(value) {
    if (isNil(value)) {
      return !0;
    } else if (isLength(value.length)) {
      return value.length === 0;
    } else if (isLength(value.size)) {
      return value.size === 0;
    } else if (isObjectLike(value)) {
      for (var _ in value) {
        return !1;
      }return !0;
    } else if (isNumber(value)) {
      return value === 0;
    } else if (isBoolean(value)) {
      return !value;
    }
  }
  function isUndefined(value) {
    return getTag(value) === UNDEFINED_TAG;
  }
  function isNull(value) {
    return getTag(value) === NULL_TAG;
  }
  /**
   * @description 判断是否是数字，包括字符串数值
   */
  function isNumeric(value) {
    return !isNaN(parseFloat(value));
  }
  /**
   * @description 判断是否是Number实例
   */
  function isNumber(value) {
    return getTag(value) === NUMBER_TAG;
  }
  function isFunction(value) {
    return getTag(value) === FUNCTION_TAG;
  }
  function isBoolean(value) {
    return getTag(value) === BOOLEAN_TAG;
  }
  function isDate(value) {
    return getTag(value) === DATE_TAG;
  }
  var nativeIsArray = Array.isArray;
  function isArray(value) {
    return nativeIsArray ? nativeIsArray(value) : getTag(value) === ARRAY_TAG;
  }
  function isRegExp(value) {
    return getTag(value) === REGEXP_TAG;
  }

  /**
   * @example
   * toNumber('5') // 5
   * toNumber('abc') // false
   */
  function toNumber(value) {
    var number = parseFloat(value);
    return isNaN(number) ? false : number;
  }
  function toInteger(value) {
    var int = parseInt(value);
    return isNaN(int) ? false : int;
  }
  /**
   * @description 是否为整数
   */
  function isInteger(value) {
    return isNumber(value) && value % 1 === 0;
  }
  /**
   * @description 是否为符合规范的length属性值
   */
  function isLength(value) {
    return isInteger(value) && value > -1;
  }
  function isIndex(value) {
    return isInteger(value) && value > -1;
  }
  /**
   * @description 判断是否为dom元素
   * @param Other 除了HTMLCollection/jQuery/HTMLElement/NodeList/Zepto以外的也可以算作dom的原型对象
   */
  function isDom(target, Other) {
    return target instanceof HTMLCollection || target instanceof jQuery || target instanceof HTMLElement || target instanceof NodeList || target instanceof Zepto || Other && target instanceof Other;
  }

  /**
   * 类型检测
   * @param { * } value 被检测变量
   * @param { Array | String } 目标类型，类型全部为小写，如 'number'
   * 不符合要求的类型会抛出TypeError
   */
  var promise = Promise ? new Promise(function () {}) : undefined;
  var typeList = uniq([1, true, emptyArray, {}, /a-z/, baseNow(), '', new Function(), undefined, null, promise, '*', Set ? new Set() : undefined, WeakSet ? new WeakSet() : undefined, Map ? new Map() : undefined, WeakMap ? new WeakMap() : undefined, Symbol ? Symbol('') : undefined, ArrayBuffer ? new ArrayBuffer() : undefined].map(function (instance) {
    return _is(instance, '*') ? instance : getType(instance);
  }));

  function checkType(value, types, message) {
    message = message || '';

    var valueType = getType(value);
    if (isArray(types)) {
      types.forEach(function (type) {
        if (!typeList.includes(type)) {
          console.warn(type + ' is not a correct javaScript data type');
          return;
        }
      });
      if (!types.includes(valueType) && !isUndefined(value)) throw new TypeError(message + ' Expected one of \'' + types.join(',') + '\', You given a \'' + valueType + '\'');
    } else {
      if (!typeList.includes(types)) {
        console.warn(types + ' is not a correct javaScript data type');
        return;
      }
      if (!_is(valueType, '*') && !_is(valueType, types) && !isUndefined(value)) throw new TypeError(message + ' Expected a \'' + types + '\', You given a \'' + valueType + '\'');
    }
  }

  function propsChecker(props, checker) {
    checkType(props, 'object');
    checkType(checker, 'object');

    forInOwn(checker, function (value, key) {
      var toChecks = value.split('.');
      toChecks.forEach(function (toCheck) {
        var isRequire = toCheck === 'require';

        if (!typeList.includes(toCheck) && !isRequire) {
          throw new Error('\'' + toCheck + '\' is not a correct checker type in propsChecker');
        }

        if (isRequire) {
          if (isNil(props[key])) throw new Error('the props \'' + key + '\' is required');
        } else {
          if (!isNil(props[key])) {
            var message = 'the props \'' + key + '\' is';
            checkType(props[key], toCheck, message);
          }
        }
      });
    });
  }

  /**
   * @description 将普通类名变为选择器
   * @param { String } string
   * @param { String } type 'class' || 'id'
   * @example
   * toSelector('className') // '.className'
   * toSelector('id', 'id') // '#id'
   */
  function toSelector(string) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'class';

    if (!isString(string) || string === '') return '';
    if (type !== 'class' && type !== 'id') return string;
    return (type === 'class' ? '.' : '#') + string;
  }

  /**
   * @description 从dom字符串中获取最外层元素的className或id
   * @example
   * getSelector('<div class="wrapper wrap" id="main"><span class="inner"></span></div>') // .wrapper.wrap
   * getSelector('<div class="wrapper wrap" id="main"><span class="inner"></span></div>', 'id') // #main
   */
  function getSelector(string) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'class';

    checkType(string, 'string');
    var selector = '';

    if (type !== 'class' && type !== 'id') return selector;
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
   * @param { String } 'blank' | 'self' 
   * 'blank' 新建style标签
   * 'self' 合并到已有的style标签
   * 
   * @example
   * appendStyle({
   *  '.pagination-item.pagination-item-active > a': {
   *      color: 'red',
   *      borderColor: '#eee'
   *   }
   * });
   */
  function appendStyle(object) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'self';

    if (!isObject(object) || isEmpty(object)) {
      return;
    }

    var style = "";
    forInOwn(object, function (obj, key) {
      var styl = "";
      forInOwn(obj, function (value, k) {
        styl += '\n  ' + fromCamelCase(k) + ': ' + value + ';';
      });
      styl += '\n';
      style = style === '' ? key + ' {' + styl + '}' : style + '\n' + key + ' {' + styl + '}';
    });
    var oldStyleTag = document.querySelector('head').querySelector('style');
    if (oldStyleTag && type === 'self') {
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
   * @description 合并类名，自动以空格分割
   * @example
   * appendClass('test1', 'test2', 'test3'); //'test1 test2 test3'
   */
  function appendClass() {
    return toArray(arguments).reduce(function (result, current) {
      var willAppend = isString(current) ? current : String(current);
      var division = result === '' || willAppend === '' ? '' : ' ';
      return result += division + willAppend;
    }, '');
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
   * @param { * } dateStamp 时间戳
   * @param { String } format 格式
   * @returns 日期字符串
   */
  function dateFormater(dateStamp) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/mm/dd hh:mm:ss';

    var date = void 0;
    if (isNil(dateStamp)) {
      date = baseNow();
    } else {
      checkType(dateStamp, 'number');

      if (String(dateStamp).length === 13) {
        date = new Date(dateStamp);
      } else {
        date = new Date(dateStamp * 1000);
      }
    }

    var year = date.getFullYear(),
        month = baseDateFull(date.getMonth() + 1),
        day = baseDateFull(date.getDate()),
        hour = baseDateFull(date.getHours()),
        minute = baseDateFull(date.getMinutes()),
        second = baseDateFull(date.getSeconds());

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
   * @description 获取某个月份的日历数据
   * @param { Number | String } year 年份
   * @param { Number | String } month 月份
   */
  function getMonthData(year, month) {
    year = baseHandleYear(year);
    month = baseHandleMonth(month);

    var days = [];

    /* 该月第一天 */
    var firstDay = new Date(year, month - 1, 1);
    var weekOfFirstDay = firstDay.getDay();

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

  var stringSet = new SetMock();
  function getUniqString() {
    var string = buildRandomString();
    if (!stringSet.has(string)) {
      stringSet.add(string);
      return string;
    }

    getUniqString();
  }

  function getRandomClassName() {
    var className = buildRandomString();
    if (!document.querySelector(toSelector(className))) {
      return className;
    }

    getRandomClassName();
  }

  function debounce(func, wait) {
    wait = toNumber(wait) || 0;
    var timerId = null;
    return function () {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len), _key3 = 0; _key3 < _len; _key3++) {
        args[_key3] = arguments[_key3];
      }

      timerId && clearTimeout(timerId);
      timerId = setTimeout(function () {
        func.apply.apply(func, [_this].concat(args));
      }, wait);
    };
  }

  /**
   * @description 下划线或中划线命名法转驼峰命名法
   * @example
   * toCamelCase('my-name') // 'myName'
   */
  function toCamelCase(string) {
    var spliter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    var index = [];
    for (var i = 0, len = string.length; i < len; i++) {
      if (_is(spliter, string[i])) {
        index.push(i + 1);
      }
    }

    return string.split('').map(function (str, ii) {
      return index.includes(ii) ? str.toUpperCase() : str;
    }).join('').replace(new RegExp(spliter, 'g'), '');
  }

  /**
   * @description 驼峰命名法转其他命名法
   * @param { String } '-' | '_'
   * @example
   * fromCamelCase('myName') // 'my-name'
   * fromCamelCase('myName', '_') // 'my_name'
   */
  function fromCamelCase(string) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    var upperRe = /[A-Z]/g;
    var indexSet = [];
    var array = string.split('').map(function (str, i) {
      if (upperRe.test(str)) {
        indexSet.push(i);
        return str.toLowerCase();
      }
      return str;
    });

    var insertSet = indexSet.map(function (index) {
      return {
        index: index,
        item: type
      };
    });

    return insert(array, insertSet).join('');
  }

  /**
   * @description 检测元素挂载完成后执行回调
   * @param { String } selector 需要检测是否挂载的元素
   * @param { Function } loadedCallback 挂载完成回调
   * @param { Number } maxTimes 最大尝试检测次数，默认500
   */
  var domAfterLoad = function fn(selector, loadedCallback) {
    var maxTimes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    var times = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!isNumber(maxTimes)) return;
    checkType(selector, 'string');
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

  function findKey(object, iteratee) {
    var keys = baseKeyOf(object, iteratee);
    return keys.length === 0 ? undefined : keys[0];
  }

  function removeKey(object, iteratee, deep) {
    return baseRemoveKey(object, iteratee, deep);
  }

  function removeKeys(object, iteratees) {
    if (isNil(iteratees)) {
      forInOwn(object, function (_, key, self) {
        delete self[key];
      });
      return;
    }

    checkType(iteratees, ['string', 'array']);

    iteratees = isString(iteratees) ? iteratees.split(',') : iteratees;
    var obj = {},
        flag = false;
    iteratees.forEach(function (iteratee) {
      var result = baseRemoveKey(object, iteratee.trim());
      if (result) {
        extend(obj, result);
        flag = true;
      }
    });

    return flag ? obj : flag;
  }

  function clone(object) {
    return baseClone(object);
  }
  function cloneDeep(object) {
    return baseClone(object, true);
  }

  /**
   * @description for-in循环
   */
  function forIn(object, callback) {
    checkType(callback, 'function');

    for (var _key4 in object) {
      var isBreak = callback(object[_key4], _key4, object);
      if (isBreak === false) break;
    }
  }
  function forInOwn(object, callback) {
    checkType(callback, 'function');

    for (var _key5 in object) {
      if (hasOwn(object, _key5)) {
        var isBreak = callback(object[_key5], _key5, object);
        if (isBreak === false) break;
      }
    }
  }

  /**
   * @description 返回元素的标签
   * @param { Node | NodeList | jQuery } el
   */
  function tagOf(el) {
    if (!el) return;

    if (!isLength(el.length)) {
      return el.tagName && el.tagName.toLowerCase();
    }
    return el[0].tagName && el[0].tagName.toLowerCase();
  }

  /**
   * @description 向数组中插入一个(或多个)位置插入一个(或多个)元素
   * @param { Array } array 需要插入元素的目标数组
   * @param { Array } insertSet 需要插入的元素集合
   * @example
   * insert([1,3,5], [{ index: 1, item: 'x' }, { index: 2, item: 'y' }]) // [1, 'x', 3, 'y', 5]
   */
  function insert(array, insertSet) {
    [array, insertSet].forEach(function (v) {
      checkType(v, 'array');
    });

    var adder = 0;
    insertSet.forEach(function (insert) {
      var index = insert.index,
          item = insert.item;

      array.splice(index + adder, 0, item);
      adder++;
    });

    return array;
  }

  /**
   * @description 数组去重
   * @param { Array } array
   */
  function uniq(array) {
    var type = getType(array);
    if (type !== 'array') throw new Error('Excepted a array, You given a ' + type);

    return array.reduce(function (arr, item) {
      return arr.includes(item) ? arr : [].concat(_toConsumableArray(arr), [item]);
    }, []);
  }

  function uniqBy(array, prop) {
    checkType(array, 'array');

    return array.reduce(function (arr, item) {
      return includesBy(arr, item, prop) ? arr : [].concat(_toConsumableArray(arr), [item]);
    }, []);
  }

  /**
   * @description 多个数据的并集
   */
  function union() {
    return uniq(baseUnion(toArray(arguments), true));
  }

  function unionBy() {
    var _baseUnion = baseUnion(toArray(arguments)),
        array = _baseUnion.array,
        prop = _baseUnion.prop;

    return prop ? uniqBy(array, prop) : uniq(array);
  }

  /**
   * @example
   * includesBy([{x: 1}, {x: 2}], [{x: 1}], 'x'); //true
   */
  function includesBy(array, target, prop) {
    var result = false;
    if (!(prop in target)) return result;

    for (var i = 0, len = array.length; i < len; i++) {
      if (prop in array[i] && _is(array[i][prop], target[prop])) {
        result = true;
        break;
      }
    }

    return result;
  }

  /**
   * @description  数组移除元素方法
   * @param { Array } array
   * @param { * } list
   * @example
   * remove([1,2,3,4,5,6], [2,3]); // [1,4,5,6]
   */
  function remove(array, iteratee) {
    return baseRemove(array, iteratee);
  }

  /**
   * @description 两数组的交集
   */
  function ins(array, list) {
    checkType(array, 'array');
    checkType(list, 'array');

    var result = [];
    array.forEach(function (item) {
      list.includes(item) && result.push(item);
    });

    return uniq(result);
  }

  function sum(array) {
    var sum = 0;
    var len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 1) return sum;

    return array.reduce(function (sum, current) {
      return sum + current;
    });
  }

  function sumBy(array, iteratee) {
    var sum = 0;
    var len = isNil(array) ? 0 : array.length;
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
    var len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return array.reduce(function (max, current) {
      return max >= current ? max : current;
    });
  }

  function maxBy(array, iteratee) {
    var len = isNil(array) ? 0 : array.length;
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
    var len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return array.reduce(function (min, current) {
      return min <= current ? min : current;
    });
  }

  function minBy(array, iteratee) {
    var len = isNil(array) ? 0 : array.length;
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
    var len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sum(array) / len;
  }

  function meanBy(array, iteratee) {
    var len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sumBy(array, iteratee) / len;
  }

  function groupBy(array, iteratee) {
    checkType(array, 'array');

    var len = array.length,
        isFunc = isFunction(iteratee),
        result = {};

    if (isNil(iteratee)) return result;

    for (var i = 0; i < len; i++) {
      var value = array[i];
      var _key6 = isFunc ? iteratee(value) : value[iteratee];
      if (!hasOwn(result, _key6)) result[_key6] = [];

      result[_key6].push(value);
    }

    return result;
  }

  function flatten(array) {
    return baseFlatten(array);
  }

  function flattenDeep(array) {
    return baseFlatten(array, true);
  }

  function flattenDepth(array, depth) {
    return baseFlatten(array, undefined, depth);
  }

  function chunk(array, size) {
    checkType(array, 'array');
    checkType(size, 'number');

    var result = [];
    array.forEach(function (item, i) {
      var index = Math.floor(i / size);
      if (!isArray(result[index])) {
        result[index] = [];
      }
      result[index].push(item);
    });

    return result;
  }

  function pick(object, path) {
    checkObjectLike(object);

    if (isArray(path)) {
      var result = {};
      path.forEach(function (property) {
        if (property in object) result[property] = object[property];
      });
      return result;
    } else {
      return path in object ? object[path] : {};
    }
  }

  function pickBy(object, predicate) {
    checkObjectLike(object);
    checkType(predicate, 'function');

    var result = {};
    for (var _key7 in object) {
      var value = object[_key7];
      var isPick = predicate(value, _key7, object);
      if (isPick === true) result[_key7] = value;
    }

    return result;
  }

  function omit(object, path) {
    checkObjectLike(object);

    var keys = isArray(path) ? path : [path],
        result = {};
    for (var _key8 in object) {
      if (!keys.includes(_key8)) result[_key8] = object[_key8];
    }

    return result;
  }

  function omitBy(object, predicate) {
    checkObjectLike(object);
    checkType(predicate, 'function');

    var result = {};
    for (var _key9 in object) {
      var value = object[_key9];
      var isPick = predicate(value, _key9, object);
      if (isPick === false) result[_key9] = value;
    }

    return result;
  }

  function mapKeys(object, iteratee) {
    checkObjectLike(object);
    checkType(iteratee, 'function');

    var result = {};
    for (var _key10 in object) {
      var value = object[_key10];
      var newKey = iteratee(value, _key10, object);
      result[newKey] = value;
    }

    return result;
  }

  function mapValues(object, iteratee) {
    checkObjectLike(object);
    checkType(iteratee, 'function');

    var result = {};
    for (var _key11 in object) {
      var newValue = iteratee(object[_key11], _key11, object);
      result[_key11] = newValue;
    }

    return result;
  }

  /**
   * @description 获取元素(带有length属性的对象都可以)的最后一个元素
   */
  function lastOf(object) {
    var len = object.length;
    if (!object || !isLength(len)) return;

    return object[len - 1];
  }

  function removeUndef(object) {
    checkObjectLike(object);

    forInOwn(object, function (value, key, self) {
      if (isUndefined(value)) {
        delete self[key];
      }
    });
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
      var key = findKey(this, function (value, key) {
        return !['size', 'nextKey'].includes(key) && _is(value, item);
      });
      return typeof key !== 'undefined';
    },
    forEach: function forEach(callback, context) {
      checkType(callback, 'array');

      forInOwn(this, function (value, key, self) {
        isObjectLike(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
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

      if (isArray(item)) {
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
      var key = findKey(this, item);
      if (typeof key !== 'undefined') {
        delete this[key];
        this.size--;
        return !0;
      }
      return !1;
    },


    clear: function clear() {
      removeKeys(this);
      this.size = 0;
      this.nextKey = 0;
    },

    /**
     * 额外的，不同于ES6 Set集合的方法
     */
    filter: function filter(callback) {
      checkType(callback, 'function');

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
      if (!isArray(entries)) {
        throw new TypeError(entries + ' is not a Array');
      } else {
        entries.forEach(function (entry) {
          if (!isArray(entry)) {
            throw new TypeError(entry + ' is not a Array');
          } else {
            var _key12 = entry[0],
                value = entry[1];
            _this3[_key12] = value;
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
        if (_is(key, k)) {
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
      removeKeys(this);
      this.size = 0;
    },
    forEach: function forEach(callback, context) {
      checkType(callback, 'function');

      forInOwn(this, function (value, key, self) {
        isObjectLike(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
      });
    }
  };

  var util = {

    // 判断
    isString: isString,
    isObjectLike: isObjectLike,
    isObject: isObject,
    isEmpty: isEmpty,
    isFunction: isFunction,
    isNumber: isNumber,
    isNumeric: isNumeric,
    isDom: isDom,
    isInteger: isInteger,
    isLength: isLength,
    isUndefined: isUndefined,
    isNull: isNull,
    isNil: isNil,
    isBoolean: isBoolean,
    isArray: isArray,
    isDate: isDate,
    isRegExp: isRegExp,
    checkType: checkType,
    getType: getType,
    propsChecker: propsChecker,

    // number方法
    toNumber: toNumber,
    toInteger: toInteger,

    // dom方法
    toSelector: toSelector,
    appendStyle: appendStyle,
    insertElementToBody: insertElementToBody,
    domAfterLoad: domAfterLoad,
    tagOf: tagOf,
    getSelector: getSelector,
    appendClass: appendClass,
    getRandomClassName: getRandomClassName,

    // 数组方法
    uniq: uniq,
    remove: remove,
    ins: ins,
    sum: sum,
    sumBy: sumBy,
    max: max,
    maxBy: maxBy,
    min: min,
    minBy: minBy,
    mean: mean,
    meanBy: meanBy,
    insert: insert,
    includesBy: includesBy,
    union: union,
    unionBy: unionBy,
    groupBy: groupBy,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    chunk: chunk,

    // 对象方法
    removeKey: removeKey,
    removeKeys: removeKeys,
    findKey: findKey,
    lastOf: lastOf,
    forIn: forIn,
    forInOwn: forInOwn,
    clone: clone,
    cloneDeep: cloneDeep,
    removeUndef: removeUndef,
    extend: extend,
    toArray: toArray,
    pick: pick,
    pickBy: pickBy,
    omit: omit,
    omitBy: omitBy,
    mapKeys: mapKeys,
    mapValues: mapValues,

    // String方法
    toCamelCase: toCamelCase,
    fromCamelCase: fromCamelCase,
    getUniqString: getUniqString,

    // 其他方法
    dateFormater: dateFormater,
    getMonthData: getMonthData,
    debounce: debounce,

    SetMock: SetMock,
    MapMock: MapMock

  };

  return util;
});

/**
 * @description 组件的通用父类
 */
;!function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) : typeof define === 'function' && define.amd ? define([global], factory) : global.Component = factory(global);
}(this, function (global) {
  var _global$util = global.util,
      isLength = _global$util.isLength,
      removeUndef = _global$util.removeUndef,
      isNil = _global$util.isNil,
      isUndefined = _global$util.isUndefined,
      insertElementToBody = _global$util.insertElementToBody,
      lastOf = _global$util.lastOf,
      getSelector = _global$util.getSelector,
      domAfterLoad = _global$util.domAfterLoad,
      extend = _global$util.extend;


  function Component() {
    this.init();
  }

  /**
   * @description 将组件元素挂载到dom
   * @param { Array } doms 需要挂载的dom列表
   * [{
   *   html: String, // 需要被挂载的dom字符串
   *   container: DOMElement | 'body', // 挂载的目标容器
   *   condition: Boolean, // 挂载的条件，默认挂载
   *   type: 'html' // 挂载dom的jQuery方法, append | prepend | before | after | html 等, 默认html
   * }]
   */
  Object.defineProperty(Component.prototype, 'mount', {
    value: function value(doms) {
      var _this4 = this;

      if (!doms || !isLength(doms.length) || doms.length < 1) return;
      removeUndef(doms);

      doms.forEach(function (dom) {
        var condition = dom.condition,
            container = dom.container,
            html = dom.html,
            type = dom.type;

        if (isNil(html)) throw new Error('缺少需挂载的dom字符串');
        if (isNil(container)) throw new Error('缺少挂载目标容器');

        // condition默认为true
        isUndefined(condition) && (condition = true);
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

      var last = lastOf(doms.filter(function (dom) {
        return isUndefined(dom.condition) || dom.condition;
      }));
      if (last) {
        var _classIndex2 = last.html.indexOf('class');
        var selector = '';
        if (_classIndex2 > -1) {
          selector = getSelector(last.html);
        } else {
          selector = getSelector(last.html, 'id');
        }

        domAfterLoad(selector, function () {
          _this4.componentDidMount();
          _this4.style();
          _this4.bindEvents();
          _this4.destroy();
        });
      }
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

  extend(Component.prototype, {
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

  return Component;
});

/**
 * @description 监听器，监听某个对象的某个属性或者所有属性的变化，根据属性值的变化执行响应的操作
 * @param options = {
 *   set: Function, // 在使用‘=’赋值的同时需要执行的操作
 *   get: Function  // 在获取值的同时需要执行的操作
 * }
 */
;!function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) : typeof define === 'function' && define.amd ? define([global], factory) : global.Observer = factory(global);
}(this, function (global) {
  var _global$util2 = global.util,
      isObjectLike = _global$util2.isObjectLike,
      isObject = _global$util2.isObject,
      isNil = _global$util2.isNil,
      extend = _global$util2.extend,
      isFunction = _global$util2.isFunction,
      getType = _global$util2.getType;


  function Observer(object, prop, options) {
    if (!isObjectLike(object)) throw new TypeError('Excepted a objectLike, You given a ' + getType(object));

    if (isObject(prop) && isNil(options)) {
      options = prop;
      prop = null;
    }

    this.options = options;
    this.watching(object, prop);
  }

  extend(Observer.prototype, {
    watching: function watching(object, prop) {
      if (!object || !isObjectLike(object)) return;

      if (isNil(prop)) {
        for (var _key13 in object) {
          this.handlePropChange(object, _key13, object[_key13]);
        }
      } else {
        this.handlePropChange(object, prop, object[prop]);
      }
    },
    handlePropChange: function handlePropChange(object, prop, value) {
      this.watching(value);

      var _options = this.options,
          _get = _options.get,
          _set = _options.set;


      if (Object.defineProperty) {
        Object.defineProperty(object, prop, {
          set: function set(newValue) {
            value = newValue;
            isFunction(_set) && _set(newValue);
          },
          get: function get() {
            isFunction(_get) && _get();
            return value;
          }
        });
      } else if (object.__defineSetter__) {
        object.__defineSetter__(prop, function (newValue) {
          value = newValue;
          isFunction(_set) && _set(newValue);
        });

        object.__defineGetter__(prop, function () {
          isFunction(_get) && _get();
          return value;
        });
      } else {
        throw new Error('not support defineProperty');
      }
    }
  });

  return Observer;
});

/**
 * 滚轮事件监听
 */
;!function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(global) : typeof define === 'function' && define.amd ? define([global], factory) : global.mouseWheelListener = factory(global);
}(this, function (global) {
  var isFunction = global.util.isFunction;


  function mouseWheelListener(callback) {
    addMouseWheelHandler(function (e) {
      e = e || global.event;
      var value = e.wheelDelta || -e.deltaY || -e.detail;
      var delta = Math.max(-1, Math.min(1, value));
      var direction = delta < 0 ? 'down' : 'up';
      isFunction(callback) && callback(direction, value, delta);
    });
  }

  var g_supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        g_supportsPassive = true;
      }
    });
    global.addEventListener("testPassive", null, opts);
    global.removeEventListener("testPassive", null, opts);
  } catch (e) {}

  function addMouseWheelHandler(callback) {
    var prefix = '';
    var _addEventListener = void 0;

    if (global.addEventListener) {
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

  return mouseWheelListener;
});

/**
 * @description jQuery extend
 */
;!function (global) {
  var _global$util3 = global.util,
      isNil = _global$util3.isNil,
      isFunction = _global$util3.isFunction,
      isString = _global$util3.isString,
      forInOwn = _global$util3.forInOwn,
      isObject = _global$util3.isObject,
      fromCamelCase = _global$util3.fromCamelCase,
      isArray = _global$util3.isArray,
      checkType = _global$util3.checkType,
      extend = _global$util3.extend;


  var $ = global.jQuery;

  /**
   * @description 设置或获取元素的translate值
   * @param { Number | Function } x
   * @param { Number | Function } y
   */
  $.prototype.translate = function (x, y) {
    if (isNil(x) && isNil(y)) {
      var tx = parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
      var ty = parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5]);
      return [isNaN(tx) ? 0 : tx, isNaN(ty) ? 0 : ty];
    }

    var xValue = void 0,
        yValue = void 0;
    if (isNil(y)) {
      xValue = isFunction(x) ? parseFloat(x()) : parseFloat(x);
      if (!isNaN(xValue)) {
        this.css({
          'transform': 'translateX(' + xValue + 'px)'
        });
      }
      return this;
    } else if (isNil(y)) {
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
    if (isNil(value)) {
      return this.translate()[0];
    }
    return this.translate(value);
  };
  $.prototype.translateY = function (value) {
    if (isNil(value)) {
      return this.translate()[1];
    }
    return this.translate(null, value);
  };

  /**
   * @description 查找元素的index
   * @param { Function } callback
   */
  $.prototype.findIndex = function (callback) {
    checkType(callback, 'function');

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
    checkType(callback, 'function');
    if (this.length === 0 && typeof initialValue === 'undefined') {
      throw new TypeError('Reduce of empty jQuery with no initial value');
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

  /**
   * for $.node, $.closingNode
   */
  var handleAttr = function handleAttr(attr) {
    var attributes = '';
    if (attr) {
      if (isString(attr)) {
        attributes = ' ' + attr;
      } else if (isObject(attr)) {
        forInOwn(attr, function (obj, key) {
          if (key.trim() === 'style' && isObject(obj)) {
            attributes += ' ' + key + '="';
            forInOwn(obj, function (value, k) {
              attributes += fromCamelCase(k) + ': ' + value + ';';
            });
            attributes += '"';
          } else {
            var thisAttr = fromCamelCase(key) + '="' + obj + '"';
            attributes += ' ' + thisAttr;
          }
        });
      }
    }

    return attributes;
  };

  /**
   * @description 生成html字符串
   * @param {String} wrapper tagName
   * @param {String} item 元素子集
   * @param {String} klass className
   * @param {String | Object} attributes
   * @example
   * var node = $.node('div', 1234, 'test', {
   *    dataValue: 1,
   *    style: {
   *      backgroundColor: red,
   *      color: '#fff'
   *    }
   * });
   * 
   * // "<div class="test" data-value="1" style="background-color: red;color: #fff;">1234</div>"
   */
  var node = function node(wrapper, children, klass, attr) {
    if (isNil(children)) return '';

    // If the children is an array, do a join
    children = isArray(children) ? children.join('') : children;

    // Check for the class
    klass = klass ? ' class="' + klass + '"' : '';

    // Check for any attributes
    var attributes = handleAttr(attr);

    return '<' + wrapper + klass + attributes + '>' + children + '</' + wrapper + '>';
  };

  var closingNode = function closingNode(tagName, klass, attr) {
    klass = klass ? ' class="' + klass + '"' : '';

    var attributes = handleAttr(attr);

    return '<' + tagName + klass + attributes + '/>';
  };

  /**
   * @description 子类使用this.super()继承父类
   */
  var inherit = function inherit(SuperClass, SubClass) {
    SubClass.prototype = new SuperClass();
    SubClass.prototype.constructor = SubClass;
    SubClass.prototype.super = SuperClass;
  };

  $.extend({
    node: node,
    closingNode: closingNode,
    inherit: inherit
  });
}(this);