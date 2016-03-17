(function(root) {

  'use strict';

  root.app = root.app || {};

  root.app.Collection = root.app.Collection || {};
  root.app.Collection.LocationsCollection = Backbone.Collection.extend({
    
    url: 'https://miguel-barrenechea.cartodb.com/api/v2/sql?q=SELECT * FROM matiybea',
    
    parse: function(response) {
      return response.features;
    },

    initialize: function(settings) {
      this.categories = settings.categories;
    },

    getCategories: function() {
      var locations = _.pluck(this.toJSON(), 'properties');
      return _.sortBy(_.map(_.uniq(locations,'category'), function(el){
        return {
          category: el.category,
          category_name: el.category_name,
        }
      }), function(c){
        return c.category_name
      });
    },

    getLocations: function() {
      var locations = _.pluck(this.toJSON(), 'properties');
      return _.sortBy(_.compact(_.map(locations, function(l){
        if (_.indexOf(this.categories.get('categories'),l.category) != -1) {
          return l;  
        }
        return null;
      }.bind(this))), function(c){
        return c.category_name
      });      
    },

    getData: function(data) {
      this.fetch({
        data: data
      });
    }

  });


})(this);

