(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.LocationsView = Backbone.View.extend({

    el: '#locationsView',

    events: {
      'change .category-radio' : 'changeCategories',
      'click #locationListView li' : 'renderLocation'
    },

    template: HandlebarsTemplates['locationsTpl'],
    templateList: HandlebarsTemplates['locationsListTpl'],

    initialize: function(settings) {    
      this.model = settings.model;
      this.locations = settings.locations;
      this.layers = settings.layers;
      this.setListeners();
    },

    setListeners: function() {
      this.locations.on('sync', this.render.bind(this));
      this.model.on('change:category', this.renderLocations.bind(this));
    },

    cache: function() {
      this.$locationList = this.$el.find('#locationListView');
      this.$categoriesList = this.$el.find('#categoriesListView');
    },

    render: function() {
      this.$el.html(this.template({
        categories: this.locations.getCategories()
      }));
      // Cache and set categories model
      this.cache();
      this.changeCategories();
    },

    renderLocation: function(e) {
      e && e.preventDefault();
      Backbone.Events.trigger('Location/update', $(e.currentTarget).data('id'));
    },

    renderLocations: function() {
      this.$locationList.html(this.templateList({
        locations: this.locations.getLocations()
      }));
    },

    changeCategories: function() {
      var categories = new Array();
      _.each(this.$categoriesList.find('input[type=radio]'), function(v){
        if ($(v).is(':checked')) {
          this.model.set('category', $(v).data('category'));
        }
      }.bind(this));
      
    }
  });

})(this);
