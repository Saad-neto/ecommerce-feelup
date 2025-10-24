"use strict";

(function ($, elem) {
  'use strict';

  var elemMod = elem.modules,
    WithSurprises = elemMod.controls.Select.extend({
      isSurpriseControl: function isSurpriseControl() {
        return this.model.get('name') === '_ha_design' && this.getWidgetName().indexOf('ha-') !== -1;
      },
      onReady: function onReady() {
        window.happyDesigns = window.happyDesigns || {};
        this.fetchSurprises();
      },
      onRender: function onRender() {
        this.constructor.__super__.onRender.apply(this, arguments);
        if (this.isSurpriseControl()) {
          this.addResetButton();
        }
      },
      addResetButton: function addResetButton() {
        var resetMarkup = '<i title="Reset Style" class="eicon-redo ha-reset-design ha-reset-design--disable" aria-hidden="true"></i>',
          _this = this;
        this.ui.select.before(resetMarkup);
        this.$el.find('.ha-reset-design').on('click', function () {
          var widgetView = elem.getPanelView().getCurrentPageView().getOption('editedElementView');
          widgetView && widgetView.resetStyle();
          _this.ui.select.val('');
          _this.setSettingsModel('');
        });
      },
      getWidgetName: function getWidgetName() {
        return this.elementSettingsModel.get('widgetType');
      },
      isFetched: function isFetched() {
        return !_.isUndefined(window.happyDesigns[this.getWidgetName()]);
      },
      fetchSurprises: function fetchSurprises() {
        var _this = this;
        if (!this.isSurpriseControl()) {
          return;
        }
        if (this.isFetched() || !this.getWidgetName()) {
          return;
        }
        $.get(hapro.ajaxUrl, {
          'action': 'ha_make_me_surprised',
          'widget': this.getWidgetName(),
          'secret': hapro.secret
        }).done(function (response) {
          if (response.success) {
            _this.setSurprises(response.data);
          }
        });
      },
      setSurprises: function setSurprises(data) {
        window.happyDesigns[this.getWidgetName()] = JSON.parse(data);
      },
      getSurprises: function getSurprises() {
        if (_.isUndefined(window.happyDesigns)) {
          return {};
        }
        return window.happyDesigns[this.getWidgetName()] || {};
      },
      onBaseInputChange: function onBaseInputChange(event) {
        this.constructor.__super__.onBaseInputChange.apply(this, arguments);
        if (!this.isSurpriseControl() || !event.currentTarget.value) {
          return;
        }
        event.stopPropagation();
        var surprises = this.getSurprises();
        if (!_.isUndefined(surprises[event.currentTarget.value])) {
          this.applySurprise(surprises[event.currentTarget.value]);
        }
      },
      applySurprise: function applySurprise(surprise) {
        var controls = this.elementSettingsModel.controls,
          _this = this,
          settings = {};
        _.each(controls, function (control, controlKey) {
          if (_this.model.get('name') === controlKey) {
            return;
          }
          if (_.isUndefined(surprise[controlKey])) {
            return;
          }
          if (control.is_repeater) {
            var repeater = _this.elementSettingsModel.get(controlKey).clone();
            repeater.each(function (model, index) {
              if (_.isUndefined(surprise[controlKey][index])) {
                return;
              }
              _.each(model.controls, function (rControl, rControlKey) {
                if (_this.isStyleTransferControl(rControl)) {
                  repeater.at(index).set(rControlKey, surprise[controlKey][index][rControlKey]);
                }
              });
            });
            settings[controlKey] = repeater;
          }
          if (_this.isStyleTransferControl(control)) {
            settings[controlKey] = surprise[controlKey];
          }
        });
        this.elementSettingsModel.set(settings);
      },
      isStyleTransferControl: function isStyleTransferControl(control) {
        if (!_.isUndefined(control.style_transfer) && control.style_transfer) {
          return control.style_transfer;
        }
        return 'content' !== control.tab || control.selectors || control.prefix_class;
      }
    });
  elem.addControlView('select', WithSurprises);
})(window.jQuery, window.elementor);