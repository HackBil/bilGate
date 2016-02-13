iPadDigit = function(selector, api, delay) {
  this.selector = $(selector).not('.no-action');
  this.api      = api;

  this.inputs   = [];

  this.timer    = null;
  this.delay    = delay;

  this.passwordSize = 5;
};

iPadDigit.prototype.handleInputs = function() {
  var self = this;

  this.selector.on('click tap', function() {
    var value = $(this).text();

    if (value === 'Annuler') {
      self.resetInput();
    }
    else if (value === 'Corriger') {
      self.correctInput();
    }
    else {
      self.inputs.push(value);
      self.displayInputs();

      self.createTimer();

      if (self.inputs.length === 5) {
        self.sendData();
        setTimeout(function() {
          self.resetInput();
        }, 500);
      }
    }
  });
};

iPadDigit.prototype.resetInput = function() {
  this.inputs = [];
  this.displayInputs();
  clearInterval(this.timer);
};

iPadDigit.prototype.correctInput = function() {
  this.inputs.pop();
  this.displayInputs();
  clearInterval(this.timer);
};

iPadDigit.prototype.displayInputs = function() {
  if (this.inputDisplay) {
    var self = this;
    var displays = $("#digicode .password li");

    for(var i =0; i< this.passwordSize; i++) {
      displays.eq(i).text(self.inputs[i] || ' ');
    }
  }
};

iPadDigit.prototype.createTimer = function(resetTimer) {
  var self = this;

  if (this.timer !== null) {
    clearInterval(this.timer);
  }

  this.timer = setInterval(function() {
    self.resetInput();
  }, this.delay);
};

iPadDigit.prototype.sendData = function() {
  var postData = {
    code: this.inputs.join('')
  };
  var jqXHR = $.post(this.api, postData)
  .done(function(response) {
    $('.alert-danger').hide();
    $('.alert-success').show();
  })
  .fail(function(response) {
    $('.alert-success').hide();
    $('.alert-danger').show();
  });
};

;(function($){
  $.extend($.fn, {
    digicode: function(opts) {
      api   = opts.api || '/';
      delay = opts.resetDelay * 1000 || 10000;
      digi  = new iPadDigit(this, api, delay);
      digi.handleInputs();
    }
  });
})($);
