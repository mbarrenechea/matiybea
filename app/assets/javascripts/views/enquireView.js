(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.EnquireView = Backbone.View.extend({

    el: '#enquireView',

    template: HandlebarsTemplates['enquireTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.cacheVars();
    },

    cacheVars: function() {
      this.$countdownDays    = this.$el.find('.m-countdown-days');
      this.$countdownHours   = this.$el.find('.m-countdown-hours');
      this.$countdownMinutes = this.$el.find('.m-countdown-minutes');
      this.$countdownSeconds = this.$el.find('.m-countdown-seconds');
      this.$countdownBox     = this.$el.find('.m-countdown-numberbox');
    }

  });

})(this);
