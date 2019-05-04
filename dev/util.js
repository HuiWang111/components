!function(win, $) {

  var emptyArray = [];

  // tools function
  function isString(target) {
    return typeof target === 'string';
  }
  function isObject(target) {
    return (typeof target === 'object') && !(target instanceof Array);
  }
  function isEmptyObject(target) {
    var key;
    for (key in target) return !1;
    return !0;
  }
  function isNumber(target) {
    return !isNaN(parseFloat(target));
  }
  function isTrueNumber(target) {
    return (typeof target === 'number');
  }
  function isFunction(target) {
    return typeof target === 'function';
  }
  function toSelector (string, type) {
    type = type || 'class';
    type = (type !== 'class') && (type !== 'id') ? 'class' : type;

    var selectorRe = type === 'class' ? /^\./g : /^#/g;
    var prefix = type === 'class' ? '.' : '#';

    return selectorRe.test(string) ? string : prefix + string;
  }
  function makeArray(arrayLike) {
    return emptyArray.slice.call(arrayLike);
  }
  function appendStyle(object) {
    if (!isObject(object) || isEmptyObject(object) || object === null) {
      return;
    }

    var style = "", key;
    for (key in object) {
      var obj = object[key], k, styl = "";
      for (k in obj) {
        styl += (k + ': ' + obj[k] + ';');
      }
      style = style === '' ? (key + ' { ' + styl + ' }') : (style + '\n' + (key + ' { ' + styl + ' }'));
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
  function insertElementToBody(el) {
    var script = document.querySelector('script');
    var parent = script ? script.parentNode : document.querySelector('body');

    var insert = function (v) {
      if (script) {
        parent.insertBefore(v, script);
      } else {
        parent.appendChild(v);
      }
    }

    var len = el.length;
    if (typeof len !== 'undefined') {
      for (var i = 0; i < len; i++) {
        if (!el[i]) continue;
        insert(el[i]);
      }
    } else {
      insert(el);
    }
  }
  function dateFormater(date, format) {
    var full = function (number) {
      if (!isNumber(number)) throw new Error('`number` must be a number');
      number = parseInt(number);
      return number < 10 ? ('0' + number) : number;
    }

    if ( !isNumber(date) ) {
      date = new Date();
    } else {
      date = parseInt(date);
      if (date.toString().length === 13) {
        date = new Date(date);
      } else {
        date = new Date(date * 1000);
      }
    }

    var year = date.getFullYear(), month = full(date.getMonth() + 1), day = full(date.getDate()),

    hour = full(date.getHours()), minute = full(date.getMinutes()), second = full(date.getSeconds());

    var result;
    format = format || 'yyyy/mm/dd hh:mm:ss';
    switch(format) {
      case 'yyyy-mm-dd hh:mm:ss':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; break;
      case 'mm-dd yyyy':
        result = month + '-' + day + ' ' + year; break;
      case 'yyyy-mm-dd':
        result = year + '-' + month + '-' + day; break;
      case 'yyyy/mm/dd hh:mm:ss':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second; break;
      case 'yyyy/mm/dd':
        result = year + '/' + month + '/' + day; break;
      case 'hh:mm:ss':
        result = hour + ':' + minute + ':' + second; break;

      default: throw new Error('not support this format');
    }

    return result;
  }
  function buildRandomString(length) {

    function randomLetter(size) {
      var letters = [];
      for (var i = 65; i < 91; i++) {
        letters.push(String.fromCharCode(i));
      }
      for (var i = 97; i < 123; i++) {
        letters.push(String.fromCharCode(i));
      }

      var result = letters[Math.floor(Math.random()*letters.length)];
      if (isNumber(size)) {
        size = parseInt(size);
        if (size > 1) {
          for (var i = 1; i < size; i++) {
            result += letters[Math.floor(Math.random()*letters.length)];
          }
        }
      }

      return result;
    }

    var randomString = Math.random().toString(36).substr(2);
    var letter = randomLetter();
    randomString =  letter + randomString; //保证第一位一定是字母
    if (isNumber(length)) {
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
  function domAfterLoad(selector, loadedCallback) {
    var timer = null;
    var dom = document.querySelectorAll(selector);
    if (dom.length > 0) {
      isFunction(loadedCallback) && loadedCallback();

      timer && clearTimeout(timer);
    } else {
      timer = setTimeout(arguments.callee, 0);
    }
  }

  var Util = {

    isString: isString,
    isObject: isObject,
    isEmptyObject: isEmptyObject,
    toSelector: toSelector,
    appendStyle: appendStyle,
    isFunction: isFunction,
    insertElementToBody: insertElementToBody,
    isTrueNumber: isTrueNumber,
    isNumber: isNumber,
    makeArray: makeArray,
    dateFormater: dateFormater,
    buildRandomString: buildRandomString,
    domAfterLoad: domAfterLoad

  }

  win.Util = Util; //export Util

  //String
  String.prototype.appendClass = function (className) {
    var string = this;
    
    if (className.length !== 0) {
      string += string.length === 0 ? className : (' ' + className);
    }

    return string;
  }
  if (!String.prototype.repeat) {
    String.prototype.repeat = function (number) {

      var str = this, n = parseInt(number), res = "";

      if (isNaN(n)) return '';

      for(var i = 0; i < n; i++) {
        res += str;
      }
      
      return res;
    }
  }

  //Array
  if (!Array.from) {
    Array.from = function (arrayLike, callback) {
      if (typeof arrayLike.length === 'undefined') return [];

      var array = [];
      if (isObject(arrayLike)) {
        for (var key in arrayLike) {
          if (!isNumber(key)) {
            array.push(undefined);
          } else {
            var item = isFunction(callback) ? callback(arrayLike[key], key, arrayLike) : arrayLike[key];
            array.push(item);
          }
        }
      }

      return array;
    }
  }
  if (!Array.isArray) {
    Array.isArray = function (object) {
      return object instanceof Array;
    }
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function (callback, target) {
      if (!isFunction(callback)) throw new Error('`callback` must be a function');

      var array = this;
      for (var i = 0, len = array.length; i < len; i++) {
        var found = typeof target === 'undefined' ? 
          callback(array[i], i, array) : 
          callback.call(target, array[i], i, array);

        if (found) return array[i];
      }
    }
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (callback, target) {
      if (!isFunction(callback)) throw new Error('`callback` must be a function');

      var array = this;
      for (var i = 0, len = array.length; i < len; i++) {
        var found = typeof target === 'undefined' ? 
          callback(array[i], i, array) : 
          callback.call(target, array[i], i, array);

        if (found) return i;
      }
    }
  }
  if (!Array.prototype.fill) {
    Array.prototype.fill = function (fill, start, end) {
      var array = this;
      var len = array.length;
      if (start == null && end == null) {
        array = array.map(function () {
          return fill;
        });
        return array;
      } else if (start == null && end != null) {
        if (!isTrueNumber(end)) throw new Error('`start` and `end` must be a number');

        end = end < 0 ? len + end : end;
        if (end < 0) {
          return array;
        } else {
          array = array.map(function (item, index) {
            return index < end ? fill : item;
          });
          return array;
        }
      } else if (start != null && end == null) {
        if (!isTrueNumber(start)) throw new Error('`start` and `end` must be a number');

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
        if (!isTrueNumber(start) || !isTrueNumber(end)) throw new Error('`start` and `end` must be a number');

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
  }


  //Object
  if (!Object.is) {
    Object.is = function(x, y) {
      if (x === y) { 
        return x !== 0 || 1 / x === 1 / y; //针对 +0不等于-0, 
      } else {
        return x !== x && y !== y; //NaN === NaN => false
      }
    };
  }
  if (!Object.assign) {
    Object.assign = function () {

      var receiver = Array.from(arguments).slice(0, 1)[0], suppliers = Array.from(arguments).slice(1);

      suppliers.forEach(function (supplier) {
        Object.keys(supplier).forEach(function (key) {
          receiver[key] = supplier[key];
        });
      });

      return receiver;
    }
  }

  //jQuery
  $.prototype.translate = function (x, y) {
    if (x == null && y == null) {
      return [
        parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]),
        parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5])
      ];
    }

    var xValue, yValue;
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
  }
  $.prototype.translateX = function (value) {

    if (value == null) {
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
    }

    this.translate(value);
  }
  $.prototype.translateY = function (value) {

    if (value == null) {
      return parseFloat(this.css('transform').replace(/[^0-9\-.,]/g, '').split(',')[5]);
    }

    this.translate(null, value);
  }

  $.prototype.findIndex = function (callback) {
    if (!isFunction(callback)) throw new Error('`callback` must be a function');

    var $el = this;
    for (var i = 0, len = $el.length; i < len; i++) {
      var found = callback(i, $el[i], $el);
      if (found) return i;
    }
  }
  
  $.extend({
    node: function (wrapper, item, klass, attr) {
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
            if ( (key.trim() === 'style') && isObject(attr[key]) && (attr[key] !== null) ) {
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
    }
  });

}(window, jQuery)