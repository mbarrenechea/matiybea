(function(root) {

  'use strict';

  root.app = root.app || {};
  root.app.View = root.app.View || {};

  root.app.View.ConfirmformView = Backbone.View.extend({

    el: '.confirm-form',

    events: {
      'change .toggle-radio' : 'toggleRadioField',
      'click .btn-add-children' : 'addChildren',
      'click .btn-remove-children' : 'removeChildren'
    },

    templateAddChildren: HandlebarsTemplates['addChildrenTpl'],

    initialize: function(settings) {
      var opts = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, opts);
      this.validate();
      this.cache();
    },

    cache: function() {
      this.$fieldGridItem = $('.field-grid-item');
      this.$fieldArrayChildren = $('#field-array-children');
      this.$sectionSuccess = $('.m-section-box.-success');
    },

    validate: function() {
      this.$el.validate({
        submitHandler: function(form) {
          var url = $(form).attr('action');
          var data = this.setParams(form);
          console.log(data);

          $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: this.success.bind(this),
            dataType: 'json'
          });

        }.bind(this)
      });
    },

    success: function(data) {
      this.$sectionSuccess.removeClass('-right -bottom');
      console.log(data);
    },

    setParams: function(form) {
      var params = this.getParams(form);
      // set childs
      params['confirm[childs]'] = this.setChildren(params['children[]']);

      return params;
    },

    setChildren: function(children) {
      if (_.isArray(children)) {
        return children;
      } else {
        return (!!children) ? [children] : [];
      }
    },

    getParams: function(form) {
      var paramObj = {};
      $.each($(form).serializeArray(), function(_, kv) {
        if (paramObj.hasOwnProperty(kv.name)) {
          paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
          paramObj[kv.name].push(kv.value);
        }
        else {
          paramObj[kv.name] = kv.value;
        }
      });
      return paramObj;
    },


    // Events
    toggleRadioField: function(e) {
      var $toggle = $(e.currentTarget).parents('.field-grid-item').find('.-toggle');
      var $input = $toggle.find('textarea, input');
      var checked = ($(e.currentTarget).val() == 'true');

      $toggle.toggleClass('-hidden',!checked);
      $input.attr('required', checked);
    },

    addChildren: function(e) {
      e && e.preventDefault();
      this.$fieldArrayChildren.append(this.templateAddChildren({
        order: $('.field-item-children').length + 1
      }));
    },

    removeChildren: function(e) {
      e && e.preventDefault();
      $(e.currentTarget).parents('.-field-to-remove').remove();
    }

  });

})(this);
