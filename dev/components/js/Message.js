;!function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
  ? module.exports = factory(global) : typeof define === 'function' && define.amd
  ? define([global], factory) : global.message = factory(global);
}(this, function (global) {
  const { 
    Component, jQuery: $,
    util: { 
      isFunction, toSelector, extend, SetMock, appendClass, getRandomClassName
    },
    ClassName: {
      MESSAGE_TEXTCLASS, MESSAGE_CONTAINERCLASS, MESSAGE_ICONCLASS
    }
  } = global,
  
  // default
  defaultMessageOptions = {
    FirstMessagePosTop: 16, //第一个message元素的top值
    GapOfMessage: 10 //多个message同时出现时，message之间的间隙
  };
  
  /**
   *  @param options: {
   *    FirstMessagePosTop: Number,
   *    GapOfMessage: Number
   *  }
   */
  function Message(type) {
    this.GapOfMessage = defaultMessageOptions.GapOfMessage;
    this.FirstMessagePosTop = defaultMessageOptions.FirstMessagePosTop;
    this.type = type;

    this.super();
  };

  $.inherit(Component, Message);

  extend(Message.prototype, {
    render () {
      const { type } = this;

      //为每个Message实例的容器创建一个随机className
      const RANDOM_CLASS = getRandomClassName();
      this.RANDOM_CLASS = RANDOM_CLASS;
      
      const classPrefix = `message_${type}_`;
      const text = $.node('span', '', appendClass(MESSAGE_TEXTCLASS, `${classPrefix}text_box`));
      const icon = new Icon(type === 'warning' ? 'warn' : type, {
        className: MESSAGE_ICONCLASS,
        theme: 'filled'
      }).html;
      const klass = appendClass(
        MESSAGE_CONTAINERCLASS,
        RANDOM_CLASS,
        `${classPrefix}container`
      );

      return [{
        html: $.node('div', icon + text, klass),
        container: 'body'
      }];
    },

    componentDidMount () {
      const { RANDOM_CLASS } = this;

      this.$el = $(toSelector(RANDOM_CLASS));
      this.$text = this.$el.find(toSelector(MESSAGE_TEXTCLASS));
    },

    show (content, duration, onClose) {
      const { $el, $text, FirstMessagePosTop, GapOfMessage } = this;
      
      $el[0].style = "";

      let time;
      if (isFunction(duration)) { // 当第二个参数为函数时，将函数赋值给onClose, 显示时间使用默认
        onClose = duration; 
        time = 3;
      } else {
        duration = parseFloat(duration);
        time = isNaN(duration) ? 3 : duration; // 默认显示3秒后隐藏
      }

      const elHeight = $el.outerHeight();
      
      setTimeout(() => {
        $text.text(content);
        $el.addClass('comedown');

        const index = messageList.indexOf(this);
        $el.css({
          top: `${FirstMessagePosTop + index*elHeight + index*GapOfMessage}px` // 计算当前实例top值
        });

        setTimeout(() => {
          this.hide(onClose);
        }, time * 1000);
      }, 0);
    },

    hide (onClose) {
      const { $el, $text } = this;
      
      messageList.delete(this);

      ($el[0].style.top !== '') && ($el[0].style.top = '');
      $el.removeClass('comedown');
      isFunction(onClose) && onClose();
      setTimeout(() => {
        $text.text('');
      }, 1000);
    }
  });

  const message = {};
  message.setting = function (options) {
    extend(defaultMessageOptions, options);
  };

  const messageList = new SetMock();
  const warningList = new SetMock();
  message.warning = function (content, duration, onClose) {
    //获取页面中隐藏的warning提示框
    const hiddenWarning = warningList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });
    
    //有隐藏的提示框就直接用该实例，否则创建新实例
    if (hiddenWarning.size > 0) {
      messageList.add(hiddenWarning[0]);
      hiddenWarning[0].show(content, duration, onClose);
    } else {
      const warning = new Message('warning');
      messageList.add(warning);
      warning.show(content, duration, onClose);
      warningList.add(warning);
    }
  };

  const successList = new SetMock();
  message.success = function (content, duration, onClose) {
    const hiddenSuccess = successList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenSuccess.size > 0) {
      messageList.add(hiddenSuccess[0]);
      hiddenSuccess[0].show(content, duration, onClose);
    } else {
      const success = new Message('success');
      messageList.add(success);
      success.show(content, duration, onClose);
      successList.add(success);
    }
  };

  const errorList = new SetMock();
  message.error = function (content, duration, onClose) {
    const hiddenError = errorList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenError.size > 0) {
      messageList.add(hiddenError[0]);
      hiddenError[0].show(content, duration, onClose);
    } else {
      const error = new Message('error');
      messageList.add(error);
      error.show(content, duration, onClose);
      errorList.add(error);
    }
  };

  const infoList = new SetMock();
  message.info = function (content, duration, onClose) {
    const hiddenInfo = infoList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenInfo.size > 0) {
      messageList.add(hiddenInfo[0]);
      hiddenInfo[0].show(content, duration, onClose);
    } else {
      const info = new Message('info');
      messageList.add(info);
      info.show(content, duration, onClose);
      infoList.add(info);
    }
  };

  return message;
});