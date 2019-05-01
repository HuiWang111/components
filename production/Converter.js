(function (win, doc) {

	if (![].map) alert('您的浏览器版本过低，请更新浏览器！');

	var emptyArray = [];

	function isString (target) {
		return typeof target === 'string';
	}
	function isConverter (target) {
		return target instanceof Converter;
	}
	function isArray (target) {
		return target instanceof Array;
	}
	function isTrueObject (target) {
		return !(target instanceof Array) && (typeof target === 'object');
	}
	function isFunction (target) {
		return typeof target === 'function';
	}

	var Converter = function (arr) {

		var i = 0, len = arr.length;
		for( i = 0; i < len; i++ ) {
			this[i] = arr[i]
		}
		this.length = len;

	}

	var $ = function (selector, context) {

		var arr = [], i = 0;
		if (selector) {

			if ( !context && isConverter(selector) ) return selector;

			if ( isString(selector) ) {

				var html = selector.trim(), tempParent;
				if ( html.indexOf('<') >= 0 && html.indexOf('>') >= 0 ) {

					var toCreate = 'div';
					if ( html.indexOf('<li') === 0 ) toCreate = 'ul';
					if ( html.indexOf('<td') === 0 || html.indexOf('<th') ) toCreate = 'tr';
					if ( html.indexOf('<tr') === 0 ) toCreate = 'tbody';
					if ( html.indexOf('<thead') === 0 || html.indexOf('<tbody') === 0 ) toCreate = 'table';
					if ( html.indexOf('<option') === 0 ) toCreate = 'select';
					tempParent = doc.createElement(toCreate);
					tempParent.innerHTML = html;
					for ( i = 0; i < tempParent.childNodes.length; i++ ) {
						arr.push(tempParent.childNodes[i]);
					}

				}else {

					var els;
					if ( !context && selector.indexOf('#') === 0 ) {
						els = doc.querySelectorAll(selector);
					} else {
						els = (context || doc).querySelectorAll(selector);
					}

					for( i = 0; i < els.length; i++ ) {
						if ( els[i] ) arr.push(els[i])
					}

				}

			} else if ( selector.nodeType || selector === win || selector === doc ) {
				arr.push(selector);
			} else if ( selector.length > 0 && selector[0].nodeType ) {
				for ( i = 0; i < selector.length; i++ ) {
					if ( selector[i] ) arr.push(selector[i]);
				}
			}
		}

		return new Converter(arr);
		
	}

	$.isArray = isArray;
	$.isString = isString;
	$.isConverter = isConverter;
	$.isTrueObject = isTrueObject;

	$.extend = function() {

		var arg = emptyArray.slice.call(arguments);

		arg.forEach(function (obj) {
			if ( !isTrueObject(obj) ) throw new Error('input is not a Object!');

			Object.keys(obj).forEach(function (key) {
				$[key] = obj[key];
			});

		});
	}

	function unique (arr) {
		if ( arr instanceof Array ) {
			var array = [];
			arr.forEach(function (t) {
				if ( array.indexOf(t) === -1 ) {
					array.push(t);
				}
			});

			return array;
		}
	}


	/* Converter prototype methods */
	Converter.prototype = {

		text: function (txt) {
			if ( txt == null ) {
				if ( this[0] ) return this[0].innerText;
				return undefined;
			}
			for ( var i = 0; i < this.length; i++ ) {
				this[i].innerText = txt;
			}
			return this;
		},

		html: function (dom) {
			if (dom = null) {
				if ( this[0] ) return this[0].innerHTML;
				return undefined;
			}
			for ( var i = 0; i < this.length; i++ ) {
				this[i].innerHTML = dom;
			}
			return this;
		},

		val: function (value) {
			if (value == null) {
				if ( this[0] ) return this[0].value;
				return undefined;
			}
			for ( var i = 0; i < this.length; i++ ) {
				this[i].value = value;
			}
			return this;
		},

		attr: function (attrs, value) {
			var i = 0, len = this.length;
			if ( arguments.length === 1 ) {
				if ( isString(attrs) ) {
					if ( this[0] ) return this[0].getAttribute(attrs);
					return undefined;
				} else if ( isTrueObject(attrs) ) {
					for ( i = 0; i < len; i++ ) {
						for ( var attr in attrs ) {
							this[i].setAttribute(attr, attrs[attr]);
						}
					}
					return this;
				}
			}

			if ( arguments.length === 2 && isString(attrs) && isString(value) ) {
				for ( i = 0; i < len; i++ ) {
					this[i].setAttribute(attrs, value);
				}
				return this;
			}
			return this;
		},

		removeAttr: function (attr) {
			for ( var i = 0; i < this.length; i++ ) {
				this[i].removeAttribute(attr);
			}
			return this;
		},

		addClass: function () {
			var classNames = emptyArray.slice.call(arguments), klasses, i, j;
			for ( i = 0; i < this.length; i++ ) {
				classNames.forEach(function (className) {
					klasses = className.split(' ');
					klasses.forEach(function (klass) {
						this[i].classList.add(klass);
					});
				});
			}
			return this;
		},

		removeClass: function () {
			var classNames = emptyArray.slice.call(arguments), klasses, i, j;
			for ( i = 0; i < this.length; i++ ) {
				classNames.forEach(function (className) {
					klasses = className.split(' ');
					klasses.forEach(function (klass) {
						this[i].classList.remove(klass);
					});
				});
			}
			return this;
		},

		toggleClass: function (klass) {
			for (var i = 0; i < this.length; i++) {
				this[i].classList.toggle(klass);
			}
			return this;
		},

		hasClass: function (klass) {
			if ( this[0] && isString(klass) && klass !== '' ) return this[0].classList.contains(klass);
			return false;
		},

		styles: function () {
			if (this[0]) return win.getComputedStyle(this[0], null);
			return undefined;
		},

		css: function (props, value) {
			var i = 0;
			if ( arguments.length === 1 ) {
				if ( isString(props) ) {
					if ( this[0] ) return win.getComputedStyle(this[0], null)[props];
					return undefined;
				} else if ( isTrueObject(props) ) {
					for ( i = 0; i < this.length; i++ ) {
						for ( var prop in props ) {
							this[i].style[prop] = props[prop];
						}
					}

					return this;
				}
			}

			if ( arguments.length === 2 && isString(props) && isString(value) ) {
				for( i = 0; i < this.length; i++ ) {
					this[i].style[props] = value;
				}

				return this;
			}
			return this;
		},

		append: function () {

			var argus = emptyArray.slice.call(arguments), i, k;

			argus.forEach(function (child) {
				for( k = 0; k < this.length; k++ ) {
					if ( isConverter(argu) || (child instanceof NodeList) || (child instanceof HTMLCollection) || isString(child) ) {
						var el = isString(child) ? $(child) : child;
						for( i = 0; i < el.length; i++ ) {
							this[k].appendChild(el[i]);
						}
					} else if ( child.NodeType ) {
						this[k].appendChild(child);
					}
				}
			});
			return this;
		},

		prepend: function () {
			var args = emptyArray.slice.call(arguments), i, k;

			args.forEach(function (newchild) {
				for ( k = 0; k < this.length; k++ ) {
					var childs = this[k].childNodes;
					if ( childs.length === 0 ) {
						$(this[k]).append(newchild);
					} else if ( childs.length > 0 ) {
						if ( isConverter(newchild) || (newchild instanceof NodeList) || (newchild instanceof HTMLCollection) ||isString(newchild) ) {
							var el = isString(newchild) ? $(newchild) : newchild;
							for ( i = 0; i < el.length; i++ ) {
								this[k].insertBefore(el[i], childs[0]);
							}
						} else if ( newchild.NodeType ) {
							this[k].insertBefore(newchild, childs[0])
						}
					}
				}
			});
			return this;
		},

		before: function (elem) {
			var i, j;
			for ( i = 0; i < this.length; i++ ) {
				var parent = this[i].parentNode;
				if ( isConverter(elem) || (elem instanceof NodeList) || (elem instanceof HTMLCollection) || isString(elem) ) {
					var el = isString(elem) ? $(elem) : elem;
					for ( j = 0; j < el.length; j++ ) {
						parent.insertBefore(el[j], this[i]);
					}
				} else if (elem.NodeType) {
					parent.insertBefore(elem, this[i]);
				}
 			}
 			return this;
		},

		after: function (elem) {
			var i, j;
			for ( i = 0; i < this.length; i++ ) {
				var parent = this[i].parentNode;
				if ( isConverter(elem) || (elem instanceof NodeList) || (elem instanceof HTMLCollection) || isString(elem) ) {
					var el = isString(elem) ? $(elem) : elem;
					for ( j = 0; j < el.length; j++ ) {
						if ( parent.lastChild === el[i] ) {
							parent.appendChild(el[i]);
						} else {
							parent.insertBefore(el[i], this[i].nextSibling);
						}
					}
				} else if ( elem.nodeType ) {
					if ( parent.lastChild === elem ) {
						parent.appendChild(elem);
					} else {
						parent.insertBefore(elem, this[i].nextSibling);
					}
				} 
			}

			return this;
		},

		next: function (selector) {
			if ( !this[0] ) return new Converter([]);
			var next = this[0].nextElementSibling;
			if ( selector ) {
				if ( next && $(next).is(selector) ) return new Converter([next]);
			} else {
				if ( next ) return new Converter([next]);
			}

			return new Converter([]);
		},

		nextAll: function (selector) {
			if ( !this[0] ) return new Converter([]);
			var nexts = [];
			var next = this[0].nextElementSibling;
			while ( next ) {
				if ( selector ) {
					if ( $(next).is(selector) ) nexts.push(next);
				} else {
					nexts.push(next);
				}
				next = next.nextElementSibling;
			}
			return new Converter(unique(nexts));
		},

		prev: function (selector) {
			if ( !this[0] ) return new Converter([]);
			var prev = this[0].previousElementSibling;
			if ( selector ) {
				if ( prev && $(prev).is(selector) ) return new Converter([prev]);
			} else {
				if ( prev ) return new Converter([prev]); 
			}
			return new Converter([]);
		},

		prevAll: function (selector) {
			if ( !this[0] ) return new Converter([]);
			var prev = this[0].previousElementSibling, prevs = [];
			while ( prev ) {
				if ( selector ) {
					if ( $(prev).is(selector) ) prevs.push(prev);
				} else {
					prevs.push(prev);
				}
			}
			return new Converter(prevs);
		},

		siblings: function () {
			if (!this[0]) return new Converter([]);
			var siblings = [], el = this[0];

			var prev = el.previousElementSibling;
			while (prev) {
				if (prev.nodeType === 1) {
					siblings.push(prev);
					prev = prev.previousElementSibling;
				}
			}
			siblings.reverse();

			var next = el.nextElementSibling
			while (next) {
				if (next.nodeType === 1) {
					siblings.push(next);
					next = next.nextElementSibling;
				}
			}

			return new Converter(unique(siblings));
		},

		eq: function (index) {
			index = parseInt(index);
			if ( isNaN(index) ) return this;
			var len = this.length;
			if ( index > (len - 1) ) {
				return new Converter([]);
			} else if ( index < 0 ) {
				var i = this.length + index;
				if ( i < 0 ) return new Converter([]);
				return $(this[i]);
			}
			return $(this[index]);
		},

		width: function () {
			if ( !this[0] ) return 0;
			var el = this[0];
			if ( el.style.display !== 'none' && win.getComputedStyle(el, null)['display'] !== 'none' ) {
				if ( parseFloat(el.style.width) > 0 ) {
					return parseFloat(el.style.width);
				}
				if ( parseFloat(win.getComputedStyle(el, null)['width']) > 0 ) {
					return parseFloat(win.getComputedStyle(el, null)['width']);
				}
				if ( el.offsetWidth > 0 ) {
					var borderLeft = parseFloat(win.getComputedStyle(el, null)['border-left']);
					var borderRight = parseFloat(win.getComputedStyle(el, null)['border-right']);
					var paddingLeft = parseFloat(win.getComputedStyle(el, null)['padding-left']);
					var paddingRight = parseFloat(win.getComputedStyle(el, null)['padding-right']);
	
					return el.offsetWidth - (borderLeft + borderRight + paddingLeft + paddingRight);
				}

				return 0;
			} else {
				var cacheDisplay = el.style.display;
				el.style.display = 'inline-block !important';
				var width = $(el).width();
				el.style.display = cacheDisplay;
				return width;
			}
		},

		height: function () {
			if ( !this[0] ) return 0;
			var el = this[0];
			if ( el.style.display !== 'none' && win.getComputedStyle(el, null)['display'] !== 'none' ) {
				if ( parseFloat(el.style.height) > 0 ) {
					return parseFloat(el.style.height);
				}
				if ( parseFloat(win.getComputedStyle(el, null)['height']) > 0 ) {
					return parseFloat(win.getComputedStyle(el, null)['height']) > 0;
				}
				if ( el.offsetHeight > 0 ) {
					var borderTop = parseFloat(win.getComputedStyle(el, null)['border-top']);
					var borderBottom = parseFloat(win.getComputedStyle(el, null)['border-bottom']);
					var paddingTop = parseFloat(win.getComputedStyle(el, null)['padding-top']);
					var paddingBottom = parseFloat(win.getComputedStyle(el, null)['padding-bottom']);

					return el.offsetHeight - (borderTop + borderBottom + paddingTop + paddingBottom);
				}
			} else {
				var cacheDisplay = el.style.display;
				el.style.display = 'inline-block';
				var height = $(el).height();
				el.style.display = cacheDisplay;
				return height;
			}
		},

		empty: function () {
			for ( var i = 0; i < this.length; i++ ) {
				this[i].innerHTML = "";
			}
		},

		each: function (callback) {
			if ( typeof callback !== 'function' ) throw new Error('input is not a function!');

			var i = 0;
			for ( i = 0; i < this.length; i++ ) {
				if ( callback(i, this[i], this) === false ) {
					return this;
				}
			}
			return this;
		},

		parent: function () {
			if ( this[0] ) return new Converter(this[0].parentNode);
			return undefined;
		},

		parents: function (selector) {
			var parents = [];
			var parent = this[0].parentNode;
			if ( parent ) {
				while ( parent ) {
					if ( selector ) {
						if ( $(parent).is(selector) ) parents.push(parent);
					} else {
						parents.push(parent);
					}
					parent = parent.parentNode;
				}
			}
			return new Converter(unique(parents));
		},

		on: function () {

			var eventType = arguments[0];
			var selector = arguments[1];
			var callback = arguments[2];
			var capture = arguments[3];
			if ( isFunction(selector) ) {
				capture = callback;
				callback = selector;
				selector = undefined;
			}

			capture = capture || false;

			var i = 0, len = this.length, j = 0;
			for( i = 0; i < len; i++ ) {
				var el = this[i];
				var events = eventType.split(' ');
				events.forEach(function(event) {
					el.addEventListener(event, function (e) {
						if ( selector ) {
							var target = e.target;
							if ( !target ) { return; }
							if ( $(target).is(selector) ) {
								callback.call(target, e);
							} else {
								var parents = $(target).parents();
								for ( j = 0; j < parents.length; j ++ ) {
									if ( $(parents[j]).is(selector) ) {
										callback.callback(parents[j], e);
									}
								}
							}
						} else {
							callback(e);
						}
					}, capture);
				});
			}

			return this;
		},

		find: function (selector) {

			var els = [];
			for ( var i = 0; i < this.length; i++ ) {
				var found = this[i].querySelectorAll('selector');
				for ( var j = 0; j < found.length; j++ ) {
					els.push(found[j]);
				}
			}

			return new Converter(unique(els));
		},

		is: function (selector) {
			var el = this[0], sel, i = 0;
			if ( isString(selector) ) {
				if ( el.matches ) return el.matches(selector);
				if ( el.webkitMatchesSelector ) return el.webkitMatchesSelector(selector);
				if ( el.msMatchesSelector ) return el.msMatchesSelector(selector);

				sel = $(selector);
				for( i = 0; i < sel.length; i++ ) {
					if ( el === sel[i] ) return true;
				}
				return false;
			} else if ( selector === doc ) {
				return el === doc;
			} else if ( selector === win ) {
				return el === win;
			} else if ( (selector instanceof NodeList) || (selector instanceof HTMLCollection) || selector.nodeType || isConverter(selector) ) {
				sel = selector.nodeType ? [selector] : selector;
				for ( i = 0; i < sel.length; i++ ) {
					if ( el === sel[i] ) return true;
				}
				return false;
			}

			return false;
		}
	}

	win.$ = $;
	
})(window, document)