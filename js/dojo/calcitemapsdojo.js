/* ========================================================================
 * Calcite Maps: calcitemaps.js v0.1 (dojo)
 * ========================================================================
 * Generic handlers for mapping-specific UI in calcite-bootstrap
 *
 * ======================================================================== */

define([ 
  "dojo/query",
  "dojo/dom-class",
  "dojo/domReady!"
], function(query, domClass) {
  
		var _mobile = isMobile();

		// ========
		// Tooltips 
		// ========

		query("[data-tooltip=tip]").tooltip({ placement: "bottom", delay: {"show": 100, "hide": 100 }, trigger: "hover"});
		
		// =================
		// Navbar and Panels
		// =================

		// Auto-show panel - desktop/mobile
		query("#mainNav li > a").on("click", function(e) {
			var panel = query(e.currentTarget.dataset.target),
			panelBody,
			panels;
			if (panel.length > 0 && domClass.contains(panel[0], "panel")) {
				panelBody = query(panel).query(".panel-collapse");
				panels = query("#panelAccordion .panel.in:not(:" + e.currentTarget.dataset.target + ")");
				// Show panel
				if (!domClass.contains(panel[0],"in")) {
					panel.collapse("show");
				}
				// Show body
				if (!domClass.contains(panelBody[0],"in")) {
					query(panel[0]).query(".panel-toggle")[0].click();
				}
				// Show one only on mobile
				if (_mobile) {
					panels.collapse("hide");
				}
			}
		});

		// Auto-show dropdown menu - mobile only
		query("#mainNav").on("show.bs.collapse", function(e) {
			if (_mobile) {
				query("#mainNav .dropdown").addClass("open");
			}
		});

		// Auto-show dropdown menu - mobile only
		query("#mainNav").on("shown.bs.collapse", function(e) {
			if (_mobile) {
				query("#mainNav .dropdown").addClass("open");	
			}
		});

		// Auto-hide nav - mobile only
		query("#mainNav .dropdown").on("hide.bs.dropdown" , function(e) {
			var nav = query("#mainNav");
			if (domClass.contains(nav[0], "in") && domClass.contains(e.target, "open")) {
				query("#mainNav").collapse("hide");
			}
		});

		// Show-hide navbar
		query(".navbar-brand").on("click", function() {
			if (!domClass.contains(query("body")[0], "nav-position-top-fixed") && !domClass.contains(query("body")[0],"nav-position-bottom-fixed")) {
				// Show elements
				if (!domClass.contains(query("body")[0],"is-minibar")) {
					query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").addClass("hidden");
					query("body").addClass("is-minibar");
				} else { // Hide elements
					query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").removeClass("hidden");
					query("body").removeClass("is-minibar");
				}
			}
		});	

		// Auto-fade panels - desktop only
		query("#mainNav .dropdown").on("show.bs.dropdown", function() {
			if (!_mobile) {
				domClass.add(query(".panel-container")[0], "fade-out opacity-75");
			}
		});
		query("#mainNav .dropdown").on("hide.bs.dropdown", function() {
			if (!_mobile) {
				domClass.remove(query(".panel-container")[0], "fade-out opacity-75");
			}
		});

		// Reset panels
		query(window).on("resize", function() {
			// Show active panel only
			if (!_mobile && isMobile()) {
				var panels = query(".panel.in"),
					panel;
				if (panels.length > 0) {
					panel = panels.query(".panel-collapse.in");
					if (panel.length > 0) {
						panels = query(".panel.in:not(#" + panel.parent().attr("id") + ")");
					} else {
						panel = panels[0];
						panels = query(".panel.in:not(#" + panel.id + ")");
					}
					panels.collapse("hide");
				}
				// Remove panel opacity
				domClass.remove(query(".panel-container")[0], "fade-out opacity-75");
			}
			_mobile = isMobile();
		});

		function isMobile(){
			return query(".navbar-toggle").style("display")[0] !== "none";
		}
	}
);