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
  "dojo/domReady!"
], function(declare, lang, query, domClass) {

  var CalciteMaps = declare(null, {

    constructor: function () {
      
      //query(".calcite-panels .panel, .calcite-panels .panel-collapse").collapse({"toggle": false});

      this._setNavbarEvents();  
      this._setTouchEvents();
    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    navbarSelector: ".calcite-navbar .calcite-dropdown li > a",

    navbarToggleTarget: "toggleNavbar",

    preventOverscrolling: true,

    toggleNavbar: function() {
      if (!domClass.contains(query("body")[0],"calcite-nav-transparent")) {
        query("body").addClass("calcite-nav-transparent");
        query(".calcite-panels .panel.in").collapse("hide");
      } else {
        query("body").removeClass("calcite-nav-transparent");
      }
    },

    //--------------------------------------------------------------------------
    //
    //  Private
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    // Navbar and Panel Events
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
        if (panel.length > 0 && domClass.contains(panel[0], "panel")) {
          if (!domClass.contains(panel[0], "in")) {
            // Close panels
            panels = query(panel).parent().query(".panel.in");
            panels.collapse("hide");
            // Close body
            query(panels).query(".panel-collapse").collapse("hide");
            // Open panel
            panel.collapse("show");
            // Open body
            panelBody = query(panel).query(".panel-collapse");
            if (!domClass.contains(panelBody[0],"in")) {
              query(panelBody[0]).collapse("show");
            }
          } else {
            // Close and open quickly
            panel.removeClass("in");
            panel.collapse("show");
          }
        } else { // Show/hide navbar
          if (e.currentTarget.dataset.target === this.navbarToggleTarget) {
            this.toggleNavbar();
          }
        }
      }

      // Show/hide panels
      query(this.navbarSelector).on("click", lang.hitch(this, funcContext)); 

      // Toggle Menu
      query(".calcite-dropdown").on("show.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").addClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

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