(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.Collection = root.app.Collection || {};

  root.app.Collection.Layers = Backbone.Collection.extend({

    layers: [
      {
        id: 1,
        slug: 'couruna',
        name: 'Coruña',
        type: 'cartodb',
        description: 'Sitios de interés de Coruña',
        cartocss: '#matiybea{marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 10;marker-fill: #FF6600;marker-allow-overlap: true;}',
        sql: 'SELECT * FROM matiybea',
        color: 'red',
        opacity: 1,
        order: 1000,
        legend: null,
        group: null,
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
