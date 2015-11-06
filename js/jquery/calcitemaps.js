/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.1 (jQuery)
 * ========================================================================
 * Generic handlers for mapping-specific UI in calcite-bootstrap
 *
 * ======================================================================== */

(function ($) {
  'use strict';

	var _mobile = isMobile();

	// ========
	// Tooltips 
	// ========

	$("[data-tooltip=tip]").tooltip({ placement: "bottom", delay: { "show": 100, "hide": 100 }, trigger: "hover"});
	
	// =================
	// Navbar and Panels
	// =================

	// Auto-show panel - desktop/mobile
	$("#mainNav li > a").on("click", function(e) {
		var panel = $(e.currentTarget.dataset.target),
			panelBody,
			panels;
		if (panel.hasClass("panel")) {
			panelBody = panel.find(".panel-collapse")
			panels = $(".panel.in").not(e.currentTarget.dataset.target);
			// Show panel
			if (!panel.hasClass("in")) {
				panel.collapse("show");
			}
			// Show body
			if (!panelBody.hasClass("in")) {
				panel.find(".panel-toggle").trigger("click");
			}
			// Show one only on mobile
			if (_mobile) {
				panels.collapse("hide");
			}
		}
	});

	// Auto-show dropdown - mobile only
	$("#mainNav").on("show.bs.collapse", function(e) {
		if (_mobile) {
			$("#mainNav .dropdown").addClass("open");
		}
	});

	// Auto-show dropdown - mobile only
	$("#mainNav").on("shown.bs.collapse", function(e) {
		if (_mobile) {
			$("#mainNav .dropdown").addClass("open");
		}
	});

	// Auto-hide nav - mobile only
	$("#mainNav .dropdown").on("hide.bs.dropdown", function(e) {
		if (_mobile) {
			if ($("#mainNav").hasClass("in") && $(e.target).hasClass("open")) {
				$("#mainNav").collapse("hide");
			}
		}
	});

	// Show-hide navbar
	$(".navbar-brand").on("click", function() {
		if (!$("body").hasClass("nav-position-top-fixed") && !$("body").hasClass("nav-position-bottom-fixed")) {
			// Show elements
			if (!$("body").hasClass("is-minibar")) {
				$("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").addClass("hidden");
				$("body").addClass("is-minibar");
			} else { // Hide elements
				$("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").removeClass("hidden");
				$("body").removeClass("is-minibar");
			}
		}
	});	

	// Auto-fade panels - mobile only
	$("#mainNav .dropdown").on("show.bs.dropdown", function() {
		if (!_mobile) {
			$(".panel-container").addClass("fade-out opacity-50");
		}
	});
	$("#mainNav .dropdown").on("hide.bs.dropdown", function() {
		if (!_mobile) {
			$(".panel-container").removeClass("fade-out opacity-50");
		}
	});

	// Reset panels
	$(window).on("resize", function() {
		// Show active panel only
		if (!_mobile && isMobile()) {
			var panels = $(".panel.in"),
				panel;
			if (panels.length > 0) {
				panel = panels.find(".panel-collapse.in");
				if (panel.length > 0) {
					panels = $(".panel.in:not(#" + panel.parent().attr("id") + ")");
				} else {
					panel = panels[0];
					panels = $(".panel.in:not(#" + panel.id + ")");
				}
				panels.collapse("hide");
			}
			// Remove panel opacity
			$(".panel-container").removeClass("fade-out opacity-50");
		}
		_mobile = isMobile();
	});

	function isMobile() {
		return $(".navbar-toggle").is(":visible");
	}

}(jQuery));