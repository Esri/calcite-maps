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
  "esri/widgets/Legend",
  "esri/views/ui/Component",
  "esri/layers/FeatureLayer",
  "esri/PopupTemplate",
  "esri/geometry/Extent",
  "esri/geometry/support/webMercatorUtils",
  "esri/tasks/GeometryService",
  "esri/tasks/support/ProjectParameters",
  "esri/core/watchUtils",

  "dojo/query",
  "dojo/dom-class",
  "dojo/dom-style",
  "dojo/touch",
  "dojo/on",
  "dojo/keys",
  "dojo/domReady!"
], function(Zoom, Home, Locate, Compass, BasemapToggle, Search, Legend, Component, FeatureLayer, PopupTemplate, 
  Extent, ProjectUtils, GeometryService, ProjectParams, watchUtils, query, domClass, domStyle, touch, on, keys) {

    /******************************************************************
     * Layouts
     ******************************************************************/

    ALL_STYLES = {
      body: 
      // Custom themes
      "layout-jumbo-title layout-mobile-focus layout-inline-right layout-inline-left " +
      // Nav
      "nav-position-top nav-position-bottom nav-position-top-fixed nav-position-bottom-fixed " +
      // Nav space
      "nav-space-top nav-space-bottom nav-space-all " + 
      // Zoom
      "zoom-top-left zoom-top-right zoom-bottom-left zoom-bottom-right " +
      // Panel
      "panel-right panel-left " +
      // Minibar
      "minibar",
      nav:
      // Navbar
      "navbar-fixed-top navbar-fixed-bottom"
    }

    ALL_THEMES = {
      TOP: {
          navPosition: "nav-position-top", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 65, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      },
      TOPSPACE: {
          navPosition: "nav-position-top", 
          navSpace: "nav-space-top", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 80, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      }, 
      TOPSPACEALL: {
          navPosition: "nav-position-top", 
          navSpace: "nav-space-all", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 80, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      }, 
      TOPFIXED: {
          navPosition: "nav-position-top-fixed", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      },
      BOTTOM: {
          navPosition: "nav-position-bottom", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 65 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      },
      BOTTOMSPACE: {
          navPosition: "nav-position-bottom", 
          navSpace: "nav-space-bottom", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 80 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      }, 
      BOTTOMSPACEALL: {
          navPosition: "nav-position-bottom", 
          navSpace: "nav-space-all", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 80 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      }, 
      BOTTOMFIXED: {
          navPosition: "nav-position-bottom-fixed", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      },
      TOPJUMBO: {
          navPosition: "nav-position-top", 
          navSpace: "nav-space-none", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 120, bottom: 0 }, 
          uiPadding: { top: 15, left: 30, bottom: 30 },
          layoutName: "layout-jumbo-title"
      },
      BOTTOMJUMBO: {
          navPosition: "nav-position-bottom", 
          navSpace: "nav-space-none", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 120 }, 
          uiPadding: { top: 30, bottom: 30 },
          layoutName: "layout-jumbo-title"
      },
      TOPMOBILE: {
          navPosition: "nav-position-top", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 46, bottom: 0 }, 
          uiPadding: { top: 13, left: 13, right: 13, bottom: 28 },
          layoutName: "layout-mobile-focus"
      },
      BOTTOMMOBILE: {
          navPosition: "nav-position-bottom", 
          navSpace: "", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 46 }, 
          uiPadding: { top: 28, left: 13, right: 13, bottom: 13 },
          layoutName: "layout-mobile-focus"
      },
      TOPINLINELEFT: {
          navPosition: "nav-position-top", 
          navSpace: "nav-space-all", 
          panelPosition: "panel-right", 
          zoomPosition: "zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: "layout-inline-left"
      },
      TOPINLINERIGHT: {
          navPosition: "nav-position-top", 
          navSpace: "nav-space-all", 
          panelPosition: "panel-left", 
          zoomPosition: "zoom-top-right", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: "layout-inline-right"
      }
    }

    /******************************************************************
     * Tab - Title
     ******************************************************************/

    query("#titleButton").on("click", function() {
      query(".navbar-main-title")[0].innerHTML = query("#settingsTitleInput")[0].value;
      query(".navbar-sub-title")[0].innerHTML = query("#settingsSubTitleInput")[0].value;;
    });

    /******************************************************************
     * Tab - Map
     ******************************************************************/

    // Map
    query("#settings2dView").on("click", function(e) {
      domClass.toggle(query("#mapNav")[0], "hidden");
      domClass.toggle(query("#mapNavMenu")[0], "hidden");
    });

    query("#settings3dView").on("click", function(e) {
      domClass.toggle(query("#sceneNav")[0], "hidden");
      domClass.toggle(query("#sceneNavMenu")[0], "hidden");
    });

    query("#settingsAddLayer").on("click", function() {
      addFeatureService();
    });

    query("#settingsLayerOpacity").on("change", function() {
      var opacity = Number.parseFloat(this.value);
      if (app.mapFL && app.sceneFL) {
        app.mapFL.opacity = opacity;
        app.sceneFL.opacity = opacity;
      }
    }); 

    /******************************************************************
     * Tab - Theme
     ******************************************************************/

    // Theme
    query("#settingsTheme").on("change", function(e) {    
      var theme = e.target.value;
      var textColor = e.target.options[e.target.selectedIndex].dataset.textcolor;
      query("body").removeClass("calcite-theme-dark").addClass(theme);
      // Remove calcite classes (color)
      query(".navbar").attr("class")[0].split(" ").forEach(function(val){
        if (val.indexOf("calcite-") > -1) {
          query(".navbar").removeClass(val);
        }
      });
      // Add text color
      query(".navbar").removeClass("calcite-text-dark calcite-text-light").addClass(textColor);
      // Update UI
      query("#settingsNav").attr("value", "default");
      query("#settingsNavText").attr("value", textColor);
    });

    // Nav - set custom navbar color and associated text
    query("#settingsNav").on("change", function(e) {    
      var bgColor = e.target.value;
      var textColor =  e.target.options[e.target.selectedIndex].dataset.textcolor;
      // Remove calcite classes (color)
      query(".navbar").attr("class")[0].split(" ").forEach(function(val){
        if (val.indexOf("calcite-") > -1) {
          query(".navbar").removeClass(val);
        }
      });
      // Add calcite classes
      query(".navbar").addClass(textColor).addClass(bgColor);
      if (bgColor === "default") {
        on.emit(query("#settingsTheme")[0], "change",  { bubbles: true, cancelable: true });
      }
      // Update UI
      query("#settingsNavText").attr("value", textColor);
    });

    // Nav Text - override text
    query("#settingsNavText").on("change", function(e) {
      var style = e.target.value,
      navbar = query(".navbar")[0];
      domClass.remove(navbar, "calcite-text-light calcite-text-dark");
      domClass.add(navbar, style);
    });

    // Widgets - set light (default) or dark theme
    query("#settingsWidgets").on("change", function(e) {    
      var theme = e.target.value;
      query("body").removeClass("calcite-widgets-dark calcite-widgets-light").addClass(theme);
    });

    // // Opacity
    // query("#settingsOpacity").on("change", function(e) {
    //  var navbar = query(".navbar")[0];
    //     var bgColor = domStyle.get(navbar, "background-color");
    //     if(bgColor.indexOf('a') == -1){
    //         bgColor = bgColor.replace(')', ', ' + parseFloat(e.target.value).toFixed(2) +')').replace('rgb', 'rgba');
    //     } else {
    //         bgColor = bgColor.replace(/[\d\.]+\)$/g, e.target.value + ')');
    //     }
    //     domStyle.set(navbar, {"background-color" : bgColor});
    // });

    /******************************************************************
     * Tab - Layout
     ******************************************************************/
  
    query("#settingsLayout").on("change", function(e) {
      var theme = e.target.value;
      // Add classes
      switch (theme) {
        // Default layouts
        case "layout-top": // default
          setLayout(ALL_THEMES.TOP);
          break;
        case "layout-top-space":
          setLayout(ALL_THEMES.TOPSPACE);
          break;
        case "layout-top-space-all":
          setLayout(ALL_THEMES.TOPSPACEALL);
          break;
        case "layout-top-fixed":
          setLayout(ALL_THEMES.TOPFIXED);
          break;
        case "layout-bottom":
          setLayout(ALL_THEMES.BOTTOM);
          break;
        case "layout-bottom-space":
          setLayout(ALL_THEMES.BOTTOMSPACE);
          break;
        case "layout-bottom-space-all":
          setLayout(ALL_THEMES.BOTTOMSPACEALL);
          break;
        case "layout-bottom-fixed":
          setLayout(ALL_THEMES.BOTTOMFIXED);
          break;
        // Custom layouts
        case "layout-jumbo-title-top":
          setLayout(ALL_THEMES.TOPJUMBO);
          break;
        case "layout-jumbo-title-bottom":
          setLayout(ALL_THEMES.BOTTOMJUMBO);
          break;
        case "layout-mobile-focus-top":
          setLayout(ALL_THEMES.TOPMOBILE);
          break;
        case "layout-mobile-focus-bottom":
          setLayout(ALL_THEMES.BOTTOMMOBILE);
          break;
        case "layout-inline-left":
          setLayout(ALL_THEMES.TOPINLINELEFT);
          break;
        case "layout-inline-right":
          setLayout(ALL_THEMES.TOPINLINERIGHT);
          break;
        default:
          setLayout(ALL_THEMES.TOP);
          break;
      }
    });

    // Map widgets add/remove
    query("#settingsMapWidget").on("change", function(e) {
      on.emit(query("#settingsPositionMapWidget")[0], "change",  {
              bubbles: true,
              cancelable: true
          });
    });

    // Scene widgets add/remove
    query("#settingsSceneWidget").on("change", function(e) {
      on.emit(query("#settingsPositionSceneWidget")[0], "change",  {
              bubbles: true,
              cancelable: true
          });
    });

    // Map widgets position
    query("#settingsPositionMapWidget").on("change", function(e) {
      var name = query("#settingsMapWidget")[0].value,
        position = e.target.value;
      setWidgetPosition(app.mapView, name, position);
    });

    // Scene widgets position
    query("#settingsPositionSceneWidget").on("change", function(e) {
      var name = query("#settingsSceneWidget")[0].value,
        position = e.target.value;
      setWidgetPosition(app.sceneView, name, position);
    });

    query("#settingsPopup").on("change", function(e){
      var popupOptions = {
        position: e.target.value
      }
      setPopupDock(app.mapView, popupOptions);
      setPopupDock(app.sceneView, popupOptions);
    });

    query("#settingsPanel").on("change", function(e) {
      var body = query("body")[0],
        panelStyle = e.target.value;
      domClass.remove(body, "panel-left panel-right");
      domClass.add(body, panelStyle);
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

    /******************************************************************
     * Tab - Map functions
     ******************************************************************/

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
        showErrorLoadingLayer("Sorry, please provide a valid URL.");
        return;
      }  

      // Create layers - two layers because they will have different styles
      app.mapFL = createLayer(url);
      app.sceneFL = createLayer(url);

      // Added to Map
      app.mapFL.then(function(){
        // Create legend
        createLegendWidget("legendDiv");
        }, function(error){
          showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
          removeFeatureService();
          return;
        });

      // Added to Scene
      app.sceneFL.then(function(){
        }, function(error){
          showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
          removeFeatureService();
          return;
        });

       // Add to map
      app.mapView.map.add(app.mapFL);
      app.sceneView.map.add(app.sceneFL);
      
      // Zoom map to extent of layer
      app.mapFL.watch("loaded", function(newValue, oldValue, property, object) {
        if (newValue) {
          if (object.fullExtent) {
            zoomToProjectedExtent(object.fullExtent);                           
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
        app.mapView.popup.clear();
        app.sceneView.popup.set({visible: false});
        app.sceneView.popup.clear();
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
          app.mapView.goTo(results[0].extent);
          watchUtils.whenTrueOnce(app.sceneView, "ready").then(function(isReady) {
            app.sceneView.goTo(results[0].extent);
          });
          // Update button
          query("#settingsAddLayer").addClass("btn-danger").removeClass("btn-primary");
          query("#settingsAddLayer")[0].innerText = "Remove";                           
        } else {
          showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
          removeFeatureService();
        }
      }, function(e){
        showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
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
            title: lyr.title,
            content: "{*}"
          })
        });
      })
      return lyr;
    }

    function createLegendWidget(containerId) {
      var legend = new Legend({
        view: app.mapView,
        layerInfos: [{
          layer: app.mapView.map.layers.items[0],
          title: ""
        }]
      }, containerId);
      legend.startup(); 
    }

    function showErrorLoadingLayer(msg) {
      //$("#layerErrorMsg").text(msg);
      //$("#layerError").removeClass("hidden");
      console.log(msg);
    }

    /******************************************************************
     * Layout functions
     ******************************************************************/

    function setLayout(layout) {
      removeClasses();
      addClasses(layout);
      setPadding(layout.viewPadding, layout.uiPadding);
      setPaddingUI(layout.viewPadding);
      if (layout.zoomPosition === "zoom-top-right") {
        setWidgetPosition(app.mapView, "zoom", "top-right");
        setWidgetPosition(app.sceneView, "zoom", "top-right");
      } else {
        setWidgetPosition(app.mapView, "zoom", "top-left");
        setWidgetPosition(app.sceneView, "zoom", "top-left");
      }
    }

    function addClasses(layout) {
      var body = query("body")[0],
        nav = query("nav")[0];
      domClass.add(body, layout.navPosition + " " + layout.navSpace + " " + layout.panelPosition + " " + layout.zoomPosition + " " + layout.layoutName);
      domClass.add(nav, layout.navFixedPosition);
    }

    function removeClasses() {
      var body = query("body")[0],
        nav = query("nav")[0];
      domClass.remove(body, ALL_STYLES.body);
      domClass.remove(nav, ALL_STYLES.nav);
    }

    function setPadding(viewPadding, uiPadding){
      app.mapView.padding = viewPadding;
      app.mapView.ui.padding = uiPadding;
      app.sceneView.padding = viewPadding;
      app.sceneView.ui.padding = uiPadding;
    }

    function setPaddingUI(viewPadding) {
      query("#settingsPadding")[0].value = JSON.stringify(viewPadding);
    }

    function setWidgetPosition(view, name, position) {
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

    function setPopupDock(view, popupOptions) {
      view.popup.set({
        dockOptions: popupOptions
      });
      var dock = (popupOptions.position !== "auto");
      view.popup.set("dockEnabled", dock);
    }

});
