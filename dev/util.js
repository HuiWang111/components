;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory() : typeof define === 'function' && define.amd
  ? define(factory) : typeof global._ === 'undefined'
  ? global._ = global.util = factory() : global.util = factory();
}(this, function() {

  const emptyArray = Object.freeze([]);
  const _slice = emptyArray.slice;

  if (!emptyArray.map) {
    alert('您的浏览器过旧，请升级浏览器！');
    return;
  }

  const ARRAY_TAG = '[object Array]',
        OBJECT_TAG ='[object Object]',
        REGEXP_TAG = '[object RegExp]',
        DATE_TAG = '[object Date]',
        STRING_TAG = '[object String]',
        NUMBER_TAG = '[object Number]',
        BOOLEN_TAG = '[object Boolean]',
        FUNCTION_TAG = '[object Function]',
        UNDEFINED_TAG = '[object Undefined]',
        NULL_TAG = '[object Null]';

  /**
   * Object.assign
   */
  const extend = Object.assign || function () {
    const receiver = _slice.call(arguments, 0, 1)[0],
          suppliers = _slice.call(arguments, 1);

    suppliers.forEach(function (supplier) {
      Object.keys(supplier).forEach(function (key) {
        receiver[key] = supplier[key];
      });
    });

    return receiver;
  }

  /**
   * Object.is
   */
  const _is = Object.is || function (x, y) {
    if (x === y) { 
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };

  /**
   * Array.from
   */
  const toArray = Array.from || function (arrayLike, callback) {
    const len = arrayLike.length || arrayLike.size;
    if (!isLength(len)) return [];
    
    const array = [];
    forInOwn(arrayLike, (value, key, self) => {
      if (isNumeric(key)) {
        const item = isFunction(callback) ? callback(value, parseInt(key), self) : value;
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
      const array = this, len = array.length;
      start = isNumeric(start) ? parseInt(start) : 0;
      start = start >= 0 ? start : 0;

      let result = false;
      for (let i = start; i < len; i++) {
        if (_is(target, array[i])) {
          result = true;
          break;
        }
      }

      return result;
    }
  }

  /* ======== 私有方法，不添加到Util全局对象 ======== */

  function baseUnion(args, isSample) {
    const array = [];
    let prop = null;
    for( let i = 0, len = args.length; i < len; i++) {
      if (isArray(args[i])) {
        array.push(...args[i]);
      } else {
        prop = args[i];
        break;
      }
    }

    return !isSample ? { array, prop } : array;
  }

  /**
   * @description 在对象中查找需要的key值
   * @param { Object } object
   * @param { Boolen } deep 是否第一次查找到后继续遍历查找
   */
  function baseKeyOf(object, iteratee, deep) {
    checkObjectLike(object);

    const keys = [];
    for (key in object) {
      if (isFunction(iteratee)) {
        const result = iteratee(object[key], key, object);
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

    const isFunc = isFunction(iteratee);

    let obj = {}, flag = false;
    if (isFunc) {
      for (const key in object) {
        const result = iteratee(object[key], key, object);
        if (result === true) {
          const value = object[key];
          delete object[key];
          flag = true;
          extend(obj, { [key]: value });
          if (!deep) break;
        }
      }
    } else {
      if (iteratee in object) {
        const value = object[iteratee];
        delete object[iteratee];
        flag = true;
        extend(obj, { [iteratee]: value });
      }
    }

    return flag ? obj : flag;
  }

  function baseRemoveAt(array, indexes) {
    const length = array && isLength(array.length) ? array.length : 0;
    indexes = uniq(indexes);
    
    for (let i = length - 1; i > -1; i--) {
      const index = indexes[i];
      if (isIndex(index)) {
        emptyArray.splice.call(array, index, 1);
      } else {
        if (index in array) delete array[index];
      }
    }
  }

  function baseRemove(array, iteratee) {
    checkType(array, 'array');

    const isFunc = isFunction(iteratee);
    const isArr = isArray(iteratee);
    const indexes = [], result = [];

    for (let i = 0, len = array.length; i < len; i++) {
      const value = array[i];
      switch(true) {
        case (isFunc):
          const ifRemove = iteratee(value, i, array);
          if (ifRemove === true) {
            result.push(value);
            indexes.push(i);
          }
          break;
          
        case (isArr):
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
    const letters = [];
    for (let i = 65; i < 91; i++) {
      letters.push(String.fromCharCode(i));
    }
    for (let j = 97; j < 123; j++) {
      letters.push(String.fromCharCode(j));
    }
    return letters;
  }

  function baseRandomLetter(size) {
    const letters = getLetters();

    let result = letters[Math.floor(Math.random()*letters.length)];
    size = toInteger(size);

    if (size && size > 1) {
      for (let i = 1; i < size; i++) {
        result += letters[Math.floor(Math.random()*letters.length)];
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
    let randomString = Math.random().toString(36).substr(2);
    const letter = baseRandomLetter();
    randomString =  letter + randomString; //保证第一位一定是字母

    length = toInteger(length);
    if (length) {
      const size = randomString.length;
      if (length > size) {
        const diff = length - size;
        const letters = baseRandomLetter(diff);
        randomString += letters;
      } else if (length < size) {
        randomString = randomString.substr(0, length);
      }
    }

    return randomString;
  }

  function baseClone(object, deep) {
    checkObjectLike(object);

    const result = isArray(object) ? [] : {};
    for (let key in object) {
      const value = object[key];
      if (isObjectLike(value) && deep) {
        result[key] =  baseClone(value, true);
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  const _toString = Object.prototype.toString;
  function getTag(value) {
    return _toString.call(value);
  }

  const _hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return _hasOwnProperty.call(obj, key)
  }

  function getType (value) {
    const tag = getTag(value);
    
    return tag.slice(8, tag.length - 1).toLowerCase();
  }

  function checkObjectLike(value) {
    if (!isObjectLike(value))
      throw new TypeError(`Excepted a 'objectLike', You given a ${getType(value)}`);
  }
  
  /**
   * Date
   */
  function baseNow () {
    return new Date();
  }

  function baseHandleYear(year) {
    year = toNumber(year) || baseNow().getFullYear();
    
    if (year < 1970)
      throw new Error(`year:${year} is not in range`);

    return year;
  }

  function baseHandleMonth(month) {
    month = toNumber(month) || (baseNow().getMonth() + 1);

    if (month < 1 || month > 12)
      throw new Error(`month:${month} is not in range`);

    return month;
  }

  function baseDateFull(number) {
    checkType(number, 'number');

    return number < 10 ? `0${number}` : number;
  }

  /* ======== Util全局对象中的方法 ======== */

  function isString(value) {
    return getTag(value) === STRING_TAG;
  }
  function isObjectLike(value) {
    return typeof value === 'object' && !isNull(value);
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
      for (const _ in value) return !1;
      return !0;
    } else if (isNumber(value)) {
      return value === 0;
    } else if (isBoolen(value)) {
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
  function isBoolen(value) {
    return getTag(value) === BOOLEN_TAG;
  }
  function isDate(value) {
    return getTag(value) === DATE_TAG;
  }
  const nativeIsArray = Array.isArray;
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
    const number = parseFloat(value);
    return isNaN(number) ? false : number;
  }
  function toInteger(value) {
    const int = parseInt(value);
    return isNaN(int) ? false : int;
  }
  /**
   * @description 是否为整数
   */
  function isInteger(value) {
    return isNumber(value) && (value % 1 === 0);
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
    return (
      target instanceof HTMLCollection
    ) || (
      target instanceof jQuery
    ) || (
      target instanceof HTMLElement
    ) || (
      target instanceof NodeList
    ) || (
      target instanceof Zepto
    ) || (
      Other && (target instanceof Other)
    )
  }

  /**
   * 类型检测
   * @param { * } value 被检测变量
   * @param { Array | String } 目标类型，类型全部为小写，如 'number'
   * 不符合要求的类型会抛出TypeError
   */
  const promise = Promise ? new Promise(() => {}) : undefined;
  const typeList = uniq(
    [1, true, emptyArray, {}, /a-z/, baseNow(), '', new Function, undefined,  null, promise, '*',
    Set ? new Set : undefined, WeakSet ? new WeakSet : undefined, Map ? new Map : undefined,
    WeakMap ? new WeakMap : undefined, Symbol ? Symbol('') : undefined, ArrayBuffer ? new ArrayBuffer : undefined,
    ].map(instance => _is(instance, '*') ? instance : getType(instance))
  );

  function checkType (value, types, message) {
    message = message || '';

    const valueType = getType(value);
    if (isArray(types)) {
      types.forEach(type => {
        if (!typeList.includes(type)) {
          console.warn(`${type} is not a correct javaScript data type`);
          return;
        }
      });
      if (!types.includes(valueType))
        throw new TypeError(`${message} Expected one of '${types.join(',')}', You given a '${valueType}'`);
    } else {
      if (!typeList.includes(types)) {
        console.warn(`${types} is not a correct javaScript data type`);
        return;
      }

      if (!_is(valueType, '*') && !_is(valueType, types))
        throw new TypeError(`${message} Expected a '${types}', You given a '${valueType}'`);
    }
  }

  function propsChecker(props, checker) {
    checkType(props, 'object');
    checkType(checker, 'object');

    forInOwn(checker, (value, key) => {
      const toChecks = value.split('.');
      toChecks.forEach(toCheck => {
        const isRequire = toCheck === 'require';

        if (!typeList.includes(toCheck) && !isRequire) {
          throw new Error(`'${toCheck}' is not a correct checker type in propsChecker`);
        }

        if (isRequire) {
          if (isNil(props[key])) throw new Error(`the props '${key}' is required`);
        } else {
          if (!isUndefined(props[key])) {
            const message = `the props '${key}' is`;
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
  function toSelector(string, type = 'class') {
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
  function getSelector(string, type = 'class') {
    checkType(string, 'string');
    let selector = '';

    if (type !== 'class' && type !== 'id') return selector;
    if (string.length === 0) return selector;
    
    if (type === 'class') {
      const classIndex = string.indexOf('class');
      if (classIndex < 0) return selector;

      const start = string.indexOf('"', classIndex + 5);
      const end = string.indexOf('"', start + 1);
      const className = string.substring(start + 1, end);
      const klasses = className.split(' ');
      klasses.forEach((klass) => {
        selector += toSelector(klass);
      });
    } else {
      const idIndex = string.indexOf('id');
      if (idIndex < 0) return selector;

      const start = string.indexOf('"', classIndex + 2);
      const end = string.indexOf('"', start + 1);
      const ID = string.substring(start + 1, end);
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
  function appendStyle(object, type = 'self') {
    if (!isObject(object) || isEmpty(object)) {
      return;
    }
    
    let style = "";
    forInOwn(object, (obj, key) => {
      let styl = "";
      forInOwn(obj, (value, k) => {
        styl += `\n  ${fromCamelCase(k)}: ${value};`;
      });
      styl += '\n';
      style = style === '' ? `${key} {${styl}}` : `${style}\n${key} {${styl}}`;
    });
    const oldStyleTag = document.querySelector('head').querySelector('style');
    if (oldStyleTag && type === 'self') {
      const oldStyle = oldStyleTag.innerHTML;
      const newStyle = oldStyle === '' ? style : `${oldStyle}\n${style}`;
      oldStyleTag.innerHTML = newStyle;
    } else {
      const styleTag = document.createElement('style');
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
  function appendClass () {
    return toArray(arguments).reduce((result, current) => {
      const willAppend = isString(current) ? current : String(current);
      const division = result === '' || willAppend === '' ? '' : ' ';
      return result += division + willAppend;
    }, '');
  }

  /**
   * @description 将元素挂在到body下
   * @param { Node | NodeList | jQuery } el
   */
  function insertElementToBody(el) {
    const script = document.querySelector('script');
    const parent = script ? script.parentNode : document.querySelector('body');

    const insert = (v) => {
      if (script) {
        parent.insertBefore(v, script);
      } else {
        parent.appendChild(v);
      }
    }

    const len = el.length;
    if (typeof len !== 'undefined') {
      for (let i = 0; i < len; i++) {
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
  function dateFormater(dateStamp, format = 'yyyy/mm/dd hh:mm:ss') {
    let date;
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

    const year = date.getFullYear(),
          month = baseDateFull(date.getMonth() + 1),
          day = baseDateFull(date.getDate()),
          hour = baseDateFull(date.getHours()),
          minute = baseDateFull(date.getMinutes()),
          second = baseDateFull(date.getSeconds());

    let result;
    switch(format) {
      case 'yyyy-mm-dd hh:mm:ss':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; break;
      case 'yyyy-mm-dd hh:mm':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute; break;
      case 'mm-dd yyyy':
        result = month + '-' + day + ' ' + year; break;
      case 'yyyy-mm-dd':
        result = year + '-' + month + '-' + day; break;
      case 'yyyy/mm/dd hh:mm:ss':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second; break;
      case 'yyyy/mm/dd hh:mm':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute; break;
      case 'yyyy/mm/dd':
        result = year + '/' + month + '/' + day; break;
      case 'hh:mm:ss':
        result = hour + ':' + minute + ':' + second; break;
      case 'hh:mm':
        result = hour + ':' + minute; break;

      default: throw new Error('not support this format:`' + format + '`');
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

    const days = [];

    /* 该月第一天 */
    const firstDay = new Date(year, month -1, 1);
    let weekOfFirstDay = firstDay.getDay();

    /* 该月最后一天 */
    const lastDay = new Date(year, month, 0);
    const dateOfLastDay = lastDay.getDate();

    /* 上个月的最后一天 */
    const lastDayOfLastMonth = new Date(year, month - 1, 0);
    const lastDateOfLastMonth = lastDayOfLastMonth.getDate(); // 上个月最后一天的日期
    /* 本月日历上包含的上个月的日期个数(日历上显示的灰色部分) */
    const previousMonthDaysCount = weekOfFirstDay;

    const nextMonthDaysCount = 42 - (previousMonthDaysCount + dateOfLastDay);
    /* 如果显示的下月日期数量大于6个，显示总数设为35，否则设为42 */
    const total = nextMonthDaysCount > 6 ? 35 : 42;

    for (let i = 0; i < total; i++) {
      const date = i + 1 - previousMonthDaysCount;
      let showDate = date, thisYear = year, thisMonth = month;
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
      const isForbid = date < 1 || date > dateOfLastDay ? true : false;

      days.push({
        date,
        year: thisYear,
        month: thisMonth,
        showDate,
        dateStr: dateFormater( 
          (new Date(thisYear, thisMonth-1, showDate)).getTime(), 'yyyy-mm-dd'
        ),
        forbid: isForbid ? 1 : 0
      });
    }

    return days;
  }

  const stringSet = new SetMock();
  function getUniqString() {
    const string = buildRandomString();
    if (!stringSet.has(string)) {
      stringSet.add(string);
      return string;
    }

    getUniqString();
  }

  function getRandomClassName() {
    const className = buildRandomString();
    if (!document.querySelector(toSelector(className))) {
      return className;
    }

    getRandomClassName();
  }

  /* function debounce(func, wait) {
    wait = isNumber(wait) ? wait : 0;
    let timerId = null;
    return function (...args) {
      timerId && clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, wait);
    }
  } */

  /**
   * @description 下划线或中划线命名法转驼峰命名法
   * @example
   * toCamelCase('my-name') // 'myName'
   */
  function toCamelCase(string, spliter = '-') {
    const index = [];
    for (let i = 0, len = string.length; i < len; i++) {
      if ( _is(spliter, string[i]) ) {
        index.push(i + 1);
      }
    }
    
    return (
      string.split('').map((str, ii) => index.includes(ii)
      ? str.toUpperCase() : str).join('')
    ).replace(new RegExp(spliter, 'g'), '');
  }

  /**
   * @description 驼峰命名法转其他命名法
   * @param { String } '-' | '_'
   * @example
   * fromCamelCase('myName') // 'my-name'
   * fromCamelCase('myName', '_') // 'my_name'
   */
  function fromCamelCase(string, type = '-') {
    const upperRe = /[A-Z]/g;
    const indexSet = [];
    const array = string.split('').map((str, i) => {
      if (upperRe.test(str)) {
        indexSet.push(i);
        return str.toLowerCase();
      }
      return str;
    });

    const insertSet = indexSet.map((index) => {
      return {
        index,
        item: type
      }
    });

    return insert(array, insertSet).join('');
  } 

  /**
   * @description 检测元素挂载完成后执行回调
   * @param { String } selector 需要检测是否挂载的元素
   * @param { Function } loadedCallback 挂载完成回调
   * @param { Number } maxTimes 最大尝试检测次数，默认500
   */
  const domAfterLoad = (function fn(selector, loadedCallback, maxTimes = 500, times = 0) {
    if (!isNumber(maxTimes)) return;
    checkType(selector, 'string');
    if (selector.length < 1) return;

    let timer = null;
    const dom = document.querySelectorAll(selector);
    if (dom.length > 0) {
      timer && clearTimeout(timer);
      isFunction(loadedCallback) && loadedCallback();
    } else {
      if (times >= maxTimes) { //超过最大尝试检测次数
        isFunction(loadedCallback) && console.warn('`' + selector + '`未挂载到dom，回调未执行');
        return;
      }
      times++;
      
      timer = setTimeout(() => {
        fn(selector, loadedCallback, maxTimes, times);
      }, 0);
    }
  });

  function findKey(object, iteratee) {
    const keys = baseKeyOf(object, iteratee);
    return keys.length === 0 ? undefined : keys[0];
  }

  function removeKey(object, iteratee, deep) {
    return baseRemoveKey(object, iteratee, deep);
  }

  function removeKeys(object, iteratees) {
    if (isNil(iteratees)) {
      forInOwn(object, (_, key, self) => { delete self[key] });
      return;
    }
    
    checkType(iteratees, ['string', 'array']);

    iteratees = isString(iteratees) ? iteratees.split(',') : iteratees;
    let obj = {}, flag = false;
    iteratees.forEach((iteratee) => {
      const result = baseRemoveKey(object, iteratee.trim());
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

    for (const key in object) {
      const isBreak = callback(object[key], key, object);
      if (isBreak === false) break;
    }
  }
  function forInOwn(object, callback) {
    checkType(callback, 'function');

    for(const key in object) {
      if (hasOwn(object, key)) {
        const isBreak = callback(object[key], key, object);
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
    [array, insertSet].forEach((v) => {
      checkType(v, 'array');
    });

    let adder = 0;
    insertSet.forEach(function (insert) {
      const { index, item } = insert;
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
    const type = getType(array);
    if (type !== 'array')
      throw new Error(`Excepted a array, You given a ${type}`);

    return array.reduce((arr, item) => {
      return arr.includes(item) ? arr : [...arr, item];
    }, []);
  }

  function uniqBy(array, prop) {
    checkType(array, 'array');

    return array.reduce((arr, item) => {
      return includesBy(arr, item, prop) ? arr : [...arr, item];
    }, []);
  }

  /**
   * @description 多个数据的并集
   */
  function union() {
    return uniq(baseUnion(toArray(arguments), true));
  }

  function unionBy() {
    const { array, prop } = baseUnion(toArray(arguments));
    return prop ? uniqBy(array, prop) : uniq(array);
  }

  /**
   * @example
   * includesBy([{x: 1}, {x: 2}], [{x: 1}], 'x'); //true
   */
  function includesBy(array, target, prop) {
    let result = false;
    if ( !(prop in target) ) return result;

    for (let i = 0, len = array.length; i < len; i++) {
      if ((prop in array[i]) && _is(array[i][prop], target[prop])) {
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

    const result = [];
    array.forEach(function (item) {
      list.includes(item) && result.push(item);
    });

    return uniq(result);
  }

  function sum(array) {
    let sum = 0;
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 1) return sum;

    return array.reduce((sum, current) => {
      return sum + current;
    });
  }

  function sumBy(array, iteratee) {
    let sum = 0;
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return sum;

    if (isString(iteratee)) {
      return array.reduce((sum, item) => {
        return sum + ( iteratee in item ? item[iteratee] : 0 );
      }, 0);
    } else if (isFunction(iteratee)) {
      return array.reduce((sum, item, index, self) => {
        return sum  + iteratee(item, index, self);
      }, 0);
    }
    return 0;
  }

  function max(array) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return array.reduce((max, current) => {
      return max >= current ? max : current;
    });
  }

  function maxBy(array, iteratee) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;
    
    let initialValue;
    if (isString(iteratee)) {
      initialValue = array[0][iteratee];

      return array.reduce((max, current) => {
        const currentValue = current[iteratee];
        return max >= currentValue ? max : currentValue;
      }, initialValue);
    } else if (isFunction(iteratee)) {
      initialValue = iteratee(array[0], 0, array);

      return array.reduce((max, current, index, self) => {
        const currentValue = iteratee(current, index, self);
        return max >= currentValue ? max : currentValue;
      }, initialValue);
    }
  }

  function min(array) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len ===0) return;

    return array.reduce((min, current) => {
      return min <= current ? min : current;
    });
  }

  function minBy(array, iteratee) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    let initialValue;
    if (isString(iteratee)) {
      initialValue = array[0][iteratee];

      return array.reduce((min, current) => {
        const currentValue = current[iteratee];
        return min <= currentValue ? min : currentValue;
      }, initialValue);
    } else if (isFunction(iteratee)) {
      initialValue = iteratee(array[0], 0, array);

      return array.reduce((min, current, index, self) => {
        const currentValue = iteratee(current, index, self);
        return min <= currentValue ? min : currentValue;
      }, initialValue);
    }
  }
  
  function mean(array) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sum(array) / len;
  }

  function meanBy(array, iteratee) {
    const len = isNil(array) ? 0 : array.length;
    if (!array || !isLength(len) || len === 0) return;

    return sumBy(array, iteratee) / len;
  }

  function groupBy(array, iteratee) {
    checkType(array, 'array');

    const len = array.length,
          isFunc = isFunction(iteratee),
          result = {};

    if (isNil(iteratee)) return result;
    
    for (let i = 0; i < len; i++) {
      const value = array[i];
      const key = isFunc ? iteratee(value) : value[iteratee];
      if (!hasOwn(result, key))
        result[key] = [];
      
      result[key].push(value);
    }

    return result;
  }

  function pick(object, path) {
    checkObjectLike(object);

    if (isArray(path)) {
      const result = {};
      path.forEach(property => {
        if (property in object)
          result[property] = object[property];
      });
      return result;
    } else {
      return path in object ? object[path] : {};
    }
  }

  function pickBy(object, predicate) {
    checkObjectLike(object);
    checkType(predicate, 'function');

    const result = {};
    for(const key in object) {
      const value = object[key];
      const isPick = predicate(value, key, object);
      if (isPick === true)
        result[key] = value;
    }

    return result;
  }

  function omit(object, path) {
    checkObjectLike(object);

    const keys = isArray(path) ? path : [path],
          result = {};
    for(const key in object) {
      if (!keys.includes(key))
        result[key] = object[key];
    }

    return result;
  }

  function omitBy(object, predicate) {
    checkObjectLike(object);
    checkType(predicate, 'function');

    const result = {};
    for(const key in object) {
      const value = object[key];
      const isPick = predicate(value, key, object);
      if (isPick === false)
        result[key] = value;
    }

    return result;
  }

  function mapKeys(object, iteratee) {
    checkObjectLike(object);
    checkType(iteratee, 'function');

    const result = {};
    for(const key in object) {
      const value = object[key];
      const newKey = iteratee(value, key, object);
      result[newKey] = value;
    }

    return result;
  }

  function mapValues(object, iteratee) {
    checkObjectLike(object);
    checkType(iteratee, 'function');

    const result = {};
    for(const key in object) {
      const newValue = iteratee(object[key], key, object);
      result[key] = newValue;
    }

    return result;
  }

  /**
   * @description 获取元素(带有length属性的对象都可以)的最后一个元素
   */
  function lastOf(object) {
    const len = object.length;
    if (!object || !isLength(len)) return;

    return object[len - 1];
  }

  function removeUndef(object) {
    checkObjectLike(object);

    forInOwn(object, (value, key, self) => {
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

    has (item) {
      const key  = findKey(this, (value, key) => {
        return !['size', 'nextKey'].includes(key) && _is(value, item);
      });
      return (typeof key !== 'undefined');
    },

    forEach (callback, context) {
      checkType(callback, 'array');

      forInOwn(this, (value, key, self) => {
        isObjectLike(context) && context !== null 
        ? callback.call(context, value, key, self)
        : callback(value, key, self);
      });
    },

    add (item) {
      const addSet =  (target) => {
        if (!this.has(target)) {
          this[this.nextKey++] = target;
          this.size++;
        }
      }

      if (isArray(item)) {
        const set = uniq(item);
        set.forEach((setItem) => {
          addSet(setItem);
        }); 
      } else {
        addSet(item);
      }
      
      return this;
    },

    delete (item) {
      const key = findKey(this, item);
      if (typeof key !== 'undefined') {
        delete this[key];
        this.size--;
        return !0;
      }
      return !1;
    },

    clear: function() {
      removeKeys(this);
      this.size = 0;
      this.nextKey = 0;
    },

    /**
     * 额外的，不同于ES6 Set集合的方法
     */
    filter (callback) {
      checkType(callback, 'function');

      const result  = new SetMock();
      forInOwn(this, (value, key, self) => {
        const state = callback(value, key, self);
        if (state === true) result.add(value);
      });

      return result;
    },

    toArray () {
      const array = [];
      forInOwn(this, (value) => {
        array.push(value);
      });

      return array;
    },

    indexOf (item) {
      return this.toArray().indexOf(item);
    }
  };

  /**
   * @description ES5版Map集合
   */
  function MapMock(entries) {

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
        entries.forEach((entry) => {
          if (!isArray(entry)) {
            throw new TypeError(entry + ' is not a Array');
          } else {
            const key = entry[0], value = entry[1];
            this[key] = value;
            this.size++;
          }
        });
      }
    }

  }

  MapMock.prototype = {
    constructor: MapMock,

    set (key, value) {
      this[key] = value;
      this.size++;
      return this;
    },

    get (key) {
      return this[key];
    },

    has (key) {
      let has = false;
      forInOwn(this, (_, k) => {
        if (_is(key, k)) {
          has = true;
          return false;
        }
      });

      return has;
    },

    delete (key) {
      if (this.has(key)) {
        delete this[key];
        this.size--;
        return true;
      }
      return false;
    },

    clear () {
      removeKeys(this);
      this.size = 0;
    },

    forEach (callback, context) {
      checkType(callback, 'function');

      forInOwn(this, (value, key, self) => {
        isObjectLike(context) && context !== null
        ? callback.call(context, value, key, self)
        : callback(value, key, self);
      });
    }
  };

  const util = {

    // 判断
    isString,
    isObjectLike,
    isObject,
    isEmpty,
    isFunction,
    isNumber,
    isNumeric,
    isDom,
    isInteger,
    isLength,
    isUndefined,
    isNull,
    isNil,
    isBoolen,
    isArray,
    isDate,
    isRegExp,
    checkType,
    getType,
    propsChecker,

    // number方法
    toNumber,
    toInteger,

    // dom方法
    toSelector,
    appendStyle,
    insertElementToBody,
    domAfterLoad,
    tagOf,
    getSelector,
    appendClass,
    getRandomClassName,

    // 数组方法
    uniq,
    remove,
    ins,
    sum,
    sumBy,
    max,
    maxBy,
    min,
    minBy,
    mean,
    meanBy,
    insert,
    includesBy,
    union,
    unionBy,
    groupBy,

    // 对象方法
    removeKey,
    removeKeys,
    findKey,
    lastOf,
    forIn,
    forInOwn,
    clone,
    cloneDeep,
    removeUndef,
    extend,
    toArray,
    pick,
    pickBy,
    omit,
    omitBy,
    mapKeys,
    mapValues,

    // String方法
    toCamelCase,
    fromCamelCase,
    getUniqString,
    
    // 其他方法
    dateFormater,
    getMonthData,
    
    SetMock,
    MapMock

  }

  return util;
});

/**
 * @description 组件的通用父类
 */
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Component = factory(global);
}(this, function (global) {
  const { 
    isLength, removeUndef, isNil, isUndefined, insertElementToBody, lastOf, getSelector, domAfterLoad, extend
  } = global.util;

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
   *   type: 'html' // 挂载dom的jQuery方法, append | prepend | before | after | html 等, 默认html
   * }]
   */
  Object.defineProperty(Component.prototype, 'mount', {
    value: function (doms) {
      if (!doms || !isLength(doms.length) || doms.length < 1) return;
      removeUndef(doms);
    
      doms.forEach((dom) => {
        let { condition, container, html, type } = dom;
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

      const last = lastOf(doms.filter(dom => isUndefined(dom.condition) || dom.condition));
      if (last) {
        const classIndex = last.html.indexOf('class');
        let selector = '';
        if (classIndex > -1) {
          selector = getSelector(last.html);
        } else {
          selector = getSelector(last.html, 'id');
        }
        
        domAfterLoad(selector, () => {
          this.componentDidMount();
          this.style();
          this.bindEvents();
          this.destroy();
        });
      }
    },
    writable: false,
    configurable: false,
    enumerable: true
  });

  Object.defineProperty(Component.prototype, 'init', {
    value: function () {
      const doms = this.render();
      this.componentWillMount();
      this.mount(doms);
    },
    writable: false,
    configurable: false,
    enumerable: true
  });
  
  extend(Component.prototype, {
    render () {
      return [];
    },
    style () {},
    componentWillMount () {},
    componentDidMount () {},
    bindEvents () {},
    /**
     * @description 删除一些无用的实例属性
     */
    destroy () {}
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
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Observer = factory(global);
}(this, function (global) {
  const { 
    isObjectLike, isObject, isNil, extend, isFunction, getType
   } = global.util;

  function Observer(object, prop, options) {
    if (!isObjectLike(object))
      throw new TypeError(`Excepted a objectLike, You given a ${getType(object)}`);

    if (isObject(prop) && isNil(options)) {
      options = prop;
      prop = null;
    }

    this.options = options;
    this.watching(object, prop);
  }

  extend(Observer.prototype, {
    watching (object, prop) {
      if (!object || !isObjectLike(object)) return;

      if (isNil(prop)) {
        for (const key in object) {
          this.handlePropChange(object, key, object[key]);
        }
      } else {
        this.handlePropChange(object, prop, object[prop]);
      }
    },

    handlePropChange (object, prop, value) {
      this.watching(value);

      const { get, set } = this.options;
      
      if (Object.defineProperty) {
        Object.defineProperty(object, prop, {
          set (newValue) {
            isFunction(set) && set(newValue);
            value = newValue;
          },
          get () {
            isFunction(get) && get();
            return value;
          }
        });
      } else if (object.__defineSetter__) {
        object.__defineSetter__(prop, (newValue) => {
          isFunction(set) && set(newValue);
          value = newValue;
        });

        object.__defineGetter__(prop, () => {
          isFunction(get) && get();
          return value;
        });
      } else {
        throw new Error(`not support defineProperty`);
      }
    }
  });

  return Observer;
});

/**
 * 滚轮事件监听
 */
;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.mouseWheelListener = factory(global);
}(this, function (global) {
  const {
    isFunction
  } = global.util;

  function mouseWheelListener(callback) {
    addMouseWheelHandler(function (e) {
      e = e || global.event;
      const value = e.wheelDelta || -e.deltaY || -e.detail;
      const delta = Math.max(-1, Math.min(1, value));
      const direction = delta < 0 ? 'down' : 'up';
      isFunction(callback) && callback(direction, value, delta);
    });
  }

  let g_supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        g_supportsPassive = true;
      }
    });
    global.addEventListener("testPassive", null, opts);
    global.removeEventListener("testPassive", null, opts);
  } catch (e) {}

  function addMouseWheelHandler (callback) {
    let prefix = '';
    let _addEventListener;
  
    if (global.addEventListener) {
      _addEventListener = "addEventListener";
    } else {
      _addEventListener = "attachEvent";
      prefix = 'on';
    }
    
    const support = 'onwheel' in document.createElement('div') ? 'wheel' : (
      document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
    );
      
    const passiveEvent = g_supportsPassive ? { passive: false } : false;
    
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
  const {
    isNil, isFunction, isString, forInOwn, isObject, fromCamelCase, isArray, checkType,
    extend
  } = global.util;

  const $ = global.jQuery;

  /**
   * @description 设置或获取元素的translate值
   * @param { Number | Function } x
   * @param { Number | Function } y
   */
  $.prototype.translate = function (x, y) {
    if (isNil(x) && isNil(y)) {
      const tx = parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
      const ty = parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5]);
      return [
        isNaN(tx) ? 0 : tx,
        isNaN(ty) ? 0 : ty,
      ];
    }

    let xValue, yValue;
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
  }
  $.prototype.translateX = function (value) {
    if (isNil(value)) {
      return this.translate()[0];
    }
    return this.translate(value);
  }
  $.prototype.translateY = function (value) {
    if (isNil(value)) {
      return this.translate()[1];
    }
    return this.translate(null, value);
  }

  /**
   * @description 查找元素的index
   * @param { Function } callback
   */
  $.prototype.findIndex = function (callback) {
    checkType(callback, 'function');

    const $el = this;
    for (let i = 0, len = $el.length; i < len; i++) {
      const found = callback(i, $el[i], $el);
      if (found === true) return i;
    }

    return -1;
  };

  $.prototype.indexOf = function (jq) {
    if ( !(jq instanceof jQuery) ) jq = $(jq);
    
    let index = -1;
    const $el = this;
    for (let i = 0, len = $el.length; i< len; i++) {
      if ($el[i] === jq[0]) {
        index = i;
        break;
      }
    }

    return index;
  };
  
  $.prototype.reduce = function (callback, initialValue) {
    checkType(callback, 'function');
    if ( (this.length === 0) && (typeof initialValue === 'undefined') ) {
      throw new TypeError('Reduce of empty jQuery with no initial value');
    }

    const $el = this;
    let i = -1;
    let result = initialValue;
    if (typeof result === 'undefined') {
      result = $el[0];
      i = 0;
    }
    const len = $el.length;
    while (++i < len) {
      result = callback(result, $el[i], i, $el);
    }
    return result;
  };

  /**
   * for $.node, $.closingNode
   */
  const handleAttr = (attr) => {
    let attributes = '';
    if (attr) {
      if (isString(attr)) {
        attributes = ' ' + attr;
      } else if (isObject(attr)) {
        forInOwn(attr, (obj, key) => {
          if ( (key.trim() === 'style') && isObject(obj) ) {
            attributes += ` ${key}="`;
            forInOwn(obj, (value, k) => {
              attributes += `${fromCamelCase(k)}: ${value};`;
            });
            attributes += `"`;
          } else {
            const thisAttr = `${fromCamelCase(key)}="${obj}"`;
            attributes += ` ${thisAttr}`;
          }
        });
      }
    }

    return attributes;
  }

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
  const node = function (wrapper, children, klass, attr) {
    if (isNil(children)) return '';
  
    // If the children is an array, do a join
    children = isArray(children) ? children.join('') : children;

    // Check for the class
    klass = klass ? ' class="' + klass + '"' : '';

    // Check for any attributes
    const attributes = handleAttr(attr);
    
    return '<' + wrapper + klass + attributes + '>' + children + '</' + wrapper + '>';
  };

  const closingNode = function (tagName, klass, attr) {
    klass = klass ? ` class="${klass}"` : '';
      
    const attributes = handleAttr(attr);

    return '<' + tagName + klass + attributes + '/>';
  };

  /**
   * @description 子类使用this.super()继承父类
   */
  const inherit = function (SuperClass, SubClass) {
    SubClass.prototype = new SuperClass();
    SubClass.prototype.constructor = SubClass;
    SubClass.prototype.super = SuperClass;
  };
  
  $.extend({
    node,
    closingNode,
    inherit
  });
  
}(this)