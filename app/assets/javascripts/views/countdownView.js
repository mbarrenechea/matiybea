(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.CountdownView = Backbone.View.extend({

    el: '#countdownView',

    template: HandlebarsTemplates['countdownTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.render();
      console.log('countdown');
    },

    render: function() {
      this.$el.html(this.template());
    }

  });

})(this);
