# Calcite Maps
A theme for [Bootstrap](https://www.getbootstrap.com) for designing, styling and creating modern map apps.

This project contains CSS classes that can be used with Bootstrap to quickly build responsive map apps with a great UI and UX. You can create a variety of custom apps with different themes, layouts and colors simply by applying the `calcite-maps-xxx` [classes](#documentation) to existing Bootstrap HTML elements. A number of [Bootstrap components](https://getbootstrap.com/components/) have been extended making it easy to add, remove and synchronize navbar items, dropdown menus and panels. The framework is also designed to work well with mapping components (zoom, home, attribution...) and provides additional features such as collapsible panels and "Full Map" to hide the UI for full map viewing. The Sass build creates a `calcite-maps-xxx.css` [library](#documentation) as well as a custom `calcite-maps-bootstrap.css` build of Bootstrap - which is optional to use. The framework is designed to work with the ArcGIS JS 3.x, 4.x and Esri-Leaflet API.

To [get started](#getting-started), typically you: 1) Build a Bootstrap HTML page, 2) Add references to Bootstrap and Calcite Maps, and 3) Apply Calcite Maps classes to the elements to style the app with the layout and colors desired.

To see what types of apps you can build check out the [live samples here](https://esri.github.io/calcite-maps/samples/index.html).

![calcite-maps.png](./calcite-maps.png?raw=true "Calcite Maps")

## What's included

* 14 different top and bottom layouts
* Small (40px), medium (50px) and large (65px) navbar sizes
* Dark and light color themes
* Calcite colors
* Extended navbar, dropdown menu and collapsible panels
* Dropdown menu drawer option
* Full map view
* Custom Sass build for [Bootstrap](https://www.getbootstrap.com) and Calcite Maps
* Support for [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/) and [Esri Leaflet](https://github.com/Esri/esri-leaflet)
* Dojo and jQuery support

NOTE: The framework is compatile with standard or custom builds of [Bootstrap 3.x](https://www.getbootstrap.com).

## Getting started

Here's a few ways to get started:

1. **Explore the styles** - Use the [Style Explorer](https://esri.github.io/calcite-maps/samples/index.html) to explore the different colors, styles and layouts. When you find a design you like, inspect the HTML and apply the styles (CSS classes) to your app.

2. **Start with a sample** - Create your own app from one of the [samples](./samples/index.html). Typically you reference Bootstrap, Calcite Maps and the appropriate JS library. [See example below](#example).

3. **Create a local build** - Fork and clone the repo to create a local build. The default build includes the Bootstrap components for the framework (scaffolding, navbar, panels...), but you can customize further by overriding variables, adding or removing style files, or adding/removing other Bootstrap components.

 Run the commands below:

 * Run `npm install` (node_modules/bootstrap)
 * Run `bower install` (bower_components/dojo-bootstrap - optional)
 * Run `grunt` (build out project to ./dist/**)

 NOTE: To start customizing, check out the [gruntfile.js](gruntfile.js), [build.scss](./lib/sass/build.scss) and [_variables.scss](./lib/sass/_variables.scss) files.

## Example

This example references Bootstrap, Calcite Maps, ArcGIS and the appropriate JS files. It has a top layout, with the default theme, a drop-down menu with a basemap panel. It also synchronizes the popup and Bootstrap panels. Here are the main calcite-maps classes used:

```
<body class="calcite-maps calcite-nav-top">

  <nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bg-dark">

    <div class="dropdown calcite-dropdown calcite-text-dark calcite-bg-light" role="presentation">
 
```

[Try it live](http://esri.github.io/calcite-maps/samples/arcgis-4.x/arcgis-4.x-example.html)

![calcite-maps-example.png](./calcite-maps-example.png?raw=true "Calcite Maps")

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="description" content="ArcGIS JS v4, Calcite Maps and Bootstrap Example">
 
  <title>ArcGIS JS v4, Calcite Maps and Bootstrap Example</title>

  <!-- Calcite Maps Bootstrap -->
  <link rel="stylesheet" href="https://esri.github.io/calcite-maps/dist/css/calcite-maps-bootstrap.min-v0.7.css">
  
  <!-- Calcite Maps -->
  <link rel="stylesheet" href="https://esri.github.io/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.7.css">

  <!-- ArcGIS JS 4 -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.7/esri/css/main.css">

  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
  </style>

</head>

<body class="calcite-maps calcite-nav-top">
  <!-- Navbar -->

  <nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bg-dark">
    <!-- Menu -->
    <div class="dropdown calcite-dropdown calcite-text-dark calcite-bg-light" role="presentation">
      <a class="dropdown-toggle" role="menubutton" aria-haspopup="true" aria-expanded="false" tabindex="0">
        <div class="calcite-dropdown-toggle">
          <span class="sr-only">Toggle dropdown menu</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
      <ul class="dropdown-menu" role="menu">
        <li><a role="menuitem" tabindex="0" data-target="#panelInfo" aria-haspopup="true"><span class="glyphicon glyphicon-info-sign"></span> About</a></li>
        <li><a role="menuitem" tabindex="0" href="#" data-target="#panelLegend" aria-haspopup="true"><span class="glyphicon glyphicon-list-alt"></span> Legend</a></li>
        <li><a role="menuitem" tabindex="0" href="#" id="calciteToggleNavbar" aria-haspopup="true"><span class="glyphicon glyphicon-fullscreen"></span> Full Map</a></li>
      </ul>
    </div>
    <!-- Title -->
    <div class="calcite-title calcite-overflow-hidden">
      <span class="calcite-title-main">Calcite Maps</span>
      <span class="calcite-title-divider hidden-xs"></span>
      <span class="calcite-title-sub hidden-xs">A Bootstrap theme for building modern map apps</span>
    </div>
    <!-- Nav -->
    <ul class="nav navbar-nav calcite-nav">
      <li>
        <div class="calcite-navbar-search calcite-search-expander">
          <div id="searchWidgetDiv"></div>
        </div>
      </li>
    </ul>
  </nav>

  <!--/.calcite-navbar -->

  <!-- Map  -->

  <div class="calcite-map calcite-map-absolute">
    <div id="mapViewDiv"></div>
  </div>

  <!-- /.calcite-map -->

  <!-- Panels -->

  <div class="calcite-panels calcite-panels-right calcite-text-light calcite-bg-dark panel-group">

    <!-- Panel - Basemaps -->

    <div id="panelInfo" class="panel collapse in">
      <div id="headingInfo" class="panel-heading" role="tab">
        <div class="panel-title">
          <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseInfo"  aria-expanded="true" aria-controls="collapseInfo"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span><span class="panel-label">About</span></a> 
          <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelInfo"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a>  
        </div>
      </div>
      <div id="collapseInfo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingInfo">
        <div class="panel-body">
          <p>This is my map app!</p>
        </div>
     </div>
    </div>

    <!-- Panel - Legend -->

    <div id="panelLegend" class="panel collapse">
      <div id="headingLegend" class="panel-heading" role="tab">
        <div class="panel-title">
          <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseLegend" aria-expanded="false" aria-controls="collapseLegend"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span><span class="panel-label">Legend</span></a> 
          <a class="panel-close" role="button" data-toggle="collapse" tabindex="0" href="#panelLegend"><span class="esri-icon esri-icon-close" aria-hidden="true"></span></a> 
        </div>
      </div>
      <div id="collapseLegend" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingLegend">
        <div class="panel-body">            
          <div id="legendDiv"></div>
        </div>
      </div>
    </div>

  </div>

  <!-- /.calcite-panels -->

  <script type="text/javascript">
    var dojoConfig = {
      packages: [{
        name: "bootstrap",
        location: "https://esri.github.io/calcite-maps/dist/vendor/dojo-bootstrap"
      },
      {
        name: "calcite-maps",
        location: "https://esri.github.io/calcite-maps/dist/js/dojo"
      }]
    };
  </script>

  <!-- ArcGIS JS 4 -->
  <script src="https://js.arcgis.com/4.7/"></script>

  <script>
    
    require([
      // ArcGIS
      "esri/WebMap",
      "esri/views/MapView",

      // Widgets
      "esri/widgets/Home",
      "esri/widgets/Zoom",
      "esri/widgets/Compass",
      "esri/widgets/Search",
      "esri/widgets/Legend",
      "esri/widgets/BasemapToggle",
      "esri/widgets/ScaleBar",
      "esri/widgets/Attribution",

      // Bootstrap
      "bootstrap/Collapse",
      "bootstrap/Dropdown",

      // Calcite Maps
      "calcite-maps/calcitemaps-v0.7",
      // Calcite Maps ArcGIS Support
      "calcite-maps/calcitemaps-arcgis-support-v0.7",

      "dojo/domReady!"
    ], function(WebMap, MapView, Home, Zoom, Compass, Search, Legend, BasemapToggle, ScaleBar, Attribution,Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport) {

      /******************************************************************
       *
       * Create the map, view and widgets
       * 
       ******************************************************************/

      // Map
      var map = new WebMap({
        portalItem: {
          id: "9f91f911f58540ceaac0300c55e18fbb"
        }
      });
      
      // View
      var mapView = new MapView({
        container: "mapViewDiv",
        map: map,
        padding: {
          top: 50,
          bottom: 0
        },
        ui: {components: []}
      });

      // Popup and panel sync
      mapView.then(function(){
        CalciteMapArcGISSupport.setPopupPanelSync(mapView);
      });

      // Search - add to navbar
      var searchWidget = new Search({
        container: "searchWidgetDiv",
        view: mapView
      });
      CalciteMapArcGISSupport.setSearchExpandEvents(searchWidget);

      // Map widgets
      var home = new Home({
        view: mapView
      });
      mapView.ui.add(home, "top-left");

      var zoom = new Zoom({
        view: mapView
      });
      mapView.ui.add(zoom, "top-left");

      var compass = new Compass({
        view: mapView
      });
      mapView.ui.add(compass, "top-left");
      
      var basemapToggle = new BasemapToggle({
        view: mapView,
        secondBasemap: "satellite"
      });
      mapView.ui.add(basemapToggle, "bottom-right");          
      
      var scaleBar = new ScaleBar({
        view: mapView
      });
      mapView.ui.add(scaleBar, "bottom-left");

      var attribution = new Attribution({
        view: mapView
      });
      mapView.ui.add(attribution, "manual");

      // Panel widgets - add legend
      var legendWidget = new Legend({
        container: "legendDiv",
        view: mapView
      });

    });
  </script>

</body>
</html>
```

## More Examples

Layout 1: Navbar Top - Dark Text - Light Background (default - light theme)

```html
<body class="calcite-nav-top">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-dark calcite-bg-light">
```

Layout 2: Navbar Top - Light Text - Dark Background (dark theme)

```html
<body class="calcite-nav-top">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-light calcite-bg-dark">
```

Layout 3: Navbar Bottom - Margin - Light Text - Dark Blue 75% (custom theme)

```html
<body class="calcite-nav-bottom calcite-nav-margin-bottom">
  <nav class="calcite-navbar navbar navbar-fixed-bottom calcite-text-light calcite-bg-custom calcite-bgcolor-blue-75">
```

Layout 4: Navbar Top - Inline Left Layout - Dark Text - White 75% (custom theme and layout)

```html
<body class="calcite-nav-top calcite-layout-inline-left">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-dark calcite-white-75">
```

## Documentation

Here's are the CSS classes you can apply to different elements to create your own custom map apps.

#### `<body class="calcite-nav-top"/>`
* Layout
 * `calcite-nav-top`
 * `calcite-nav-bottom`
 * `calcite-nav-margin-top`
 * `calcite-nav-margin-bottom`
 * `calcite-nav-margin-all`
* Custom Layouts
 * `calcite-layout-medium-title`
 * `calcite-layout-large-title`
 * `calcite-layout-inline-right`
 * `calcite-layout-inline-left`
* Zoom (ArcGIS 3.x and Esri-Leaflet only)
 * `calcite-zoom-top-left`
 * `calcite-zoom-top-right`
 * `calcite-zoom-bottom-left`
 * `calcite-zoom-bottom-right`

#### `<nav class="calcite-navbar"/>`
* Base
 * `calcite-navbar`
* Theme
 * `calcite-text-light`
 * `calcite-text-dark`
 * `calcite-bg-light`
 * `calcite-bg-dark`
 * `calcite-bg-custom`
* Background Color
 * `calcite-bgcolor-xxx`
* Title
 * `calcite-title`
 * `calcite-title-main`
 * `calcite-title-divider`
 * `calcite-title-sub`
* Search
 * `calcite-navbar-search`
 * `calcite-search-expander`

#### `<div class="dropdown"/>`
* Base
 * `calcite-dropdown`
* Theme
 * `calcite-text-light`
 * `calcite-text-dark`
 * `calcite-bg-light`
 * `calcite-bg-dark`
 * `calcite-bg-custom`

#### `<div class="dropdown-menu"/>`
* Style
 * `calcite-menu-drawer`
* Background Color
 * `calcite-bgcolor-xxx`

#### `<div class="calcite-panels"/>`
* Base
 * `calcite-panels`
* Position
 * `calcite-panels-right`
 * `calcite-panels-left`
* Theme
 * `calcite-text-light`
 * `calcite-text-dark`
 * `calcite-bg-light`
 * `calcite-bg-dark`
 * `calcite-bg-custom`
* Background Color
 * `calcite-bgcolor-xxx`

#### `<div class="calcite-map"/>`
* Base
 * `calcite-map`
* Position
 * `calcite-map-absolute`
 * `calcite-map-fixed`
* Widget Themes (ArcGIS 4.x only)
 * `calcite-widgets-dark`

#### `Utils`
* `calcite-overflow-hidden`
* `calcite-overflow-visible`
* `calcite-btn-noborder`
* `calcite-width-full`
* `calcite-index-top`

NOTE: See all colors [here](./lib/sass/_colors.scss)

## Requirements

* [Bootstrap](https://getbootstrap.com)

## Resources

* [ArcGIS for JavaScript API](https://developers.arcgis.com)
* [Esri-Leafllet](https://github.com/esri/esri-leaflet)
* [Calcite-Web](https://github.com/esri/calcite-web)
* [Calcite-Colors](https://github.com/esri/calcite-colors)
* [Bootstrap](https://getbootstrap.com)

## Issues

Find a bug or want to request a new feature? Please let us know by submitting an issue.  Thank you!

## Contributing

Anyone and everyone is welcome to contribute. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Credits
[Kevin Armstrong](https://github.com/xsokev) - [dojo-bootstrap](https://xsokev.github.io/Dojo-Bootstrap/)
[Bootstrap](https://getbootstrap.com/)

## Licensing
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](https://github.com/Esri/calcite-maps/blob/master/license.txt) file.

[](Esri Tags: Web Mapping ArcGIS Leaflet CSS Sass Frameworks esri-leaflet Design Basemaps Bootstrap Calcite Calcite Maps JavaScript Grunt)
[](Esri Language: CSS)
