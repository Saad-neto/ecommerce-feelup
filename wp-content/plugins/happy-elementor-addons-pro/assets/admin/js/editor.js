"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function ($) {
  window.haHasIconLibrary = function () {
    return elementor.helpers && elementor.helpers.renderIcon;
  };
  window.haGetFeatureLabel = function (text) {
    var div = document.createElement("DIV");
    div.innerHTML = text;
    text = div.textContent || div.innerText || text;
    return text.length > 20 ? text.substring(0, 20) + "..." : text;
  };
  window.haGetTranslated = function (stringKey, templateArgs) {
    return elementorCommon.translate(stringKey, null, templateArgs, HappyAddonsEditor.i18n);
  };
  function isHotSpotsWidget(model) {
    return model.get("elType") === "widget" && model.get("widgetType") === "ha-hotspots";
  }
  var getHotSpotsWidgetView = function getHotSpotsWidgetView(childView) {
    return {
      initialize: function initialize() {
        childView.prototype.initialize.apply(this, arguments);
        this.updateContextMenu();
        this.addedByContextMenuData = null;
        this.listenTo(elementor.channels.dataEditMode, "switch", this.toggleSpotDragMode);
        this.listenTo(this.model.get("editSettings"), "change:activeItemIndex", this.onEditSettingsChange);
        this.listenTo(this.model.get("settings").get("spots"), "add", this.handleAddedByContextMenu);
      },
      handleAddedByContextMenu: function handleAddedByContextMenu(model) {
        var currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
          deviceSuffix = "desktop" === currentDeviceMode ? "" : "_" + currentDeviceMode,
          currentSpotModel = model,
          xPosKey = "x_pos",
          yPosKey = "y_pos",
          settings = {},
          parentWidth = this.$el.width(),
          parentHeight = this.$el.height(),
          xPos = this.addedByContextMenuData && this.addedByContextMenuData.offsetX,
          yPos = this.addedByContextMenuData && this.addedByContextMenuData.offsetY,
          xPosUnit = currentSpotModel.get(xPosKey + deviceSuffix).unit,
          yPosUnit = currentSpotModel.get(yPosKey + deviceSuffix).unit;
        if (_.isNull(this.addedByContextMenuData)) {
          return;
        }
        xPos = (xPos * 100 / parentWidth).toFixed(2);
        yPos = (yPos * 100 / parentHeight).toFixed(2);
        settings[xPosKey + deviceSuffix] = {
          size: xPos,
          unit: xPosUnit
        };
        settings[yPosKey + deviceSuffix] = {
          size: yPos,
          unit: yPosUnit
        };
        currentSpotModel.setExternalChange(settings);
        this.renderStyles();
        this.addedByContextMenuData = null;
      },
      updateContextMenu: function updateContextMenu() {
        var contextMenu = this.getBehavior("contextMenu"),
          contextMenuGroups = contextMenu.getOption("groups"),
          generalGroup = _.findWhere(contextMenuGroups, function (group) {
            return group.name === "general";
          }),
          spotIndex = _.findIndex(generalGroup.actions, function (action) {
            return action.name === "ha-add-hotspot";
          }),
          self = this;
        if (spotIndex === -1) {
          generalGroup.actions.push({
            name: "ha-add-hotspot",
            title: "Add Hotspot",
            icon: "hm hm-happyaddons",
            callback: function callback() {
              self.model.trigger("request:edit");
              self.getSpotsView().onButtonAddRowClick();
            }
          });
        }
        contextMenu.options.groups = contextMenuGroups;
        contextMenu.initContextMenu();
      },
      onEditSettingsChange: function onEditSettingsChange(model) {
        this.$el.find('[data-index="' + (model.get("activeItemIndex") - 1) + '"]').addClass("ha-hotspots__item--focus").siblings(".ha-hotspots__item--focus").removeClass("ha-hotspots__item--focus");
      },
      getControlViewByName: function getControlViewByName(name) {
        return elementor.getPanelView().getCurrentPageView().children.find(function (view) {
          return view.model.get("name") === name;
        });
      },
      getSpotsView: function getSpotsView() {
        if (!$e.routes.isPartOf("panel/editor/content")) {
          $e.route("panel/editor/content", {
            model: this.getContainer().model,
            view: this.getContainer().view
          });
        }
        if (this.model.get("editSettings").get("panel").activeSection !== "_section_spots") {
          this.getControlViewByName("_section_spots").ui.heading.click();
        }
        return this.getControlViewByName("spots");
      },
      getSpotByIndex: function getSpotByIndex(index) {
        return this.getSpotsView().children.findByIndex(index);
      },
      onRender: function onRender() {
        childView.prototype.onRender.call(this);
        var self = this;
        _.defer(function () {
          self.toggleSpotDragMode();
        });
      },
      onDestroy: function onDestroy() {
        this.deactivateSpotDragMode();
        childView.prototype.onDestroy.call(this);
      },
      ui: function ui() {
        var ui = childView.__super__.ui.call(this);
        ui.spotHandle = "> .elementor-widget-container .ha-hotspots__item";
        return ui;
      },
      events: function events() {
        var events = childView.__super__.events.call(this);
        events["contextmenu"] = "onContextMenuOpen";
        events["click @ui.spotHandle"] = "onClickSpot";
        events["dragstart @ui.spotHandle"] = "openSelectedSpot";
        events["dragstop @ui.spotHandle"] = "onDragSpotHandle";
        return events;
      },
      onContextMenuOpen: function onContextMenuOpen(event) {
        event.stopPropagation();
        this.addedByContextMenuData = event;
      },
      onClickSpot: function onClickSpot(event) {
        event.preventDefault();
        this.openSelectedSpot(event);
      },
      openSelectedSpot: function openSelectedSpot(event) {
        event.stopPropagation();

        // Send edit request first
        this.model.trigger("request:edit");
        var spotControls = this.getSpotByIndex(event.currentTarget.getAttribute("data-index")),
          $itemTitle = spotControls.ui.itemTitle,
          $itemEditPanel = $itemTitle.parent().next(),
          isItemEditable = $itemEditPanel.hasClass("editable");
        if (!isItemEditable) {
          $itemTitle.click();
        }
      },
      onDragSpotHandle: function onDragSpotHandle(event, ui) {
        event.stopPropagation();
        var currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
          deviceSuffix = "desktop" === currentDeviceMode ? "" : "_" + currentDeviceMode,
          editModel = this.getEditModel(),
          spots = editModel.getSetting("spots"),
          $spot = ui.helper,
          index = $spot.data("index"),
          currentSpotModel = spots.at(index),
          xPosKey = "x_pos",
          yPosKey = "y_pos",
          settings = {},
          isRTL = elementorFrontend.config.is_rtl,
          parentWidth = $spot.offsetParent().width(),
          parentHeight = $spot.offsetParent().height(),
          elementWidth = $spot.outerWidth(true),
          left = ui.position.left,
          right = parentWidth - left - elementWidth,
          xPos = isRTL ? right : left,
          yPos = ui.position.top,
          xPosUnit = currentSpotModel.get(xPosKey + deviceSuffix).unit,
          yPosUnit = currentSpotModel.get(yPosKey + deviceSuffix).unit;
        xPos = (xPos * 100 / parentWidth).toFixed(2);
        yPos = (yPos * 100 / parentHeight).toFixed(2);
        settings[xPosKey + deviceSuffix] = {
          size: xPos,
          unit: xPosUnit
        };
        settings[yPosKey + deviceSuffix] = {
          size: yPos,
          unit: yPosUnit
        };
        currentSpotModel.setExternalChange(settings);
        this.renderStyles();
        var t = setTimeout(function () {
          $spot.css({
            top: "",
            left: "",
            right: "",
            bottom: "",
            width: "",
            height: ""
          });
          clearTimeout(t);
        }, 250);
        var payload = {
          action: "hotsopt_updated"
        };
        window.postMessage(payload);
      },
      activateSpotDragMode: function activateSpotDragMode() {
        this.ui.spotHandle.draggable({
          addClasses: false
        });
      },
      deactivateSpotDragMode: function deactivateSpotDragMode() {
        if (!this.ui.spotHandle.draggable("instance")) {
          return;
        }
        this.ui.spotHandle.draggable("destroy");
      },
      toggleSpotDragMode: function toggleSpotDragMode() {
        var isEditMode = "edit" === elementor.channels.dataEditMode.request("activeMode");
        this.deactivateSpotDragMode();
        if (isEditMode && elementor.userCan("design")) {
          this.activateSpotDragMode();
        }
      }
    };
  };
  elementor.hooks.addFilter("element/view", function (childView, model) {
    if (isHotSpotsWidget(model)) {
      return childView.extend(getHotSpotsWidgetView(childView));
    }
    return childView;
  });

  // Handle Hotspot Drag n Drop Data update
  $(window).on("message", function (e) {
    if ("object" == _typeof(e.originalEvent.data) && Reflect.has(e.originalEvent.data, "action") && Reflect.get(e.originalEvent.data, "action") == "hotsopt_updated") {
      $('* [data-setting="size"]').first().trigger("input");
    }
  });

  // TODO: Remove if not necessary (since Elementor V3.6.0)
  var SelfHostedLiveCopy = function SelfHostedLiveCopy() {
    var self = this;
    this.model = elementor.settings.general.model;
    self.renderStyleTab = function () {
      elementor.channels.editor.on("happy:live_copy:style", function () {
        $e.route("panel/general-settings/style");
        var editor = elementor.getPanelView().currentPageView;
        editor.activateSection("_ha_live_copy_button_style");
        editor.render();
      });
    };
    self.onButtonPreviewChange = function () {
      self.model.on("change:ha_live_copy_preview", function (model, changedProp) {
        if (changedProp === "yes") {
          self.addButton();
        } else {
          self.removeButton();
        }
      });
    };
    self.getPreviewDoc = function () {
      return elementor.$previewContents && elementor.$previewContents.length ? elementor.$previewContents : $();
    };
    self.getSections = function () {
      var $sections = self.getPreviewDoc().find(".elementor-section-wrap > .elementor-section");
      return $sections.length ? $sections : $();
    };
    self.getClonedButton = function () {
      if (self.$clonedButton) {
        return self.$clonedButton;
      }
      var $copyButton = self.getPreviewDoc().find("#ha-live-copy-base");
      self.$clonedButton = $copyButton.length ? $copyButton.clone().removeAttr("id").removeAttr("style") : null;
      return self.$clonedButton;
    };
    self.addButton = function () {
      self.getSections().addClass("live-copy-preview").append(self.getClonedButton());
    };
    self.removeButton = function () {
      self.getSections().removeClass("live-copy-preview").find(".ha-live-copy-wrap").remove();
    };
    self.onPreviewLoad = function () {
      elementor.$preview.on("load", function () {
        self.removeButton();
        self.renderStyleTab();
        self.onButtonPreviewChange();
      });
    };
    self.initialize = function () {
      self.onPreviewLoad();
    };
  };

  // var selfHostedLC = new SelfHostedLiveCopy();
  // selfHostedLC.initialize();

  elementor.hooks.addAction("panel/open_editor/widget/ha-one-page-nav", function (panel, model, view) {
    initialize();
    elementor.channels.editor.on("section:activated", function (e) {
      if (e == "_section_navigation") {
        initialize();
      }
    });
    function initialize() {
      setTimeout(function () {
        $("#elementor-panel-content-wrapper [data-setting=select_design]").trigger("change");
        $("#elementor-controls").on("click", ".elementor-control-navigation_lists .elementor-repeater-add", function () {
          $("#elementor-panel-content-wrapper [data-setting=select_design]").trigger("change");
        });
      }, 500);
    }
    function hideRespective(val) {
      var elDefault = elementor.panel.$el.find(".ha-opn-design-refactor-default");
      var elOthersTitle = elementor.panel.$el.find(".ha-opn-design-refactor-others-title");
      if (val != "ha-opn-design-default") {
        elDefault.hide();
        if (val == "ha-opn-design-magool") {
          elOthersTitle.hide();
        } else {
          elOthersTitle.show();
        }
      } else {
        elDefault.show();
        elOthersTitle.show();
      }
    }
    $("#elementor-panel-content-wrapper").on("change", "[data-setting=select_design]", function () {
      hideRespective($(this).val());
    });
  });

  //for creative slider
  elementor.hooks.addAction("panel/open_editor/column", column_content_change_alert);
  elementor.hooks.addAction("panel/open_editor/content", column_content_change_alert);
  elementor.hooks.addAction("panel/open_editor/section", column_content_change_alert);
  function column_content_change_alert(panel, model, view) {
    model.attributes.settings.on('change', haCSchangeMessage);
    view.$el.on('resize', haCSchangeMessage);
    function haCSchangeMessage(e) {
      window.postMessage('ha_cs_reinit');
    }
  }
  ;

  //haGlobalBadgeReset
  elementor.channels.editor.on("haGlobalBadgeReset", function (e) {
    var container = e.container;
    var controls = container.settings.controls,
      settingsKeys = [];
    container.view.allowRender = false;
    var controlCount = 0;
    Object.entries(controls).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        controlName = _ref2[0],
        control = _ref2[1];
      if ("_ha_global_badge_section" == control.section && controlName.includes("ha_gb")) {
        settingsKeys.push(controlName);
      }
      controlCount++;
    });
    $e.run('document/elements/reset-settings', {
      container: container,
      settings: settingsKeys,
      options: {
        external: true
      }
    });
    container.view.allowRender = true;
    container.view.$el.removeClass(function (index, className) {
      return (className.match(/\bha-gb-\S+/g) || []).join(' '); // remove all "ha-gb-" class
    });
    container.render();
  });
})(jQuery);