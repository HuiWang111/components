//事件代理
function bindEvent(element, type, selector, func) {
  if (func == null) {
    func = selector;
    selector = null;
  }
  element.addEventListener(type, function (e) {
    let target;
    if (selector) {
      //代理
      target = e.target;
      if (target.classList.contains(selector)) {
        func.call(target, e);
      } 
    } else {
      func(e);
    }
  });
}

function __ajax(obj/* {type: type, url: url, data: data, async: async, success: success, failure: failure} */) {
  let xhr = window.XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject('Mircosoft.XMLHTTP'));
  // xhr.abort();中断请求
  if (typeof obj.data === "undefined") {
    obj.data = null;
  }
  if (typeof obj.async === "undefined") {
    obj.async = true;
  }
  if (typeof obj.failure === "undefined") {
    obj.failure = function () {
      throw new Error("ajax Error!");
    }
  }

  xhr.open(obj.type, obj.url, obj.async);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(obj.data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      if (typeof obj.success === "function") {
        obj.success(xhr);
      }
    } else {
      if (typeof obj.failure === "function") {
        obj.failure();
      }
    }
  };
}

//获取所有兄弟元素 @return Array
function siblings(elem) {
  var nodes = [];
  var p = elem.previousElementSibling;
  while (p) {
    if (p.nodeType === 1) {
      nodes.push(p);
      p = p.previousElementSibling;
    }
  }
  nodes.reverse();
  var n = elem.nextElementSibling;
  while (n) {
    if (n.nodeType === 1) {
      nodes.push(n);
      n = n.nextElementSibling;
    }
  }
  return nodes;
}

function computedStyle(element, style, pseudoElement = null) {
  return document.defaultView.getComputedStyle(element, pseudoElement)[style];// 参数2：伪元素字符串————如:after
}

//获取第n个子元素 @return Array
function getChild(elements, n = 1) {
  if (typeof n === "number") {
    n = n < 1 ? 1 : n;
    let result = [];
    elements.forEach((element) => {
      let firstChild = element.firstElementChild,
          child;
      if (n === 1) {
        result.push(firstChild);
      } else {
        for (let i = 1; i < n; i++) {
          child = firstChild.nextElementSibling;
          firstChild = child;
        }
        result.push(child);
      }
    });
    return result; 
  } else {
    throw new Error("argument 'n' must be a number");
  }
}

/*use: const setDelayTime = _setDelayTime(element, 10);
setDelayTime(function () {
  code.....
});*/
function _setDelayTime(element, timeleft) {
  let time = reset = timeleft,
      counter = null,
      content = element.innerHTML;

  return function (callback, endCallback) {
    if (counter == null && time > 0) {
      element.innerHTML = time;
      if (typeof callback === "function") {
        callback();
      }
      counter = setInterval(function () {
        time--;
        element.innerHTML = time;
        if (time <= 0) {
          clearInterval(counter);
          if (typeof endClaaback === "function") {
            endClaaback();
          }
          counter = null;
          time = reset;
          element.innerHTML = content;
        }
      }, 1000);
    }
  }
}



