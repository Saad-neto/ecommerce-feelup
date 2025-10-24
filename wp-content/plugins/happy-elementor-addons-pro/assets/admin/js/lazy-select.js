"use strict";

(function ($) {
  'use strict';

  $(window).on('elementor:init', function () {
    var LazySelectControl = elementor.modules.controls.BaseData.extend({
      isControlReady: false,
      prepareQueryArgs: function prepareQueryArgs() {
        var self = this,
          args = self.model.get('lazy_args');
        if (!_.isObject(args)) {
          args = {};
        }
        if (args.widget_props && _.isObject(args.widget_props)) {
          _.each(args.widget_props, function (prop, key) {
            args[key] = self.container.settings.get(prop);
          });
        }
        return args;
      },
      getQueryArgs: function getQueryArgs() {
        var args = $.extend({}, this.prepareQueryArgs());
        delete args.widget_props;
        return args;
      },
      getTitlesByIDs: function getTitlesByIDs() {
        var self = this,
          ids = this.getControlValue();
        if (!ids || ids.length < 1) {
          return;
        }
        if (!_.isArray(ids)) {
          ids = [ids];
        }
        var defaultArgs = {
          nonce: ha_lazy.nonce,
          action: ha_lazy.action,
          ids: ids
        };
        $.ajax({
          url: ha_lazy.ajax_url,
          type: 'POST',
          data: $.extend({}, defaultArgs, this.getQueryArgs()),
          before: self.addControlSpinner(),
          success: function success(res) {
            if (!res.success) {
              console.log('something went wrong!', res.data);
            }
            var options = {};
            self.isControlReady = true;
            _.each(res.data, function (item) {
              options[item.id] = item.text;
            });
            self.model.set('options', options);
            self.render();
          }
        });
      },
      addControlSpinner: function addControlSpinner() {
        this.ui.select.prop('disabled', true);
        this.$el.find('.elementor-control-title').after('<span class="elementor-control-spinner">&nbsp;<i class="eicon-spinner eicon-animation-spin"></i>&nbsp;</span>');
      },
      onReady: function onReady() {
        var self = this;
        this.ui.select.select2({
          placeholder: self.model.get('placeholder') ? self.model.get('placeholder') : 'Type & search',
          minimumInputLength: self.model.get('mininput') ? self.model.get('mininput') : 1,
          allowClear: true,
          ajax: {
            url: ha_lazy.ajax_url,
            dataType: 'json',
            method: 'post',
            delay: 250,
            data: function data(params) {
              var defaultArgs = {
                nonce: ha_lazy.nonce,
                action: ha_lazy.action,
                search_term: params.term
              };
              return $.extend({}, defaultArgs, self.getQueryArgs());
            },
            processResults: function processResults(res) {
              if (!res.success || !res.data) {
                console.log('something went wrong!', res.data);
                return {
                  results: [{
                    id: -1,
                    text: 'No results found',
                    disabled: true
                  }]
                };
              }
              return {
                results: res.data
              };
            },
            cache: true
          }
        });
        if (!this.isControlReady) {
          this.getTitlesByIDs();
        }
      },
      onBeforeDestroy: function onBeforeDestroy() {
        if (this.ui.select.data('select2')) {
          this.ui.select.select2('destroy');
        }
        this.$el.remove();
      }
    });
    elementor.addControlView('ha-lazy-select', LazySelectControl);
  });
})(jQuery);