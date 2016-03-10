(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.Model = root.app.Model || {};
  root.app.Model.LocationsModel = Backbone.Model.extend({
    defaults: {
      categories: []
    }
  });

  
  root.app.Collection = root.app.Collection || {};
  root.app.Collection.LocationsCollection = Backbone.Collection.extend({
    
    url: 'https://miguel-barrenechea.cartodb.com/api/v2/sql?q=SELECT * FROM matiybea',
    
    parse: function(response) {
      return response.rows;
    },

    initialize: function(settings) {
      this.categories = settings.categories;
    },

    getCategories: function() {
      return _.sortBy(_.map(_.uniq(this.toJSON(),'category'), function(el){
        return {
          category: el.category,
          category_name: el.category_name,
        }
      }), function(c){
        return c.category_name
      });
    },

    getLocations: function() {
      return _.sortBy(_.compact(_.map(this.toJSON(), function(l){
        if (_.indexOf(this.categories.get('categories'),l.category) != -1) {
          return l;  
        }
        return null;
      }.bind(this))), function(c){
        return c.category_name
      });      
    }
  });

  root.app.View.LocationsView = Backbone.View.extend({

    el: '#locationsView',

    events: {
      'change .category-checkbox' : 'changeCategories'
    },

    template: HandlebarsTemplates['locationsTpl'],
    templateList: HandlebarsTemplates['locationsListTpl'],

    initialize: function(settings) {    
      this.model = new root.app.Model.LocationsModel();
      this.collection = new root.app.Collection.LocationsCollection({
        categories: this.model
      });
      this.collection.fetch().done(function() {
        this.render();
      }.bind(this));
      this.layers = settings.layers;
      this.setListeners();
    },

    setListeners: function() {
      this.model.on('change:categories', this.renderLocations.bind(this));
      this.model.on('change:categories', this.renderLayers.bind(this));
    },

    cache: function() {
      this.$locationList = this.$el.find('#locationListView');
      this.$categoriesList = this.$el.find('#categoriesListView');
    },

    render: function() {
      this.$el.html(this.template({
        categories: this.collection.getCategories()
      }));
      // Cache and set categories model
      this.cache();
      this.changeCategories();
    },

    renderLocations: function() {
      this.$locationList.html(this.templateList({
        locations: this.collection.getLocations()
      }));
    },

    renderLayers: function() {
      _.each(this.layers.models, function(model) {
        var active = (_.indexOf(this.model.get('categories'),model.attributes.slug) != -1);
        model.set('active', active);
      }.bind(this));
    },

    changeCategories: function() {
      var categories = new Array();
      _.each(this.$categoriesList.find('input[type=checkbox]'), function(v){
        if ($(v).is(':checked')) {
          categories.push($(v).data('category'));
        }
      });
      this.model.set('categories', categories);
    }
  });

})(this);
