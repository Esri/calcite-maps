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
  "dojo/_base/lang",
  "dojo/_base/declare",

  "dojo/domReady!"
], 
function(Zoom, Home, Locate, Compass, BasemapToggle, Search, Legend, Component, FeatureLayer, PopupTemplate, 
  Extent, ProjectUtils, GeometryService, ProjectParams, watchUtils, 
  query, domClass, domStyle, touch, on, keys, lang, declare) {

  //--------------------------------------------------------------------------
  //
  //  Constants
  //
  //--------------------------------------------------------------------------

  var CALCITE_THEME_SELECTORS = {
    NAVBAR: ".calcite-navbar",
    DROPDOWN: ".calcite-dropdown",
    DROPDOWN_MENU: ".calcite-dropdown .dropdown-menu",
    PANELS: ".calcite-panels",
    MAP: ".calcite-map"
  }

  var CALCITE_THEME_STYLES = {
    BG_LIGHT: "calcite-bg-light", // default
    BG_DARK: "calcite-bg-dark",
    BG_CUSTOM: "calcite-bg-custom",
    TEXT_LIGHT: "calcite-text-light",
    TEXT_DARK: "calcite-text-dark", // default
    WIDGETS_DARK: "calcite-widgets-dark",
    WIDGETS_LIGHT: "calcite-widgets-light", // default
    RGBA_DEFAULT: "" // default (no bg color)
  }

  var CALCITE_LAYOUT_STYLES = {
    body: 
    // Custom layouts
    "calcite-layout-large-title calcite-layout-small-title calcite-layout-inline-right calcite-layout-inline-left " +
    // Nav
    "calcite-nav-top calcite-nav-bottom calcite-nav-top-fixed calcite-nav-bottom-fixed " +
    // Nav space
    "calcite-margin-top calcite-margin-bottom calcite-margin-all " + 
    // Zoom
    "calcite-zoom-top-left calcite-zoom-top-right calcite-zoom-bottom-left calcite-zoom-bottom-right " +
    // Minibar
    "calcite-nav-transparent",
    nav:
    // Navbar
    "navbar-fixed-top navbar-fixed-bottom",
    // Panels
    panels: "calcite-panels-right calcite-panels-left"
  }

  var PanelSettings = declare(null, {
    
    APP_LAYOUTS: {
      TOP: {
          navPosition: "calcite-nav-top", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 50 , bottom: 0 },
          viewPaddingNavHidden: { top: 0 , bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      },
      TOPSPACE: {
          navPosition: "calcite-nav-top", 
          navSpace: "calcite-margin-top", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 65, bottom: 0 }, 
          viewPaddingNavHidden: { top: 0 , bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      }, 
      TOPSPACEALL: {
          navPosition: "calcite-nav-top", 
          navSpace: "calcite-margin-all", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 65, bottom: 0 }, 
          viewPaddingNavHidden: { top: 0 , bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      }, 
      TOPFIXED: {
          navPosition: "calcite-nav-top-fixed", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          viewPaddingNavHidden: { top: 0 , bottom: 0 },
          uiPadding: { top: 15, bottom: 30 },
          layoutName: ""
      },
      BOTTOM: {
          navPosition: "calcite-nav-bottom", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 50  },
          viewPaddingNavHidden: { top: 0 , bottom: 0 },
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      },
      BOTTOMSPACE: {
          navPosition: "calcite-nav-bottom", 
          navSpace: "calcite-margin-bottom", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 65 },
          viewPaddingNavHidden: { top: 0 , bottom: 0 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      }, 
      BOTTOMSPACEALL: {
          navPosition: "calcite-nav-bottom", 
          navSpace: "calcite-margin-all", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 65 },
          viewPaddingNavHidden: { top: 0 , bottom: 0 }, 
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      }, 
      BOTTOMFIXED: {
          navPosition: "calcite-nav-bottom-fixed", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 0 }, 
          viewPaddingNavHidden: { top: 0 , bottom: 0 },
          uiPadding: { top: 30, bottom: 15 },
          layoutName: ""
      },
      // Custom layouts...
      TOPSMALL: {
          navPosition: "calcite-nav-top", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 40, bottom: 0 }, 
          viewPaddingSmallScreen: { top: 40, bottom: 0 }, 
          uiPadding: { top: 15, left: 15, right: 15, bottom: 30 },
          layoutName: "calcite-layout-small-title"
      },
      BOTTOMSMALL: {
          navPosition: "calcite-nav-bottom", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 40 }, 
          viewPaddingSmallScreen: { top: 0, bottom: 40 }, 
          uiPadding: { top: 30, left: 15, right: 15, bottom: 15 },
          layoutName: "calcite-layout-small-title"
      },
      TOPLARGE: {
          navPosition: "calcite-nav-top", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 60, bottom: 0 }, 
          viewPaddingSmallScreen: { top: 60, bottom: 0 }, 
          uiPadding: { top: 15, left: 15, right: 15, bottom: 30 },
          layoutName: "calcite-layout-large-title"
      },
      BOTTOMLARGE: {
          navPosition: "calcite-nav-bottom", 
          navSpace: "", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-bottom",
          viewPadding: { top: 0, bottom: 60 },
          viewPaddingSmallScreen: { top: 0, bottom: 60 }, 
          uiPadding: { top: 30, left: 15, right: 15, bottom: 15 },
          layoutName: "calcite-layout-large-title"
      },
      TOPINLINELEFT: {
          navPosition: "calcite-nav-top", 
          navSpace: "calcite-margin-all", 
          panelPosition: "calcite-panels-right", 
          zoomPosition: "calcite-zoom-top-left", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: "calcite-layout-inline-left"
      },
      TOPINLINERIGHT: {
          navPosition: "calcite-nav-top", 
          navSpace: "calcite-margin-all", 
          panelPosition: "calcite-panels-left", 
          zoomPosition: "calcite-zoom-top-right", 
          navFixedPosition: "navbar-fixed-top",
          viewPadding: { top: 0, bottom: 0 }, 
          uiPadding: { top: 15, bottom: 30 },
          layoutName: "calcite-layout-inline-right"
      }
    },

    _this: null,

    activeLayout: null,
    
    // TODO
    defaultOptions: {
      "loading-text":'loading...'
    },

    // Default settings
    styleSettings: {
      navbar: {
        bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
        textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
        bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
      },
      dropdown: {
        bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
        textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
        bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
      },
      panel: {
        bgStyle: CALCITE_THEME_STYLES.BG_LIGHT, // calcite-bg-light / calcite-bg-dark / calcite-bg-custom
        textStyle: CALCITE_THEME_STYLES.TEXT_DARK, // calcite-text-dark / calcite-text-light
        bgRgbaColor: CALCITE_THEME_STYLES.RGBA_DEFAULT // ""
      }
    },

    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------

    constructor: function (options) {
        _this = this;

        _this.options = lang.mixin(lang.clone(_this.defaultOptions), (options || {}));
        
        _this.app = options.app;

        _this.activeLayout = _this.APP_LAYOUTS.TOP; //default

        _this._initUIHandlers();
    },

    //--------------------------------------------------------------------------
    //
    //  UI
    //
    //--------------------------------------------------------------------------

    _initUIHandlers: function() {

      //--------------------------------------------------------------------
      // Tab - Title
      //--------------------------------------------------------------------

      query("#titleButton").on("click", function() {
        query(".calcite-title-main")[0].innerHTML = query("#settingsTitleInput")[0].value;
        query(".calcite-title-sub")[0].innerHTML = query("#settingsSubTitleInput")[0].value;;
      });

      //--------------------------------------------------------------------
      // Tab - Map
      //--------------------------------------------------------------------

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
        _this.addFeatureService();
      });

      query("#settingsLayerOpacity").on("change", function() {
        var opacity = Number.parseFloat(this.value);
        if (_this.app.mapFL && _this.app.sceneFL) {
          _this.app.mapFL.opacity = opacity;
          _this.app.sceneFL.opacity = opacity;
        }
      }); 

      //--------------------------------------------------------------------
      // Tab - Theme
      //--------------------------------------------------------------------

      //----------------------------------
      // Color
      //----------------------------------

      query("#settingsColor").on("change", function(e) {
        var style = e.target.value;
        // Update UI
        query("#colorThemeCollapse").removeClass("in");
        query("#colorCalciteCollapse").removeClass("in");
        query("#colorPickerCollapse").removeClass("in");
        switch (style) {
          // Show Calcite themes
          case "theme":
            query("#colorThemeCollapse").collapse("show");
            break;
          // Show calcite colors
          case "calcite":
            query("#colorCalciteCollapse").collapse("show");
            break;
          // Show custom colors
          case "custom":
            query("#colorPickerCollapse").collapse("show");
        }
      });

      //----------------------------------
      // Calcite Themes
      //----------------------------------

      query("#settingsThemeColor").on("change", function(e) {
        // Get styles 
        var theme = e.target.value,
          textStyle = "";
          bgStyle = "";
          bgRgbaColor = "";
          applyToAll = true;

        // Select light theme
        switch (theme) {
          case "light":
            textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
            bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
            bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT; 
            break;
          // Select dark theme
          case "dark":
            textStyle = CALCITE_THEME_STYLES.TEXT_LIGHT;
            bgStyle = CALCITE_THEME_STYLES.BG_DARK;
            bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
            break;
        }

        // Update UI 
        query("#settingsCalciteColorAll")[0].checked = true;
        query("#settingsPickerColorAll")[0].checked = true;
        query("#settingsTextColor")[0].value = textStyle;

        // Set styles
        _this.setStyles(bgStyle, textStyle, bgRgbaColor, applyToAll);
        _this.applyStyles();
      });


      //----------------------------------
      // Calcite Colors
      //----------------------------------

      query("#settingsCalciteColor").on("change", function(e) {
        // Get styles 
        var bgColorStyle = e.target.value,
          textStyle = e.target.options[e.target.selectedIndex].dataset.textcolor;
          bgStyle = CALCITE_THEME_STYLES.BG_CUSTOM;
          bgRgbaColor = _this._getRgbaColorFromStyle(bgColorStyle); // Convert to RGB
          applyToAll = query("#settingsCalciteColorAll")[0].checked;

         // Update UI
        query("#settingsTextColor")[0].value = textStyle;

        // Set styles
        _this.setStyles(bgStyle, textStyle, bgRgbaColor, applyToAll);
        _this.applyStyles();
      });

      //----------------------------------
      // Color Picker
      //----------------------------------

      query("#colorPickerDiv").on("color-change", function(e) {
        e.color = e.color || _this.app.colorPickerWidget.color;
        if (!e.color) {
          return;
        }
        // Get styles  
        var bgStyle = CALCITE_THEME_STYLES.BG_CUSTOM,
          bgRbgaColor = "rgba(" + e.color.r + "," + e.color.g + "," + e.color.b + "," + e.color.a + ")",
          textStyle = null,
          applyToAll = query("#settingsCalciteColorAll")[0].checked;
        
        // Get the best complimentary text color
        var hsl = _this._rgb2hsl(e.color.r, e.color.g, e.color.b);
        if (hsl.l < 0.55) {
          textStyle = CALCITE_THEME_STYLES.TEXT_LIGHT;
        } else {
          textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
        }

        // Update UI
        query("#settingsTextColor")[0].value = textStyle;

        // Set styles
        _this.setStyles(bgStyle, textStyle, bgRbgaColor, applyToAll);
        _this.applyStyles();
      });

      //----------------------------------
      // Apply to all checkboxes
      //----------------------------------

      query("#settingsCalciteColorAll").on("click", function(e) {
        // Sync UI
        query("#settingsPickerColorAll")[0].checked = e.target.checked;
        // Set styles
        on.emit(query("#settingsCalciteColor")[0], "change", { bubbles: true, cancelable: true });
      });

      query("#settingsPickerColorAll").on("click", function(e) {
        // Sync UI
        query("#settingsCalciteColorAll")[0].checked = e.target.checked;
        // Set styles
        on.emit(query("#colorPickerDiv")[0], "color-change", { bubbles: true, cancelable: true });
      });

      //----------------------------------
      // Text Color
      //----------------------------------

      query("#settingsTextColor").on("change", function(e) {
        // Get styles  
        var textStyle = e.target.value,
          applyToAll = query("#settingsCalciteColorAll")[0].checked;

        // Set styles
        _this.setStyles(null, textStyle, null, applyToAll);
        _this.applyStyles();
      });

      //----------------------------------
      // Widgets Color
      //----------------------------------

      query("#settingsWidgets").on("change", function(e) {    
        var theme = e.target.value;
        query(CALCITE_THEME_SELECTORS.MAP).removeClass("calcite-widgets-dark calcite-widgets-light").addClass(theme);
      });

      //--------------------------------------------------------------------
      // Tab - Layout
      //--------------------------------------------------------------------

      query("#settingsLayout").on("change", function(e) {
        var theme = e.target.value;
        // Add classes
        switch (theme) {
          // Default APP_LAYOUTS
          case "layout-top": // default
            _this.setLayout(_this.APP_LAYOUTS.TOP);
            break;
          case "layout-top-space":
            _this.setLayout(_this.APP_LAYOUTS.TOPSPACE);
            break;
          case "layout-top-space-all":
            _this.setLayout(_this.APP_LAYOUTS.TOPSPACEALL);
            break;
          case "layout-top-fixed":
            _this.setLayout(_this.APP_LAYOUTS.TOPFIXED);
            break;
          case "layout-bottom":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOM);
            break;
          case "layout-bottom-space":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOMSPACE);
            break;
          case "layout-bottom-space-all":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOMSPACEALL);
            break;
          case "layout-bottom-fixed":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOMFIXED);
            break;
          // Custom APP_LAYOUTS
          case "calcite-layout-small-title-top":
            _this.setLayout(_this.APP_LAYOUTS.TOPSMALL);
            break;
          case "calcite-layout-small-title-bottom":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOMSMALL);
            break;
          case "calcite-layout-large-title-top":
            _this.setLayout(_this.APP_LAYOUTS.TOPLARGE);
            break;
          case "calcite-layout-large-title-bottom":
            _this.setLayout(_this.APP_LAYOUTS.BOTTOMLARGE);
            break;
          case "calcite-layout-inline-left":
            _this.setLayout(_this.APP_LAYOUTS.TOPINLINELEFT);
            break;
          case "calcite-layout-inline-right":
            _this.setLayout(_this.APP_LAYOUTS.TOPINLINERIGHT);
            break;
          default:
            _this.setLayout(_this.APP_LAYOUTS.TOP);
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
        _this.setWidgetPosition(_this.app.mapView, name, position);
      });

      // Scene widgets position
      query("#settingsPositionSceneWidget").on("change", function(e) {
        var name = query("#settingsSceneWidget")[0].value,
          position = e.target.value;
        _this.setWidgetPosition(_this.app.sceneView, name, position);
      });

      query("#settingsPopup").on("change", function(e){
        var popupOptions = {
          position: e.target.value
        }
        _this.setPopupDock(_this.app.mapView, popupOptions);
        _this.setPopupDock(_this.app.sceneView, popupOptions);
      });

      query("#settingsPanel").on("change", function(e) {
        var panels = query(CALCITE_THEME_SELECTORS.PANELS)[0],
          panelStyle = e.target.value;
        domClass.remove(panels, "calcite-panels-left calcite-panels-right");
        domClass.add(panels, panelStyle);
      });

      query("#settingsMenu").on("change", function(e) {
        var menu = query(CALCITE_THEME_SELECTORS.DROPDOWN_MENU)[0],
          menuStyle = e.target.value;
        domClass.remove(menu, "calcite-menu-drawer");
        domClass.add(menu, menuStyle);
      });

      query("#settingsPadding").on("keydown", function(evt) {
        if (evt.keyCode === keys.ENTER) {
          var str = this.value;
          var padding = eval("("+str+")");
          if (padding) {
            _this.app.mapView.padding = padding;
            _this.app.sceneView.padding = padding;
          }
        }
      });
    },

    //--------------------------------------------------------------------------
    //
    //  Private Functions
    //
    //--------------------------------------------------------------------------

    _rgb2hsv: function() {
      var rr, gg, bb,
          r = arguments[0] / 255,
          g = arguments[1] / 255,
          b = arguments[2] / 255,
          h, s,
          v = Math.max(r, g, b),
          diff = v - Math.min(r, g, b),
          diffc = function(c){
              return (v - c) / 6 / diff + 1 / 2;
          };

      if (diff == 0) {
          h = s = 0;
      } else {
          s = diff / v;
          rr = diffc(r);
          gg = diffc(g);
          bb = diffc(b);

          if (r === v) {
              h = bb - gg;
          }else if (g === v) {
              h = (1 / 3) + rr - bb;
          }else if (b === v) {
              h = (2 / 3) + gg - rr;
          }
          if (h < 0) {
              h += 1;
          }else if (h > 1) {
              h -= 1;
          }
      }
      return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          v: Math.round(v * 100)
      };
    },

    _rgb2hsl: function(r, g, b){
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
          h = s = 0; // achromatic
      }else{
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }
      return {
          h: h,
          s: s,
          l: l
      };
    },

    _getRgbaColorFromStyle: function(calciteBgColorStyle) {
      caliteColorStyle = "." + calciteBgColorStyle,
        attr = "backgroundColor";
      var ss = document.styleSheets;
      var rgba = "";
      for (var i = 0; i < ss.length; i++) {
        var ss = document.styleSheets;
        var rules = ss[i].cssRules; // || ss[i].rules;
        if (rules) {
          for (var j = 0; j < rules.length; j++) {
            if (rules[j].selectorText === caliteColorStyle) {
              rgba = rules[j].style[attr];
            }
          }
        }
      }
      return rgba;
    },

    //--------------------------------------------------------------------------
    //
    //  Public Functions
    //
    //--------------------------------------------------------------------------

    setStyles: function(bgStyle, textStyle, bgRgbaColor, applyToAll) {
      // Navbar
      _this.styleSettings.navbar.bgStyle = bgStyle || _this.styleSettings.navbar.bgStyle;
      _this.styleSettings.navbar.textStyle = textStyle || _this.styleSettings.navbar.textStyle;
      _this.styleSettings.navbar.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.navbar.bgRgbaColor;
      // Navbar only - reset
      if (!applyToAll) {
        // Dropdown - reset
        _this.styleSettings.dropdown.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
        _this.styleSettings.dropdown.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
        _this.styleSettings.dropdown.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
        // Panel - reset
        _this.styleSettings.panel.bgStyle = CALCITE_THEME_STYLES.BG_LIGHT;
        _this.styleSettings.panel.textStyle = CALCITE_THEME_STYLES.TEXT_DARK;
        _this.styleSettings.panel.bgRgbaColor = CALCITE_THEME_STYLES.RGBA_DEFAULT;
      } else {
        // Dropdown
        // _this.styleSettings.dropdown.bgStyle = bgStyle || _this.styleSettings.dropdown.bgStyle;
        // _this.styleSettings.dropdown.textStyle = textStyle || _this.styleSettings.dropdown.textStyle;
        // _this.styleSettings.dropdown.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.dropdown.bgRgbaColor;
        // Panel
        _this.styleSettings.panel.bgStyle = bgStyle || _this.styleSettings.panel.bgStyle;
        _this.styleSettings.panel.textStyle = textStyle || _this.styleSettings.panel.textStyle;
        _this.styleSettings.panel.bgRgbaColor = bgRgbaColor !== null ? bgRgbaColor : _this.styleSettings.panel.bgRgbaColor;
      }
    },

    applyStyles: function(applyToAll) {
      // Navbar
      _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.bgStyle);
      _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.textStyle);
      _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.NAVBAR, _this.styleSettings.navbar.bgRgbaColor);
      // Dropdown
      // _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, _this.styleSettings.dropdown.bgStyle);
      // _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.DROPDOWN, _this.styleSettings.dropdown.textStyle);
      // _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.DROPDOWN_MENU, _this.styleSettings.dropdown.bgRgbaColor);
      // Panel
      _this.setBgThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgStyle);
      _this.setTextThemeStyle(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.textStyle);
      _this.setBgRgbaColor(CALCITE_THEME_SELECTORS.PANELS, _this.styleSettings.panel.bgRgbaColor);
    },

    // BgColor
    setBgColorStyle: function(cssSelector, bgColorStyle) {
      _this.removeBgColorStyle(cssSelector);
      if (bgColorStyle !== "default") {
        query(cssSelector).addClass(bgColorStyle);
      }
    },

    setBgRgbaColor: function(cssSelector, bgColorRgba) {
      query(cssSelector).attr("style", {"background-color": bgColorRgba});
    },

    removeBgColorStyle: function(cssSelector) {
      query(cssSelector).attr("class")[0].split(" ").forEach(function(val){
        if (val.indexOf("calcite-bgcolor-") > -1) {
          query(cssSelector).removeClass(val);
        }
      });
    },

    // Theme - text
    setTextThemeStyle: function(cssSelector, textColorStyle) {
      query(cssSelector).removeClass(CALCITE_THEME_STYLES.TEXT_LIGHT + " " + CALCITE_THEME_STYLES.TEXT_DARK);
      query(cssSelector).addClass(textColorStyle);
    },

    // Theme - bg
    setBgThemeStyle: function(cssSelector, bgColorStyle) {
      query(cssSelector).removeClass(CALCITE_THEME_STYLES.BG_LIGHT + " " + CALCITE_THEME_STYLES.BG_DARK + " " + CALCITE_THEME_STYLES.BG_CUSTOM);
      query(cssSelector).addClass(bgColorStyle)
    },

    //----------------------------------
    // Tab - Map functions
    //----------------------------------

    // Create a feature layer to get feature service
    addFeatureService: function() {
      if (_this.removeFeatureService()) {
        //query("#settingsFeatureLayerUrl")[0].value = "";
        // Update button
        query("#settingsAddLayer").addClass("btn-primary").removeClass("btn-danger");
        query("#settingsAddLayer")[0].innerText = "Add Layer";      
        return;
      }
      
      // Validate url
      var url = query("#settingsFeatureLayerUrl")[0].value;
      if (url === "") {
        _this.showErrorLoadingLayer("Sorry, please provide a valid URL.");
        return;
      }  

      // Create layers - two layers because they will have different styles
      _this.app.mapFL = _this.createLayer(url);
      _this.app.sceneFL = _this.createLayer(url);

      // Added to Map
      _this.app.mapFL.then(function(){
        // Create legend
        _this.createLegendWidget("legendDiv");
        }, function(error){
          _this.showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
          _this.removeFeatureService();
          return;
        });

      // Added to Scene
      _this.app.sceneFL.then(function(){
        }, function(error){
          _this.showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
          _this.removeFeatureService();
          return;
        });

       // Add to map
      _this.app.mapView.map.add(_this.app.mapFL);
      _this.app.sceneView.map.add(_this.app.sceneFL);
      
      // Zoom map to extent of layer
      _this.app.mapFL.watch("loaded", function(newValue, oldValue, property, object) {
        if (newValue) {
          if (object.fullExtent) {
            _this._zoomToProjectedExtent(object.fullExtent);                           
          } else {
            _this.showErrorLoadingLayer("Sorry, the layer could not be loaded. Check the URL.");
            _this.removeFeatureService();
          }
        }
      });

      // Zoom scene and tile - TODO
      _this.app.sceneView.watch("updating", function(newValue, oldValue, property, object) {
        if (newValue && _this.app.sceneFL && !_this.app.sceneView.__sceneZoomed) {
          _this.app.sceneView.__sceneZoomed = true;
          _this.app.sceneView.animateTo({center: _this.app.mapView.center, scale: _this.app.mapView.scale, tilt: 45});
        }
      })
    },

    // Remove existing service
    removeFeatureService: function() {
      if (_this.app.mapFL && _this.app.sceneFL) {
        _this.app.mapView.map.remove(_this.app.mapFL);
        _this.app.sceneView.map.remove(_this.app.sceneFL);
        _this.app.mapView.zoom = _this.app.zoom; 
        _this.app.mapView.center = _this.app.lonlat;
        _this.app.sceneView.zoom = _this.app.zoom;
        _this.app.sceneView.center = _this.app.lonlat;
        _this.app.mapFL = null;
        _this.app.sceneFL = null;
        _this.app.sceneView.__sceneZoomed = false;
        _this.app.mapView.popup.set({visible: false});
        _this.app.mapView.popup.clear();
        _this.app.sceneView.popup.set({visible: false});
        _this.app.sceneView.popup.clear();
        return true;
      } else {
        return false;
      }
    },

    _zoomToProjectedExtent: function(extent) {
      var gvsc = new GeometryService({url: "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"});
      var params = new ProjectParams();
      params.geometries = [extent];
      params.outSR = _this.app.mapView.spatialReference;
      gvsc.project(params).then(function(results) {
        if (results.length > 0){
          // Update extent
          _this.app.mapView.goTo(results[0].extent);
          watchUtils.whenTrueOnce(_this.app.sceneView, "ready").then(function(isReady) {
            _this.app.sceneView.goTo(results[0].extent);
          });
          // Update button
          query("#settingsAddLayer").addClass("btn-danger").removeClass("btn-primary");
          query("#settingsAddLayer")[0].innerText = "Remove";                           
        } else {
          _this.showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
          _this.removeFeatureService();
        }
      }, function(e){
        _this.showErrorLoadingLayer("Sorry, the layer could not be projected for this map.");
        _this.removeFeatureService();
      });
    },

    createLayer: function(url) {
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
    },

    createLegendWidget: function(containerId) {
      if (_this.app.legend) {
        _this.app.legend.destroy();
      }
      _this.app.legend = new Legend({
        view: _this.app.mapView,
        layerInfos: [{
          layer: _this.app.mapView.map.layers.items[0],
          title: ""
        }]
      }, containerId);
      _this.app.legend.startup(); 
    },

    showErrorLoadingLayer: function(msg) {
      //$("#layerErrorMsg").text(msg);
      //$("#layerError").removeClass("hidden");
      console.log(msg);
    },

    //----------------------------------
    // Tab - Layout functions
    //----------------------------------

    setLayout: function(layout, hiddenNav) {
      // Update layout
      _this.activeLayout = layout;
      // Remove classes
      _this.removeClasses();
      _this.addClasses(layout);
      if (hiddenNav) {
        _this.setPadding(layout.viewPaddingHidden, layout.uiPadding);  
      } else {
        _this.setPadding(layout.viewPadding, layout.uiPadding);  
      }
      _this.setPaddingUI(layout.viewPadding); //update UI
      if (layout.zoomPosition === "calcite-zoom-top-right") {
        _this.setWidgetPosition(_this.app.mapView, "zoom", "top-right");
        _this.setWidgetPosition(_this.app.sceneView, "zoom", "top-right");
      } else {
        _this.setWidgetPosition(_this.app.mapView, "zoom", "top-left");
        _this.setWidgetPosition(_this.app.sceneView, "zoom", "top-left");
      }
    },

    addClasses: function(layout) {
      var body = query("body")[0],
        nav = query("nav")[0],
        panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
      domClass.add(body, layout.navPosition + " " + layout.navSpace + " " + layout.zoomPosition + " " + layout.layoutName);
      domClass.add(nav, layout.navFixedPosition);
      domClass.add(panels, layout.panelPosition);
    },

    removeClasses: function() {
      var body = query("body")[0],
        nav = query("nav")[0],
        panels = query(CALCITE_THEME_SELECTORS.PANELS)[0];
      domClass.remove(body, CALCITE_LAYOUT_STYLES.body);
      domClass.remove(nav, CALCITE_LAYOUT_STYLES.nav);
      domClass.remove(panels, CALCITE_LAYOUT_STYLES.panels);
    },

    setPadding: function(viewPadding, uiPadding) {
      if (window.innerWidth <= 768 && _this.activeLayout.viewPaddingSmallScreen) {
        viewPadding = _this.activeLayout.viewPaddingSmallScreen;
      }
      _this.app.mapView.padding = viewPadding;
      _this.app.mapView.ui.padding = uiPadding;
      _this.app.sceneView.padding = viewPadding;
      _this.app.sceneView.ui.padding = uiPadding;
    },

    setPaddingUI: function(viewPadding) {
      query("#settingsPadding")[0].value = JSON.stringify(viewPadding);
    },

    setWidgetPosition: function(view, name, position) {
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
            component = _this.createComponent(view, name);
              view.ui.add(component, position);
          }
      }               
    },

    createComponent: function(view, name) {
      var component,
        widget = _this.createWidget(view, name);
      component = new Component({
        node: widget, 
        id: name
      });
      return component;
    },

    createWidget: function(view, name) {
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
    },

    setPopupDock: function(view, popupOptions) {
      view.popup.set({
        dockOptions: popupOptions
      });
      var dock = (popupOptions.position !== "auto");
      view.popup.set("dockEnabled", dock);
    }

  });

  return PanelSettings;
});
