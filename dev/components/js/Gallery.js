;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.Gallery = factory(global);
}(this, function (global) {
  const { 
    Swiper, Component, jQuery: $,
    util: { 
      isNumber, toSelector, tagOf, extend, toArray, toNumber, appendClass, getRandomClassName,
      propsChecker
    },
    ClassName: {
      GALLERY_BUTTON_NEXT_CLASS, GALLERY_BUTTON_PREV_CLASS, GALLERY_PAGINATION_CLASS, GALLERY_SWIPER_CONTAINER_CLASS,
      GALLERY_WRAPPER_CLASS, GALLERY_CONTAINER_CLASS, GALLERY_CONTAINER_CLASS_HIDDEN
    }
  } = global,
  
  isImgEl = function (el) {
    return tagOf(el) === 'img';
  };

  /**
   *  @param props: {
   *    navgation: true | false, // 是否需要导航箭头
   *    pagination: true | false, // 是否需要分页器
   *    width: String | Number, // 百分比或者px, 移动端宽高通常使用默认的100%
   *    height: String | Number,
   *    bgColor: String,
   *    swiperProps: {}
   *  }
   */
  function Gallery(selector, props) {
    // propsChecker()

    // default
    const defaultProps = {
      navgation: false,
      pagination: true,
      width: '100%',
      height: '100%',
      bgColor: 'transparent',
      swiperProps: {}
    };

    const opts = extend({}, defaultProps, props);
    if ( (opts.width === '100%') && opts.navgation ) {
      opts.navgation = false; // 宽度100%时不使用导航箭头
    }

    this.props = opts;
    this.$source = $(selector);

    // 为每个实例容器创建一个随机className
    const RANDOM_CLASS = getRandomClassName();
    this.RANDOM_CLASS = RANDOM_CLASS;

    this.super();

  };

  $.inherit(Component, Gallery);

  extend(Gallery.prototype, {
    componentWillMount () {
      // handle swiper props
      this.swiperPropsHandler();
    },

    render: function () {
      const srcList = this.createSrcList();
      const { RANDOM_CLASS, props: { pagination, navgation } } = this;
      
      const slideList = srcList.map(function (src) {
        const img = $.closingNode('img', null, { src });
        return $.node('div', img, 'swiper-slide', );
      });
  
      let swiperWrapper = $.node('div', slideList, 'swiper-wrapper');
      if (pagination) {
        swiperWrapper += $.node('div', '', appendClass(GALLERY_PAGINATION_CLASS, 'swiper-pagination'));
      }
  
      let swiperContainer = $.node('div', swiperWrapper, appendClass(GALLERY_SWIPER_CONTAINER_CLASS, 'swiper-container'));
      if (navgation) {
        const prevBtn = $.node('div', '', appendClass(GALLERY_BUTTON_PREV_CLASS, 'swiper-button-prev'));
        const nextBtn = $.node('div', '', appendClass(GALLERY_BUTTON_NEXT_CLASS, 'swiper-button-next'));
        swiperContainer += (prevBtn + nextBtn);
      }
  
      const galleryWrappper = $.node('div', swiperContainer, GALLERY_WRAPPER_CLASS);
  
      const galleryContainer = $.node('section', galleryWrappper, appendClass(
        GALLERY_CONTAINER_CLASS,
        GALLERY_CONTAINER_CLASS_HIDDEN, RANDOM_CLASS
      ));
      
      return [{
        html: galleryContainer,
        container: 'body'
      }];
    },

    componentDidMount () {
      this.$container = $(toSelector(this.RANDOM_CLASS));
    },

    style: function () {
      const maxZIndex = this.getMaxZIndex();
      let { width, height, bgColor, navgation } = this.props;
      const $container = this.$container;

      // 设置gallery元素的z-index为当前页面z-index最大值+1
      $container.css({
        'z-index': maxZIndex === null ? 'auto' : maxZIndex + 1
      });
  
      // 设置swiper容器宽高
      const containerWidth = $container.width();
      const percentReg = /%$/;
      let widthValue = percentReg.test(width) ? containerWidth*(parseFloat(width)/100) : parseFloat(width);
      
      if (widthValue > containerWidth) {
        width = '100%';
        widthValue = containerWidth;
      }
      const diff = containerWidth - widthValue;
      const wider = diff > 0 ? (diff > 100 ? 100 : wider) : 0;
      
      width = isNumber(width) ? `${width}px` : width;
      height =  isNumber(height) ? `${height}px` : height;
  
      const $galleryWrapper = $container.find(toSelector(GALLERY_WRAPPER_CLASS));
      $galleryWrapper.css({
        'width': navgation ? (percentReg.test(width) ? `${widthValue + wider}px` : `${parseFloat(width) + wider}px`) : width,
        'height': height
      });
      $galleryWrapper.find(toSelector(GALLERY_SWIPER_CONTAINER_CLASS)).css({
        'width': width,
        'height': height
      });
  
      // 设置gallery容器宽高，默认透明背景
      $container.css({
        backgroundColor: bgColor
      });
    },

    bindEvents () {
      const { RANDOM_CLASS, $container, $source, props: { swiperProps } } = this;
  
      // 点击初始化gallery swiper
      const GALLERY = this;
      GALLERY.$swiper = null;
      $source.on('click', function () {
        const target = this;
        const index = $source.indexOf(target);
  
        if (!GALLERY.$swiper) {
          (index > 0) && (swiperProps.initialSlide = index);
          GALLERY.$swiper = new Swiper(appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_SWIPER_CONTAINER_CLASS)), swiperProps);
        } else {
          GALLERY.$swiper.slideTo(index, 0, false);
        }
  
        $container.removeClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      });
  
      // 隐藏gallery容器
      const close = function () {
        $container.addClass(GALLERY_CONTAINER_CLASS_HIDDEN);
      }
      $container.on('click', close);
  
      const stopPropagation = function (e) {
        e.stopPropagation();
      }
      $container.find(toSelector(GALLERY_WRAPPER_CLASS)).on('click', stopPropagation);
    },

    createSrcList: function () {
      let eleList = toArray(this.$source);

      //获取【自身为img元素或者子元素中包含img元素, 并且img元素包含src props】的元素
      eleList = eleList.filter(function (item) {
        const isImg = isImgEl(item);
        const $img = !isImg ? $(item).find('img') : null;
        return (isImg && item.src) || ($img && $img.length > 0 && $img[0].src);
      });

      //生成img元素的src列表
      const srcList  = eleList.map(function (item) {
        return item.src || $(item).find('img')[0].src;
      });
  
      return srcList;
    },

    getMaxZIndex () {
      // 获取当前页面最大的z-index值
      const $hasZIndex = $('*').filter(function (_, item) {
        const zIndex = toNumber($(item).css('z-index'));
        return zIndex !== false && zIndex > 0;
      });
      const maxZIndex = $hasZIndex.length === 0 ? null : $hasZIndex.reduce(function (max, item) {
        const zIndex = parseFloat($(item).css('z-index'));
        return zIndex > max ? zIndex : max;
      }, -1000000);

      return maxZIndex;
    },

    swiperPropsHandler: function () {
      const { RANDOM_CLASS, props: { swiperProps, pagination, navgation } } = this;
  
      if (swiperProps.pagination) delete swiperProps.pagination;
      if (swiperProps.nextButton) delete swiperProps.nextButton;
      if (swiperProps.prevButton) delete swiperProps.prevButton;
  
      if (pagination) swiperProps.pagination = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_PAGINATION_CLASS));
      if (navgation) {
        swiperProps.nextButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_NEXT_CLASS));
        swiperProps.prevButton = appendClass(toSelector(RANDOM_CLASS), toSelector(GALLERY_BUTTON_PREV_CLASS));
      }

      swiperProps.observer = true;
      swiperProps.observeParents = true;

      this.props.swiperProps = swiperProps;
    }
  });

  return Gallery;
});