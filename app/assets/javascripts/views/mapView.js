(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  //     bounds = ;

  // var map = L.mapbox.map('map', 'mapbox.streets', {
  //     // set that bounding box as maxBounds to restrict moving the map
  //     // see full maxBounds documentation:
  //     // http://leafletjs.com/reference.html#map-maxbounds
  //     maxBounds: bounds,
  //     maxZoom: 19,
  //     minZoom: 10
  // });

  // // zoom the map to that bounding box
  // map.fitBounds(bounds);


  root.app.View.Map = Backbone.View.extend({

    defaults: {
      map: {
        zoom: 3,
        center: [0, 15],
        // center: [10, 30], //Horn of Africa
        zoomControl: false,
        scrollWheelZoom: false,
        maxBounds: L.latLngBounds(L.latLng(42.59959821305863, -9.70916748046875), L.latLng(44.008620115415354, -6.973571777343749)),

      },
      basemap: {
        url: 'http://{s}.api.cartocdn.com/base-light/{z}/{x}/{y}.png'
      },
      zoomControl: {
        position: 'topright'
      },

    },


    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      // this.layers = settings.layers;
      this.setListeners();
    },

    setListeners: function() {
      // this.listenTo(this.layers, 'change', this.renderLayers);
      // this.listenTo(this.layers, 'sort', this.renderLayers);
    },

    setEvents: function() {
      this.map.on('moveend', function() {
        console.log(this.map.getBounds());
      }.bind(this));
    },

    /**
     * Instantiates a Leaflet map object
     */
    createMap: function() {
      if (!this.map) {
        this.map = L.map(this.el, this.options.map);

        if (this.options.map.maxBounds) {
          this.map.fitBounds(this.options.map.maxBounds);
        }

        if (this.options.zoomControl) {
          this.addControlZoom();
        }
        this.setBasemap();
        this.setEvents();
      } else {
        console.info('Map already exists.');
      }
    },

    /**
     * Destroys the map and clears all related event listeners
     */
    removeMap: function() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      } else {
        console.info('Map doesn\'t exist yet.');
      }
    },

    addControlZoom: function() {
      this.controlZoom = L.control.zoom(this.options.zoomControl);
      this.map.addControl(this.controlZoom);
    },

    /**
     * Add a basemap to map
     * @param {String} basemapUrl http://{s}.tile.osm.org/{z}/{x}/{y}.png
     */
    setBasemap: function() {
      if (!this.map) {
        throw 'Map must exists.';
      }
      if (this.basemap) {
        this.map.removeLayer(this.basemap);
      }

      this.basemap = L.tileLayer(this.options.basemap.url).addTo(this.map);
    },

    /**
     * Remove basemap from mapView
     */
    unsetBasemap: function() {
      if (this.basemap) {
        this.map.removeLayer(this.basemap);
      } else {
        console.info('Basemap doesn\`t exist.');
      }
    },

    /**
     * Render or remove layers by Layers Collection
     */
    renderLayers: function() {
      var layersData = this.layers.getPublished();
      _.each(layersData, function(layerData) {
        if (layerData.active) {
          this.addLayer(layerData);
        } else {
          this.removeLayer(layerData);
        }
      }, this);

      //Set mask when journey map.
      if (this.model.get('journeyMap')) {
        this.setMaskLayer();
      }

    },

    /**
     * Add a layer instance to map
     * @param {Object} layerData
     */
    addLayer: function(layerData) {
      if (typeof layerData !== 'object' ||
        !layerData.id || !layerData.type) {
        throw 'Invalid "layerData" format.';
      }
      if (!this.map) {
        throw 'Create a map before add a layer.';
      }
      var layer = this.model.get(layerData.id);
      var layerInstance;
      if (!layer) {
        switch(layerData.type) {
          case 'cartodb':
            var data = _.pick(layerData, ['sql', 'cartocss', 'interactivity']);
            var options = { sublayers: [data] };
            layerInstance = new root.app.Helper.CartoDBLayer(this.map, options);
            layerInstance.create(function(layer) {
              layer.setOpacity(layerData.opacity);
              layer.setZIndex(1000-layerData.order);
            });
          break;
          case 'raster':
            var data = _.pick(layerData, ['sql', 'cartocss', 'interactivity']);
            var options = {
              sublayers: [ _.extend(data, { raster: true, raster_band: 1 }) ]
            };
            layerInstance = new root.app.Helper.CartoDBRaster(this.map, options);
            //When carto bug solved, only back to create method.
            layerInstance.createRasterLayer(function(layer) {
              layer.setOpacity(layerData.opacity);
              layer.setZIndex(1000-layerData.order);
            });
          break;
          default:
            layerInstance = null;
        }
        if (layerInstance) {
          this.model.set(layerData.id, layerInstance);
        } else {
          throw 'Layer type hasn\'t been defined or it doesn\'t exist.';
        }
      } else {
        if (layer.layer) {
          layer.layer.setOpacity(layerData.opacity);
          layer.layer.setZIndex(1000-layerData.order);
        }
        // console.info('Layer "' + layerData.id + '"" already exists.');
      }
    },

    /**
     * Remove a specific layer on map
     * @param  {Object} layerData
     */
    removeLayer: function(layerData) {
      var layerInstance = this.model.get(layerData.id);
      if (layerInstance) {
        this.model.set(layerData.id, null);
        layerInstance.remove();
      }
    },

    setMaskLayer: function() {

      var maskLayer = new root.app.Helper.CartoDBmask(this.map);

      maskLayer.create(function(layer){
        layer.setZIndex(1001)
      });
    }

  });

})(this);
