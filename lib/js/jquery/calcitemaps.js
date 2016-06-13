/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.2 (jQuery)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

(function ($) {
  'use strict';
  
  var navbarSelector = ".calcite-navbar .calcite-dropdown li > a",
    navbarToggleTarget = "toggleNavbar",
    preventOverscrolling = true;

  //----------------------------------
  // Navbar and Panel Events
  //----------------------------------

  // Show/hide panels
  $(navbarSelector).on("click", function(e) {
    if (!e.currentTarget.dataset.target) {
      return;
    }
    var panel = $(e.currentTarget.dataset.target),
      panelBody,
      panels;
    if (panel.hasClass("panel")) {
      if (!panel.hasClass("in")) {
        // Close panels
        panels = $(".calcite-panels .panel.in").not(e.currentTarget.dataset.target);
        panels.collapse("hide");
        // Open panel
        panel.collapse("show");
        panelBody = panel.find(".panel-collapse");
        // Open body
        if (!panelBody.hasClass("in")) {
          panelBody.collapse("show");
        }
      } else {
        panel.removeClass("in");
        panel.collapse("show");
      }
    } else { //Show/hide navbar
      if (e.currentTarget.dataset.target === navbarToggleTarget) {
        var body = $("body");
        if (!body.hasClass("calcite-nav-transparent")) {
          $(".calcite-panels .panel.in").collapse("hide");
          body.addClass("calcite-nav-transparent");
        } else {
          body.removeClass("calcite-nav-transparent");
        }
      }
    }
  });

  //----------------------------------
  // Map Touch Events
  //----------------------------------

  // Stops browser overscroll/bouncing effect on mobile
  $(".calcite-map").on("touchmove", function(e) {
    if (preventOverscrolling) {    
      e.preventDefault();
    }
  });

  //----------------------------------
  // Toggle Menu
  //----------------------------------

  $(".calcite-dropdown").on("show.bs.dropdown", function () {
    $(".calcite-dropdown-toggle").addClass("open");
  });

  $(".calcite-dropdown").on("hide.bs.dropdown", function () {
    $(".calcite-dropdown-toggle").removeClass("open");
  });


}(jQuery));