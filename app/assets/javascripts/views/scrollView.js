(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollView = Backbone.View.extend({

    el: '#scrollView',

    template: HandlebarsTemplates['enquireTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model = settings.model;
      this.cache();
      this.setListeners();
      this.initIndex();
      this.sectionIndex();
    },

    cache: function() {
      this.$htmlbody = $('html,body');
      // Sections
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;
    },

    setListeners: function() {
      if (!utilsHelper.isSmallScreen()) {
        // Navigation with scroll & keyboard
        this.wheel = new WheelIndicator({
          elem: document.querySelector('#scrollView'),
          callback: this.scrollIndex.bind(this)
        });
        $(document).on('keyup.scroll', this.keyIndex.bind(this));



        this.model.on('change:index', this.scrollTo.bind(this));
        this.model.on('change:index', this.sectionIndex.bind(this));
      }
    },

    // SECTIONS SCROLL
    initIndex: function() {
      // scroll
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

    sectionIndex: function() {
      var index = this.model.get('index');
      var $section = this.$sections.eq(index);

      this.$sections.removeClass('-selected');
      $section.addClass('-selected');
    },

    scrollIndex: function(e) {
      if (!this.model.get('is_moving')) {
        this.model.set('is_moving', true);
        switch(e.direction) {
          case 'up':
            this.prev()
          break;

          case 'down':
            this.next();
          break;
        }
      }
    },

    keyIndex: function(e) {
      e && e.preventDefault();
      if (!this.model.get('is_moving')) {
        switch(e.keyCode) {
          case 38:
            this.model.set('is_moving', true);
            this.prev()
          break;

          case 40:
            this.model.set('is_moving', true);
            this.next();
          break;
        }
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
    },

    next: function() {
      var index = this.model.get('index');
      if (index == this.sectionsLength - 1) {
        index = this.sectionsLength - 1
        this.model.set('is_moving', false);
      } else {
        index++
      }
      this.model.set('index', index);
    },

    prev: function() {
      var index = this.model.get('index');
      if (index == 0) {
        index = 0;
        this.model.set('is_moving', false);
      } else {
        index--
      }
      this.model.set('index', index);      
    }

  });

})(this);
