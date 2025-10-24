"use strict";

;
(function ($) {
  'use strict';

  var $window = $(window),
    $document = $(document);
  function createEditHandle($scope) {
    var $documents = $scope.find('[data-elementor-id]'),
      sectionCache = [];
    $documents.each(function (index, document) {
      var $document = $(document),
        documentID = $document.data('elementor-id'),
        $handle,
        $handleIcon,
        $handleTitle,
        $existingHandle;
      if (!documentID || sectionCache.indexOf(documentID) !== -1) {
        return;
      }
      $existingHandle = $document.find('.ha-section-handle');
      if ($existingHandle.length) {
        return;
      }
      $handle = $('<div>', {
        "class": 'elementor-document-handle ha-section-handle',
        'data-section-id': documentID
      });
      $handleIcon = $('<i>', {
        "class": 'eicon-edit'
      });
      $handleTitle = $('<div>', {
        "class": 'elementor-document-handle__title'
      }).text('Edit Section');
      $handle.append($handleIcon, $handleTitle);
      $document.prepend($handle);
      sectionCache.push(documentID);
    });
  }
  function bindClickHandler() {
    $document.on('click.onSectionHandle', '.ha-section-handle', function () {
      var $handle = $(this),
        sectionID = $handle.data('section-id');
      elementorCommon.api.internal('panel/state-loading');
      elementorCommon.api.run('editor/documents/switch', {
        id: sectionID
      })["finally"](function () {
        return elementorCommon.api.internal('panel/state-ready');
      });
    });
  }
  $window.on('elementor/frontend/init', function () {
    bindClickHandler();
    elementorFrontend.hooks.addAction('frontend/element_ready/widget', function ($scope) {
      if ($scope.hasClass('happy-addon') && $scope.find('[data-elementor-type="section"]').length) {
        createEditHandle($scope);
      }
    });
  });
})(jQuery);