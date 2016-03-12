(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollNavigationView = Backbone.View.extend({

    el: '#scrollNavigationView',

    events: {
      'click .m-scroll-navigation-item' : 'clickNavigation'
    },

    template: HandlebarsTemplates['scrollNavigationTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);

      if (!utilsHelper.isSmallScreen()) {
        this.cache();
        this.render();
        this.navigateTo();
        this.setListeners();
      }
    },

    cache: function() {
      // Sections
      this.$sections = $('.m-section');
      this.sectionsLength = this.$sections.length;
    },

    setListeners: function() {
      this.model.on('change:index', this.navigateTo.bind(this));
    },

    render: function() {
      this.$el.html(this.template({
        numbers: _.range(0, this.sectionsLength, 1) 
      }));      
    },

    clickNavigation: function(e) {
      e && e.preventDefault();
      var index = $(e.currentTarget).data('index');
      this.model.set('index',index);
    },

    navigateTo: function() {
      this.$el.find('li').removeClass('-selected');
      this.$el.find('li[data-index='+this.model.get('index')+']').addClass('-selected');
    }

  });

})(this);
