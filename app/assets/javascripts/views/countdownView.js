(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.CountdownView = Backbone.View.extend({

    el: '#countdownView',

    template: HandlebarsTemplates['countdownTpl'],

    numbers: [0,1,2,3,4,5,6,7,8,9],

    endDate: new Date(2016, 9, 29, 17, 0, 0, 0),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.render();
    },

    render: function() {
      this.$el.html(this.template({
        numbers: this.numbers
      }));
      this.cacheVars();
      this.initCountdown();
    },

    cacheVars: function() {
      this.$countdownDays    = this.$el.find('.m-countdown-days');
      this.$countdownHours   = this.$el.find('.m-countdown-hours');
      this.$countdownMinutes = this.$el.find('.m-countdown-minutes');
      this.$countdownSeconds = this.$el.find('.m-countdown-seconds');
      this.$countdownBox     = this.$el.find('.m-countdown-numberbox');
    },

    // Countdown
    initCountdown: function() {
      this.interval = setInterval(_.bind(this.intervalCountdown, this), 1000);
    },

    intervalCountdown: function() {
      var now = new Date();
      var difference = this.endDate.getTime() - now.getTime();
      if (difference > 0) {
        // Get time
        var seconds = difference / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;

        // Set time
        this.setCountdown('days', days);
        this.setCountdown('hours', hours % 24);
        this.setCountdown('minutes', minutes % 60);
        this.setCountdown('seconds', seconds % 60);
        this.setCountdownPositions();
      } else {
        clearInterval(this.interval);
        console.log('¡¡ya nos hemos casado!!');
      }
    },

    setCountdown: function(type,value) {
      var value = (value < 10) ? '0' + parseInt(value) : String(parseInt(value));
      switch(type) {
        case 'days':
          value = (value < 100) ? '0' + value : value;
          this.$countdownDays.data('value', value);
        break;
        case 'hours':
          this.$countdownHours.data('value', value);
        break;
        case 'minutes':
          this.$countdownMinutes.data('value', value);
        break;
        case 'seconds':
          this.$countdownSeconds.data('value', value);
        break;
      }
    },

    setCountdownPositions: function() {
      _.each(this.$countdownBox, _.bind(function(el){
        var arr = $(el).data('value').split('');
        _.each(arr, function(v,k) {
          $(el).find('.m-countdown-number').eq(k).children('ul').css({'transform': 'translate(0,'+(-v * 10) + '%'+')'})
        })
      }, this ));
    }




  });

})(this);
