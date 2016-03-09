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
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="alojamiento"] { marker-fill: #d0021b;}#matiybea[category="cafe"] { marker-fill: #1F78B4;}#matiybea[category="compras"] { marker-fill: #bd10e0;}#matiybea[category="cultura"] { marker-fill: #f5a623;}#matiybea[category="entretenimiento"] { marker-fill: #FB9A99;}#matiybea[category="restaurante"] { marker-fill: #4a90e2;}#matiybea[category="sitios-de-interes"] { marker-fill: #f8e71c;}#matiybea[category="tapas"] { marker-fill: #50e3c2;}#matiybea[category="tomar-algo"] { marker-fill: #7ed321;}',
        sql: 'SELECT * FROM matiybea',
        color: 'red',
        bounds: true,
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
