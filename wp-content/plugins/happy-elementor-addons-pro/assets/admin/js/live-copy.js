"use strict";

;
(function ($) {
  'use strict';

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
  var Widget = /*#__PURE__*/
  function () {
    function Widget(widgetType, widgetCode) {
      _classCallCheck(this, Widget);
      this.widgetType = widgetType;
      this.widgetCode = widgetCode;
    }
    _createClass(Widget, [{
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
    return Widget;
  }();
  var ClipBoard = /*#__PURE__*/
  function () {
    function ClipBoard(widgetStorage) {
      _classCallCheck(this, ClipBoard);
      this.widgetStorage = widgetStorage;
    }
    _createClass(ClipBoard, [{
      key: "copy",
      value: function copy(widget) {
        navigator.clipboard.writeText(JSON.stringify(widget)).then(function () {})["catch"](function (error) {
          console.error('Error copying text to clipboard: ', error);
        });
      }
    }]);
    return ClipBoard;
  }();
  $(window).on('elementor/frontend/init', function () {
    var $cpBtnBase = $('#ha-live-copy-base'),
      $cpBtnClone = $cpBtnBase.clone().removeAttr('id').removeAttr('style'),
      $sections = $('.elementor-section-wrap > .elementor-section'),
      $containers = $('.e-con'),
      isEditorActive = $('body').hasClass('elementor-editor-active'),
      $document = $(document);
    if ($sections.length <= 0) {
      $sections = $(".elementor-section.elementor-top-section");
    }
    $sections = $.merge($sections, $containers);
    if (!isEditorActive) {
      $sections.filter(function (index, section) {
        var $section = $(section),
          settings = $section.data('settings'),
          isEnabled = settings && settings['_ha_enable_live_copy'] && settings['_ha_enable_live_copy'] === 'yes';
        if ($section.hasClass('e-container') && $section.parents('.e-container').length) {
          isEnabled = false;
        }
        return isEnabled;
      }).append($cpBtnClone);
    }
    $sections.on('click.HappyAddonsLiveCopy', '.ha-live-copy-btn', function (event) {
      event.preventDefault();
      var sectionData = $(event.delegateTarget).data(),
        $button = $(this),
        postID = $button.parents('[data-elementor-id]').data('elementor-id');
      if ($button.hasClass('on-progress')) {
        return;
      }
      if (sectionData.element_type === 'section' || sectionData.element_type === 'container') {
        $document.trigger({
          type: 'onHappyAddonsLiveCopy',
          sectionId: sectionData.id,
          elType: sectionData.element_type,
          postID: postID
        });
        $button.addClass('on-progress');
      }
    });
    var clipBoard = new ClipBoard({});
    $document.on('onHappyAddonsLiveCopy', function (args) {
      var $btn = $('[data-id="' + args.sectionId + '"] .ha-live-copy-btn');
      $btn.css('cursor', 'progress');
      $.get(livecopy.ajax_url, {
        action: 'get_section_data',
        section_id: args.sectionId,
        elType: args.elType,
        post_id: args.postID,
        nonce: livecopy.nonce
      }).done(function (res) {
        if (!res.success) {
          console.log('Something is wrong!');
          return;
        }

        // var data = new Widget('section', res.data);
        var data = new Widget(args.elType, res.data);
        clipBoard.copy(data);
        var ct = setTimeout(function () {
          $btn.removeAttr('style').text('Copied').removeClass('on-progress');
          clearTimeout(ct);
          var t = setTimeout(function () {
            $btn.text('Live Copy');
            clearTimeout(t);
          }, 1000);
        }, 500);
      });
    });
  });
})(jQuery);