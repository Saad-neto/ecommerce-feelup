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
      onResetClick: function onResetClick() {
        var widget = elem.getPanelView().getCurrentPageView().getOption('editedElementView');
        $e.run('document/elements/reset-style', {
          container: widget.getContainer()
        });
      },
      addResetButton: function addResetButton() {
        var resetMarkup = '<button class="ha-reset-design"><i title="Reset Style" class="eicon-undo ha-reset-design--disable" aria-hidden="true"></i> Reset Style</button>',
          _this = this;

        // this.ui.select.before(resetMarkup);
        this.ui.radio.parent().prev().after(resetMarkup);
        this.$el.find('.ha-reset-design').on('click', function () {
          _this.onResetClick();
          // _this.ui.select.val('');
          _this.ui.radio.prop('checked', false);
          _this.setSettingsModel('');
        });
      },
      getElementSettingsModel: function getElementSettingsModel() {
        return this.container.settings;
      },
      getWidgetName: function getWidgetName() {
        return this.getElementSettingsModel().get('widgetType');
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
        var controls = this.getElementSettingsModel().controls,
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
            if ('_ha_condition_list' != controlKey) {
              var repeater = _this.getElementSettingsModel().get(controlKey).clone();
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
          }
          if (_this.isStyleTransferControl(control) != undefined && _this.isStyleTransferControl(control)) {
            settings[controlKey] = surprise[controlKey];
          }
        });
        this.getElementSettingsModel().setExternalChange(settings);
        this.container.view.render();
      },
      isStyleTransferControl: function isStyleTransferControl(control) {
        if (!_.isUndefined(control.style_transfer) && control.style_transfer) {
          return control.style_transfer;
        }
        return 'content' !== control.tab || control.selectors || control.prefix_class;
      }
    });

  // elem.addControlView( 'select', WithSurprises );
  elem.addControlView('ha-image-selector', WithSurprises);
})(window.jQuery, window.elementor);