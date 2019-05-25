'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var obj = { a: 1, b: 2, c: 3 };
var a = obj.a,
    b = obj.b,
    c = obj.c;


var obj1 = { a: a, b: b, c: c };
// const obj2 = { ...{a: 1, b: 2, c:3} };

var arr = [1, 2, 3].concat();

var name = 'abc';

var person = _defineProperty({
  name: 'def'
}, name, 'xxx');

function add() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  return a + b;
}

var handler = {
  onClick: function onClick() {
    var _this = this;

    setTimeout(function () {
      console.log(_this);
    });
  }
};

var set = new Set();

function test() {
  var _arguments = arguments;

  var testinner = function testinner() {
    return _arguments.callee(1);
  };

  testinner();
}