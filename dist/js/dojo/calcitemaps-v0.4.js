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
  "dojo/NodeList-traverse",
  "dojo/domReady!"
], function(declare, lang, query, domClass, on) {

  var CalciteMaps = declare(null, {

    constructor: function () {

      this.initEvents();

    },

    //--------------------------------------------------------------------------
    //
    //  Public
    //
    //--------------------------------------------------------------------------

    dropdownMenuItemSelector: ".calcite-navbar .calcite-dropdown li > a",

    autoCollapsePanel: true,

    preventOverscrolling: true,

    activePanel: null,

    stickyDropdownDesktop: false,

    stickyDropdownMobile: false,

    stickyDropdownBreakpoint: 768,

    //----------------------------------
    // Initialize Handlers
    //----------------------------------

    initEvents: function() {
      this.setPanelActiveState();
      this.setTabActiveState();
      this.setDropdownItemEvents();
      this.setDropdownToggleEvents();
      this.setToggleNavbarClick();
      this.setPanelEvents();

    },

    //----------------------------------
    // Dropdown Menu Item Events
    //----------------------------------

    setDropdownItemEvents: function() {

      var funcContext = function setNavbarEvents(e) {

        if (e.type === "keydown" && e.keyCode !== 13) {
          return;
        }

        var isPanel = false,
          panel = null,
          panelBody = null,
          panels = null,
          menuItem = null;

        if (e.currentTarget.dataset.target) {
          panel = query(e.currentTarget.dataset.target);
          if (panel.length > 0) {
            isPanel = domClass.contains(panel[0], "panel");
          }
        }

        // Toggle panels
        if (isPanel) {
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
          if (panel) {
            if (e.keyCode === 13) {
              panel.query(".panel-toggle")[0].focus();
            }
          }
          // Dismiss dropdown automatically
          var isMobile = window.innerWidth < this.stickyDropdownBreakpoint;
          if (isMobile && !this.stickyDropdownMobile || !isMobile && !this.stickyDropdownDesktop) {
            var toggle = query(".calcite-dropdown .dropdown-toggle")[0];
            on.emit(toggle, "click", { bubbles: true, cancelable: true });
          }
          this.activePanel = panel;
        }
      }.bind(this);

      // Show/hide panels

      query(this.dropdownMenuItemSelector).on(["click","keydown"], lang.hitch(this, funcContext));

    },

    //----------------------------------
    // Manually show/hide the dropdown
    //----------------------------------

    setDropdownToggleEvents: function() {

      // Manually show/hide the dropdown
      query(".calcite-dropdown .dropdown-toggle").on(["click","keydown"], function (e) {
        if (e.type === "keydown" && e.keyCode !== 13) {
          return;
        }
        query(this).parent().toggleClass("open");
        query(".calcite-dropdown-toggle").toggleClass("open");
      });

      query(".calcite-dropdown").on("hide.bs.dropdown", function () {
        query(".calcite-dropdown-toggle").removeClass("open");
      });

      // Submenu

      // Dismiss dropdown menu
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
    // Toggle navbar hidden
    //----------------------------------

    setToggleNavbarClick: function() {

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

    },

    //----------------------------------
    // Panel Collapse Events
    //----------------------------------

    setPanelEvents: function() {

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

      //Remove panel menu item active status on panel closed
      query(".calcite-panels .panel").on("hidden.bs.collapse",lang.hitch(this,function(e){
        var id = e.currentTarget.id;
        this._deactivateMenuItem(id);
        this.activePanel = null;
      }));

      //Add panel menu item active status on panel active
      query(".calcite-panels .panel").on("show.bs.collapse",lang.hitch(this,function(e){
        var id = e.currentTarget.id;
        this._activateMenuItem(id);
        this.activePanel = query(e.currentTarget);
      }));

    },

    setPanelActiveState: function () {
      var activePanels = query(".calcite-panels .panel.in");
        var panelNode = activePanels[0];
        if (panelNode && (id = panelNode.id)) {
          this._activateMenuItem(id);
        }
      this.activePanel = activePanels.length > 0 ? activePanels : null;

    },

    setTabActiveState:function(){
      var activeTab = query(".calcite-nav li.active")[0];
        var a = (activeTab) && query(activeTab).children('a')[0];
        id = (a) && (a.dataset.target || a.href.substr(a.href.indexOf('#')));
        this._activateMenuItem(id,'active');
    },

    _activateMenuItem:function(id,activeClass){
      var activeClass = activeClass || 'active-panel';
      var menuItem = this._queryMenuItem(id);
      (menuItem.length > 0) && menuItem.parent('li').addClass(activeClass);
    },

    _deactivateMenuItem:function(id,activeClass){
      var activeClass = activeClass || 'active active-panel';
      var menuItem = this._queryMenuItem(id);
      (menuItem.length > 0) && menuItem.parent('li').removeClass(activeClass);
    },
    
    _queryMenuItem: function(id){
      var id = id && id.slice(id.indexOf('#') + 1);
      var selector = this.dropdownMenuItemSelector + '[data-target="#' + id + '"],' +
        this.dropdownMenuItemSelector + '[href="#' + id + '"]';
      var menuItem = query(selector);
      return menuItem;
    }

  });

  return new CalciteMaps();
});