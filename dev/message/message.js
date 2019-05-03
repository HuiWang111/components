!function (win, $, Util) {

  // tools
  var insertElementToBody = Util.insertElementToBody;
  var isFunction = Util.isFunction;
  var toSelector = Util.toSelector;

  //message
  var PreFix = 'my_';
  var TEXTCLASS = PreFix + 'message_text_box';
  var CONTAINERCLASS = PreFix + 'message_contaier';
  var ICONCLASS = PreFix + 'message_icon';
  var FirstMessagePosTop = 16; //第一个message元素的top值
  var GapOfMessage = 10; //多个message同时出现时，message之间的间隙

  /*
    {
      FirstMessagePosTop: Number,
      GapOfMessage: Number
    }
  */

  var Message = function(type, options) {

    this.GapOfMessage = options.GapOfMessage || GapOfMessage;
    this.FirstMessagePosTop = options.FirstMessagePosTop || FirstMessagePosTop;

    var icon = $.node('i', '', ICONCLASS + ' ' + PreFix + 'message_' + type + '_icon');
    var text = $.node('span', '', TEXTCLASS);
    var container = $.node('div', icon + text, CONTAINERCLASS);

    insertElementToBody($(container));

    var $message = $(toSelector(CONTAINERCLASS));
    this.$el = $message.eq($message.length - 1);
    this.$text = this.$el.find(toSelector(TEXTCLASS));
    
  }

  Message.prototype.show = function (content, duration, onClose) {
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
      index > 1 && $el.css({
        'top': FirstMessagePosTop + (index - 1)*elHeight + (index - 1)*GapOfMessage + 'px'
      });

      setTimeout(function () {
        message.hide(onClose);
      }, time * 1000);

    }, 0);
  }
  Message.prototype.hide = function (onClose) {
    var $el = this.$el;
    var $text = this.$text;
    
    var index = warningList.indexOf(this) + 1;

    $el.removeClass('comedown');
    index > 1 && $el.css({
      'top': '-40px'
    });
    isFunction(onClose) && onClose();
    setTimeout(function () {
      $text.text('');
    }, 1000);
  }

  var message = {};
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

  win.message = message;

}(window, jQuery, Util)