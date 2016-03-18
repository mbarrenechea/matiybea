(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.Model = root.app.Model || {};
  root.app.Model.LocationModel = Backbone.Model.extend({
    defaults: {
      cartodb_id: null
    }
  });

  root.app.View.LocationView = Backbone.View.extend({

    el: '#locationView',

    events: {
      'click .js-location-close': 'hide' 
    },

    template: HandlebarsTemplates['locationTpl'],

    initialize: function(settings) {    
      this.model = new root.app.Model.LocationModel();
      this.locations = settings.locations;

      this.setListeners();
    },

    setListeners: function() {
      this.model.on('change:cartodb_id', this.toggle.bind(this));
      
      Backbone.Events.on('Location/update', function(_cartodb_id){
        this.model.set('cartodb_id', _cartodb_id);
      }.bind(this));
    },

    toggle: function(e) {
      var cartodb_id = this.model.get('cartodb_id');
      var data = _.find(this.locations.toJSON(), function(location) {
        return (cartodb_id == location.properties.cartodb_id)
      });

      this.$el.toggleClass('-right', ! !!cartodb_id);

      if (!!data) {
        this.$el.html(this.template(data.properties));
        this.setCenter(data.geometry);
      }
    },

    hide: function() {
      this.model.set('cartodb_id', null);
      Backbone.Events.trigger('Location/close');
    },

    setCenter: function(geometry) {
      var latLng = {
        lat: geometry.coordinates[1],
        lng: geometry.coordinates[0]
      }
      // Backbone.Events.trigger('Map/zoom', 15);
      Backbone.Events.trigger('Map/center', latLng);
    }

  });

})(this);
