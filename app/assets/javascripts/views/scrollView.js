(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollView = Backbone.View.extend({

    el: 'body',

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.cache();
      this.setListeners();
    },

    cache: function() {
      this.$scrollView = $('#scrollView');
    },

    setListeners: function() {
      this.$el.on('mousewheel', function(e) {
        if (e.deltaY > 0) {
          this.$scrollView.css({
            transform: 'translate(0,-100%)'
          })
        } else {
          this.$scrollView.css({
            transform: 'translate(0,0%)'
          })
        }
        console.log(e.deltaX, e.deltaY, e.deltaFactor);
      }.bind(this));      
    }

  });

})(this);
