(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollView = Backbone.View.extend({

    el: '#scrollView',

    events: {
      'click .m-header-btn-menu' : 'clickNavigation'
    },

    template: HandlebarsTemplates['scrollTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model = settings.model;
      this.cache();
      this.setListeners();
      this.initIndex();
    },

    cache: function() {
      this.$htmlbody = $('html,body');
      // Sections
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;
    },

    setListeners: function() {
      if (!utilsHelper.isSmallScreen()) {
        this.wheel = new WheelIndicator({
          elem: document.querySelector('#scrollView'),
          callback: this.scrollIndex.bind(this)
        });

        this.model.on('change:index', this.scrollTo.bind(this));
      }
    },

    // SECTIONS SCROLL
    initIndex: function() {
      if (!utilsHelper.isSmallScreen()) {
        var index = this.$sections.index($('#section-'+this.options.route));
        if (index > 0) {
          this.model.set('index',index, {silent: true});
          this.$el.css({
            y: -100 * this.model.get('index') + '%'
          });
        }       
      } else {
        if (!!this.options.route) {
          this.$htmlbody.animate({
            scrollTop: $('#section-'+this.options.route).offset().top
          }, 500);        
        }       
      }
    },

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
      if (!utilsHelper.isSmallScreen()) {
        this.$el.transition({
          y: -100 * this.model.get('index') + '%'
        }, 500, function(){
          this.model.set('is_moving', false);
        }.bind(this));
      }
    }

  });

})(this);
