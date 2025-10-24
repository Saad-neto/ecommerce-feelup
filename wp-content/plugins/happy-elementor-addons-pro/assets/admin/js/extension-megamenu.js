"use strict";

jQuery(document).ready(function (e) {
  "use strict";

  var menuList = document.getElementById("menu-to-edit");
  var CARD_UPDATE_EVENT_NAME = "cardupdate";
  var badgeRadiusTopLeft = e("#ha-menu-badge-radius-topLeft");
  var badgeRadiusTopRight = e("#ha-menu-badge-radius-topRight");
  var badgeRadiusBottomLeft = e("#ha-menu-badge-radius-bottomLeft");
  var badgeRadiusBottomRight = e("#ha-menu-badge-radius-bottomRight");
  var combinedBadgeRadius = "";
  e("body").on("DOMSubtreeModified", "#nav-menu-header", function () {
    setTimeout(function () {
      var isEnabled = e("#ha-menu-metabox-input-is-enabled").is(":checked");
      if (isEnabled) {
        e("body").removeClass("is_mega_disabled").addClass("is_mega_enabled");
      } else {
        e("body").removeClass("is_mega_enabled").addClass("is_mega_disabled");
      }
    }, 200);
  });
  e(".ha-menu-wpcolor-picker").wpColorPicker();
  var happyIcons = {
    "happy-icons": {
      regular: {
        prefix: "hm hm-",
        "icon-style": "hm-regular",
        "list-icon": "hm hm-happyaddons",
        icons: ["hm hm-3d-rotate", "hm hm-degree", "hm hm-accordion-horizontal", "hm hm-accordion-vertical", "hm hm-alarm-clock", "hm hm-alien-gun", "hm hm-alien", "hm hm-anchor", "hm hm-android", "hm hm-angle-down", "hm hm-angle-left", "hm hm-angle-right", "hm hm-angle-up", "hm hm-apple", "hm hm-arrow-left", "hm hm-arrow-right", "hm hm-arrow-zoom-out", "hm hm-arrow-corner", "hm hm-arrow-down", "hm hm-arrow-left1", "hm hm-arrow-right1", "hm hm-arrow-up", "hm hm-article", "hm hm-avatar-man", "hm hm-avatar-woman", "hm hm-badge1", "hm hm-badge2", "hm hm-badge3", "hm hm-bamboo", "hm hm-basketball", "hm hm-battery", "hm hm-beach-seat", "hm hm-bell", "hm hm-bicycle", "hm hm-blog-content", "hm hm-bluetooth", "hm hm-board", "hm hm-body", "hm hm-bomb", "hm hm-bond-hand", "hm hm-bond", "hm hm-bonsai", "hm hm-book", "hm hm-bowl", "hm hm-brick-wall", "hm hm-brush-paint", "hm hm-brush-roll", "hm hm-brush", "hm hm-bug", "hm hm-bulb", "hm hm-calculation", "hm hm-calendar", "hm hm-camera", "hm hm-candle", "hm hm-candles", "hm hm-car", "hm hm-card", "hm hm-caret-down", "hm hm-caret-fill-down", "hm hm-caret-fill-left", "hm hm-caret-fill-right", "hm hm-caret-fill-up", "hm hm-caret-left", "hm hm-caret-right", "hm hm-caret-up", "hm hm-carousal", "hm hm-cart-empty", "hm hm-cart-full", "hm hm-caution", "hm hm-chair", "hm hm-chair2", "hm hm-chat-bubble-single", "hm hm-chat-bubble", "hm hm-cheese", "hm hm-chef-cap", "hm hm-clip-board", "hm hm-clip", "hm hm-cloud-down", "hm hm-cloud-up", "hm hm-cloud", "hm hm-code-browser", "hm hm-code-clean", "hm hm-code", "hm hm-cog", "hm hm-color-card", "hm hm-color-plate", "hm hm-compass-math", "hm hm-compass", "hm hm-corner", "hm hm-crop", "hm hm-cross-circle", "hm hm-cross-game", "hm hm-cross-gap", "hm hm-cross", "hm hm-crown", "hm hm-cube", "hm hm-cup-coffee", "hm hm-cup", "hm hm-currency-paper", "hm hm-dashboard", "hm hm-delivery-van", "hm hm-diamond-ring", "hm hm-direction-both", "hm hm-direction-right", "hm hm-disable-person", "hm hm-disc", "hm hm-dislike", "hm hm-dollar-on-hand", "hm hm-door-path", "hm hm-Download-circle", "hm hm-download", "hm hm-drag-inside", "hm hm-drag-outside", "hm hm-drag", "hm hm-drawer", "hm hm-dribbble", "hm hm-dropper", "hm hm-egg-fry", "hm hm-ellipsis-fill-h", "hm hm-ellipsis-fill-v", "hm hm-ellipsis-horizontal", "hm hm-ellipsis-vertical", "hm hm-emo-normal", "hm hm-emo-sad", "hm hm-emo-smile", "hm hm-envelop", "hm hm-facebook", "hm hm-fancy-futton", "hm hm-feeder", "hm hm-file-cabinet", "hm hm-file-rotate", "hm hm-file", "hm hm-files", "hm hm-film-roll", "hm hm-film", "hm hm-finger-index", "hm hm-finger-print", "hm hm-fire-flame", "hm hm-flag", "hm hm-flip-card1", "hm hm-flip-card2", "hm hm-folder", "hm hm-football", "hm hm-footer", "hm hm-form", "hm hm-forward", "hm hm-fountain-pen", "hm hm-gender-female", "hm hm-gender-male", "hm hm-gender-sign", "hm hm-gender", "hm hm-ghost", "hm hm-gift-box", "hm hm-globe1", "hm hm-globe2", "hm hm-globe3", "hm hm-globe4", "hm hm-google", "hm hm-graduate-cap", "hm hm-graph-bar", "hm hm-graph-pie", "hm hm-graph", "hm hm-grid-even", "hm hm-grid-masonry", "hm hm-grid-twist", "hm hm-grid", "hm hm-group", "hm hm-hand-mike", "hm hm-hand-watch", "hm hm-hand", "hm hm-header", "hm hm-headphone", "hm hm-headset", "hm hm-heart-beat", "hm hm-hexa", "hm hm-highlighter", "hm hm-home", "hm hm-hot-spot", "hm hm-hotdog", "hm hm-ice-cream", "hm hm-icon-box", "hm hm-imac", "hm hm-image-compare", "hm hm-image-slider", "hm hm-image", "hm hm-inbox", "hm hm-infinity", "hm hm-info", "hm hm-injection", "hm hm-instagram", "hm hm-jar-chemical", "hm hm-key", "hm hm-language-change", "hm hm-laptop", "hm hm-layer", "hm hm-lens", "hm hm-like", "hm hm-line-graph-pointed", "hm hm-link", "hm hm-linkedin", "hm hm-linux", "hm hm-list-2", "hm hm-list-group", "hm hm-list", "hm hm-location-pointer", "hm hm-lock", "hm hm-logo-carousel", "hm hm-logo-grid", "hm hm-lotus", "hm hm-love", "hm hm-madel", "hm hm-magic-wand", "hm hm-magnet", "hm hm-mail-open", "hm hm-man-range", "hm hm-map-marker", "hm hm-map-pointer", "hm hm-measurement", "hm hm-memory", "hm hm-menu-price", "hm hm-micro-chip", "hm hm-microphone1", "hm hm-microphone2", "hm hm-mobile", "hm hm-money-bag", "hm hm-money", "hm hm-monitor", "hm hm-mouse", "hm hm-muscle", "hm hm-net", "hm hm-network1", "hm hm-network2", "hm hm-newspaper", "hm hm-nuclear-circle", "hm hm-office-file", "hm hm-pacman", "hm hm-paper-fold", "hm hm-paper-plane-alt", "hm hm-paper-plane", "hm hm-pause", "hm hm-pen-head", "hm hm-pen-pencil", "hm hm-pen-scale", "hm hm-pen-paper", "hm hm-pen", "hm hm-pencil", "hm hm-pendrive", "hm hm-phone", "hm hm-pillar", "hm hm-pin-man-range", "hm hm-pin-man", "hm hm-pin", "hm hm-plane", "hm hm-play-end", "hm hm-play-next", "hm hm-play-previous", "hm hm-play-start", "hm hm-play-button", "hm hm-play-store", "hm hm-play", "hm hm-playing-card", "hm hm-plus-box", "hm hm-plus-circle", "hm hm-plus-gap", "hm hm-plus-open", "hm hm-popup", "hm hm-power", "hm hm-printer", "hm hm-progress-bar", "hm hm-promo", "hm hm-pulse", "hm hm-puzzle", "hm hm-question", "hm hm-quote", "hm hm-radar", "hm hm-radiation", "hm hm-reading-glass-alt", "hm hm-reading-glass", "hm hm-recycle-bin", "hm hm-recycle", "hm hm-refresh-time", "hm hm-reply", "hm hm-responsive-device", "hm hm-review", "hm hm-rocket1", "hm hm-rocket2", "hm hm-rss", "hm hm-safety-cap", "hm hm-safety-kit", "hm hm-sand-watch", "hm hm-scale", "hm hm-scanner", "hm hm-scissor", "hm hm-screen", "hm hm-search", "hm hm-seo", "hm hm-server-network", "hm hm-server", "hm hm-share", "hm hm-shield", "hm hm-ship", "hm hm-shirt", "hm hm-shopping-bag1", "hm hm-shopping-bag2", "hm hm-shopping-bag3", "hm hm-shopping-bag4", "hm hm-shuffle", "hm hm-shutter", "hm hm-sign-in", "hm hm-sign-out", "hm hm-sitemap1", "hm hm-sitemap2", "hm hm-skart", "hm hm-skull", "hm hm-skyscraper", "hm hm-slider-doc", "hm hm-slider-h-range", "hm hm-slider-image", "hm hm-slider-range-h", "hm hm-slider-v-open", "hm hm-slider-video", "hm hm-slider", "hm hm-smart-watch", "hm hm-snow", "hm hm-spa-face", "hm hm-spa-stone-flower", "hm hm-spa-stone", "hm hm-spark", "hm hm-speaker-off", "hm hm-speaker-on", "hm hm-spoon-fork", "hm hm-spoon", "hm hm-star", "hm hm-step-flow", "hm hm-steps", "hm hm-stop-watch", "hm hm-stop", "hm hm-support-call", "hm hm-tab", "hm hm-table-lamp", "hm hm-tablet", "hm hm-tag", "hm hm-target-arrow", "hm hm-target", "hm hm-target1", "hm hm-team-carousel", "hm hm-team-member", "hm hm-tennis-ball", "hm hm-terminal", "hm hm-testimonial-carousel", "hm hm-testimonial", "hm hm-text-animation", "hm hm-theatre", "hm hm-tick-circle", "hm hm-tick", "hm hm-tickets", "hm hm-tie-knot", "hm hm-tie", "hm hm-timeline", "hm hm-toggle", "hm hm-tools", "hm hm-tree-square", "hm hm-twitter-bird", "hm hm-twitter", "hm hm-ufo", "hm hm-umbralla", "hm hm-unlock", "hm hm-up-down", "hm hm-upload", "hm hm-upward-top-right", "hm hm-user-female", "hm hm-user-id", "hm hm-user-male", "hm hm-video-camera", "hm hm-water-drop", "hm hm-weather-cloud-day", "hm hm-weather-cloud", "hm hm-weather-day-rain", "hm hm-weather-day-snow", "hm hm-weather-day-windy-rain", "hm hm-weather-flood", "hm hm-weather-night-cloud", "hm hm-weather-rain-alt", "hm hm-weather-rain", "hm hm-weather-snow", "hm hm-weather-sun-rain", "hm hm-weather-sun", "hm hm-weather-sunny-day", "hm hm-weather-thunder", "hm hm-weather-windy-rain", "hm hm-webcam1", "hm hm-webcam2", "hm hm-weight-scale", "hm hm-windows", "hm hm-wine-glass2", "hm hm-wine-glass", "hm hm-worker-cap", "hm hm-youtube", "hm hm-centralize", "hm hm-add-section", "hm hm-advanced-heading", "hm hm-air-baloon", "hm hm-arrow2", "hm hm-bicycle2", "hm hm-bond2", "hm hm-bond3", "hm hm-bond4", "hm hm-calendar2", "hm hm-carousel", "hm hm-code-page", "hm hm-comment-circle", "hm hm-comment-square", "hm hm-copy", "hm hm-cursor", "hm hm-envelop2", "hm hm-factory", "hm hm-finger-point", "hm hm-finger-swipe-both", "hm hm-finger-swipe-corner", "hm hm-finger-swipe-left", "hm hm-finger-swipe-up", "hm hm-finger-swipe", "hm hm-finger-touch", "hm hm-folder-network", "hm hm-folder-sync", "hm hm-graph-bar2", "hm hm-graph-pie2", "hm hm-heading-h", "hm hm-heading-html", "hm hm-heart", "hm hm-home2", "hm hm-indent-left", "hm hm-indent-right", "hm hm-lock-close", "hm hm-lock-open", "hm hm-map-pointer-add", "hm hm-map-pointer-check", "hm hm-map-pointer-delete", "hm hm-map-pointer2", "hm hm-map", "hm hm-navigation1", "hm hm-navigation2", "hm hm-page-export", "hm hm-page-sync", "hm hm-piramid", "hm hm-plug", "hm hm-point-marker", "hm hm-quote2", "hm hm-refresh-check", "hm hm-refresh", "hm hm-refresh2", "hm hm-scrolling-image", "hm hm-sign-turn-right", "hm hm-speedometer", "hm hm-sticky", "hm hm-sync-cloud", "hm hm-sync", "hm hm-sync2", "hm hm-table-lamp2", "hm hm-target2", "hm hm-timeline-spiral", "hm hm-tv", "hm hm-vespa", "hm hm-happyaddons", "hm hm-brain", "hm hm-breadcrumbs", "hm hm-circular-chat", "hm hm-currency-exchange", "hm hm-cta", "hm hm-data-table", "hm hm-display-condition", "hm hm-digital-memory", "hm hm-dollar-box", "hm hm-faq", "hm hm-facebook-feed", "hm hm-header-footer", "hm hm-heart", "hm hm-image-accordion", "hm hm-image-masking", "hm hm-instagram", "hm hm-mail-chimp", "hm hm-minus-large", "hm hm-minus-small", "hm hm-mobile-chat", "hm hm-motion-button", "hm hm-news-ticker", "hm hm-offcanvas-menu", "hm hm-post-grid", "hm hm-post-list", "hm hm-post-tab", "hm hm-pricing-menu", "hm hm-scheduled-section", "hm hm-section-link", "hm hm-sticky-video", "hm hm-section-nesting", "hm hm-traffic-signal", "hm hm-tshirt", "hm hm-twitter-feed", "hm hm-grid-layout", "hm hm-add-to-cart-button", "hm hm-billing-address", "hm hm-cart", "hm hm-Category-Carousel", "hm hm-Category-Grid", "hm hm-Category-List", "hm hm-checkout-1", "hm hm-checkout-2", "hm hm-compare", "hm hm-edit-menu", "hm hm-facebook-review", "hm hm-fb-messanger", "hm hm-filter", "hm hm-google-review", "hm hm-grid-filter", "hm hm-home3", "hm hm-horizontal-timeline", "hm hm-image-scroll", "hm hm-mini-cart", "hm hm-off-canvas-cart", "hm hm-popup1", "hm hm-post-list", "hm hm-Product-Carousel", "hm hm-product-filter", "hm hm-product-gallery", "hm hm-Product-Grid", "hm hm-Product-List-double", "hm hm-product-list-single", "hm hm-product-rating", "hm hm-product-table", "hm hm-product-variation", "hm hm-retina-image", "hm hm-shipping-address", "hm hm-shop", "hm hm-shopping-details", "hm hm-sticky-video-2", "hm hm-Template-Import", "hm hm-trendy-product", "hm hm-user-check", "hm hm-User-Circle", "hm hm-user-plus", "hm hm-user", "hm hm-video-gallery", "hm hm-wishlist"]
      }
    }
  };
  function dispatchCardEvent(data) {
    menuList.dispatchEvent(new CustomEvent(CARD_UPDATE_EVENT_NAME, {
      detail: data
    }));
  }
  menuList.addEventListener(CARD_UPDATE_EVENT_NAME, handleCardUpdate);
  function handleCardUpdate(event) {
    if (event.detail.isEnabled) {
      jQuery("#menu-item-" + event.detail.menuID).addClass('happy-menu-item');
    } else {
      jQuery("#menu-item-" + event.detail.menuID).removeClass('happy-menu-item');
    }
  }
  jQuery.each(happyMenu.items, function (index, item) {
    if (jQuery(item).length) {
      jQuery(item).addClass('happy-menu-item');
    }
  });
  var aimpicker = AestheticIconPicker({
    selector: "#icon-picker-wrap",
    // must be an ID
    onClick: "#select-icon",
    // must be an ID
    iconLibrary: happyIcons
  });

  // var iconPicker = e(".ha-menu-icon-picker").fontIconPicker();
  var megaMenuNonce = window.ha_megamenu_nonce,
    adminAjax = window.ha_admin_ajax;
  e(".ha-menu-item-save").on("click", function () {
    var spinnerLoader = e(this).parent().find(".spinner"),
      dataMenuItemSave = {
        action: "ha_save_menuitem_settings",
        settings: {
          menu_id: e("#ha-menu-modal-menu-id").val(),
          menu_has_child: e("#ha-menu-modal-menu-has-child").val(),
          menu_enable: e("#ha-menu-item-enable:checked").val(),
          menu_icon: e("#ha-menu-icon-field").val(),
          menu_icon_color: e("#ha-menu-icon-color-field").val(),
          menu_badge_text: e("#ha-menu-badge-text-field").val(),
          menu_badge_color: e("#ha-menu-badge-color-field").val(),
          menu_badge_background: e("#ha-menu-badge-background-field").val(),
          menu_badge_radius: combinedBadgeRadius,
          vertical_menu_width: e("#ha-menu-vertical-menu-width-field").val(),
          mobile_submenu_content_type: e("#mobile_submenu_content_type input[name=content_type]:checked").val(),
          vertical_megamenu_position_type: e("#vertical_megamenu_position_type input[name=position_type]:checked").val(),
          megamenu_width_type: e("#xs_megamenu_width_type input[name=width_type]:checked").val()
        },
        nocache: Math.floor(Date.now() / 1e3)
      };
    spinnerLoader.addClass("loading"), e.ajax({
      url: adminAjax,
      type: "post",
      data: dataMenuItemSave,
      success: function success(resp) {
        spinnerLoader.removeClass("loading");
      }
    });
    dispatchCardEvent({
      menuID: e("#ha-menu-modal-menu-id").val(),
      isEnabled: e("#ha-menu-item-enable:checked").val()
    });
  });
  e("#ha-menu-builder-trigger").on("click", function () {
    var menuID = e("#ha-menu-modal-menu-id").val(),
      iframeURL = menuID,
      iframe = e(this);
    e.ajax({
      url: adminAjax,
      type: "post",
      data: {
        action: "ha_get_content_editor",
        key: menuID
      },
      success: function success(resp) {
        iframeURL = resp;
        e("#ha-menu-builder-iframe").attr("src", iframeURL);
        iframe.modal({
          closeExisting: false,
          closeClass: "ha_close",
          closeText: '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <line fill="none" stroke="#fff" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"></line> <line fill="none" stroke="#fff" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"></line></svg>'
        });
      }
    });
  });
  e("body").on("DOMSubtreeModified", "#menu-to-edit", function () {
    setTimeout(function () {
      e("#menu-to-edit li.menu-item").each(function () {
        var menuItem = e(this);
        menuItem.find(".ha_menu_trigger").length < 1 && e(".item-title", menuItem).append("<a data-target='#ha__menu_settings_modal' href='#' class='ha_menu_trigger'>Happy Menu</a> ");
      });
    }, 200);
  });
  e("#menu-to-edit").trigger("DOMSubtreeModified"), e("#menu-to-edit").on("click", ".ha_menu_trigger", function (i) {
    i.preventDefault();
    var menuSettingsModal = e("#ha__menu_settings_modal"),
      menuItem = e(this).parents("li.menu-item"),
      menuID = parseInt(menuItem.attr("id").match(/[0-9]+/)[0], 10);
    menuItem.find(".menu-item-title").text();
    menuItem.attr("class").match(/\menu-item-depth-(\d+)\b/)[1];
    if (e(".ha_menu_control_nav > li").removeClass("attr-active"), e(".attr-tab-pane").removeClass("attr-active"), e(this).parents(".menu-item").hasClass("menu-item-depth-0")) {
      var o = 0;
      menuSettingsModal.removeClass("ha-menu-has-child"), e("#attr_content_nav").addClass("attr-active"), e("#attr_content_tab").addClass("attr-active");
    } else {
      o = 1;
      menuSettingsModal.addClass("ha-menu-has-child"), e("#attr_icon_nav").addClass("attr-active"), e("#attr_icon_tab").addClass("attr-active");
    }
    e("#ha-menu-modal-menu-id").val(menuID), e("#ha-menu-modal-menu-has-child").val(o);
    var dataGetSettings = {
      action: "ha_get_menuitem_settings",
      menu_id: menuID,
      nocache: Math.floor(Date.now() / 1e3)
    };
    e.ajax({
      url: adminAjax,
      type: "POST",
      data: dataGetSettings,
      dataType: "json",
      success: function success(resp) {
        if (resp.menu_badge_radius) {
          var radius = resp.menu_badge_radius.split(",");
          badgeRadiusTopLeft.val(radius[0]);
          badgeRadiusTopRight.val(radius[1]);
          badgeRadiusBottomLeft.val(radius[2]);
          badgeRadiusBottomRight.val(radius[3]);
        } else {
          badgeRadiusTopLeft.val("").trigger("change");
          badgeRadiusTopRight.val("").trigger("change");
          badgeRadiusBottomLeft.val("").trigger("change");
          badgeRadiusBottomRight.val("").trigger("change");
        }
        e("#ha-menu-item-enable").prop("checked", !1), e("#ha-menu-icon-color-field").wpColorPicker("color", resp.menu_icon_color), e("#ha-menu-icon-field").val(resp.menu_icon), e("#ha-menu-badge-text-field").val(resp.menu_badge_text), e("#ha-menu-badge-color-field").wpColorPicker("color", resp.menu_badge_color), e("#ha-menu-badge-background-field").wpColorPicker("color", resp.menu_badge_background), e("#ha-menu-vertical-menu-width-field").val(resp.vertical_menu_width), void 0 !== resp.menu_enable && 1 == resp.menu_enable ? e("#ha-menu-item-enable").prop("checked", !0) : e("#ha-menu-item-enable").prop("checked", !1), e("#mobile_submenu_content_type input").prop("checked", !1), void 0 === resp.mobile_submenu_content_type || "builder_content" == resp.mobile_submenu_content_type ? e("#mobile_submenu_content_type input[value=builder_content]").prop("checked", !0) : e("#mobile_submenu_content_type input[value=submenu_list]").prop("checked", !0), e("#vertical_megamenu_position_type input").prop("checked", !1), void 0 === resp.vertical_megamenu_position_type || "relative_position" == resp.vertical_megamenu_position_type ? e("#vertical_megamenu_position_type input[value=relative_position]").prop("checked", !0) : e("#vertical_megamenu_position_type input[value=top_position]").prop("checked", !0), e("#xs_megamenu_width_type input").removeAttr("checked"), void 0 === resp.megamenu_width_type || "default_width" == resp.megamenu_width_type ? (e("#xs_megamenu_width_type input[value=default_width]").attr("checked", "checked"), e("#xs_megamenu_width_type input[value=default_width]").prop("checked", !0)) : void 0 === resp.megamenu_width_type || "full_width" == resp.megamenu_width_type ? (e("#xs_megamenu_width_type input[value=full_width]").prop("checked", !0), e("#xs_megamenu_width_type input[value=full_width]").attr("checked", "checked")) : (e("#xs_megamenu_width_type input[value=custom_width]").prop("checked", !0), e("#xs_megamenu_width_type input[value=custom_width]").attr("checked", "checked")), e("#width_type_custom").is(":checked") ? e(".menu-width-container").addClass("is_enabled") : e(".menu-width-container").removeClass("is_enabled"), e("#ha-menu-item-enable").trigger("change"), e("#ha-menu-icon-field").val(resp.menu_icon), aimpicker.reload(), setTimeout(function () {
          menuSettingsModal.removeClass("ha-menu-modal-loading");
        }, 500);
        generatePreview();
      }
    });
    menuSettingsModal.modal();
  });
  e('input[type=radio][name="width_type"]').change(function () {
    e("#width_type_custom").is(":checked") ? e(".menu-width-container").addClass("is_enabled") : e(".menu-width-container").removeClass("is_enabled");
  }).trigger("change"), e("#ha-menu-item-enable").on("change", function () {
    e(this).is(":checked") ? (e("#ha-menu-builder-trigger").prop("disabled", !1), e("#ha-menu-builder-warper").addClass("is_enabled")) : (e("#ha-menu-item-enable").prop("checked", !1), e("#ha-menu-builder-warper").removeClass("is_enabled"), e("#ha-menu-builder-trigger").prop("disabled", !0));
  });
  e("#nav-menu-header").on("change.ekit", "#ha-menu-metabox-input-is-enabled", function () {
    e(this).is(":checked") ? e("body").addClass("is_mega_enabled").removeClass("is_mega_disabled") : e("body").removeClass("is_mega_enabled").addClass("is_mega_disabled");
  });
  e(window.ha_megamenu_trigger_markup).insertAfter("#nav-menu-header #menu-name").parent().find("#ha-megamenu-trigger").trigger("change.ekit");
  var megaMenuElementorModal = e("#ha-menu-builder-modal"),
    megaMenuElementorIframe = document.getElementById("ha-menu-builder-iframe"),
    m = megaMenuElementorIframe.contentWindow || megaMenuElementorIframe.contentDocument;
  megaMenuElementorModal.on("hide.bs.attr-modal", function (e) {
    m.jQuery("#elementor-panel-saver-button-publish").hasClass("elementor-disabled") || confirm("Changes you made may not be saved.") || e.preventDefault(), m.jQuery(m).off("beforeunload");
  });

  /* Preview Badge */
  function generatePreview() {
    var badgePreview = e("#badge-preview");
    var badgeText = e("#ha-menu-badge-text-field");
    var badgeTextColor = e("#ha-menu-badge-color-field");
    var badgeBackground = e("#ha-menu-badge-background-field");

    // var badgeRadiusTopLeft = e("#ha-menu-badge-radius-topLeft");
    // var badgeRadiusTopRight = e("#ha-menu-badge-radius-topRight");
    // var badgeRadiusBottomLeft = e("#ha-menu-badge-radius-bottomLeft");
    // var badgeRadiusBottomRight = e("#ha-menu-badge-radius-bottomRight");

    badgeText.change(function () {
      badgePreview.html(e(this).val());
    }).trigger("change");
    badgeTextColor.change(function () {
      badgePreview.css("color", e(this).val());
    }).trigger("change");
    badgeTextColor.wpColorPicker({
      change: function change(event, ui) {
        badgePreview.css("color", ui.color.toString());
      }
    });
    badgeBackground.change(function () {
      badgePreview.css("background", e(this).val());
    }).trigger("change");
    badgeBackground.wpColorPicker({
      change: function change(event, ui) {
        badgePreview.css("background", ui.color.toString());
      }
    });
    badgeRadiusTopLeft.change(function () {
      if (e(this).val()) {
        badgePreview.css("border-top-left-radius", e(this).val() + "px");
      } else {
        badgePreview.css("border-top-left-radius", "");
      }
      setCombinedRadius();
    }).trigger("change");
    badgeRadiusTopRight.change(function () {
      if (e(this).val()) {
        badgePreview.css("border-top-right-radius", e(this).val() + "px");
      } else {
        badgePreview.css("border-top-right-radius", "");
      }
      setCombinedRadius();
    }).trigger("change");
    badgeRadiusBottomLeft.change(function () {
      if (e(this).val()) {
        badgePreview.css("border-bottom-left-radius", e(this).val() + "px");
      } else {
        badgePreview.css("border-bottom-left-radius", "");
      }
      setCombinedRadius();
    }).trigger("change");
    badgeRadiusBottomRight.change(function () {
      if (e(this).val()) {
        badgePreview.css("border-bottom-right-radius", e(this).val() + "px");
      } else {
        badgePreview.css("border-bottom-right-radius", "");
      }
      setCombinedRadius();
    }).trigger("change");
  }
  function setCombinedRadius() {
    combinedBadgeRadius = badgeRadiusTopLeft.val() + "," + badgeRadiusTopRight.val() + "," + badgeRadiusBottomLeft.val() + "," + badgeRadiusBottomRight.val();
  }
});