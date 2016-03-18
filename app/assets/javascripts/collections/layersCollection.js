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
        type: 'marker',
        description: 'Alojamiento',
        color: 'red',
        opacity: 1,
        order: 1000,
        active: true,
        published: true
      },

      // {
      //   id: 1,
      //   slug: 'alojamiento',
      //   name: 'Alojamiento',
      //   type: 'cartodb',
      //   description: 'Alojamiento',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'alojamiento\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 2,
      //   slug: 'cafe',
      //   name: 'Cafe/Desayuno',
      //   type: 'cartodb',
      //   description: 'Café/Desayuno',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'cafe\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 3,
      //   slug: 'compras',
      //   name: 'Compras',
      //   type: 'cartodb',
      //   description: 'Compras',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'compras\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 4,
      //   slug: 'cultura',
      //   name: 'Cultura',
      //   type: 'cartodb',
      //   description: 'Cultura',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'cultura\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 5,
      //   slug: 'entretenimiento',
      //   name: 'Entretenimiento',
      //   type: 'cartodb',
      //   description: 'Entretenimiento',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'entretenimiento\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 6,
      //   slug: 'restaurante',
      //   name: 'Restaurante',
      //   type: 'cartodb',
      //   description: 'Restaurante',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'restaurante\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 7,
      //   slug: 'sitios-de-interes',
      //   name: 'Sitios de interes',
      //   type: 'cartodb',
      //   description: 'Sitios de interes',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'sitios-de-interes\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 8,
      //   slug: 'tapas',
      //   name: 'Tapas',
      //   type: 'cartodb',
      //   description: 'Tapas',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'tapas\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },
      // {
      //   id: 9,
      //   slug: 'tomar-algo',
      //   name: 'Tomar algo',
      //   type: 'cartodb',
      //   description: 'Tomar algo',
      //   sql: 'SELECT * FROM matiybea WHERE category = \'tomar-algo\'',
      //   color: 'red',
      //   opacity: 1,
      //   order: 1000,
      //   active: true,
      //   published: true
      // },

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
