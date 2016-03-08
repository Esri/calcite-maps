/* ========================================================================
 * Calcite Maps: panelsettings.js v0.1 (dojo)
 * ========================================================================
 * Settings panel event handlers to dynamically change map UI
 *
 * ======================================================================== */

define([ 
	"esri/widgets/Zoom",
	"esri/widgets/Home",
	"esri/widgets/Locate",
	"esri/widgets/Compass",
	"esri/widgets/BasemapToggle",
	"esri/widgets/Search",
	"esri/views/ui/Component",
	"esri/layers/FeatureLayer",
	"esri/PopupTemplate",
	"esri/geometry/Extent",
	"esri/geometry/support/webMercatorUtils",
	"esri/tasks/GeometryService",
	"esri/tasks/support/ProjectParameters",

	"dojo/query",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/touch",
	"dojo/on",
	"dojo/keys",
	"dojo/domReady!"
], function(Zoom, Home, Locate, Compass, BasemapToggle, Search, Component, FeatureLayer, PopupTemplate, 
	Extent, ProjectUtils, GeometryService, ProjectParams, query, domClass, domStyle, touch, on, keys) {

    // ================
		// Panel - Settings
		// ================

		// Title
		query("#titleButton").on("click", function() {
    		query(".navbar-title")[0].innerHTML = query("#settingsTitleInput")[0].value;
    		query(".navbar-subtitle")[0].innerHTML = query("#settingsSubTitleInput")[0].value;;
        });

        // Map
        query("#settings2dView").on("click", function(e) {
        	domClass.toggle(query("#mapNav")[0], "hidden");
        	domClass.toggle(query("#mapNavMenu")[0], "hidden");
        })
        query("#settings3dView").on("click", function(e) {
        	domClass.toggle(query("#sceneNav")[0], "hidden");
        	domClass.toggle(query("#sceneNavMenu")[0], "hidden");
        })

		// Color
		query("#settingsColor").on("change", function(e) {
		    var bgColor = e.target.options[e.target.selectedIndex].value,
		        navStyle = e.target.options[e.target.selectedIndex].dataset.navstyle,
						navStyleClass = "." + navStyle,
						navbar = query(".navbar")[0];
		    domClass.remove(navbar,"navbar-default navbar-inverse navbar-text-dark navbar-text-light");
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

		// Widget colors/themes
		query("#settingsColorWidgets").on("change", function(e) {
		    var bgColor = e.target.options[e.target.selectedIndex].value,
		        navStyle = e.target.options[e.target.selectedIndex].dataset.navstyle,
						navStyleClass = "." + navStyle;

				// Get default text colors for calcite colors
        var textColor,
        	focusColor; //TODO
        if (navStyle === "navbar-text-dark") {
        	textColor = "#323232";
        	focusColor = "#595959";
        } else {
        	textColor = "#f8f8f8";
        	focusColor = "#cccccc";
        }

        // Widget text color
        var widgetClassesTextColor = ".esri-popup .esri-popup-main, .esri-popup .esri-button, .esri-popup .esri-page-text, .esri-popup .esri-title, .esri-widget, .esri-widget-button";
				query(widgetClassesTextColor).style({ "color" : textColor });

        // Widget background color
        var widgetClassesBackground = ".esri-popup .esri-background, .esri-widget:not(:.esri-ripple), .esri-widget-button, .esri-widget .esri-menu, .esri-widget .esri-header";
				query(widgetClassesBackground).style({ "background-color" : bgColor });

				// Widget focus color
				var widgetClassesFocusColor = ".esri-widget-button, .esri-widget .esri-menu li, ";
				query(widgetClassesFocusColor).style({ ":hover" : focusColor, ":focus" : focusColor, ":active" : focusColor });
			 
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
			domClass.remove(body, "nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed nav-right-absolute nav-space-none nav-space-top nav-space-bottom nav-space-all minibar");
			domClass.add(body, layout.value + " " + space + " " + (isMini ? "minibar" : ""));
			domClass.remove(navbar, "navbar-fixed-top navbar-fixed-bottom");
			domClass.add(navbar, query(layout).attr("data-navbar"));
		}

		function resetLayout() {
			var body = query("body")[0],
				nav = query("nav")[0];
			// Default themes
			domClass.remove(body, "theme-top theme-top-space theme-bottom-space theme-top-space-all theme-top-fixed theme-bottom theme-bottom-space theme-bottom-space-all theme-bottom-fixed");	
			// Custom themes
			domClass.remove(body, "theme-jumbo-title theme-inline-right theme-inline-left theme-inline-combo");	
			// Nav
			domClass.remove(body, "nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed");
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
			// $("nav").removeClass("navbar-default navbar-inverse navbar-text-dark navbar-dark");
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
				case "theme-top": // default
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
				// case "theme-inline-combo":
				// 	syncLayout("nav-position-top", "nav-space-all", "panel-right", "zoom-top-left", "navbar-fixed-top", theme, true);
				// 	break;
			}
		});

		query("#settingsThemeStandard").on("change", function(e) {    	
	       	
	       	function setPadding(viewPadding, uiPadding){
	            app.mapView.padding = viewPadding;
	            app.mapView.ui.padding = uiPadding;
	            app.sceneView.padding = viewPadding;
	            app.sceneView.ui.padding = uiPadding;
	        }

            var theme = e.target.value;
            if (theme === "theme-top") {
                setPadding({ top: 64, bottom: 0 }, { top: 15, bottom: 30 });
            } else if (theme === "theme-top-space" || theme === "theme-top-space-all") {
                setPadding({ top: 79, bottom: 0 }, { top: 15, bottom: 30 });
            } else if (theme === "theme-top-fixed") {
                setPadding({ top: 0, bottom: 0 }, { top: 15, bottom: 30 });
            } else if (theme === "theme-bottom") {
                setPadding({ top: 0, bottom: 64 }, { top: 30, bottom: 15 });
            } else if (theme === "theme-bottom-space" || theme === "theme-bottom-space-all") {
                setPadding({ top: 0, bottom: 79 }, { top: 30, bottom: 15 });
            } else if (theme === "theme-bottom-fixed") {
                setPadding({ top: 0, bottom: 0 }, { top: 30, bottom: 15 });
            } else if (theme === "theme-jumbo-title-top") {
            	setPadding({ top: 120, bottom: 0 }, { top: 15, right: 15, bottom: 30, left: 15 });
            } else if (theme === "theme-jumbo-title-bottom") {
            	setPadding({ top: 0, bottom: 120 }, { top: 30, right: 15, bottom: 15, left: 15 });
            } else if (theme === "theme-inline-left") {
            	setPadding({ top: 0, bottom: 0 });
            	setMapWidget(app.activeView, "zoom", "top-left");
            } else if (theme === "theme-inline-right") {
            	setPadding({ top: 0, bottom: 0 });
            	setMapWidget(app.activeView, "zoom", "top-right");            
            }
        });

		query("#settingsTextColor").on("change", function(e) {
			var navStyle = e.target.value,
				nav = query("nav")[0];
			domClass.remove(nav, "navbar-default navbar-inverse navbar-text-dark navbar-text-light");
			domClass.add(nav, navStyle);
		});

		query("#settingsTextFont").on("change", function(e) {
			var font = e.target.value;
			domStyle.set(query("body")[0], "font-family", font);
		});

		query("#settingsPanel").on("change", function(e) {
			var body = query("body")[0],
				panelStyle = e.target.value;
			domClass.remove(body, "panel-left panel-right");
			domClass.add(body, panelStyle);
		});

		query("#settingsResetLayout").on("click", function(){
			// Theme
			query("#settingsThemeStandard").attr("value", "theme-top");
			on.emit(query("#settingsThemeStandard")[0], "change",  {
			        bubbles: true,
			        cancelable: true
			    });
			// Name
			query("#settingsTitleInput")[0].value = "{Map Name}";
			query("#settingsSubTitleInput")[0].value = "{Subtitle or call to action}";
			query("#titleButton")[0].click();
			// Menu
			domClass.add(query("#mapNav")[0], "hidden", true);
        	domClass.add(query("#mapNavMenu")[0], "hidden", true);
			domClass.add(query("#sceneNav")[0], "hidden", true);
        	domClass.add(query("#sceneNavMenu")[0], "hidden", true);
        	// Map
        	query("#mapNav")[0].click();
        	app.activeView.set({
        		center: app.lonlat,
        		scale: app.scale
        	});
        	// View
        	query("#settings2dView")[0].checked = false;
        	query("#settings3dView")[0].checked = false;
        	// Font
        	domStyle.set(query("body")[0], "font-family", "Avenir Next W01");

		});

		// query("#settingsZoom").on("change", function(e) {
		// 	var body = query("body")[0],
		// 		zoomStyle = e.target.value;
		// 	domClass.remove(body, "zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right");
		// 	domClass.add(body, zoomStyle);
		// });
 		
 		function setMapWidget(view, name, position) {
            var component,
	            exists = view.ui.find(name);
            // Remove
            if (position === "none") {
                view.ui.remove(name);
                if (exists) {
	                exists.destroy();
	           	}
            } else { // Add/Move
                if (exists) {
                    view.ui.move(name, position);
                } else {
                	component = createComponent(view, name);
                    view.ui.add(component, position);
                }
            }               
        }

        function createComponent(view, name) {
        	var component,
	        	widget = createWidget(view, name);
	        component = new Component({
	        	node: widget, 
	        	id: name
	        });
	        return component;
        }

        function createWidget(view, name) {
        	var widget,
        		viewModel = {
        			view: view
        		}
        	switch (name) {
        		case "zoom":
        			widget = new Zoom({
        				viewModel: viewModel
        			});
        			break;
        		case "home":
        			widget = new Home({
        				viewModel: viewModel
        			});
        			break;
        		case "compass":
        			widget = new Compass({
        				viewModel: viewModel
        			});
        			break;
        		case "locate":
        			widget = new Locate({
        				viewModel: viewModel
        			});
        			break;
        		case "basemaptoggle":
        			widget = new BasemapToggle({
        				viewModel: viewModel
        			});
        			break;
        		case "search":
        			widget = new Search({
        				viewModel: viewModel
        			});
        			break;
        	}
        	widget.startup();
        	return widget;
        }

		query("#settingsMapWidget").on("change", function(e) {
			on.emit(query("#settingsPositionMapWidget")[0], "change",  {
			        bubbles: true,
			        cancelable: true
			    });
		});

		query("#settingsSceneWidget").on("change", function(e) {
			on.emit(query("#settingsPositionSceneWidget")[0], "change",  {
			        bubbles: true,
			        cancelable: true
			    });
		});

		query("#settingsPositionMapWidget").on("change", function(e) {
			var name = query("#settingsMapWidget")[0].value,
				position = e.target.value;
			setMapWidget(app.mapView, name, position);
		});

		query("#settingsPositionSceneWidget").on("change", function(e) {
			var name = query("#settingsSceneWidget")[0].value,
				position = e.target.value;
			setMapWidget(app.sceneView, name, position);
		});

		function setPopupDock(view, popupOptions) {
			view.popup.set({
				dockOptions: popupOptions
			});
			var dock = (popupOptions.position !== "auto");
			view.popup.set("dockEnabled", dock);
		}

		query("#settingsPopup").on("change", function(e){
			var popupOptions = {
				position: e.target.value
			}
			setPopupDock(app.mapView, popupOptions);
			setPopupDock(app.sceneView, popupOptions);
		});

		query("#settingsAddLayer").on("click", function() {

			addFeatureService();

			// Create a feature layer to get feature service
			function addFeatureService() {
				if (removeFeatureService()) {
					//query("#settingsFeatureLayerUrl")[0].value = "";
					// Update button
					query("#settingsAddLayer").addClass("btn-primary").removeClass("btn-danger");
					query("#settingsAddLayer")[0].innerText = "Add Layer";      
					return;
				}
				
				// Validate url
				var url = query("#settingsFeatureLayerUrl")[0].value;
				if (url === "") {
					//showErrorLoadingLayer("Sorry, please provide a valid URL.");
					return;
				}  

				// Create layers - two layers because they will have different styles
				app.mapFL = createLayer(url);
				app.sceneFL = createLayer(url);

				// Added to Map
				app.mapFL.then(function(){
					}, function(error){
						//showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
						removeFeatureService();
						return;
					});

				// Added to Scene
				app.sceneFL.then(function(){
					}, function(error){
						//showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
						removeFeatureService();
						return;
					});

				 // Add to map
				app.mapView.map.add(app.mapFL);
				app.sceneView.map.add(app.sceneFL);
				
				// Zoom map to extent of layer
				app.mapFL.watch("loaded", function(newValue, oldValue, property, object) {
					if (newValue) {
						if (object.initialExtent) {
							zoomToProjectedExtent(object.initialExtent);                           
						} else {
							showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
							removeFeatureService();
						}
					}
				});

				// Zoom scene and tile - TODO
				app.sceneView.watch("updating", function(newValue, oldValue, property, object) {
					if (newValue && app.sceneFL && !app.sceneView.__sceneZoomed) {
						app.sceneView.__sceneZoomed = true;
						app.sceneView.animateTo({center: app.mapView.center, scale: app.mapView.scale, tilt: 45});
					}
				})
			}

			// Remove existing service
			function removeFeatureService() {
				if (app.mapFL && app.sceneFL) {
					app.mapView.map.remove(app.mapFL);
					app.sceneView.map.remove(app.sceneFL);
					app.mapView.zoom = app.zoom; 
					app.mapView.center = app.lonlat;
					app.sceneView.zoom = app.zoom;
					app.sceneView.center = app.lonlat;
					app.mapFL = null;
					app.sceneFL = null;
					app.sceneView.__sceneZoomed = false;
					app.mapView.popup.set({visible: false});
					app.sceneView.popup.set({visible: false});
					return true;
				} else {
					return false;
				}
			}

			function zoomToProjectedExtent(extent) {
				var gvsc = new GeometryService({url: "http://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"});
				var params = new ProjectParams();
				params.geometries = [extent];
				params.outSR = app.mapView.spatialReference;
				gvsc.project(params).then(function(results) {
					if (results.length > 0){
						// Update extent
						app.mapView.animateTo(results[0].extent);
						app.sceneView.animateTo(results[0].extent);
						// Update button
						query("#settingsAddLayer").addClass("btn-danger").removeClass("btn-primary");
						query("#settingsAddLayer")[0].innerText = "Remove";                           
					} else {
						//showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
						removeFeatureService();
					}
				}, function(e){
					//showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
					removeFeatureService();
				});
			}

			function createLayer(url) {
				var lyr = new FeatureLayer({ 
					url: url,
					maxScale: 0,
					minScale: 0,
					outFields: ["*"]
				});
				lyr.then(function(e){
					lyr.set({
						popupTemplate: new PopupTemplate({
							title: lyr.name,
							content: "{*}"
						})
					});
				})
				return lyr;
			}

			function showErrorLoadingLayer(msg) {
				//$("#layerErrorMsg").text(msg);
				//$("#layerError").removeClass("hidden");
			}

		});

		query("#settingsPadding").on("keydown", function(evt) {
			if (evt.keyCode === keys.ENTER) {
				var str = this.value;
				var padding = eval("("+str+")");
				if (padding) {
					app.mapView.padding = padding;
					app.sceneView.padding = padding;
				}
			}
		});

		query("#settingsLayerOpacity").on("change", function(){
			var opacity = Number.parseFloat(this.value);
			if (app.mapFL && app.sceneFL) {
				app.mapFL.opacity = opacity;
				app.sceneFL.opacity = opacity;
			}
		});	

	}
);
