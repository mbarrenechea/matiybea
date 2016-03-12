//= require jquery
//= require jquery_ujs
//= require jquery-validation
//= require underscore
//= require backbone
//= require handlebars
//= require wheel-indicator
//= require jquery.transit

//= require_tree ./models
//= require_tree ./collections
//= require_tree ./templates
//= require_tree ./views
//= require ./helpers/class
//= require ./helpers/cartodb_layer

//= require router


(function(root) {

  'use strict';

  /**
   * Provide top-level namespaces for our javascript.
   * @type {Object}
   */
  root.app = root.app || {
    Model: {},
    Collection: {},
    View: {},
    Helper: {}
  };

  /**
   * Main Application View
   */
  root.app.AppView = Backbone.View.extend({

    /**
     * Main DOM element
     * @type {Object}
     */
    el: document.body,

    initialize: function() {
      this.router = new root.app.Router();
      this._cartodbHack();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route:home', this.homePage);

      // Confirm
      this.listenTo(this.router, 'route:confirm_index', this.confirmIndexPage);
      this.listenTo(this.router, 'route:confirm_new', this.confirmNewPage);
      this.listenTo(this.router, 'route:confirm_edit', this.confirmEditPage);

      // Map
      this.listenTo(this.router, 'route:quehacer', this.mapPage);
    },

    start: function() {
      Backbone.history.start({ pushState: true });
    },

    homePage: function() {
      this.scrollModel = new (Backbone.Model.extend({
        defaults: {
          index: 0,
          is_moving: false
        } 
      })),

      this.scrollView = new root.app.View.ScrollView({
        model: this.scrollModel,        
        options: {
          route: this.getRoute()
        }        
      });

      this.scrollNavigationView = new root.app.View.ScrollNavigationView({
        model: this.scrollModel
      });

      this.countdownView = new root.app.View.CountdownView();
      this.initGlobalViews();
    },

    confirmIndexPage: function() {
      this.initGlobalViews();
    },

    confirmNewPage: function() {
      this.confirmformView = new app.View.ConfirmformView();
      this.initGlobalViews();
    },

    confirmEditPage: function() {
      this.confirmformView = new app.View.ConfirmformView();
      this.initGlobalViews();
    },

    mapPage: function() {
      var layersCollection = new root.app.Collection.Layers();

      var locationsModel = new (Backbone.Model.extend({ defaults: { categories: [] }}))();
      console.log(locationsModel);
      var locationsCollection = new root.app.Collection.LocationsCollection({ categories: locationsModel});

      var mapView = new root.app.View.Map({
        el: '#mapView',
        layers: layersCollection,
        model: new (Backbone.Model.extend({
          defaults: {
          }
        }))        
      });

      mapView.createMap();
      layersCollection.getData();
      locationsCollection.getData();

      this.locationsView = new root.app.View.LocationsView({
        layers: layersCollection,
        locations: locationsCollection,
        model: locationsModel
      });
      this.locationView = new root.app.View.LocationView({
        locations: locationsCollection
      });
      
      this.initGlobalViews();
    },

    initGlobalViews: function() {
      this.menuView = new app.View.MenuView({
        options: {
          route: this.getRoute()
        }
      });
    },

    getRoute: function() {
      return Backbone.history.getFragment().replace('?section=','').replace('/','');
    },

    /**
     * Cartodb Handlebars hack.
     */
    _cartodbHack: function() {
      cdb.core.Template.compilers = _.extend(cdb.core.Template.compilers, {
        handlebars: typeof(Handlebars) === 'undefined' ? null : Handlebars.compile
      });
    },


  });

  new app.AppView().start();

})(this);
