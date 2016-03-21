(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.EnquireView = Backbone.View.extend({

    el: '#enquireView',

    events: {
      'click .js-click-index' : 'clickIndex',
    },

    template: HandlebarsTemplates['enquireTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model = settings.model;
      this.collection = settings.collection;

      this.collection.fetch().done(function(){
        this.render();
      }.bind(this))
    },

    render: function() {
      this.$el.html(this.template({
        questions: this.collection.toJSON()
      }))

      this.cache();
      this.setListeners();
      this.sectionIndex();

    },

    cache: function() {
      this.$htmlbody = $('html,body');
      // Sections
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;
    },

    setListeners: function() {
      this.model.on('change:index', this.scrollTo.bind(this));
      this.model.on('change:index', this.sectionIndex.bind(this));
    },

    sectionIndex: function() {
      var index = this.model.get('index');
      var $section = this.$sections.eq(index);

      this.$sections.removeClass('-selected');
      $section.addClass('-selected');
    },

    clickIndex: function(e) {
      e && e.preventDefault();
      if (!this.model.get('is_moving')) {
        this.model.set('is_moving', true);
        switch(e.currentTarget.dataset.direction) {
          case 'prev':
            this.prev()
          break;

          case 'next':
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
