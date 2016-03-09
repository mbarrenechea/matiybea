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
        cartocss: '#matiybea { marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="alojamiento"] { marker-fill: #A6CEE3;}#matiybea[category="cafe"] { marker-fill: #1F78B4;}#matiybea[category="compras"] { marker-fill: #B2DF8A;}#matiybea[category="cultura"] { marker-fill: #33A02C;}#matiybea[category="entretenimiento"] { marker-fill: #FB9A99;}#matiybea[category="restaurante"] { marker-fill: #E31A1C;}#matiybea[category="sitios-de-interes"] { marker-fill: #FDBF6F;}#matiybea[category="tapas"] { marker-fill: #FF7F00;}#matiybea[category="tomar-algo"] { marker-fill: #CAB2D6;}',
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
