;!function (win, $, Swiper, Util) {  
  
  // tools
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
  var domAfterLoad = Util.domAfterLoad;

  // className
  var GALLERY_BUTTON_NEXT_CLASS = 'gallery-swiper-button-next';
  var GALLERY_BUTTON_PREV_CLASS = 'gallery-swiper-button-prev';
  var GALLERY_PAGINATION_CLASS = 'gallery-swiper-pagination';
  var GALLERY_SWIPER_CONTAINER_CLASS = 'gallery-swiper-container';
  var GALLERY_WRAPPER_CLASS = 'gallery-wrapper';
  var GALLERY_CONTAINER_CLASS = 'gallery-contaier';
  var GALLERY_CONTAINER_CLASS_HIDDEN = 'gallery-contaier-invisible';

  /*
    options:
    {
      navgation: true | false, // 是否需要导航箭头
      pagination: true | false, // 是否需要分页器
      width: String | Number, // 百分比或者px, 移动端宽高通常使用默认的100%
      height: String | number,
      bgColor: String,
      useStyle: true | false,
      swiperOptions: {}
    }
  */
  function Gallery(selector, options) {

    // default
    var defaultOptions = {
      navgation: false,
      pagination: true,
      width: '100%',
      height: '100%',
      bgColor: 'transparent',
      useStyle: false,
      swiperOptions: {}
    };

    Object.assign(defaultOptions, options);

    if ( (defaultOptions.width === '100%') && defaultOptions.navgation ) defaultOptions.navgation = false; // 宽度100%时不使用导航箭头

    if (defaultOptions.useStyle) {
      appendStyle({"html, body":{"height":"100%"},".gallery-contaier":{"width":"100%","height":"100%","position":"fixed","left":0,"top":0,},".gallery-contaier.gallery-contaier-invisible":{"display":"none"},".gallery-contaier .gallery-wrapper":{"position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)","z-index":1},".gallery-contaier .gallery-wrapper .gallery-swiper-container":{"width":"100%","height":"100%","margin":"0 auto"},".gallery-contaier .gallery-swiper-container .swiper-slide":{"position":"relative"},".gallery-contaier .gallery-swiper-container .swiper-slide img":{"width":"100%","position":"absolute","left":"50%","top":"50%","transform":"translate(-50%, -50%)"},".swiper-pagination-bullet-active":{"background-color":"#fff"},".swiper-button-next":{"right":0},".swiper-button-prev":{"left":0}});
    }

    // $source = $(selector);
    this.$source = $(selector);

    // 为每个实例容器创建一个随机className
    var RANDOM_CLASS = buildRandomString();
    this.randomClassName = RANDOM_CLASS;

    // 获取当前页面最大的z-index值
    var $hasZIndex = $('*').filter(function (_, item) {
      return isNumber($(item).css('z-index')) && parseInt($(item).css('z-index')) > 0;
    });
    var maxZIndex = $hasZIndex.length === 0 ? null : Array.from($hasZIndex).reduce(function (prev, item) {
      var zIndex = parseFloat($(item).css('z-index'));
      return zIndex > prev ? zIndex : prev;
    }, -1000000);

    // srcList
    var srcList = this.createSrcList();

    // 创建html元素，并合并到body下
    var pagination = defaultOptions.pagination;
    var navgation = defaultOptions.navgation;
    this.createDom(srcList, pagination, navgation);

    // 处理swiper配置
    swiperOptions = defaultOptions.swiperOptions;
    this.swiperOptionsHandler(swiperOptions, pagination, navgation);

    var GALLERY = this;
    domAfterLoad(toSelector(RANDOM_CLASS), function () { // 判断元素是否挂载完成
      // gallery实例容器
      GALLERY.$container = $(toSelector(RANDOM_CLASS));

      // 初始化样式
      var width = defaultOptions.width, height = defaultOptions.height;
      var bgColor = defaultOptions.bgColor;
      GALLERY.setStyle(maxZIndex, width, height, bgColor, navgation);

      GALLERY.bindEvent(swiperOptions);

    });

  }

  win.Gallery = Gallery;

  Gallery.prototype = {

    createSrcList: function () {

      var eleList = Array.from(this.$source);

      //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
      eleList = eleList.filter(function (item) {
        var isImg = isImgEl(item);
        var $img = !isImg ? $(item).find('img') : null;
        return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
      });

      //生成img元素的src列表
      var srcList  = eleList.map(function (item) {
        return item.src || $(item).find('img')[0].src;
      });
  
      return srcList;
    },

    createDom: function (srcList, pagination, navgation) {

      var RANDOM_CLASS = this.randomClassName;
      
      var slideList = srcList.map(function (src) {
        return $.node('div', '<img src="' + src + '" />', 'swiper-slide');
      });
  
      var swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
  
      if (pagination) {
        swiperWrapper += $.node('div', '', GALLERY_PAGINATION_CLASS.appendClass('swiper-pagination'));
      }
  
      var swiperContainer = $.node('div', swiperWrapper, GALLERY_SWIPER_CONTAINER_CLASS.appendClass('swiper-container'));
  
      if (navgation) {
        swiperContainer += $.node('div', '', GALLERY_BUTTON_PREV_CLASS.appendClass('swiper-button-prev')) + $.node('div', '', GALLERY_BUTTON_NEXT_CLASS.appendClass('swiper-button-next'));
      }
  
      var galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
  
      var galleryContainer = $.node('section', galleryWrappper, GALLERY_CONTAINER_CLASS.appendClass(GALLERY_CONTAINER_CLASS_HIDDEN).appendClass(RANDOM_CLASS));
  
      // 将gallery容器添加到body
      var $gallery = $(galleryContainer);
      insertElementToBody($gallery);
  
    },

    swiperOptionsHandler: function (swiperOptions, pagination, navgation) {

      var RANDOM_CLASS = this.randomClassName;
  
      if (swiperOptions.pagination) delete swiperOptions.pagination;
      if (swiperOptions.nextButton) delete swiperOptions.nextButton;
      if (swiperOptions.prevButton) delete swiperOptions.prevButton;
  
      if (pagination) swiperOptions.pagination = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_PAGINATION_CLASS));
      if (navgation) {
        swiperOptions.nextButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_NEXT_CLASS));
        swiperOptions.prevButton = toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_BUTTON_PREV_CLASS));
      }
      swiperOptions.observer = true;
      swiperOptions.observeParents = true;
  
    },

    setStyle: function (maxZIndex, width, height, bgColor, navgation) {

      var $container = this.$container;
      // 设置gallery元素的z-index为当前页面z-index最大值+1
      $container.css({
        'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
      });
  
      // 设置swiper容器宽高
      var containerWidth = $container.width();
      var percentReg = /%$/;
      var widthValue = percentReg.test(width) ? containerWidth*(parseFloat(width)/100) : parseFloat(width);
      
      if (widthValue > containerWidth) {
        width = '100%';
        widthValue = containerWidth;
      }
      var diff = containerWidth - widthValue;
      var wider = diff > 0 ? (diff > 100 ? 100 : wider) : 0;
      
      width = isTrueNumber(width) ? width + 'px' : width;
      height =  isTrueNumber(height) ? height + 'px' : height;
  
      var $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
      $galleryWrapper.css({
        'width': navgation ? (percentReg.test(width) ? (widthValue + wider) + 'px' : (parseFloat(width) + wider) + 'px') : width,
        'height': height
      });
      $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
        'width': width,
        'height': height
      });
  
      // 设置gallery容器宽高，默认透明背景
      $container.css({
        'background-color': bgColor
      });
  
    },

    bindEvent: function (swiperOptions) {
      var $container = this.$container;
      var RANDOM_CLASS = this.randomClassName;
  
      // 点击初始化gallery swiper
      var GALLERY = this;
      GALLERY.$swiper = null;
      var $source = this.$source;
      $source.on('click', function () {
        var target = this;
        var index = Array.from($source).indexOf(target);
  
        if (!GALLERY.$swiper) {
          (index > 0) && (swiperOptions.initialSlide = index);
          GALLERY.$swiper = new Swiper(toSelector(RANDOM_CLASS).appendClass(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperOptions);
        } else {
          GALLERY.$swiper.slideTo(index, 0, false);
        }
  
        $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      });
  
      // 隐藏gallery容器
      var close = function () {
        $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      }
      $container.on('click', close);
  
      var stopPropagation = function (e) {
        e.stopPropagation();
      }
      $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
  
    }

  };

}(window, jQuery, Swiper, Util);