/**
 * ES6可用方法：Object.is, Object.assign, Array.from, String.prototype.repeat, String.prototype.includes,
 *  Array.prototype.find, Array.prototype.findIndex
 * 
 * ES7可用方法：Array.prototype.includes
 * 
 * ES8可用方法：Object.entries, Object.values
 */

// 优化baseRemove

;!function(win, $) {
  
  const emptyArray = [];
  if (!emptyArray.map) {
    alert('您的浏览器过旧，请升级浏览器！');
    return;
  }

  /**
   * @description ES6方法
   */
  if (!emptyArray.find) {

    Object.is = function (x, y) {
      if (x === y) { 
        return x !== 0 || 1 / x === 1 / y; // +0不等于-0
      } else {
        return x !== x && y !== y; // NaN === NaN => true
      }
    };

    Object.assign = function () {
      const receiver = emptyArray.slice.call(arguments).slice(0, 1)[0], suppliers = emptyArray.slice.call(arguments).slice(1);

      suppliers.forEach(function (supplier) {
        Object.keys(supplier).forEach(function (key) {
          receiver[key] = supplier[key];
        });
      });

      return receiver;
    };

    Array.from = function (arrayLike, callback) {
      const len = arrayLike.length || arrayLike.size;
      if (typeof len !== 'number') return [];

      const object = {}
      forInOwn(arrayLike, (__, key) => {
        object[parseFloat(key)] = arrayLike[key];
      });
      
      const array = [];
      forInOwn(object, (value, i, self) => {
        if (isNaN(i)) {
          array.push(undefined);
        } else {
          const item = isFunction(callback) ? callback(value, i, self) : value;
          array.push(item);
        }
      });

      return array;
    };

    Object.assign(String.prototype, {
      repeat (count) {
        count = parseInt(count);
        if (count < 0) throw new Error('Invalid count value');
        if (isNaN(count) || count === 0) return '';
  
        const string = this;
        let result = "";
        for(let i = 0; i < count; i++) {
          result += string;
        }
        
        return result;
      },

      startsWith (search, start) {
        if (search instanceof RegExp) {
          throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }

        search = String(search);
        start = isNumeric(start) ? parseInt(start) : 0;

        const len = search.length;
        if (start + search.length > len) {
          return false;
        } else {
          const str = this.substring(start, start + len);
          return str === search;
        }
      },

      endsWith (search, pos) {
        if (search instanceof RegExp) {
          throw new TypeError('First argument to String.prototype.includes must not be a regular expression');
        }
        
        search = String(search);
        const len = search.length;
        const length = this.length;

        const start = isNumeric(pos) ? parseInt(pos) - len : length - 1;
        
        
        if (start + len > length) {
          return false;
        } else {
          const str = this.substring(start, start + len);
          return str === search;
        }
      },

      includes (search, start) {
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
      find (callback, context) {
        if (typeof callback !== 'function') throw new Error(callback + ' is not a function');
  
        const array = this;
        for (let i = 0, len = array.length; i < len; i++) {
          const found = typeof context === 'undefined' ? 
            callback(array[i], i, array) : 
            callback.call(context, array[i], i, array);
  
          if (found === true) return array[i];
        }
      },

      findIndex (callback, context) {
        if (typeof callback !== 'function') throw new Error(callback + ' is not a function');
  
        const array = this;
        for (let i = 0, len = array.length; i < len; i++) {
          const found = typeof context === 'undefined' ? 
            callback(array[i], i, array) : 
            callback.call(context, array[i], i, array);
  
          if (found === true) return i;
        }
  
        return -1;
      },

      fill (fill, start, end) {
        const isNumeric = function (target) {
          return !isNaN(parseFloat(target));
        }

        let array = this;
        const len = array.length;
        if (isNil(start) && isNil(end)) {
          array = array.map(function () {
            return fill;
          });
          return array;
        } else if (isNil(start) && end != null) {
          if (!isNumeric(end)) throw new Error(end + ' is not a number');
  
          end = parseInt(end);
          end = end < 0 ? len + end : end;
          if (end < 0) {
            return array;
          } else {
            array = array.map(function (item, index) {
              return index < end ? fill : item;
            });
            return array;
          }
        } else if (start != null && isNil(end)) {
          if (!isNumeric(start)) throw new Error(start + ' is not a number');
  
          start = parseInt(start);
          start = start < 0 ? len + start : start;
          if (start < 0) {
            array = array.map(function () {
              return fill;
            });
            return array;
          } else {
            array = array.map(function (item, index) {
              return index >= start ? fill : item;
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
          } else if (start > 0 && end < 0) { //存疑虑
            return array;
          } else if (start < 0 && end > 0) {
            array = array.map(function (item, index) {
              return index < end ? fill : item;
            });
            return array;
          } else {
            array = array.map(function (item, index) {
              return (index >= start) && (index < end) ? fill : item;
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
      includes (target, start) {
        const array = this, len = array.length;
        start = isNumeric(start) ? parseInt(start) : 0;
        start = start >= 0 ? start : 0;
  
        let result = false;
        for (let i = start; i < len; i++) {
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
      if (isNil(object)) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const entries = [];
      const keys = Object.keys(object);
      for (var key in object) {
        if (keys.includes(key)) {
          entries.push([ String(key), object[key] ]);
        }
      }

      return entries;
    }

    Object.values = function (object) {
      if (isNil(object)) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const values = [];
      const keys = Object.keys(object);
      for (var key in object) {
        if (keys.includes(key)) {
          values.push(object[key]);
        }
      }

      return values;
    }
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
   *   type: 'html' // 挂载dom的jQuery方法, append | prepend | before | after | html 等, 默认html
   * }]
   */
  Object.defineProperty(Component.prototype, 'mount', {
    value: function (doms) {
      if (!doms || !isLength(doms.length) || doms.length < 1) return;
    
      doms.forEach((dom) => {
        let { condition, container, html, type } = dom;
        if (isNil(html)) throw new Error('缺少需挂载的dom字符串');
        if (isNil(container)) throw new Error('缺少挂载目标容器');

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

      const last = lastOf(doms);
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
  
  Object.assign(Component.prototype, {
    constructor: Component,
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

  win.Component = Component;


  /* ======== 私有方法，不添加到Util全局对象 ======== */

  function baseUnion(args, isSample) {
    const array = [];
    let prop = null;
    for( let i = 0, len = args.length; i < len; i++) {
      if (Array.isArray(args[i])) {
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
    if (!isObjectLike(object)) throw new Error( `${object} is not a object`);

    const keys = [];
    for (key in object) {
      if (isFunction(iteratee)) {
        const result = iteratee(object[key], key, object);
        if (result === true) {
          keys.push(key);
          if (!deep) break;
        }
      } else {
        if (Object.is(object[key], iteratee)) {
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
    if (!isObjectLike(object)) throw new Error( `${object} is not a object`);

    const isFunc = isFunction(iteratee);

    let obj = {}, flag = false;
    if (isFunc) {
      for (const key in object) {
        const result = iteratee(object[key], key, object);
        if (result === true) {
          const value = object[key];
          delete object[key];
          flag = true;
          Object.assign(obj, { [key]: value });
          if (!deep) break;
        }
      }
    } else {
      if (iteratee in object) {
        const value = object[iteratee];
        delete object[iteratee];
        flag = true;
        Object.assign(obj, { [iteratee]: value });
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

  function baseRemove (array, iteratee) {
    if (!Array.isArray(array)) throw new TypeError(`${array} is not a Array`);

    const isFunc = isFunction(iteratee);
    const isArr = Array.isArray(iteratee);
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
          if (Object.is(iteratee, value)) {
            result.push(value);
            indexes.push(i);
          }
      }
    }

    baseRemoveAt(array, indexes);
    return result;
  }

  function getLetters () {
    const letters = [];
    for (let i = 65; i < 91; i++) {
      letters.push(String.fromCharCode(i));
    }
    for (let j = 97; j < 123; j++) {
      letters.push(String.fromCharCode(j));
    }
    return letters;
  }

  function baseRandomLetter (size) {
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

  /* ======== Util全局对象中的方法 ======== */

  function isString(value) {
    return typeof value === 'string';
  }
  function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
  }
  function isObject(value) {
    return value && value.constructor === Object;
  }
  function isNil(value) {
    return value == null;
  }
  function isEmpty(value) {
    if (isNil(value)) {
      return !0;
    } else if (isLength(value.length)) {
      return value.length === 0;
    } else if (isObjectLike(value)) {
      for (const _ in value) return !1;
      return !0;
    } else if (isNumber(value)) {
      return value === 0;
    }
  }
  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  function isNull(value) {
    return value === null;
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
    return (typeof value === 'number');
  }
  function isFunction(value) {
    return (typeof value === 'function');
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
  
  function makeArray(arrayLike) {
    return emptyArray.slice.call(arrayLike);
  }

  /**
   * @description 从dom字符串中获取最外层元素的className或id
   * @example
   * getSelector('<div class="wrapper wrap" id="main"><span class="inner"></span></div>') // .wrapper.wrap
   * getSelector('<div class="wrapper wrap" id="main"><span class="inner"></span></div>', 'id') // #main
   */
  function getSelector(string, type = 'class') {
    let selector = '';

    if (type !== 'class' && type !== 'id') return selector;
    if (!isString(string)) throw new Error(string + ' is not a string');
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
    return Array.from(arguments).reduce((result, current) => {
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
   * @param { * } date 时间戳
   * @param { String } format 格式
   * @returns 日期字符串
   */
  function dateFormater(date, format = 'yyyy/mm/dd hh:mm:ss') {
    const full = (number) => {
      if (!isNumeric(number)) throw new Error(number + ' is not a number');
      number = parseInt(number);
      return number < 10 ? ('0' + number) : number;
    }

    if ( !isNumeric(date) ) {
      date = new Date();
    } else {
      date = parseInt(date);
      if (String(date).length === 13) {
        date = new Date(date);
      } else {
        date = new Date(date * 1000);
      }
    }

    const year = date.getFullYear(), month = full(date.getMonth() + 1), day = full(date.getDate()),

    hour = full(date.getHours()), minute = full(date.getMinutes()), second = full(date.getSeconds());

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
    year = toNumber(year);
    month = toNumber(month);
    
    const today = new Date();
    if (year === false || month === false) {
      year === false && (year = today.getFullYear());
      month === false && (month = today.getMonth() + 1);
    }

    if (year < 1970 || year > today.getFullYear()) return;
    if (month < 1 || month > 12) return;

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
        dateStr: dateFormater( (new Date(thisYear, thisMonth-1, showDate)).getTime(), 'yyyy-mm-dd' ),
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

  /**
   * @description 下划线或中划线命名法转驼峰命名法
   * @example
   * toCamelCase('my-name') // 'myName'
   */
  function toCamelCase(string) {
    const match = ['-', '_'];
    const index = [];
    for (let i = 0, len = string.length; i < len; i++) {
      if ( match.includes(string[i]) ) {
        index.push(i + 1);
      }
    }
    
    string = string.split('').map((str, ii) => index.includes(ii) ? str.toUpperCase() : str).join('');
    return string.replace(/[-_]/g, '');
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
    if (!isString(selector)) {
      throw new Error('`' + selector + '` is not a string');
    }
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

    const isStr = isString(iteratees);
    if (!isStr && Array.isArray(iteratees)) throw new Error(`${iteratee} is not a function and string`);

    iteratees = isStr ? iteratees.split(',') : iteratees;
    let obj = {}, flag = false;
    iteratees.forEach((iteratee) => {
      const result = baseRemoveKey(object, iteratee.trim());
      if (result) {
        Object.assign(obj, result);
        flag = true;
      }
    });

    return flag ? obj : flag;
  }

  /**
   * @description for-in循环
   */
  function forIn(object, callback) {
    if (!isFunction(callback)) throw new Error( `${callback} is not a function`);

    for (const key in object) {
      const isBreak = callback(object[key], key, object);
      if (isBreak === false) break;
    }
  }
  function forInOwn(object, callback) {
    if (!isFunction(callback)) throw new Error(callback + ' is not a function');

    for(const key in object) {
      if (object.hasOwnProperty(key)) {
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
      if (!Array.isArray(v)) throw new Error( `${v} is not a Array`);
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
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');

    return array.reduce((arr, item) => {
      return arr.includes(item) ? arr : [...arr, item];
    }, []);
  }

  function uniqBy(array, prop) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');

    return array.reduce((arr, item) => {
      return includesBy(arr, item, prop) ? arr : [...arr, item];
    }, []);
  }

  /**
   * @description 多个数据的并集
   */
  function union() {
    return uniq(baseUnion(Array.from(arguments), true));
  }

  function unionBy() {
    const { array, prop } = baseUnion(Array.from(arguments));
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
      if ((prop in array[i]) && Object.is(array[i][prop], target[prop])) {
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
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');

    const result = [];
    uniq(array).forEach(function (item, index, self) {
      switch (true) {
        case (Array.isArray(iteratee)):
          !iteratee.includes(item) && result.push(item);
          break;
        case (isFunction(iteratee)):
          iteratee(item, index, self) === false && result.push(item);
          break;
        default: iteratee !== item && result.push(item);
      }
    });

    return result;
  }

  /**
   * @description 两数组的交集
   */
  function ins(array, list) {
    if (!Array.isArray(array)) throw new Error(array + ' is not a Array');
    if (!Array.isArray(list)) throw new Error(list + ' is not a Array');

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

  /**
   * @description 获取元素(带有length属性的对象都可以)的最后一个元素
   */
  function lastOf(object) {
    const len = object.length;
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

  SetMock.prototype = { //'size,nextKey'
    constructor: SetMock,

    has (item) {
      const key  = findKey(this, (value, key) => {
        return !['size', 'nextKey'].includes(key) && Object.is(value, item);
      });
      return (typeof key !== 'undefined');
    },

    forEach (callback, context) {
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      forInOwn(this, (value, key, self) => {
        isObjectLike(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
      });
    },

    add (item) {
      const addSet =  (target) => {
        if (!this.has(target)) {
          this[this.nextKey++] = target;
          this.size++;
        }
      }

      if (Array.isArray(item)) {
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
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

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
      if (!Array.isArray(entries)) {
        throw new Error(entries + ' is not a Array');
      } else {
        entries.forEach((entry) => {
          if (!Array.isArray(entry)) {
            throw new Error(entry + ' is not a Array');
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
        if (Object.is(key, k)) {
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
      if (!isFunction(callback)) throw new Error(callback + ' is not a function');

      forInOwn(this, (value, key, self) => {
        isObjectLike(context) && context !== null ? callback.call(context, value, key, self) : callback(value, key, self);
      });
    }
  };

  const Util = {

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
    isEmpty,
    isUndefined,
    isNull,

    // number方法
    toNumber,

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
    makeArray,
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

    // 对象方法
    removeKey,
    removeKeys,
    findKey,
    lastOf,
    forIn,
    forInOwn,

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
  win.Util = Util; //export Util

  ;!function (win) {

    function mouseWheelListener(callback) {
      addMouseWheelHandler(function (e) {
        e = e || window.event;
        const value = e.wheelDelta || -e.deltaY || -e.detail;
        const delta = Math.max(-1, Math.min(1, value));
        const direction = delta < 0 ? 'down' : 'up';
        isFunction(callback) && callback(direction, value, delta);
      });
    }

    win.mouseWheelListener = mouseWheelListener;

    let g_supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () {
          g_supportsPassive = true;
        }
      });
      window.addEventListener("testPassive", null, opts);
      window.removeEventListener("testPassive", null, opts);
    } catch (e) {}

    function addMouseWheelHandler (callback) {
      let prefix = '';
      let _addEventListener;
    
      if (window.addEventListener) {
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
  }(win)

  /* ========jQuery======== */
  /**
   * @description 设置或获取元素的translate值
   * @param { Number | Function } x
   * @param { Number | Function } y
   */
  $.prototype.translate = function (x, y) {
    if (isNil(x) && isNil(y)) {
      return [
        parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]),
        parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5])
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
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
    }
    this.translate(value);
  }
  $.prototype.translateY = function (value) {
    if (isNil(value)) {
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5]);
    }
    this.translate(null, value);
  }

  /**
   * @description 查找元素的index
   * @param { Function } callback
   */
  $.prototype.findIndex = function (callback) {
    if (!isFunction(callback)) throw new Error('`callback` must be a function');

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
    if (!isFunction(callback)) throw new Error('`' + callback + '` is not a function');
    if ( (this.length === 0) && (typeof initialValue === 'undefined') ) {
      throw new Error('TypeError: Reduce of empty jQuery with no initial value');
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
  
  $.extend({
    
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
    node: function (wrapper, children, klass, attr) {
      if (isNil(children)) return '';
  
      // If the children is an array, do a join
      children = Array.isArray(children) ? children.join('') : children;
  
      // Check for the class
      klass = klass ? ' class="' + klass + '"' : '';
  
      // Check for any attributes
      let attributes = '';
      if (attr) {
        if (isString(attr)) {
          attributes = ' ' + attr;
        } else if (isObject(attr)) {
          forInOwn(attr, (obj, key) => {
            if ( (key.trim() === 'style') && isObject(obj) && (obj !== null) ) {
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
      
      return '<' + wrapper + klass + attributes + '>' + children + '</' + wrapper + '>';
    },

    /**
     * @description 子类使用this.super()继承父类
     */
    inherit: function (SuperClass, SubClass) {
      SubClass.prototype = new SuperClass();
      SubClass.prototype.constructor = SubClass;
      SubClass.prototype.super = SuperClass;
    }
    
  });

}(window, window.jQuery)