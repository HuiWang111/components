!function (win, $, Util) {

  // tools
  var insertElementToBody = Util.insertElementToBody;
  var isFunction = Util.isFunction;
  var toSelector = Util.toSelector;
  var buildRandomString = Util.buildRandomString;
  var domAfterLoad = Util.domAfterLoad;

  //message
  var TEXTCLASS = 'message_text_box';
  var CONTAINERCLASS = 'message_contaier';
  var ICONCLASS = 'message_icon';
  var FirstMessagePosTop = 16; //第一个message元素的top值
  var GapOfMessage = 10; //多个message同时出现时，message之间的间隙

  /*
    options:
    {
      FirstMessagePosTop: Number,
      GapOfMessage: Number
    }
  */
  var Message = function(type) {

    var options = this.options || {};
    this.GapOfMessage = options.GapOfMessage || GapOfMessage;
    this.FirstMessagePosTop = options.FirstMessagePosTop || FirstMessagePosTop;

    //为每个实例的容器创建一个随机className
    var RANDOM_CLASS = buildRandomString();

    var icon = $.node('i', '', ICONCLASS + ' ' + 'message_' + type + '_icon');
    var text = $.node('span', '', TEXTCLASS);
    var container = $.node('div', icon + text, CONTAINERCLASS.appendClass(RANDOM_CLASS));
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

      var time;
      if (isFunction(duration)) {
        onClose = duration;
        time = 3;
      } else {
        duration = parseFloat(duration);
        time = isNaN(duration) ? 3 : duration;
      }

      var elHeight = $el.outerHeight();
      var index = messageList.indexOf(this) + 1;

      var message = this;
      var FirstMessagePosTop = this.FirstMessagePosTop;
      var GapOfMessage = this.GapOfMessage;
      setTimeout(function () {

        $text.text(content);
        $el.addClass('comedown');
        index > 1 && $el.css({ //comedown className已经包含了第一个Message的top值，所以第一个Message不需要额外设置top值
          'top': FirstMessagePosTop + (index - 1)*elHeight + (index - 1)*GapOfMessage + 'px'
        });

        setTimeout(function () {
          message.hide(onClose);
        }, time * 1000);

      }, 0);

    },

    hide: function (onClose) {

      var $el = this.$el;
      var $text = this.$text;
      
      var index = messageList.indexOf(this) + 1;

      $el.removeClass('comedown');
      index > 1 && $el.css({
        'top': '-40px'
      });
      isFunction(onClose) && onClose();
      setTimeout(function () {
        $text.text('');
      }, 1000);

    }

  };

  var message = {};
  message.setting = function (options) {
    Message.prototype.options = options;
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
      hiddenWarning[0].show(content, duration, onClose);
    } else {
      var warning = new Message('warning');
      warningList.push(warning);
      messageList.push(warning);
      warning.show(content, duration, onClose);
    }

  };

  var successList = [];
  message.success = function (content, duration, onClose) {

    var hiddenSuccess = successList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenSuccess.length > 0) {
      hiddenSuccess[0].show(content, duration, onClose);
    } else {
      var success = new Message('success');
      successList.push(success);
      messageList.push(success);
      success.show(content, duration, onClose);
    }

  };

  var errorList = [];
  message.error = function (content, duration, onClose) {
    
    var hiddenError = errorList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenError.length > 0) {
      hiddenError[0].show(content, duration, onClose);
    } else {
      var error = new Message('error');
      errorList.push(error);
      messageList.push(error);
      error.show(content, duration, onClose);
    }

  };

  var infoList = [];
  message.info = function (content, duration, onClose) {

    var hiddenInfo = infoList.filter(function (instance) {
      return !instance.$el.hasClass('comedown');
    });

    if (hiddenInfo.length > 0) {
      hiddenInfo[0].show(content, duration, onClose);
    } else {
      var info = new Message('info');
      infoList.push(info);
      messageList.push(info);
      info.show(content, duration, onClose);
    }

  };

  win.message = message;

}(window, jQuery, Util)