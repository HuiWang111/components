!function (win, $, Swiper, Util) {  
  
  //tools
  function isImgEl(el) {
    if (typeof el.length !== 'undefined') {
      return el[0].tagName.toLowerCase() === 'img';
    }
    return el.tagName.toLowerCase() === 'img';
  }

  var insertElementToBody = Util.insertElementToBody;
  var toSelector = Util.toSelector;
  var isTrueNumber = Util.isTrueNumber;
  var isNumber = Util.isNumber;
  var appendStyle = Util.appendStyle;
  var buildRandomString = Util.buildRandomString;

  //className
  var GALLERY_BUTTON_NEXT_CLASS = 'gallery-swiper-button-next';
  var GALLERY_BUTTON_PREV_CLASS = 'gallery-swiper-button-prev';
  var GALLERY_PAGINATION_CLASS = 'gallery-swiper-pagination';
  var GALLERY_SWIPER_CONTAINER_CLASS = 'gallery-swiper-container';
  var GALLERY_WRAPPER_CLASS = 'gallery-wrapper';
  var GALLERY_CONTAINER_CLASS = 'gallery-contaier';
  var GALLERY_CONTAINER_CLASS_HIDDEN = 'gallery-contaier-invisible';

  /* 
    {
      navgation: true/false, //导航箭头
      pagination: true/false, // 分页器
      width: 'css value'/number,
      height: 'css value'/number,
      bgColor: '',
      useStyle: true/false,
      swiperOptions: {}
    }
  */
  function Gallery(selector, options) {

    if (options.useStyle) {
      appendStyle({"html, body":{"height":"100%"},".gallery-contaier":{"width":"100%","height":"100%","position":"fixed","left":0,"top":0,},".gallery-contaier.gallery-contaier-invisible":{"display":"none"},".gallery-contaier .gallery-wrapper":{"position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)","z-index":1},".gallery-contaier .gallery-wrapper .gallery-swiper-container":{"width":"100%","height":"100%","margin":"0 auto"},".gallery-contaier .gallery-swiper-container .swiper-slide":{"position":"relative"},".gallery-contaier .gallery-swiper-container .swiper-slide img":{"width":"100%","position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)"},".swiper-pagination-bullet-active":{"background-color":"#fff"},".swiper-button-next":{"right":0},".swiper-button-prev":{"left":0}});
    }

    var navgation = options.navgation;
    var pagination = options.pagination;

    $list = $(selector);
    this.$source = $list;

    //随机className
    var RANDOM_CLASS = buildRandomString();

    //z-index
    var $hasZIndex = $('*').filter(function (_, item) {
      return isNumber($(item).css('z-index')) && parseInt($(item).css('z-index')) > 0;
    });
    var maxZIndex = $hasZIndex.length === 0 ? null : Array.from($hasZIndex).reduce(function (prev, item) {
      var zIndex = parseFloat($(item).css('z-index'));
      return zIndex > prev ? zIndex : prev;
    }, -1000000);

    // 获取图片src
    var eleList = Array.from($list);
    eleList = eleList.filter(function (item) {
      var isImg = isImgEl(item);
      var $img = !isImg ? $(item).find('img') : null;
      return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
    });
    var srcList  = eleList.map(function (item) {
      return item.src || $(item).find('img')[0].src;
    });

    // 创建swiper元素
    var slideList = srcList.map(function (src) {
      return $.node('div', '<img src="' + src + '" />', 'swiper-slide');
    });

    var swiperWrapper = $.node('div', slideList.join(''), 'swiper-wrapper');

    if (pagination) {
      swiperWrapper += $.node('div', '', GALLERY_PAGINATION_CLASS.appendClass('swiper-pagination'));
    }

    var swiperContainer = $.node('div', swiperWrapper, GALLERY_SWIPER_CONTAINER_CLASS.appendClass('swiper-container'));

    if (navgation) {
      swiperContainer += $.node('div', '', GALLERY_BUTTON_PREV_CLASS.appendClass('swiper-button-prev')) + $.node('div', '', GALLERY_BUTTON_NEXT_CLASS.appendClass('swiper-button-next'));
    }

    var galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);

    var galleryContainer = $.node('section', galleryWrappper, GALLERY_CONTAINER_CLASS.appendClass(GALLERY_CONTAINER_CLASS_HIDDEN).appendClass(RANDOM_CLASS));

    // 将gallery元素添加到body
    var $gallery = $(galleryContainer);
    insertElementToBody($gallery);

    // 处理swiper 配置
    swiperOptions = options.swiperOptions;
    if (swiperOptions.pagination) delete swiperOptions.pagination;
    if (swiperOptions.nextButton) delete swiperOptions.nextButton;
    if (swiperOptions.prevButton) delete swiperOptions.prevButton;

    if (options.pagination) swiperOptions.pagination = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_PAGINATION_CLASS));
    if (options.navgation) {
      swiperOptions.nextButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_NEXT_CLASS));
      swiperOptions.prevButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_PREV_CLASS));
    }
    swiperOptions.observer = true;
    swiperOptions.observeParents = true;

    //style
    var $instance = $(toSelector(RANDOM_CLASS));
    //z-index
    $instance.css({
      'z-index': maxZIndex === null ? 'auto' : maxZIndex
    });

    var width = options.width, height = options.height;
    width = width ? ( isTrueNumber(width) ? width + 'px' : width) : '100%';
    height =  height ? ( isTrueNumber(height) ? height + 'px' : height ) : '100%';

    var $galleryWrapper = $instance.find(toSelector(GALLERY_WRAPPER_CLASS));
    $galleryWrapper.css({
      'width': navgation ? (parseFloat(width) + 100) + 'px' : width,
      'height': height
    });
    $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
      'width': width,
      'height': height
    });

    var bgColor = options.bgColor || 'opacity';
    $instance.css({
      'background-color': bgColor
    });

    //点击初始化gallery
    var gallerySwiper = {};
    $list.on('click', function () {
      var target = this;
      var index = Array.from($list).indexOf(target);

      if (!gallerySwiper[RANDOM_CLASS]) {
        (index > 0) && (swiperOptions.initialSlide = index);
        gallerySwiper[RANDOM_CLASS] = new Swiper(toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
      } else {
        gallerySwiper[RANDOM_CLASS].slideTo(index, 0, false);
      }

      $instance.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
    });

    var close = function () {
      $instance.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
    }
    $instance.on('click', close);
    $galleryWrapper.find('.gallery-swiper-container').on('click', close);

    var stopPropagation = function (e) {
      e.stopPropagation();
    }
    $galleryWrapper.on('click', stopPropagation);

  }

  win.Gallery = Gallery;

}(window, jQuery, Swiper, Util);