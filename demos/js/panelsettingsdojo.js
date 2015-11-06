/* ========================================================================
 * Calcite Maps: panelsettings.js v0.1 (dojo)
 * ========================================================================
 * Settings panel event handlers to dynamically change map UI
 *
 * ======================================================================== */

define([ 
  "dojo/query",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/touch",
  "dojo/on",
  "dojo/domReady!"
], function(query, domClass, domStyle, touch, on) {

        // ================
		// Panel - Settings
		// ================

		// Color
		query("#settingsColor").on("change", function(e) {
		    var bgColor = e.target.options[e.target.selectedIndex].value,
		        navStyle = e.target.options[e.target.selectedIndex].dataset.navstyle,
				navStyleClass = "." + navStyle,
				navbar = query(".navbar")[0];
		    domClass.remove(navbar,"navbar-default navbar-inverse navbar-light navbar-dark");
		    domClass.add(navbar, navStyle);
			if (navStyle === "navbar-default" || navStyle === "navbar-inverse") {
			    domStyle.set(navbar, "background-color", "");
			} else {
				domStyle.set(navbar, "background-color", bgColor);
				query("#settingsTextColor").attr("value", navStyle);
			}
			if (bgColor !== "transparent") {
			    on.emit(query("#settingsOpacity")[0], "change",  {
			        bubbles: true,
			        cancelable: true
			    });
			}		  
		});

		// Opacity
		query("#settingsOpacity").on("change", function(e) {
			var navbar = query(".navbar")[0];
		    var bgColor = domStyle.get(navbar, "background-color");
		    if(bgColor.indexOf('a') == -1){
		        bgColor = bgColor.replace(')', ', ' + parseFloat(e.target.value).toFixed(2) +')').replace('rgb', 'rgba');
		    } else {
		        bgColor = bgColor.replace(/[\d\.]+\)$/g, e.target.value + ')');
		    }
		    domStyle.set(navbar, {"background-color" : bgColor, "border-color" : bgColor });
		});

		// Layout
		query("#settingsLayout").on("change", function(e) {
			setLayout();
		});

		// Spacing
		query("#settingsSpacing").on("change", function(e) {
			setLayout();
		});

		function setLayout() {
			var body = query("body")[0],
				navbar = query(".navbar")[0],
				layout = query("#settingsLayout")[0].options[query("#settingsLayout")[0].selectedIndex],
				isMini = query(".navbar .navbar-info").style("display")[0] !== "none",
				space;

			// Enable spacing or not
			if (layout.value.indexOf("fixed") != -1) {
				query("#settingsSpacing").attr("value", "nav-space-none");
				query("#settingsSpacing").attr("disabled","disabled");
				space = "nav-space-none";
			} else {
				query("#settingsSpacing").attr("disabled", false);
				space = query("#settingsSpacing")[0].options[query("#settingsSpacing")[0].selectedIndex].value;
			}

			// Set classes
			domClass.remove(body, "nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed theme-side-left nav-right-absolute nav-space-none nav-space-top nav-space-bottom nav-space-all minibar nav-position-none");
			domClass.add(body, layout.value + " " + space + " " + (isMini ? "minibar" : ""));
			domClass.remove(navbar, "navbar-fixed-top navbar-fixed-bottom");
			domClass.add(navbar, query(layout).attr("data-navbar"));
		}

		function resetLayout() {
			var body = query("body")[0],
				nav = query("nav")[0];
			// Default themes
			domClass.remove(body, "theme-default theme-top theme-top-space theme-bottom-space theme-top-space-all theme-top-fixed theme-bottom theme-bottom-space theme-bottom-space-all theme-bottom-fixed");	
			// Custom themes
			domClass.remove(body, "theme-jumbo-title theme-inline-right theme-inline-left theme-inline-combo");	
			// Nav
			domClass.remove(body, "nav-position-none nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed");
			// Nav space
			domClass.remove(body, "nav-space-none nav-space-top nav-space-bottom nav-space-all"); 
			// Zoom
			domClass.remove(body, "zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right");
			// Panel
			domClass.remove(body, "panel-right panel-left");
			// Minibar
			domClass.remove(body, "minibar");
			// Navbar
			domClass.remove(nav, "navbar-fixed-top navbar-fixed-bottom");
			// $("nav").removeClass("navbar-default navbar-inverse navbar-light navbar-dark");
		}

		function syncLayout(nav, spacing, panel, zoom, navbar, theme, custom) {
			var body = query("body")[0],
				navEl = query("nav")[0];

			if (!custom) {
				domClass.add(body, nav + " " + spacing + " " + panel + " " + zoom);
			} else {
				domClass.add(body, nav + " " + spacing + " " + panel + " " + zoom + " " + theme);
			}
			domClass.add(navEl, navbar);

			syncUIControls(nav, spacing, panel, zoom, custom);
		}

		function syncUIControls(nav, spacing, panel, zoom, custom) {
			query("#settingsLayout").attr("value", nav);
			query("#settingsSpacing").attr("value", spacing);			
			query("#settingsPanel").attr("value", panel);
			query("#settingsZoom").attr("value", zoom);
		}

		// Theme
		query("#settingsThemeStandard").on("change", function(e) {
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

		query("#settingsTextColor").on("change", function(e) {
			var navStyle = e.target.value,
				nav = query("nav")[0];
			domClass.remove(nav, "navbar-default navbar-inverse navbar-light navbar-dark");
			domClass.add(nav, navStyle);
		});

		query("#settingsPanel").on("change", function(e) {
			var body = query("body")[0],
				panelStyle = e.target.value;
			domClass.remove(body, "panel-left panel-right");
			domClass.add(body, panelStyle);
		});

		query("#settingsZoom").on("change", function(e) {
			var body = query("body")[0],
				zoomStyle = e.target.value;
			domClass.remove(body, "zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right");
			domClass.add(body, zoomStyle);
		});

		query("#settingsResetLayout").on("click", function(){
			query("#settingsThemeStandard").attr("value", "theme-default");
			on.emit(query("#settingsThemeStandard")[0], "change",  {
			        bubbles: true,
			        cancelable: true
			    });
		});

		query("#settingsMobileZoom").on("click", function() {
			if (this.checked) {
				domClass.add(query("body")[0], "is-mobile-zoom");	
			} else {
				domClass.remove(query("body")[0], "is-mobile-zoom");	
			}
		});

	}
);
