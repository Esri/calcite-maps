/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.2 (jQuery)
 * ========================================================================
 * Generic handlers for mapping-specific UI
 *
 * ======================================================================== */

(function(calciteMaps, $, undefined) {  

  // Public
  calciteMaps.navbarSelector = ".calcite-navbar .calcite-dropdown li > a",
  calciteMaps.navbarToggleTarget = "toggleNavbar",
  calciteMaps.preventOverscrolling = true,
  calciteMaps.stickyDropdownDesktop = false,
  calciteMaps.stickyDropdownMobile = false;
  _stickyDropdownBreakpoint = 768;

  //----------------------------------
  // Nav Dropdown Events
  //----------------------------------

  // Show/hide panels
  $(calciteMaps.navbarSelector).on("click", function(e) {
    var isPanel = false,
      panel = null,
      panelBody = null,
      panels = null;

    if (e.currentTarget.dataset.target) {
      panel = $(e.currentTarget.dataset.target);
      isPanel = panel.hasClass("panel");
    }

    // Toggle panels
    if (isPanel) {
      panelBody = panel.find(".panel-collapse");
      if (!panel.hasClass("in")) {
        // Close panels
        panels = $(".calcite-panels .panel.in"); //.not(e.currentTarget.dataset.target);
        panels.collapse("hide");
        // Close bodies
        panels.find(".panel-collapse").collapse("hide");
        // Show panel
        panel.collapse("show");
        // Show body
        panelBody.collapse("show");
      } else {
        panel.removeClass("in");
        panelBody.removeClass("in");
        //panel.collapse("hide");
        //panelBody.collapse("hide");
        panel.collapse("show");
        panelBody.collapse("show");
      }
      // Dismiss dropdown automatically
      var isMobile = window.innerWidth < calciteMaps._stickyDropdownBreakpoint;
      if (isMobile && !calciteMaps.stickyDropdownMobile || !isMobile && !calciteMaps.stickyDropdownDesktop) {
        var toggle = $(".calcite-dropdown .dropdown-toggle");
        toggle.trigger("click");
      }
    } 
  });

  // Manually show/hide the dropdown and animate toggle icon

  $(".calcite-dropdown .dropdown-toggle").on('click', function (e) {
    $(this).parent().toggleClass("open");
    $(".calcite-dropdown-toggle").toggleClass("open");
  });

  $(".calcite-dropdown").on("hide.bs.dropdown", function () {
    $(".calcite-dropdown-toggle").removeClass("open");
  });

  //----------------------------------
  // Toggle navbar hidden
  //----------------------------------
    
  $("#calciteToggleNavbar").on("click", function() {
   var body = $("body");
    if (!body.hasClass("calcite-nav-hidden")) {
      body.addClass("calcite-nav-hidden");
    } else {
      body.removeClass("calcite-nav-hidden");
    }
    $(".calcite-dropdown .dropdown-toggle").trigger( "click" );
  });

  //----------------------------------
  // Dismiss dropdown menu
  //----------------------------------

  $(window).on("click", function (e) {
    var menu = $(".calcite-dropdown.open")[0];
    if (menu) {
      if ($(e.target).closest(".calcite-dropdown").length === 0) {
        $(menu).removeClass("open");
        $(".calcite-dropdown-toggle").removeClass("open");
      }
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
    if (calciteMaps.preventOverscrolling) {    
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

}(window.calciteMaps = window.calciteMaps || {}, jQuery));
