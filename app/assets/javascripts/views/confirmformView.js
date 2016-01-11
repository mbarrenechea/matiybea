(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ConfirmformView = Backbone.View.extend({

    el: '#new_confirm',

    events: {
      'change .toggle-checkbox' : 'toggleCheckboxField'
    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.validate();
      this.cache();
    },

    cache: function() {
      this.$fieldGridItem = $('.field-grid-item');
    },

    validate: function() {
      this.$el.validate({
        submitHandler: function(form) {
          var url = $(form).attr('action');
          var data = this.setParams(form);
          console.log(data);

          $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: this.success.bind(this),
            dataType: 'json'
          });

        }.bind(this)
      });
    },

    success: function(data) {
      console.log(data);
    },

    setParams: function(form) {
      var params = this.getParams(form);

      // set childs
      params['confirm[childs]'] = (!!params['children[]'].length) ? params['children[]'] : [];

      return params;
    },

    getParams: function(form) {
      var paramObj = {};
      $.each($(form).serializeArray(), function(_, kv) {
        if (paramObj.hasOwnProperty(kv.name)) {
          paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
          paramObj[kv.name].push(kv.value);
        }
        else {
          paramObj[kv.name] = kv.value;
        }
      });
      return paramObj;
    },

    toggleCheckboxField: function(e) {
      var $toggle = $(e.currentTarget).parents('.field-grid-item').find('.-toggle');
      var $input = $toggle.find('textarea, input');
      var checked = $(e.currentTarget).is(':checked');

      $toggle.toggleClass('-hidden',!checked);
      $input.attr('required', checked);
    },

  });

})(this);
