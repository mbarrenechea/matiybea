(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.Collection = root.app.Collection || {};

  root.app.Collection.Layers = Backbone.Collection.extend({
    layers: [
      {
        id: 1,
        slug: 'all',
        name: 'All',
        type: 'marker',
        description: 'All markers',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      }
    ],

    initialize: function() {

    },

    comparator: function(d) {
      return d.attributes.order ? d.attributes.order * 1000 : d.attributes.name;
    },

    // Reset the collection with the default data
    getData: function() {
      this.reset(this.layers);
      this.sort();
    }
  });


})(this);
