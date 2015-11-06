/* ========================================================================
 * Calcite Maps: panelsettings.js v0.1 (jQuery)
 * ========================================================================
 * Settings panel event handlers to dynamically change map UI
 *
 * ======================================================================== */

(function ($) {
  'use strict';

	// ================
	// Panel - Settings
	// ================

	// Color
	$("#settingsColor").change(function(e) {
		var bgColor = e.target.options[e.target.selectedIndex].value,
			navStyle = e.target.options[e.target.selectedIndex].dataset.navstyle;
		$(".navbar").removeClass("navbar-default navbar-inverse navbar-light navbar-dark").addClass(navStyle);
		if (navStyle === "navbar-default" || navStyle === "navbar-inverse") {
			$(".navbar").css({"background-color" : ""});
		} else {
			$(".navbar").css("background-color", bgColor);
			$("#settingsTextColor").val(navStyle);
		}
		if (bgColor !== "transparent") {
			$("#settingsOpacity").trigger("change");
		}
	});

	// Opacity
	$("#settingsOpacity").change(function(e) {
		var bgColor = $(".navbar").css("background-color");
		if(bgColor.indexOf('a') == -1){
			bgColor = bgColor.replace(')', ', ' + parseFloat(e.target.value).toFixed(2) +')').replace('rgb', 'rgba');
		} else {
			bgColor = bgColor.replace(/[\d\.]+\)$/g, e.target.value + ')');
		}
		$(".navbar").css({"background-color" : bgColor});
	});

	// Layout
	$("#settingsLayout").change(function(e) {
		setLayout();
	});

	// Spacing
	$("#settingsSpacing").change(function(e) {
		setLayout();
	});

	function setLayout() {
		var layout = $("#settingsLayout").find(":selected"),
			isMini = !$(".navbar .navbar-info").is(":visible"),
			space;

		// Enable spacing or not
		if (layout.attr("value").indexOf("fixed") != -1) {
			$("#settingsSpacing").val("nav-space-none");
			$("#settingsSpacing").attr("disabled","disabled");
			space = "nav-space-none";
		} else {
			$("#settingsSpacing").attr("disabled", false);
			space = $("#settingsSpacing option:selected").val();
		}

		// Set classes
		$("body").removeClass("nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed theme-side-left nav-right-absolute nav-space-none nav-space-top nav-space-bottom nav-space-all minibar nav-position-none").addClass(layout.attr("value") + " " + space + " " + (isMini ? "minibar" : ""));
		$(".navbar").removeClass("navbar-fixed-top navbar-fixed-bottom").addClass(layout.attr("data-navbar"));
	}


	function resetLayout() {
		// Default themes
		$("body").removeClass("theme-default theme-top theme-top-space theme-bottom-space theme-top-space-all theme-top-fixed theme-bottom theme-bottom-space theme-bottom-space-all theme-bottom-fixed");	
		// Custom themes
		$("body").removeClass("theme-jumbo-title theme-inline-right theme-inline-left theme-inline-combo");	
		// Nav
		$("body").removeClass("nav-position-none nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed");
		// Nav space
		$("body").removeClass("nav-space-none nav-space-top nav-space-bottom nav-space-all"); 
		// Zoom
		$("body").removeClass("zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right");
		// Panel
		$("body").removeClass("panel-right panel-left");
		// Minibar
		$("body").removeClass("minibar");
		// Navbar
		$("nav").removeClass("navbar-fixed-top navbar-fixed-bottom");
		// $("nav").removeClass("navbar-default navbar-inverse navbar-light navbar-dark");
	}

	function syncLayout(nav, spacing, panel, zoom, navbar, theme, custom) {
		if (!custom) {
			$("body").addClass(nav + " " + spacing + " " + panel + " " + zoom);
		} else {
			$("body").addClass(nav + " " + spacing + " " + panel + " " + zoom + " " + theme);
		}
		$("nav").addClass(navbar);

		syncUIControls(nav,spacing, panel, zoom, custom);
	}

	function syncUIControls(nav, spacing, panel, zoom, custom) {
		$("#settingsLayout").val(nav);
		$("#settingsSpacing").val(spacing);
		$("#settingsPanel").val(panel);
		$("#settingsZoom").val(zoom);
		// if (custom) {
		// 	$("#settingsThemeStandard").val("theme-default");
		// } else {
		// 	$("#settingsThemeCustom").val("theme-default");
		// }
	}

	// Theme
	$("#settingsThemeStandard, #settingsThemeCustom").change(function(e) {
		var theme = e.target.value;
		resetLayout();
		// Add classes
		switch (theme) {
			// Standard
			case "theme-none":
				syncLayout("nav-position-none", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-default":
				syncLayout("nav-position-top", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-top":
				syncLayout("nav-position-top", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-top-space":
				syncLayout("nav-position-top", "nav-space-top", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-top-space-all":
				syncLayout("nav-position-top", "nav-space-all", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-top-fixed":
				syncLayout("nav-position-top-fixed", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-top", theme);
				break;
			case "theme-bottom":
				syncLayout("nav-position-bottom", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-bottom", theme);
				break;
			case "theme-bottom-space":
				syncLayout("nav-position-bottom", "nav-space-bottom", "panel-right", "zoom-top-left", "navbar-fixed-bottom", theme);
				break;
			case "theme-bottom-space-all":
				syncLayout("nav-position-bottom", "nav-space-all", "panel-right", "zoom-top-left", "navbar-fixed-bottom", theme);
				break;
			case "theme-bottom-fixed":
				syncLayout("nav-position-bottom-fixed", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-bottom", theme);
				break;
			// Custom
			case "theme-jumbo-title-top":
				syncLayout("nav-position-top", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-top", "theme-jumbo-title", true);
				break;
			case "theme-jumbo-title-bottom":
				syncLayout("nav-position-bottom", "nav-space-none", "panel-right", "zoom-top-left", "navbar-fixed-bottom", "theme-jumbo-title", true);
				break;
			case "theme-inline-left":
				syncLayout("nav-position-top", "nav-space-all", "panel-right", "zoom-top-left", "navbar-fixed-top", theme, true);
				break;
			case "theme-inline-right":
				syncLayout("nav-position-top", "nav-space-all", "panel-left", "zoom-top-right", "navbar-fixed-top", theme, true);
				break;
			case "theme-inline-combo":
				syncLayout("nav-position-top", "nav-space-all", "panel-right", "zoom-top-left", "navbar-fixed-top", theme, true);
				break;
		}
	});

	$("#settingsTextColor").on("change", function(e) {
		var navStyle = e.target.value;
		$(".navbar").removeClass("navbar-default navbar-inverse navbar-light navbar-dark").addClass(navStyle);
	});

	$("#settingsPanel").change(function(e) {
		var panelStyle = e.target.value;
		$("body").removeClass("panel-left panel-right").addClass(panelStyle);
	});

	$("#settingsZoom").change(function(e) {
		var zoomStyle = e.target.value;
		$("body").removeClass("zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right").addClass(zoomStyle);
	});

	$("#settingsResetLayout").on("click", function(){
		$("#settingsThemeStandard").val("theme-default");
		$("#settingsThemeStandard").trigger("change");
	});

	$("#settingsMobileZoom").on("click", function() {
		if (this.checked) {
			$("body").addClass("is-mobile-zoom");	
		} else {
			$("body").removeClass("is-mobile-zoom");	
		}
	});

}(jQuery));

