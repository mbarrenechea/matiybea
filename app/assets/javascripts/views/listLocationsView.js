(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};
  
  root.app.Collection = root.app.Collection || {};
  root.app.Collection.MapCollection = Backbone.Collection.extend({
    url: 'https://miguel-barrenechea.cartodb.com/api/v2/sql?q=SELECT * FROM matiybea',
    parse: function(response) {
      return response.rows;
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
      return _.sortBy(this.toJSON(), function(c){
        return c.category_name
      });      
    }
  });

  root.app.View.ListLocationsView = Backbone.View.extend({

    el: '#listLocationsView',

    template: HandlebarsTemplates['listLocationsTpl'],

    initialize: function(settings) {    
      this.collection = new root.app.Collection.MapCollection();
      this.collection.fetch().done(function() {
        this.render();
      }.bind(this));
    },

    render: function() {
      console.log('render');
      this.$el.html(this.template({
        locations: this.collection.getLocations(),
        categories: this.collection.getCategories()
      }));
    }
  });

})(this);
