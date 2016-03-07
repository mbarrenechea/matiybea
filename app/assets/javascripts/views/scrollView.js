(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollView = Backbone.View.extend({

    el: '#scrollView',

    model: new (Backbone.Model.extend({
      defaults: {
        index: 0
      } 
    })),

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.cache();
      this.setListeners();
    },

    cache: function() {
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;
    },

    setListeners: function() {
      this.$el.on('mousewheel', this.scrollIndex.bind(this));
      this.model.on('change:index', this.scrollTo.bind(this));
    },

    scrollIndex: function(e) {
      this.$el.off('mousewheel');
      var index = this.model.get('index');
      if (e.deltaY > 0) {
        (index == 0) ? index = 0 : index--;
      } else {
        (index == this.sectionsLength - 1) ? index = this.sectionsLength - 1 : index++;
      }

      if (index == this.model.get('index')) {
        this.$el.on('mousewheel', this.scrollIndex.bind(this));
      }
      this.model.set('index', index);
      console.log(e.deltaX, e.deltaY, e.deltaFactor);
    },

    scrollTo: function() {
      this.$el.transition({
        y: -100 * this.model.get('index') + '%'
      }, 500, function() {
        this.$el.on('mousewheel', this.scrollIndex.bind(this));
      }.bind(this));
    }

  });

})(this);
