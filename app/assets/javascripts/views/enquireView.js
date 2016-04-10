(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.EnquireView = Backbone.View.extend({

    el: '#enquireView',

    events: {
      'click .js-click-index' : 'clickIndex',
      'change .js-question-radio' : 'changeQuestion'
    },

    ranges: [_.range(0,1),_.range(1,5),_.range(5,10),_.range(10,11)],
    messages: [
      HandlebarsTemplates['answer0'],
      HandlebarsTemplates['answer1'],
      HandlebarsTemplates['answer2'],
      HandlebarsTemplates['answer3']
    ],

    template: HandlebarsTemplates['enquireTpl'],
    templateIcon: HandlebarsTemplates['answerIconTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.model = settings.model;
      this.collection = settings.collection;

      this.collection.fetch().done(function(){
        this.collection._getAnswers();
        this.render();
      }.bind(this))
    },

    render: function() {
      this.$el.html(this.template({
        questions: this.collection.toJSON()
      }))

      this.cache();
      this.setListeners();
      this.sectionIndex();

      // Testing
      // this.model.set('answers', [false, false, false, true, false, false, true, false, false]);
      // this.model.set('index', 21);
      // this.correct();
    },

    cache: function() {
      this.$htmlbody = $('html,body');
      // Sections
      this.$sections = this.$el.find('.m-section');
      this.sectionsLength = this.$sections.length;

      // Answers
      this.$correctAnswers = this.$el.find('#correctAnswers');
      this.$totalAnswers = this.$el.find('#totalAnswers');
      this.$messageAnswers = this.$el.find('#correctMessage');
      this.$iconAnswers = this.$el.find('#iconAnswers .icon');
      
    },

    setListeners: function() {
      this.model.on('change:index', this.scrollTo.bind(this));
      this.model.on('change:index', this.sectionIndex.bind(this));
    },

    sectionIndex: function() {
      var index = this.model.get('index');
      var $section = this.$sections.eq(index);

      this.$sections.removeClass('-selected');
      $section.addClass('-selected');
    },

    // Events
    clickIndex: function(e) {
      e && e.preventDefault();
      if (!this.model.get('is_moving')) {
        this.model.set('is_moving', true);
        switch(e.currentTarget.dataset.direction) {
          case 'prev':
            this.prev()
          break;

          case 'next':
            this.next();
          break;
        }
      }      
    },

    changeQuestion: function(e) {
      var question = $(e.currentTarget).data('question');
      var answers = this.model.get('answers');
      var $radios = $('#js-question-radio-'+question+ ' input[name=question-radio-'+question+']');
      var index = $radios.index($radios.filter(':checked'));
      
      answers[question] = index;
      this.model.set('answers', answers);

      this.correct();
      
      this.next();
    },

    scrollTo: function() {
      this.$el.transition({
        y: -100 * this.model.get('index') + '%'
      }, 500, function(){
        this.model.set('is_moving', false);
      }.bind(this));
    },

    next: function() {
      var index = this.model.get('index');
      if (index == this.sectionsLength - 1) {
        index = this.sectionsLength - 1
        this.model.set('is_moving', false);
      } else {
        index++
      }
      this.model.set('index', index);
    },

    prev: function() {
      var index = this.model.get('index');
      if (index == 0) {
        index = 0;
        this.model.set('is_moving', false);
      } else {
        index--
      }
      this.model.set('index', index);      
    },

    correct: function() {
      var correctTotal = this.collection._getCorrectTotal();
      var total = this.collection.toJSON().length;
      var results = this.collection._getResults();

      this.$correctAnswers.text(correctTotal.length);
      this.$totalAnswers.text(total);

      var message = this.getMessage(correctTotal.length);
      this.$messageAnswers.html()


      _.each(this.$iconAnswers, function(el,i) {
        $(el).toggleClass('-correct',results[i]);
        $(el).toggleClass('-incorrect',!results[i]);
        $(el).find('.status').html(this.templateIcon({ correct: results[i] }));
      }.bind(this))
    },

    getMessage: function(total) {
      var index = _.findIndex(this.ranges, function(range) {
        return _.contains(range, total);
      });

      this.$messageAnswers.html(this.messages[index]);
    }
  });

})(this);
