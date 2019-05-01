(function (win, $) {

	var emptyArray = [], doc = document, viewportHeight = doc.body.clientHeight, $body = $('body'),
		
		isBottom, //是否最后一页

		isTop, //是否是第一页

		isScrolling = false; //用于判断是否正在滚动

	$.prototype.toArray = function () {
		return emptyArray.slice.call(this);
	};
	$.prototype.translateY = function (value) {
		value = parseFloat(value);

		if (!isNaN(value)) {
			this.css({
				transform: 'translateY(' + value + 'px)'
			});

			return this;
		}
	}

	function overflowHidden() {
		$body.css({
			overflow: 'hidden'
		});
	}
	function overflowAuto() {
		$body.css({
			'overflow-y': 'auto',
			'overflow-x': 'hidden'
		});
	}
	function getHeight(els, isDebug) {
		var elsHeight = els.map(function (section) {
			return $(section).height();
		});
		if (isDebug) console.log('sections高度分别为：' + JSON.stringify(elsHeight));

		return elsHeight;
	}
	function setCanScroll(list, index) {
		list[index] = true;
	}
	function setCantScroll(list, index) {
		list[index] = false;
	}
	function computeShouldScrollDistance(sectionHeight, vpHeight) {
		if (vpHeight > sectionHeight) return;
		return sectionHeight  - vpHeight;
	}
	function scrollTop(value, callback) {
		value = parseFloat(value);

		if (doc.documentElement.scrollTop) {
			if (isNaN(value)) return doc.documentElement.scrollTop;

			doc.documentElement.scrollTop = value;
		} else {
			if (isNaN(value)) return doc.body.scrollTop;

			doc.body.scrollTop = value;
		}

		setTimeout(function () {
			if (typeof callback === 'function') {
				callback();
			}
		}, 0);
	}

	// swiper
	function YSwiper(selector, options) {

		overflowAuto();

		var cacheDistance = 0;

		var $el = $(selector);
		var sections = $el.find('section.section').toArray();
		var totalIndex = sections.length - 1;
		var sectionsHeight = getHeight(sections, options.isDebug);

		//判断每屏是否启用swiper，高度小于等于视口高度启用swiper滚动效果
		var sectionsCanScroll = sectionsHeight.map(function (height) {
			return height <= viewportHeight;
		});
		if (options.isDebug) console.log('sections是否可以滚动：' + sectionsCanScroll);
		var initSectionsCanScroll = sectionsCanScroll.slice(); //保存初始化值，sectionsCanScroll后续会变化，initSectionsCanScroll保持不变

		var initialSection = parseInt(options.initialSection);
		initialSection = isNaN(initialSection) ? 0 : initialSection;

		isTop = initialSection === 0 ? true : false;
		isBottom = initialSection === totalIndex ? true : false;
		
		//第一屏有滚动效果，设置body=>overflow:hidden
		if (sectionsCanScroll[initialSection]) {
			// overflowHidden();

			//重新计算高度
			sectionsHeight = getHeight(sections, options.isDebug);

			if (!isNaN(initialSection)) {
				var translateValue = sectionsHeight.filter(function (_, index) {
					return index < initialSection;
				}).reduce(function (prev, height) {
					return prev + height;
				}, 0);
				$el.addClass('no-animation'); //设置initialSection时去除动画效果，直接跳至该屏
				$el.translateY(-translateValue);
				cacheDistance += translateValue;
				setTimeout(function () {
					$el.removeClass('no-animation');
				}, 0);
			}
		}

		this.activeIndex = initialSection;
		this.sectionEl = sections[initialSection];

		var swiper = this;

		var scrollHandler = function (e) {
			
			var index = swiper.activeIndex;
			// var distance = initSectionsCanScroll[index] ? sectionsHeight[index] : viewportHeight;
			var distance = sectionsHeight[index];
			var canScroll = sectionsCanScroll[index];

			e = e || win.event;
			var value = e.wheelDelta || -e.deltaY || -e.detail;
			var delta = Math.max(-1, Math.min(1, value));

			if (canScroll) { //这一屏可以滚动
				// overflowHidden();
				e.preventDefault(); //阻止默认滚动

				function scrollDown () {

					if (index < totalIndex) {
						isScrolling = true;

						if (typeof options.onLeave === 'function') {
							( options.onLeave.bind(swiper) )(); //将函数的this指向绑定到swiper对象
						}

						$el.translateY(-(cacheDistance + distance));
						
						setTimeout(function () {
							cacheDistance += distance;

							if (isTop) isTop = false;
		
							swiper.activeIndex++;
							swiper.previousIndex = swiper.activeIndex - 1;
							swiper.sectionEl = sections[swiper.activeIndex];

							isScrolling = false;

							if (typeof options.afterLoad === 'function') {
								( options.afterLoad.bind(swiper) )();
							}

							// if (!initSectionsCanScroll[index-1]) {
							// 	scrollTop(0);
							// }
							
							if (!initSectionsCanScroll[index+1] && sectionsCanScroll[index+1]) setCantScroll(sectionsCanScroll, index+1); //初始时没有滚动效果，则还原canSroll
						}, 500);
					} else {
						if (options.isDebug) console.warn('最后一屏了！');
						isBottom = true;
						// overflowAuto();
					}

				}

				function scrollUp() {

					if (index > 0) {
						isScrolling = true;

						if (typeof options.onLeave === 'function') {
							( options.onLeave.bind(swiper) )()
						}

						var prevDistance = sectionsHeight[index - 1];
						$el.translateY(-(cacheDistance - prevDistance));
						
						setTimeout(function () {
							cacheDistance -= prevDistance;

							if (isBottom) isBottom = false;

							swiper.activeIndex--;
							swiper.previousIndex = swiper.activeIndex + 1;
							swiper.sectionEl = sections[swiper.activeIndex];

							isScrolling = false;

							if (typeof options.afterLoad === 'function') {
								( options.afterLoad.bind(swiper) )()
							}
						}, 500);

						if (!initSectionsCanScroll[index-1] && sectionsCanScroll[index-1]) setCantScroll(sectionsCanScroll, index-1);
					} else {
						if (options.isDebug) console.warn('第一屏了！');
						isTop = true;
					}

				}
				
				if (!isScrolling) {

					if (delta < 0) {
						//向下滚
						if (!isBottom) {
							scrollDown();
						}
						
					} else {
						
						//向上滚
						if (!isTop) {
							scrollUp();
						}

					}

					if (options.isDebug){
						if (!isBottom && !isTop) {
							console.log('本次滚动的方向：' + (delta < 0 ? 'down' : 'up'));
							console.log('本次滚动距离：' + distance);
						}
					}

				}

			} else {
				//这一屏没有滚动滚动效果
				// overflowAuto();
				
				var scrollTopValue = scrollTop();
				
				var shouldScrollTopValue = computeShouldScrollDistance(sectionsHeight[index], viewportHeight);
				
				
				if (delta < 0) {
					//向下滚
					
					if ( (scrollTopValue >= shouldScrollTopValue) && (index < totalIndex) ) {
						// if (options.isDebug) console.log('第' + index + '屏到底了！');

						scrollTop(shouldScrollTopValue, function () {
							
							setCanScroll(sectionsCanScroll, index);

						});
						
					}

				} else {
					//向上滚

					if ( (scrollTopValue === 0) && (index > 0) ) {
						setCanScroll(sectionsCanScroll, index);
					}

				}
				
				

				// function toDefault(event) {//可能被废弃
				// 	event.returnValue = true;
				// }
				// setTimeout(function () {
				// 	console.log('cancel');
				// 	doc.addEventListener("mousewheel", toDefault);
				// }, 3000);

			}
		}
		
		doc.addEventListener("mousewheel", scrollHandler, { passive: false });

	}

	win.YSwiper = YSwiper;

	/* =======

		Example:

		new YSwiper('#ygf-swiper', {
			isDebug: true, //调试模式
			initialSection: 1,
			onLeave: function () {
        console.log(this); //this => swiper instance
			},
			afterLoad: function () {
				console.log(this); //this => swiper instance
			}
		});

		Instance Properties:
			this.activeIndex
			this.previousIndex
			this.sectionEl
	
	===========*/

})(window, jQuery)