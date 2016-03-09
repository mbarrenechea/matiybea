(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollView = Backbone.View.extend({

    el: '#scrollView',

    model: new (Backbone.Model.extend({
      defaults: {
        index: 0,
        is_moving: false
      } 
    })),

    template: HandlebarsTemplates['scrollTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.cache();
      this.setListeners();
      this.initNavigation();
    },

    cache: function() {
      // Sections
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;

      // Navigation
      this.$scrollNavigation = $('#scrollNavigation');
    },

    setListeners: function() {
      
      this.wheel = new WheelIndicator({
        elem: document.querySelector('#scrollView'),
        callback: this.scrollIndex.bind(this)
      });      

      this.model.on('change:index', this.scrollTo.bind(this));
      this.model.on('change:index', this.navigateTo.bind(this));
    },

    // SECTIONS SCROLL
    scrollIndex: function(e) {
      if (!this.model.get('is_moving')) {
        this.model.set('is_moving', true);
        var index = this.model.get('index');
        switch(e.direction) {
          case 'up':
            if (index == 0) {
              index = 0;
              this.model.set('is_moving', false);
            } else {
              index--
            }
          break;

          case 'down':
            if (index == this.sectionsLength - 1) {
              index = this.sectionsLength - 1
              this.model.set('is_moving', false);
            } else {
              index++
            }
          break;
        }
        this.model.set('index', index);
      }
    },

    scrollTo: function() {
      this.$el.transition({
        y: -100 * this.model.get('index') + '%'
      }, 500, function(){
        this.model.set('is_moving', false);
      }.bind(this));
    },


    // NAVIGATION
    initNavigation: function() {
      this.$scrollNavigation.html(this.template({numbers: _.range(0, this.sectionsLength, 1) }));
      this.navigateTo();
    },

    navigateTo: function() {
      this.$scrollNavigation.find('li').removeClass('-selected');
      this.$scrollNavigation.find('li[data-index='+this.model.get('index')+']').addClass('-selected');
    }

  });

})(this);
