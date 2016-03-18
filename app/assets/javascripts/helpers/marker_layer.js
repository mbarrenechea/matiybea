(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.Helper = root.app.Helper || {};

  /**
   * A wrapper for CartoDB
   * More info: http://docs.cartodb.com/cartodb-platform/cartodb-js.html
   */
  root.app.Helper.MarkerLayer = root.app.Helper.Class.extend({

    defaults: {},

    tooltipEl: $('#locationTooltipView'),
    tooltipTpl: HandlebarsTemplates['locationsTooltipTpl'],

    colors: {
      "alojamiento" : '#d0021b',
      "cafe" : '#1F78B4',
      "compras" : '#bd10e0',
      "cultura" : '#f5a623',
      "entretenimiento" : '#FB9A99',
      "restaurante" : '#4a90e2',
      "sitios-de-interes" : '#f8e71c',
      "tapas" : '#50e3c2',
      "tomar-algo" : '#7ed321',
    },

    initialize: function(map, settings) {
      if (!map && map instanceof L.Map) {
        throw 'First params "map" is required and a valid instance of L.Map.';
      }
      var opts = settings || {};
      this.options = _.extend({}, this.defaults, opts);
      this._setMap(map);
      this._initVars();
      this._initListeners();
    },

    _initVars: function() {
      this.myZoom = {
        start: this.map.getZoom(),
        end: this.map.getZoom()
      };
    },

    _initListeners: function() {
      // this.map.on('zoomstart', function(e) {
      //   this.myZoom.start = this.map.getZoom();
      // }.bind(this));

      // this.map.on('zoomend', function(e) {

      //   this.myZoom.end = this.map.getZoom();
      //   var diff = this.myZoom.start - this.myZoom.end;
      //   _.each(this.markers, function(marker){
      //     var radius =  (diff > 0) ? marker.getRadius() * 2 : marker.getRadius() / 2;
      //     marker.setRadius(radius);  
      //   });

      // }.bind(this));      
    },

    /**
     * Create a CartoDB layer
     * @param  {Function} callback
     */
    create: function(callback) {
      var locations = this.options.locations; 

      this.markers = _.map(locations, function(l){
        var lat = l.geometry.coordinates[1];
        var lng = l.geometry.coordinates[0];
        var category = l.properties.category;

        return new L.circleMarker([lat,lng], {
          // Stroke
          color: '#FFF',
          weight: 1,
          data: l.properties,
          // Fill
          fillColor: this.colors[category],
          fillOpacity: 0.6,
          radius: 10

        }).on('mouseover', this._onMouseover.bind(this))
          .on('mouseout', this._onMouseout.bind(this))
          .on('click', this._onMouseclick.bind(this));

      }.bind(this));

      // Add to map
      _.each(this.markers, function(marker){
        marker.addTo(this.map);
      }.bind(this));


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
    },


    _onMouseover: function(e) {
      var pos = this.map.latLngToContainerPoint(e.target._latlng);
      this.tooltipEl
        .css({
          left: pos.x,
          top: pos.y
        })
        .html(this.tooltipTpl(e.target.options.data))
        .addClass('-active');
    },

    _onMouseout: function(e) {
      this.tooltipEl
        .html('')
        .removeClass('-active');
    },

    _onMouseclick: function(e) {
      // set default radius to all markers
      this.resetRadius();
      // set default radius to current
      e.target.setRadius(25);
      e.target.bringToFront();
      Backbone.Events.trigger('Location/update', e.target.options.data.cartodb_id);
    },

    resetRadius: function() {
      // set default radius to all markers
      _.each(this.markers, function(marker){
        marker.setRadius(10);  
      }.bind(this));      
    }

  });

})(this);
