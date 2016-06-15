/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.2 (dojo)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

define([ 
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/query",
  "dojo/dom-class",
  "dojo/on",
  "dojo/domReady!"
], function(declare, lang, query, domClass, on) {

  var CalciteMaps = declare(null, {

    constructor: function () {
      
      this._setNavbarEvents();
      this._setPanelEvents();
      this._setTouchEvents();
    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    navbarSelector: ".calcite-navbar .calcite-dropdown li > a",

    autoCollapsePanel: true,

    preventOverscrolling: true,

    //--------------------------------------------------------------------------
    //
    //  Private
    //
    //--------------------------------------------------------------------------

    _breakpoint: 768,

    //----------------------------------
    // Navbar Events
    //----------------------------------

    _setNavbarEvents: function() {

      var funcContext = function setNavbarEvents(e) {
        if (!e.currentTarget.dataset.target) {
          return;
        }
        var panel = query(e.currentTarget.dataset.target),
          panelBody,
          panels;
        // Toggle panels
        if (panel) {
          if (panel.length > 0 && domClass.contains(panel[0], "panel")) {
            if (!domClass.contains(panel[0], "in")) {
              // Close panels
              panels = query(panel).parent().query(".panel.in");
              panels.collapse("hide");
              // Close body
              query(panels).query(".panel-collapse").collapse("hide");
            } else {
              // Re-open
              panel.removeClass("in");
            }
            // Show/re-show
            panel.collapse("show");
            panelBody = query(panel).query(".panel-collapse");
            if (!domClass.contains(panelBody[0],"in")) {
              query(panelBody[0]).collapse("show");
            }   
          }
        }
      }

      // Show/hide panels
      query(this.navbarSelector).on("click", lang.hitch(this, funcContext)); 

      // Navbar Dropdown Toggle
      query(".calcite-dropdown").on("show.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").addClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

      // Navbar Toggle
      query("#calciteToggleNavbar").on("click", function() {
        if (!domClass.contains(query("body")[0],"calcite-nav-hidden")) {
          query("body").addClass("calcite-nav-hidden");
        } else {
          query("body").removeClass("calcite-nav-hidden");
        }
      });

    },

    //----------------------------------
    // Panel Collapse Events
    //----------------------------------

    _setPanelEvents: function() {
      if (this.autoCollapsePanel) {
        // Hide
        query(".calcite-panels .panel .panel-collapse").on("hidden.bs.collapse", function(e) {
          query(e.target.parentNode).query(".panel-label, .panel-close").addClass("visible-xs-inline-block");
        });
        //Show
        query(".calcite-panels .panel .panel-collapse").on("show.bs.collapse", function(e) {
          query(e.target.parentNode).query(".panel-label, .panel-close").removeClass("visible-xs-inline-block");
        });
      }
    },

    //----------------------------------
    // Map Touch Events
    //----------------------------------

    _setTouchEvents: function() {

      var funcContext = function setTouchEvents(e) {
        if (this.preventOverscrolling) {
          if (e.target instanceof SVGSVGElement) {
            e.preventDefault();
          }
        }
      } 

      // Prevent browser overscroll/bouncing when panning map on mobile
      query(".calcite-map").on("touchmove", lang.hitch(this, funcContext));

    }

  });

  return new CalciteMaps();
});