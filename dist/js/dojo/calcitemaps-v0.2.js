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

    _this: null,

    constructor: function () {

      _this = this;
      
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

    activePanel: null,

    stickyDropdownDesktop: true,

    stickyDropdownMobile: false,

    //--------------------------------------------------------------------------
    //
    //  Private
    //
    //--------------------------------------------------------------------------

    _stickyDropdownBreakpoint: 768,

    //----------------------------------
    // Nav Dropdown Events
    //----------------------------------

    // Show/hide Panels

    _setNavbarEvents: function() {
      var funcContext = function setNavbarEvents(e) {

        var isPanel = false,
          panel = null,
          panelBody = null,
          panels = null;

        if (e.currentTarget.dataset.target) {
          panel = query(e.currentTarget.dataset.target);
          isPanel = domClass.contains(panel[0], "panel");
        }

        // Toggle panels
        if (isPanel) {
          if (panel.length) {
            panelBody = query(panel).query(".panel-collapse");
            // Show
            if (!domClass.contains(panel[0], "in")) {
              // Close panels
              panels = query(panel).parent().query(".panel.in");
              panels.collapse("hide");
              // Close bodies
              query(panels).query(".panel-collapse").collapse("hide");
              // Show panel
              panel.collapse("show");
              // Show body
              query(panelBody[0]).collapse("show");
            } else { // Re-show
              panel.removeClass("in");
              query(panelBody[0]).removeClass("in");
              panel.collapse("show");
              query(panelBody[0]).collapse("show");
            }
            // Dismiss dropdown automatically
            var isMobile = window.innerWidth < this._stickyDropdownBreakpoint;
            if (isMobile && !this.stickyDropdownMobile || !isMobile && !this.stickyDropdownDesktop) {
              var toggle = query(".calcite-dropdown .dropdown-toggle")[0];
              on.emit(toggle, "click", { bubbles: true, cancelable: true });
            }
          } 
          _this.activePanel = panel;
        }
      }

      // Show/hide panels

      query(this.navbarSelector).on("click", lang.hitch(this, funcContext)); 

      //----------------------------------
      // Toggle navbar hidden
      //----------------------------------

      query("#calciteToggleNavbar").on("click", function(e) {
        if (!domClass.contains(query("body")[0],"calcite-nav-hidden")) {
          query("body").addClass("calcite-nav-hidden");
        } else {
          query("body").removeClass("calcite-nav-hidden");
        }
        var menu = query(".calcite-dropdown .dropdown-toggle")[0];
        if (menu) {
          on.emit(menu, "click", { bubbles: true, cancelable: true });
        }
      });

      //----------------------------------
      // Manually show/hide the dropdown
      //----------------------------------

      query(".calcite-dropdown .dropdown-toggle").on('click', function (e) {
        query(this).parent().toggleClass("open");
        query(".calcite-dropdown-toggle").toggleClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

      //----------------------------------
      // Dismiss dropdown menu
      //----------------------------------

      query(window).on("click", function (e) {
        var menu = query(".calcite-dropdown.open")[0];
        if (menu) {
          if (query(e.target).closest(".calcite-dropdown").length === 0) {
            query(menu).removeClass("open");
            query(".calcite-dropdown-toggle").removeClass("open");
          }
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
          query(e.target.parentNode).query(".panel-label, .panel-close").addClass("visible-mobile-only");
        });
        //Show
        query(".calcite-panels .panel .panel-collapse").on("show.bs.collapse", function(e) {
          query(e.target.parentNode).query(".panel-label, .panel-close").removeClass("visible-mobile-only");
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