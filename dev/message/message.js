;!function (win, $, Util) {

  // tools
  var insertElementToBody = Util.insertElementToBody;
  var isFunction = Util.isFunction;
  var toSelector = Util.toSelector;
  var buildRandomString = Util.buildRandomString;
  var domAfterLoad = Util.domAfterLoad;

  // className
  var TEXTCLASS = 'message_text_box';
  var CONTAINERCLASS = 'message_contaier';
  var ICONCLASS = 'message_icon';

  // default
  var defaultOptions = {
    FirstMessagePosTop: 16, //第一个message元素的top值
    GapOfMessage: 10 //多个message同时出现时，message之间的间隙
  };

  /*
    options:
    {
      FirstMessagePosTop: Number,
      GapOfMessage: Number
    }
  */
  var Message = function(type) {

    this.GapOfMessage = defaultOptions.GapOfMessage;
    this.FirstMessagePosTop = defaultOptions.FirstMessagePosTop;

    this.type = type;

    //为每个Message实例的容器创建一个随机className
    var RANDOM_CLASS = buildRandomString();

    var icon = $.node('i', '', ICONCLASS.appendClass('message_' + type + '_icon'));
    var text = $.node('span', '', TEXTCLASS.appendClass('message_' + type + '_text_box'));
    var container = $.node('div', icon + text, CONTAINERCLASS.appendClass(RANDOM_CLASS).appendClass('message_' + type + '_container'));
    insertElementToBody($(container));
    
    var MESSAGE = this;
    domAfterLoad(toSelector(RANDOM_CLASS), function () {
      MESSAGE.$el = $(toSelector(RANDOM_CLASS));
      MESSAGE.$text = MESSAGE.$el.find(toSelector(TEXTCLASS));
    });
    
  };

  Message.prototype = {

    show: function(content, duration, onClose) {

      var $el = this.$el;
      var $text = this.$text;
      
      $el[0].style = "";

      var time;
      if (isFunction(duration)) { // 当第二个参数为函数时，将函数赋值给onClose, 显示时间使用默认
        onClose = duration; 
        time = 3;
      } else {
        duration = parseFloat(duration);
        time = isNaN(duration) ? 3 : duration; // 默认显示3秒后隐藏
      }

      var elHeight = $el.outerHeight();

      var message = this;
      var FirstMessagePosTop = this.FirstMessagePosTop;
      var GapOfMessage = this.GapOfMessage;
      setTimeout(function () {

        $text.text(content);
        $el.addClass('comedown');

        var index = messageList.indexOf(message);
        $el.css({
          'top': FirstMessagePosTop + index*elHeight + index*GapOfMessage + 'px' // 计算当前实例top值
        });

        setTimeout(function () {
          message.hide(onClose);
        }, time * 1000);

      }, 0);

    },

    hide: function (onClose) {

      var $el = this.$el;
      var $text = this.$text;

      var index = messageList.indexOf(this);
      messageList.splice(index, 1);

      ($el[0].style.top !== '') && ($el[0].style.top = '');
      $el.removeClass('comedown');
      isFunction(onClose) && onClose();
      setTimeout(function () {
        $text.text('');
      }, 1000);

    }

  };

  var message = {};
  message.setting = function (options) {
    Object.assign(defaultOptions, options);
  };

  var messageList = [];
  var warningList = [];
  message.warning = function (content, duration, onClose) {
    //获取页面中隐藏的warning提示框
    var hiddenWarning = warningList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });
    
    //有隐藏的提示框就直接用该实例，否则创建新实例
    if (hiddenWarning.length > 0) {
      messageList.push(hiddenWarning[0]);
      hiddenWarning[0].show(content, duration, onClose);
    } else {
      var warning = new Message('warning');
      messageList.push(warning);
      warning.show(content, duration, onClose);
      warningList.push(warning);
    }

  };

  var successList = [];
  message.success = function (content, duration, onClose) {

    var hiddenSuccess = successList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenSuccess.length > 0) {
      messageList.push(hiddenSuccess[0]);
      hiddenSuccess[0].show(content, duration, onClose);
    } else {
      var success = new Message('success');
      messageList.push(success);
      success.show(content, duration, onClose);
      successList.push(success);
    }

  };

  var errorList = [];
  message.error = function (content, duration, onClose) {
    
    var hiddenError = errorList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenError.length > 0) {
      messageList.push(hiddenError[0]);
      hiddenError[0].show(content, duration, onClose);
    } else {
      var error = new Message('error');
      messageList.push(error);
      error.show(content, duration, onClose);
      errorList.push(error);
    }

  };

  var infoList = [];
  message.info = function (content, duration, onClose) {

    var hiddenInfo = infoList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenInfo.length > 0) {
      messageList.push(hiddenInfo[0]);
      hiddenInfo[0].show(content, duration, onClose);
    } else {
      var info = new Message('info');
      messageList.push(info);
      info.show(content, duration, onClose);
      infoList.push(info);
    }

  };

  win.message = message;

}(window, jQuery, Util)