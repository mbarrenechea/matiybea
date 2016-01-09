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
      this.cache();
    },

    cache: function() {
      this.$el.validate({
        submitHandler: function(form) {
          var url = $(form).attr('action');
          var params = $(form).serialize();
          console.log(url);
          console.log(params);
        }
      });
      this.$fieldGridItem = $('.field-grid-item');
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
