(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ScrollNavigationView = Backbone.View.extend({

    el: '#scrollNavigationView',

    events: {
      'click .m-scroll-navigation-item' : 'clickNavigation',
      'click .m-scroll-navigation-next' : 'clickNext',
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
      this.sectionsNames = _.map($('.m-section'), function(s){ return s.dataset.tooltip });
      this.sectionsLength = this.$sections.length;
      console.log(this.sectionsNames);
    },

    setListeners: function() {
      this.model.on('change:index', this.navigateTo.bind(this));
    },

    render: function() {
      this.$el.html(this.template({
        sections: this.sectionsNames
      }));      
    },

    clickNavigation: function(e) {
      e && e.preventDefault();
      var index = $(e.currentTarget).data('index');
      this.model.set('index',index);
    },

    clickNext: function(e) {
      e && e.preventDefault();
      var index = this.model.get('index');
      (index != this.sectionsLength - 1) ? this.model.set('index',++index) : null;
      
    },

    navigateTo: function() {
      this.$el.find('li').removeClass('-selected');
      this.$el.find('li[data-index='+this.model.get('index')+']').addClass('-selected');
    }

  });

})(this);
