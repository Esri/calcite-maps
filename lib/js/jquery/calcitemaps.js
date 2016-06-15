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
    } 
  });

  //----------------------------------
  // Navbar Toggle Events
  //----------------------------------
    
  $("#calciteToggleNavbar").on("click", function() {
   var body = $("body");
    if (!body.hasClass("calcite-nav-hidden")) {
      body.addClass("calcite-nav-hidden");
    } else {
      body.removeClass("calcite-nav-hidden");
    }
  });

  //----------------------------------
  // Panel Collapse Events
  //----------------------------------

  // Hide
  $(".calcite-panels .panel .panel-collapse").on("hide.bs.collapse", function(e) {
    $(e.target.parentNode).find(".panel-label").addClass("visible-xs-inline-block");
    $(e.target.parentNode).find(".panel-close").addClass("visible-xs-flex");
  });
  //Show
  $(".calcite-panels .panel .panel-collapse").on("show.bs.collapse", function(e) {
    $(e.target.parentNode).find(".panel-label").removeClass("visible-xs-inline-block");
    $(e.target.parentNode).find(".panel-close").removeClass("visible-xs-flex");
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