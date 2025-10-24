"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
;
(function () {
  "use strict";

  function HABrowserDetect() {
    var userAgent = navigator.userAgent;
    var browserName;
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "safari";
    } else if (userAgent.match(/opr/ / i)) {
      browserName = "opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "edge";
    } else {
      browserName = "unknow";
    }
    return browserName;
  }
  function HAosDetect() {
    var userAgent = window.navigator.userAgent;
    var os = "Unknown OS";
    if (userAgent.indexOf("Win") != -1) os = "Windows";
    if (userAgent.indexOf("Mac") != -1) os = "MacOS";
    if (userAgent.indexOf("X11") != -1) os = "UNIX";
    if (userAgent.indexOf("Linux") != -1) os = "Linux";
    return os;
  }
  function getUniqueID() {
    return elementorCommon && elementorCommon.helpers && elementorCommon.helpers.getUniqueId() || elementor.helpers.getUniqueID;
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
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  var HMenu = /*#__PURE__*/
  function () {
    function HMenu() {
      _classCallCheck(this, HMenu);
    }
    _createClass(HMenu, null, [{
      key: 'prepare',
      value: function prepare(groups, element, clipboard, label) {
        var clipboardIndex = _.findIndex(groups, function (group) {
            return group.name === 'clipboard';
          }),
          addNewIndex = _.findIndex(groups, function (group) {
            return group.name === 'addNew';
          });
        if (addNewIndex >= 0) {
          groups[addNewIndex].actions.push({
            name: 'x-insert',
            title: 'Add' + ' Nested' + ' Section',
            icon: 'hm hm-happyaddons',
            callback: function callback() {
              HSection.insert(element);
            },
            isEnabled: function isEnabled() {
              return true;
            }
          });
        }
        groups.splice(clipboardIndex + 1, 0, {
          name: 'hax-clipboard',
          actions: [{
            name: 'x-copy',
            title: 'X' + ' Copy',
            icon: 'hm hm-happyaddons',
            shortcut: label,
            callback: function callback() {
              clipboard.copy(element);
            }
          }, {
            name: 'x-copy-all',
            title: 'X' + ' Copy All',
            icon: 'hm hm-happyaddons',
            shortcut: 'Content',
            callback: function callback() {
              clipboard.copyAll();
            }
          }, {
            name: 'x-paste',
            title: 'X' + ' Paste',
            icon: 'hm hm-happyaddons',
            shortcut: 'Live Paste',
            callback: function callback() {
              clipboard.paste(element);
            }
          }]
        });
        return groups;
      }
    }, {
      key: "prepareForBlankColumn",
      value: function prepareForBlankColumn(groups, element, clipboard) {
        groups.push({
          name: 'hax-clipboard',
          actions: [{
            name: 'x-copy-all',
            title: 'X' + ' Copy All',
            icon: 'hm hm-happyaddons',
            shortcut: 'Content',
            callback: function callback() {
              clipboard.copyAll();
            }
          }, {
            name: 'x-paste',
            title: 'X' + ' Paste',
            icon: 'hm hm-happyaddons',
            shortcut: 'Live Paste',
            callback: function callback() {
              clipboard.paste(element);
            }
          }]
        });
        return groups;
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
        var elementView = element.getContainer().view;
        if (elementView.getElementType() !== 'column') {
          return;
        }
        elementView.addElement({
          elType: 'section',
          isInner: true,
          settings: {},
          elements: [{
            id: getUniqueID(),
            elType: 'column',
            isInner: true,
            settings: {
              _column_size: 100
            },
            elements: []
          }]
        });
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
      this.lastCopiedElement = ''; // widget code string
      this.lastPastedElementModel = {}; // last pasted element cloned model
    }
    _createClass(HClipBoard, [{
      key: 'copy',
      value: function copy(element) {
        var widget = new HWidget(element.model.get("widgetType"), element.model.toJSON());
        navigator.clipboard.writeText(JSON.stringify(widget)).then(function () {})["catch"](function (error) {
          console.error('Error copying text to clipboard: ', error);
        });
      }
    }, {
      key: 'copyAll',
      value: function copyAll() {
        var containers = Object.values(elementor.getPreviewView().children._views).map(function (view) {
            return view.getContainer();
          }),
          contents = containers.map(function (container) {
            return container.model.toJSON();
          }),
          page = new HWidget('page', contents);
        navigator.clipboard.writeText(JSON.stringify(page)).then(function () {})["catch"](function (error) {
          console.error('Error copying text to clipboard: ', error);
        });
      }
    }, {
      key: 'paste',
      value: function paste(element) {
        var self = this;
        var widget = {};
        if ('firefox' == HABrowserDetect()) {
          var closeBody = element.$el.closest("body");
          var dialogBox = closeBody.find('.ha-live-copy-dialog-box-wrap');
          if (0 == dialogBox.length) {
            var shortCutKey = 'MacOS' == HAosDetect() ? 'Cmd + V' : 'Ctrl + V';
            var wrap = jQuery('<div>', {
              "class": 'ha-live-copy-dialog-box-wrap open',
              contenteditable: 'false'
            });
            var box = jQuery('<div>', {
              "class": 'ha-live-copy-dialog-box'
            });
            var input = jQuery('<input>', {
              "class": 'ha-live-copy-dialog-box-input',
              type: 'text'
            }).attr('autocomplete', 'off');
            var close = jQuery('<span>', {
              "class": 'ha-live-copy-dialog-close-button'
            }).html('<i class="eicon-close"></i>');
            var header = jQuery('<div>', {
              "class": 'ha-live-copy-dialog-header'
            }).html(shortCutKey);
            var message = jQuery('<div>', {
              "class": 'ha-live-copy-dialog-message'
            }).html('<p class="ha-live-copy-dialog-description">To paste the element from your other site.</p>');
            var error = jQuery('<p>', {
              "class": 'ha-live-copy-dialog-error error-not-found'
            }).html('The action could not be completed. Make sure, Your clipboard is not empty or You are copying using HappyAddons xCopy or You are not pasting container on Elementor section.');
            box.append(input).append(close).append(header).append(message).append(error);
            wrap.append(box);
            closeBody.append(wrap);
            dialogBox = wrap;
            closeBody.find('.ha-live-copy-dialog-box-wrap input').focus();
            closeBody.find('.ha-live-copy-dialog-box-wrap').on('click', function (event) {
              if (event.currentTarget == event.target || dialogBox.find('.ha-live-copy-dialog-close-button')[0] == event.target || dialogBox.find('i.eicon-close')[0] == event.target) {
                dialogBox.removeClass('open');
              }
            });
          }
          if (!dialogBox.hasClass('open')) {
            //closeBody.find('.ha-live-copy-dialog-box-wrap input').focus();
            dialogBox.addClass('open');
            closeBody.find('.ha-live-copy-dialog-box-wrap input').focus();
          }
          if (!closeBody.find('.ha-live-copy-dialog-error').hasClass('error-not-found')) {
            closeBody.find('.ha-live-copy-dialog-error').addClass('error-not-found');
          }
          element.$el.closest("body").find('.ha-live-copy-dialog-box-wrap').on("paste.onFireFoxLivePaste", "input", function (event) {
            event.preventDefault();
            var clipText = event.originalEvent.clipboardData.getData('text');
            if (!isJson(clipText)) {
              closeBody.find('.ha-live-copy-dialog-error').removeClass('error-not-found');
              element.$el.closest("body").find('.ha-live-copy-dialog-box-wrap').off("paste.onFireFoxLivePaste");
              return;
            }
            widget = JSON.parse(clipText);
            if (_typeof(widget) != 'object' || _typeof(widget) == 'object' && !widget.hasOwnProperty('widgetType') && !widget.hasOwnProperty('widgetCode')) {
              closeBody.find('.ha-live-copy-dialog-error').removeClass('error-not-found');
              element.$el.closest("body").find('.ha-live-copy-dialog-box-wrap').off("paste.onFireFoxLivePaste");
              return;
            }
            haAfterPaste(widget, self, element);
            dialogBox.removeClass('open');
            element.$el.closest("body").find('.ha-live-copy-dialog-box-wrap').off("paste.onFireFoxLivePaste");
          });
          return;
        } else {
          navigator.clipboard.readText().then(function (clipText) {
            if (!isJson(clipText)) {
              return;
            }
            widget = JSON.parse(clipText);
            if (_typeof(widget) != 'object' || _typeof(widget) == 'object' && !widget.hasOwnProperty('widgetType') && !widget.hasOwnProperty('widgetCode')) {
              console.log('its not object or not found widgetType & widgetCode key');
              return;
            }
            haAfterPaste(widget, self, element);
          })["catch"](function (error) {
            console.error('Error pasting text from clipboard: ', error);
          });
        }
      }
    }]);
    return HClipBoard;
  }();
  var eAddFilter = elementor.hooks.addFilter,
    hClipBoard = new HClipBoard({});
  eAddFilter('elements/widget/contextMenuGroups', function (groups, element) {
    return HMenu.prepare(groups, element, hClipBoard, 'Widget');
  });
  eAddFilter('elements/container/contextMenuGroups', function (groups, element) {
    return HMenu.prepare(groups, element, hClipBoard, 'Container');
  });
  eAddFilter('elements/section/contextMenuGroups', function (groups, element) {
    return HMenu.prepare(groups, element, hClipBoard, 'Section');
  });
  eAddFilter('elements/column/contextMenuGroups', function (groups, element) {
    return HMenu.prepare(groups, element, hClipBoard, 'Column');
  });
  eAddFilter('element/view', function (childView, model) {
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
  function haAfterPaste(widget, self, element) {
    // Do full page processing
    if (widget.widgetType === 'page' && widget.widgetCode && widget.widgetCode.length > 0) {
      var $previewBody = elementor.$previewContents.find('html');
      jQuery.ajax({
        url: marvin.ajaxURL,
        method: 'POST',
        data: {
          type: 'import',
          action: 'ha_process_ixport',
          nonce: marvin.nonce,
          content: JSON.stringify(widget.widgetCode)
        },
        beforeSend: function beforeSend() {
          $previewBody.addClass('ha-ixport').attr('data-ixport-text', 'Processing...');
        }
      }).done(function (response) {
        if (response.success) {
          var sections = response.data[0],
            previewContainer = elementor.getPreviewContainer(),
            options = {};
          options.at = previewContainer.view.collection.length;
          sections.forEach(function (model) {
            $e.run('document/elements/create', {
              container: previewContainer,
              model: model,
              options: options
            });
            options.at++;
          });
          $previewBody.attr('data-ixport-text', 'Processing completed');
          var t = setTimeout(function () {
            $previewBody.removeClass('ha-ixport');
            clearTimeout(t);
          }, 60);
        }
      });
      return;
    }
    var elementCode = widget.widgetCode,
      elementCodeString = JSON.stringify(elementCode),
      hasImageInElementCode = /\.(gif|jpg|jpeg|svg|png)/gi.test(elementCodeString),
      selectedElementType = element.model.get('elType'),
      copiedElementType = elementCode.elType,
      model = {
        elType: copiedElementType,
        settings: elementCode.settings
      },
      container = null,
      options = {
        at: 0
      };
    if (copiedElementType === 'section') {
      var siblingSectionContainer = null;
      if (selectedElementType === 'widget') {
        siblingSectionContainer = element.getContainer().parent.parent;
      } else if (selectedElementType === 'column') {
        siblingSectionContainer = element.getContainer().parent;
      } else if (selectedElementType === 'section') {
        siblingSectionContainer = element.getContainer();
      } else if (selectedElementType === 'container') {
        siblingSectionContainer = element.getContainer();
      }
      model.elements = elementCode.elements;
      container = siblingSectionContainer.parent;
      options.at = siblingSectionContainer.view.getOption('_index') + 1;
      if (siblingSectionContainer.model.get('isInner')) {
        model.isInner = true;
      }
    } else if (copiedElementType === 'container') {
      var siblingSectionContainer = null;
      if (selectedElementType === 'widget') {
        siblingSectionContainer = element.getContainer().parent.parent;
        siblingSectionContainer = !siblingSectionContainer.parent ? element.getContainer().parent : siblingSectionContainer;
      } else if (selectedElementType === 'column') {
        siblingSectionContainer = element.getContainer().parent;
      } else if (selectedElementType === 'section') {
        siblingSectionContainer = element.getContainer();
      } else if (selectedElementType === 'container') {
        siblingSectionContainer = element.getContainer();
      }
      model.elements = elementCode.elements;
      container = siblingSectionContainer.parent;
      options.at = siblingSectionContainer.view.getOption('_index') + 1;
      if (siblingSectionContainer.model.get('isInner')) {
        model.isInner = true;
      }
    } else if (copiedElementType === 'column') {
      model.elements = elementCode.elements;
      if (selectedElementType === 'widget') {
        container = element.getContainer().parent.parent;
        options.at = element.getContainer().parent.view.getOption('_index') + 1;
      } else if (selectedElementType === 'column') {
        container = element.getContainer().parent;
        options.at = element.getOption('_index') + 1;
      } else if (selectedElementType === 'section') {
        container = element.getContainer();
      }
    } else if (copiedElementType === 'widget') {
      model.widgetType = elementCode.widgetType;
      container = element.getContainer();
      if (selectedElementType === 'widget') {
        container = element.getContainer().parent;
        options.at = element.getOption('_index') + 1;
      } else if (selectedElementType === 'column') {
        container = element.getContainer();
      } else if (selectedElementType === 'section') {
        container = element.children.findByIndex(0).getContainer();
      }
    }

    // Do not request for element that is already been processed and pasted
    // So clone the already pasted element and ignore the rest ;)
    if (hasImageInElementCode && !_.isEmpty(self.lastPastedElementModel) && self.lastCopiedElement === elementCodeString) {
      options.clone = true;
      $e.run('document/elements/create', {
        model: self.lastPastedElementModel,
        container: container,
        options: options
      });
      return;
    }
    var newElement = $e.run('document/elements/create', {
      model: model,
      container: container,
      options: options
    });

    // Process image import request
    if (hasImageInElementCode) {
      jQuery.ajax({
        url: marvin.ajaxURL,
        method: 'POST',
        data: {
          type: 'import',
          action: 'ha_process_ixport',
          nonce: marvin.nonce,
          content: elementCodeString
        },
        beforeSend: function beforeSend() {
          newElement.view.$el.addClass('ha-ixport').attr('data-ixport-text', 'Processing...');
        }
      }).done(function (response) {
        if (response.success) {
          var parsedElement = response.data[0];
          model.settings = parsedElement.settings;
          model.elType = parsedElement.elType;
          if (parsedElement.elType === 'widget') {
            model.widgetType = parsedElement.widgetType;
          } else {
            model.elements = parsedElement.elements;
          }
          newElement.view.$el.attr('data-ixport-text', 'Processing completed');
          var t = setTimeout(function () {
            // Delete the temporary element used as placeholder
            $e.run('document/elements/delete', {
              container: newElement
            });

            // Recreate the element with parsed data
            var reCreatedElement = $e.run('document/elements/create', {
              model: model,
              container: container,
              options: options
            });
            self.lastPastedElementModel = elementorCommon.helpers.cloneObject(reCreatedElement.model.toJSON());
            clearTimeout(t);
          }, 750);
        }
      });
    }
    self.lastCopiedElement = elementCodeString;
  }
})();