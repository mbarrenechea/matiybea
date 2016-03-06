(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.MenuView = Backbone.View.extend({

    el: '#menuView',

    events: {
      'click .m-header-btn-menu' : 'openMenu',
      'click .m-header-btn-close' : 'closeMenu',
    },

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.cache();
    },

    cache: function() {
      this.$btnClose = this.$el.find('.m-header-btn-close');
      this.$btnMenu = this.$el.find('.m-header-btn-menu');
      this.$nav = this.$el.find('.m-header-nav');
    },

    openMenu: function(e) {
      e && e.preventDefault();
      this.$nav.addClass('-active');
    },

    closeMenu: function(e) {
      e && e.preventDefault();
      this.$nav.removeClass('-active');
    }


  });

})(this);
