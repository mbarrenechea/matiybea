(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.Collection = root.app.Collection || {};

  root.app.Collection.Layers = Backbone.Collection.extend({
    layers: [
      {
        id: 1,
        slug: 'alojamiento',
        name: 'Alojamiento',
        type: 'cartodb',
        description: 'Alojamiento',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="alojamiento"] { marker-fill: #d0021b;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'alojamiento\'',
        color: 'red',
        bounds: true,
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 2,
        slug: 'cafe',
        name: 'Cafe/Desayuno',
        type: 'cartodb',
        description: 'Café/Desayuno',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="cafe"] { marker-fill: #1F78B4;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'cafe\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 3,
        slug: 'compras',
        name: 'Compras',
        type: 'cartodb',
        description: 'Compras',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="compras"] { marker-fill: #bd10e0;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'compras\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 4,
        slug: 'cultura',
        name: 'Cultura',
        type: 'cartodb',
        description: 'Cultura',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="cultura"] { marker-fill: #f5a623;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'cultura\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 5,
        slug: 'entretenimiento',
        name: 'Entretenimiento',
        type: 'cartodb',
        description: 'Entretenimiento',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="entretenimiento"] { marker-fill: #FB9A99;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'entretenimiento\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 6,
        slug: 'restaurante',
        name: 'Restaurante',
        type: 'cartodb',
        description: 'Restaurante',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="restaurante"] { marker-fill: #4a90e2;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'restaurante\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 7,
        slug: 'sitios-de-interes',
        name: 'Sitios de interes',
        type: 'cartodb',
        description: 'Sitios de interes',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="sitios-de-interes"] { marker-fill: #f8e71c;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'sitios-de-interes\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 8,
        slug: 'tapas',
        name: 'Tapas',
        type: 'cartodb',
        description: 'Tapas',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="tapas"] { marker-fill: #50e3c2;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'tapas\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },
      {
        id: 9,
        slug: 'tomar-algo',
        name: 'Tomar algo',
        type: 'cartodb',
        description: 'Tomar algo',
        cartocss: '#matiybea { marker-fill-opacity: 1;marker-line-color: #FFF;marker-line-width: 1;marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 15;marker-allow-overlap: true;}#matiybea[category="tomar-algo"] { marker-fill: #7ed321;}',
        sql: 'SELECT * FROM matiybea WHERE category = \'tomar-algo\'',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },

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
