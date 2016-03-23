//= require jquery
//= require jquery_ujs
//= require jquery-validation
//= require underscore
//= require backbone
//= require handlebars
//= require wheel-indicator
//= require jquery.transit

//= require ./helpers/utils

//= require_tree ./collections
//= require_tree ./templates
//= require_tree ./views
//= require ./helpers/class
//= require ./helpers/cartodb_layer
//= require ./helpers/marker_layer

//= require router


(function(root) {

  'use strict';

  /**
   * Provide top-level namespaces for our javascript.
   * @type {Object}
   */
  root.app = root.app || {
    Helper: {},
    Model: {},
    Collection: {},
    View: {},
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

      this.listenTo(this.router, 'route:cuantosabes', this.enquirePage);
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

      var locationsModel = new (Backbone.Model.extend({ defaults: { category: null }}))();
      
      var locationsCollection = new root.app.Collection.LocationsCollection({ categories: locationsModel});

      var mapView = new root.app.View.Map({
        el: '#mapView',
        layers: layersCollection,
        locations: locationsCollection,
        categories: locationsModel,
        model: new (Backbone.Model.extend({
          defaults: {
          }
        }))        
      });

      mapView.createMap();
      layersCollection.getData();
      locationsCollection.getData({
        format: 'geojson'
      });

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

    enquirePage: function() {
      this.enquireModel = new (Backbone.Model.extend({
        defaults: {
          index: 0,
          is_moving: false,
          answers: []
        } 
      }))

      this.enquireCollection = new (Backbone.Collection.extend({
        url: '/json/enquire.json',

        _getAnswers: function() {
          this.answers = _.flatten(_.compact(_.map(this.toJSON(), function(question){ 
            return _.compact(_.map(question.question.options, function(answer,index){
              return (answer.correct) ? index : null;
            }))
          })));
          return this.answers;
        },

        _getCorrect: function(question, val) {
          return (this.answers[question] == val);
        },

        _getCorrectLength: function(arr) {

        }


      }))

      this.enquireView = new root.app.View.EnquireView({
        model: this.enquireModel,
        collection: this.enquireCollection
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
