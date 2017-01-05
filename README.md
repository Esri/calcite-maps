# Calcite Maps
A theme for [Bootstrap](https://www.getbootstrap.com) for designing, styling and creating modern map apps.

This project contains a CSS/JS theme that can be used to quickly assemble a wide variety of map apps. You can create apps with different themes, layouts and colors simply by applying the `calcite-maps-xxx` classes to existing Bootstrap elements. A number of Bootstrap components including the navbar, dropdown menu and panels have been extended to make the framework more map app-friendly. Dropdown menus can be easily synchronized with panels. The framework is also designed to work well with mapping UI components such as zoom in/out controls, legends and attribution. The Sass build creates a Calcite Maps CSS library as well as an optimized build of Bootstrap - which is optional to use. The framework is fully responsive and is designed to work with the ArcGIS JS 3.x, 4.x and Esri-Leaflet API.

To [get started](#getting-started) you typically: 1) Build a Bootstrap HTML page, 2) Add references to Bootstrap and Calcite Maps, and 3) Apply Calcite Maps classes to the elements to style the app with the layout and colors desired.

To see what types of apps you can build, check out the [live samples here](https://esri.github.io/calcite-maps/samples/index.html).

![calcite-maps.png](./calcite-maps.png?raw=true "Calcite Maps")

##What's included

* Calcite [colors](#documentation), [styles](#documentation) and [layouts](#documentation)
* Small (40px), medium (50px) and large (65px) navbar sizes
* 14 different top and bottom layouts
* Dark and light color themes
* Extended navbar
* Custom dropdown menu (with drawer capabilities)
* Custom collapsable panels (right and left orientation)
* Full map view
* Mobile friendly including the removal of browser "bounce" effect on devices
* CSS and JS mapping extensions for [Bootstrap](https://www.getbootstrap.com) components
* Sass build for [Bootstrap](https://www.getbootstrap.com) and Calcite Maps
* Support for [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/) and [Esri Leaflet](https://github.com/Esri/esri-leaflet)
* Dojo and jQuery options

NOTE: The framework is compatile with [Bootstrap 3.x](https://www.getbootstrap.com) and custom builds of Bootstrap.

##Getting started

There are a few ways to get started:

1. **Explore the styles** - Use the [Styler](https://esri.github.io/calcite-maps/samples/index.html) to explore the different colors, styles and layouts. When you find a design you like, inspect the HTML and apply the styles to your app.

2. **Start with a sample** - Create your own app from the [samples](./samples/index.html) or the [example](#example) below.

3. **Create a local build** - Fork and clone the repo to create a local build. The default build includes the Bootstrap components for the framework (scaffolding, navbar, panels...), but you can customize further by overriding variables, adding or removing style files, or adding/removing other Bootstrap components.

 Run the commands below:

 * Run `npm install` (node_modules/bootstrap)
 * Run `bower install` (bower_components/dojo-bootstrap - optional)
 * Run `grunt` (build out project to ./dist/**)

 NOTE: To start customizing, check out the [gruntfile.js](gruntfile.js), [build.scss](./lib/sass/build.scss) and [_variables.scss](./lib/sass/_variables.scss) files.

## Example

[Try it live](http://esri.github.io/calcite-maps/samples/arcgis-4.x/arcgis-4.x-example.html)

![calcite-maps-example.png](./calcite-maps-example.png?raw=true "Calcite Maps")

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="description" content="Calcite Maps - ArcGIS 4.x SDK Sample">
  <link rel="icon" href="https://www.esri.com/favicon.ico">
  <title>Calcite Maps - ArcGIS JS 4 Example</title>

  <!-- Calcite Maps Bootstrap -->
  <link rel="stylesheet" href="https://esri.github.com/calcite-maps/dist/css/calcite-maps-bootstrap.min-v0.3.css">

  <!-- Calcite Maps -->
  <link rel="stylesheet" href="https://esri.github.com/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.3.css">

  <!-- ArcGIS JS 4.x -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.2/esri/css/main.css">

  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    .esri-legend {
      overflow: hidden;
    }
  </style>

</head>

<body class="calcite-maps calcite-nav-top">

  <!-- Navbar -->

  <nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bg-dark calcite-bgcolor-dark-blue">
    <!-- Header -->
    <div class="navbar-header">
      <a class="navbar-brand" role="button" id="calciteToggleNavbar" aria-haspopup="true">
        <span class="esri-icon esri-icon-map-pin"></span>
      </a>
    </div>
    <!-- Title -->
    <div class="calcite-title calcite-overflow-hidden">
      <span class="calcite-title-main">Missing Migrants</span>
      <span class="calcite-title-divider hidden-xs"></span>
      <span class="calcite-title-sub hidden-xs">Incident reports from around the world</span>
    </div>
    <!-- Nav -->
    <ul class="calcite-nav nav navbar-nav">                    
      <li><a role="button" data-target=".esri-legend" data-toggle="collapse" aria-expanded="true"><span class="glyphicon glyphicon-list"></span></a></li>          
    </ul>
  </nav><!--/.navbar -->

  <!-- Map Container  -->

  <div class="calcite-map calcite-map-absolute">
    <div id="mapViewDiv"></div>
  </div><!-- /.container -->

  <script type="text/javascript">
    var dojoConfig = {
      packages: [{
        name: "bootstrap",
        location: "https://esri.github.com/calcite-maps/dist/vendor/dojo-bootstrap"
      },
      {
        name: "calcite-maps",
        location: "https://esri.github.com/calcite-maps/dist/js/dojo"
      }]
    };
  </script>

  <!-- ArcGIS JS 4.x -->
  <script src="https://js.arcgis.com/4.2/"></script>

  <script>

    require([
      // ArcGIS JS
      "esri/views/MapView",
      "esri/WebMap",
      "esri/widgets/Legend",
      "dojo/query",

      // Bootstrap
      "bootstrap/Collapse",

      // Calcite-maps
      "calcite-maps/calcitemaps-v0.3",
      "dojo/domReady!"
    ], function(MapView, WebMap, Legend, query) {

      // Webmap
      var webmap = new WebMap({
        portalItem: {
          id: "742e3546ff1e4e0bba3360ae5004d0e1"
        }
      });

      // View
      var view = new MapView({
        map: webmap,
        container: "mapViewDiv",
        padding: {
            top: 50
          }
      });

      // Legend
      view.then(function(result) {
        view.zoom = 2;
        var legend = new Legend({
          view: view,
          layerInfos: [{
            layer: view.map.layers.items[0],
            title: ""
          }]
        });
        view.ui.add(legend, "top-right");
        query("#" + legend.id).addClass("collapse in");
      });

    });
  </script>

</body>
</html>
```

## Documentation

Here's the CSS classes you can apply to different elements to create your own designs.

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
 * `calcite-panel-right`
 * `calcite-panel-left`
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

## Examples

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
