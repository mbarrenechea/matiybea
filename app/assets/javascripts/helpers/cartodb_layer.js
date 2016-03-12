(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.Helper = root.app.Helper || {};

  /**
   * A wrapper for CartoDB
   * More info: http://docs.cartodb.com/cartodb-platform/cartodb-js.html
   */
  root.app.Helper.CartoDBLayer = root.app.Helper.Class.extend({

    defaults: {
      user_name: 'miguel-barrenechea', // Required
      type: 'cartodb', // Required
      cartodb_logo: false,
      interactivity: ['name', 'category', 'category_name', 'description'],
      // maps_api_template: 'https://grp.global.ssl.fastly.net/user/{user}',
      // sql_api_template: 'https://grp.global.ssl.fastly.net/user/{user}',

      sublayers: [{
        sql: 'SELECT * FROM matiybea', // Required
        interactivity: ['name', 'category', 'category_name', 'description'] // Optional
      }]
    },

    tooltipTpl: $('#infowindow_template').html(),

    initialize: function(map, settings) {
      if (!map && map instanceof L.Map) {
        throw 'First params "map" is required and a valid instance of L.Map.';
      }
      var opts = settings || {};
      this.options = _.extend({}, this.defaults, opts);
      this._setMap(map);
    },

    /**
     * Create a CartoDB layer
     * @param  {Function} callback
     */
    create: function(callback) {    
      cartodb.createLayer(this.map, this.options, { 'no_cdn': true })
        .addTo(this.map)
        .on('done', function(layer) {
          this.layer = layer;
          var sublayer = this.layer.getSubLayer(0);
              sublayer.set({ 'interactivity': this.options.interactivity }); 

          console.log(this.tooltipTpl);
          this.layer.leafletMap.viz.addOverlay({
            type: 'tooltip',
            layer: sublayer,
            template: this.tooltipTpl,
            position: 'top|center',
            fields: ['name', 'category', 'category_name', 'description']
          });          

          if (callback && typeof callback === 'function') {
            callback.apply(this, arguments);
          }
        }.bind(this))
        .on('error', function(err) {
          throw err;
        });
    },

    /**
     * Remove cartodb layer and sublayers
     */
    remove: function() {
      if (this.layer) {
        this.map.removeLayer(this.layer);
      } else {
        console.info('There isn\'t a layer.');
      }
    },

    /**
     * Set Leaflet map
     * @param {[type]} map [description]
     */
    _setMap: function(map) {
      this.map = map;
    }

  });

})(this);
