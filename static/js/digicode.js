iPadDigit = function(selector, api) {
  this.selector = $(selector).not('.no-action');
  this.api      = api;

  this.inputs   = [];

  this.timer    = null;

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
};

iPadDigit.prototype.correctInput = function() {
  this.inputs.pop();
  this.displayInputs();
};

iPadDigit.prototype.displayInputs = function() {
  var self = this;
  var displays = $("#digicode .password li");

  for(var i =0; i< this.passwordSize; i++) {
    displays.eq(i).text(self.inputs[i] || ' ');
  }
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
      digi  = new iPadDigit(this, api);
      digi.handleInputs();
    }
  });
})($);
