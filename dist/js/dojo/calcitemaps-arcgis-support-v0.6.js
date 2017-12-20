/* ========================================================================
 * Calcite Maps: calcitemaps-arcgis-support.js v0.4 (dojo)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

define([ 
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/query",
  "dojo/on",
  "dojo/domReady!"
], function(declare, lang, query, on) {

  var CalciteMapsArcGISSupport = declare(null, {

    constructor: function () {
      this._syncTabs();
    },

    //--------------------------------------------------------------------------
    //
    //  Private
    //
    //--------------------------------------------------------------------------

    _syncTabs: function() {
      query(".calcite-navbar li a[data-toggle='tab']").on("click", function(e) {
        query(".calcite-navbar li.active").removeClass("active");       
        query(e.target).addClass("active");
      });
    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    // Popup/Panel Synchronization - TODO
    //----------------------------------

    setPopupPanelSync: function(view) {

      if (!view) {
        return;
      }

      var popup = view.popup;
      var screenSize = view.size;
      
      view.watch("size", function viewSizeChange(size) {
        if (screenSize[0] !== size[0] || screenSize[1] !== size[1]) {
          screenSize = size;
          setPanelVisibility();
        }
      });

      // Popups - Listen to popup changes to show/hide panels
      popup.watch(["visible", "dockEnabled", "currentDockPosition"], setPanelVisibility);

      function isDesktopCollision() {
        var collision = false;
        var panelsRight = query(".calcite-panels-right");
        if (panelsRight.length > 0) {
          collision = (popup.currentDockPosition && popup.currentDockPosition === "top-right");
        } else {
          collision = (popup.currentDockPosition && popup.currentDockPosition === "top-left")
        }
        return collision;
      }

      function setPanelVisibility() {
        var isMobileScreen = view.widthBreakpoint === "xsmall" || view.widthBreakpoint === "small";
        var isDocked = popup.visible && popup.dockEnabled;
        var isDockedBottom = view.popup.currentDockPosition && view.popup.currentDockPosition.indexOf("bottom") > -1;

        // Mobile (xsmall/small)
        if (isMobileScreen) {
          if (isDocked && isDockedBottom) {
            query(".calcite-panels").addClass("invisible");
          } else {
            query(".calcite-panels").removeClass("invisible");
          }
        } else { // Desktop (medium+)
          if (isDocked && isDesktopCollision()) {
            query(".calcite-panels").addClass("invisible");
          } else {
            query(".calcite-panels").removeClass("invisible");          
          }
        }
      }

      // Panels - Listen to panel changes to hide popup at mobile size
      query(".calcite-panels .panel").on("show.bs.collapse", function(e) {
        if (view.popup.dockEnabled || view.widthBreakpoint === "xsmall") {
          view.popup.dockEnabled = false;
        }
      });
    },

    //----------------------------------
    // Search Expander
    //----------------------------------

    setSearchExpandEvents: function(search) {

      if (!search) {
        return;
      }

      // Expand when search container or child element has focus
      query(".calcite-search-expander").on("focusin", function(e){
        var search = query(".calcite-search-expander .esri-search");
        if (search && search.length > 0) {
          search.addClass("calcite-search-expanded");
        }
      }.bind(this));

      // Dismiss expanded search when li menu is clicked
      query(".calcite-search-expander .esri-search__suggestions-menu").on("click", function(e){
        query(".calcite-search-expander .esri-search__container").removeClass("esri-search--loading");
        query(".calcite-search-expanded").removeClass("calcite-search-expanded");
      });

      // Hide search loading indicator
      search.on(["search-start","search-complete","select-result"], function(e){
        query(".calcite-search-expander .esri-search__container").removeClass("esri-search--loading");
      });

      // Dismiss expanded search when ui is clicked
      query(window).on("click", function (e) {
        var searchClicked = query(e.target).closest(".calcite-search-expanded")[0];
        var searchExpanded = query(".calcite-search-expanded");
        if (!searchClicked && searchExpanded.length > 0) {
          query(".calcite-search-expander .esri-search__container").removeClass("esri-search--loading");
          query(".calcite-search-expanded").removeClass("calcite-search-expanded");
        }
      });

    }

  });
      
  return new CalciteMapsArcGISSupport();
});