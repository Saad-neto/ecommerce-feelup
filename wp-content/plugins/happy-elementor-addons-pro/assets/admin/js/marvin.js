"use strict";

;
(function () {
  "use strict";

  function getUniqueID() {
    return elementorCommon && elementorCommon.helpers && elementor.helpers.CommongetUniqueId || elementor.helpers.getUniqueID;
  }
  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  (function ($) {
    $(window).on("elementor/frontend/init", function () {
      if (!window['elementor']) {
        return;
      }
      var safariStorage = "https://happymonster.dev/storage/safari.php",
        eAddFilter = elementor.hooks.addFilter,
        hws = isSafari ? new HSWidgetStorage(marvin.storageKey, safariStorage, $) : new HWidgetStorage(marvin.storageKey),
        hClipBoard = new HClipBoard(hws);
      eAddFilter("elements/widget/contextMenuGroups", function (groups, element) {
        return HMenu.prepare(groups, element, hClipBoard);
      });
      eAddFilter("elements/section/contextMenuGroups", function (groups, element) {
        return HMenu.prepare(groups, element, hClipBoard, false);
      });
      eAddFilter("elements/column/contextMenuGroups", function (groups, element) {
        return HMenu.prepare(groups, element, hClipBoard, true);
      });
      eAddFilter("element/view", function (childView, model, scope) {
        var self;
        if (model.get("elType") === "column") {
          return childView.extend({
            initialize: function initialize() {
              childView.prototype.initialize.apply(this, arguments);
              self = this;
            },
            emptyView: childView.prototype.emptyView.extend({
              getContextMenuGroups: function getContextMenuGroups() {
                var groups = childView.prototype.emptyView.prototype.getContextMenuGroups.apply(this, arguments);
                return HMenu.prepareForBlankColumn(groups, self, hClipBoard);
              }
            })
          });
        }
        return childView;
      });
    });
  })(jQuery);
  var HMenu = /*#__PURE__*/
  function () {
    function HMenu() {
      _classCallCheck(this, HMenu);
    }
    _createClass(HMenu, null, [{
      key: "prepare",
      value: function prepare(contextMenuGroups, contextElement, hClipBoard, sectionOrColumn) {
        contextMenuGroups.push({
          name: "x-domain",
          actions: [{
            name: "x-copy",
            title: "X" + " Copy",
            shortcut: '<i class="hm hm-happyaddons"></i>',
            callback: function callback() {
              var hWidget = new HWidget(contextElement.model.get("widgetType"), contextElement.model.toJSON({
                copyHtmlCache: true
              }));
              hClipBoard.copy(hWidget);
            }
          }, {
            name: "x-paste",
            title: "X" + " Paste",
            shortcut: '<i class="hm hm-happyaddons"></i>',
            callback: function callback() {
              hClipBoard.paste(contextElement, sectionOrColumn);
            }
          }, {
            name: "live-paste",
            title: "Live" + " Paste",
            shortcut: '<i class="hm hm-happyaddons"></i>',
            callback: function callback() {
              hClipBoard.paste(contextElement, sectionOrColumn);
            }
          }]
        });
        return contextMenuGroups;
      }
    }, {
      key: "prepareForBlankColumn",
      value: function prepareForBlankColumn(contextMenuGroups, contextElement, hClipBoard) {
        contextMenuGroups[0].actions.push({
          name: "x-paste",
          title: "X" + " Paste",
          shortcut: '<i class="hm hm-happyaddons"></i>',
          callback: function callback() {
            hClipBoard.paste(contextElement, true);
          },
          isEnabled: function isEnabled() {
            return true;
          }
        });
        contextMenuGroups[0].actions.push({
          name: "live-paste",
          title: "Live" + " Paste",
          shortcut: '<i class="hm hm-happyaddons"></i>',
          callback: function callback() {
            hClipBoard.paste(contextElement, true);
          },
          isEnabled: function isEnabled() {
            return true;
          }
        });
        contextMenuGroups[0].actions.push({
          name: "x-insert",
          title: "Insert" + " Blank" + " Section",
          shortcut: '<i class="hm hm-happyaddons"></i>',
          callback: function callback() {
            HSection.insert(contextElement);
          },
          isEnabled: function isEnabled() {
            return true;
          }
        });
        return contextMenuGroups;
      }
    }]);
    return HMenu;
  }();
  var HSection = /*#__PURE__*/
  function () {
    function HSection() {
      _classCallCheck(this, HSection);
    }
    _createClass(HSection, null, [{
      key: "insert",
      value: function insert(element) {
        elementor.channels.data.trigger("element:before:add", {
          elType: "section"
        });
        element.addChildElement({
          id: getUniqueID(),
          elType: "section",
          settings: {},
          elements: []
        }, {
          edit: true
        });
        elementor.channels.data.trigger("element:after:add");
      }
    }]);
    return HSection;
  }();
  var HWidget = /*#__PURE__*/
  function () {
    function HWidget(widgetType, widgetCode) {
      _classCallCheck(this, HWidget);
      this.widgetType = widgetType;
      this.widgetCode = widgetCode;
    }
    _createClass(HWidget, [{
      key: "getWidgetType",
      value: function getWidgetType() {
        return this.widgetType;
      }
    }, {
      key: "getWidgetCode",
      value: function getWidgetCode() {
        return this.widgetCode;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          widgetType: this.widgetType,
          widgetCode: this.widgetCode
        };
      }
    }]);
    return HWidget;
  }();
  var HClipBoard = /*#__PURE__*/
  function () {
    function HClipBoard(widgetStorage) {
      _classCallCheck(this, HClipBoard);
      this.widgetStorage = widgetStorage;
    }
    _createClass(HClipBoard, [{
      key: "copy",
      value: function copy(widget) {
        this.widgetStorage.save(widget);
      }
    }, {
      key: "paste",
      value: function paste(element, sectionOrColumn) {
        this.widgetStorage.fetch(function (widget) {
          var widgetCode = JSON.stringify(widget.getWidgetCode()).replace('.png","id":', '.png","id":xLock').replace('.jpg","id":', '.jpg","id":xLock').replace('.gif","id":', '.gif","id":xLock').replace('.jpeg","id":', '.jpeg","id":xLock').replace('.svg","id":', '.svg","id":xLock').replace(/xLock([\d]+)/g, '"x$1"');
          element.startTransport("copy");
          elementorFrontend.storage.set("transfer", {
            type: "copy",
            elementsType: widget.getWidgetType(),
            elements: [JSON.parse(widgetCode)]
          });
          if (!sectionOrColumn) {
            element.trigger("request:paste");
          } else {
            var self = element,
              elements = elementorFrontend.storage.get("transfer").elements,
              index = 0;
            elements.forEach(function (item) {
              self.addChildElement(item, {
                at: index,
                clone: true
              });
              index++;
            });
          }
        });
      }
    }]);
    return HClipBoard;
  }();
  var HWidgetStorage = /*#__PURE__*/
  function () {
    function HWidgetStorage(storgageKey) {
      _classCallCheck(this, HWidgetStorage);
      this.storageKey = storgageKey;
      xdLocalStorage.init({
        iframeUrl: "https://happyaddons.com/marvin/index.html",
        initCallback: function initCallback() {}
      });
    }
    _createClass(HWidgetStorage, [{
      key: "save",
      value: function save(widget) {
        xdLocalStorage.setItem(this.storageKey, JSON.stringify(widget));
      }
    }, {
      key: "fetch",
      value: function fetch(callback) {
        return xdLocalStorage.getItem(this.storageKey, function (data) {
          var widgetData = JSON.parse(data.value);
          var widget = new HWidget(widgetData.widgetType, widgetData.widgetCode);
          callback(widget);
        });
      }
    }]);
    return HWidgetStorage;
  }();
  var HSWidgetStorage = /*#__PURE__*/
  function () {
    function HSWidgetStorage(storgageKey, storageEndpoint, jQuery) {
      _classCallCheck(this, HSWidgetStorage);
      this.storageKey = storgageKey;
      this.storageEndpoint = storageEndpoint;
      this.$ = jQuery;
    }
    _createClass(HSWidgetStorage, [{
      key: "save",
      value: function save(widget) {
        this.$.post(this.storageEndpoint, {
          key: this.storageKey,
          data: JSON.stringify(widget)
        }); //xdLocalStorage.setItem(this.storageKey, JSON.stringify(widget));
      }
    }, {
      key: "fetch",
      value: function fetch(callback) {
        this.$.get(this.storageEndpoint, {
          key: this.storageKey
        }, function (data) {
          var widgetData = JSON.parse(data);
          var widget = new HWidget(widgetData.widgetType, widgetData.widgetCode);
          callback(widget);
        });
      }
    }]);
    return HSWidgetStorage;
  }();
  window.HWidgetStorage = HWidgetStorage;
  window.HSWidgetStorage = HSWidgetStorage;
  window.HClipBoard = HClipBoard;
  window.HWidget = HWidget;
})();