# Calcite Maps
A modern framework for building map apps with Calcite styles and Bootstrap. 

This project contains a small set of CSS classes specifically designed for building responsive map apps with [Bootstrap](http://www.getbootstrap.com). The classes extend Bootstrap to make the components more map app-friendly. 

You can use Calcite Maps to quickly design applications with different layouts, top and bottom navigation, collapsible panels and with multiple tabs for 2D and 3D views. You can also apply custom colors and themes to your entire application without recompiling the CSS and Sass. The framework can be used with standard [Bootstrap](http://www.getbootstrap.com), [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap) or custom builds of Bootstrap.

To create your own custom apps, just [reference Calcite Maps](#getting-started) and then apply the desired CSS classes to the `body`, `nav` and `panel` elements of your Bootstrap page. If you want to integrate deeper, fork and clone the repo and compile the Sass to create your own [custom builds](#getting-started). 

Calcite Maps also works seamlessly with the new [ArcGIS API for JavaScript 4.x](https://developers.arcgis.com/javascript/).

```html
<link rel="stylesheet" href="https://esri.github.io/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min.css">

<body class="calcite-nav-top theme-widgets-dark">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-dark calcite-bgcolor-dark-blue">
```

[Check out the Styler and samples apps here](http://esri.github.io/calcite-maps/samples/index.html)

##What's included

* Calcite [colors](#documentation), [styles](#documentation) and [layouts](#documentation)
* Default (50px), medium (60px) and large (85px) navbar sizes
* Top and bottom layouts
* Dark and light themes
* Extended navbar, menus and panels
* Custom dropdown menu with open/close/toggle support
* Full map view
* Removal of browser "bounce" effect on mobile devices to simulate native app experience
* CSS and JS extensions for [Bootstrap](http://www.getbootstrap.com) components
* Sass build for [Bootstrap](http://www.getbootstrap.com), [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap) and Calcite Maps
* Support for [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/) and [Esri Leaflet](https://github.com/Esri/esri-leaflet)
* Dojo and jQuery options

![calcite-maps.png](./calcite-maps.png?raw=true "Calcite Maps")

##Getting started

Here's a few ways to get started:

1. **Explore the styles** - Use the [Styler](http://esri.github.io/calcite-maps/samples/index.html) to explore the different colors, styles and layouts. When you find a design you like, inspect the HTML and apply the styles to your app.

2. **Start with a sample** - Create your own app from the [samples](./samples/index.html) or the [example](#example) below by downloading the latest release or just referencing the [calcite-maps-xxx.min.css](./dist/css) and [calcite-maps.js](./dist/js) pre-compiled librares. 

3. **Create a local build** - Fork and clone the repo to create a local build. The default build includes the Bootstrap components for the framework (scaffolding, navbar, panels...), but you can customize further by overriding variables, adding or removing style files, or adding/removing other Bootstrap components.

 Run the commands below:

 * Run `npm install` (node_modules/bootstrap and calcite-bootstrap)
 * Run `bower install` (bower_components/dojo-bootstrap)
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
  <link rel="icon" href="http://www.esri.com/favicon.ico">
  <title>Calcite Maps - ArcGIS JS 4.0 Example</title>

  <!-- Calcite Bootstrap -->
  <link rel="stylesheet" href="http://esri.github.com/calcite-maps/dist/css/calcite-bootstrap.min-v0.2.css">

  <!-- Calcite Maps -->
  <link rel="stylesheet" href="http://esri.github.com/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min-v0.2.css">

  <!-- ArcGIS JS 4.0 -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.0/esri/css/main.css">

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

<body class="calcite-nav-top">

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
      <span class="calcite-title-main">Greater Los Angeles Demographics</span>
      <span class="calcite-title-divider hidden-xs"></span>
      <span class="calcite-title-sub hidden-xs">Explore population, age, income and housing values</span> 
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
        // location: location.pathname.replace(/\/[^/]+$/, "") + "./../../dist/vendor/dojo-bootstrap"
        location: "http://esri.github.com/calcite-maps/dist/vendor/dojo-bootstrap"
      },
      {
        name: "calcite-maps",
        // location: location.pathname.replace(/\/[^/]+$/, "") + "./../../dist/js/dojo"
        location: "http://esri.github.com/calcite-maps/dist/js/dojo"
      }]
    };
  </script>

  <!-- ArcGIS JS 4.0 -->
  <script src="https://js.arcgis.com/4.0/"></script>

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
      "calcite-maps/calcitemaps-v0.2",
      "dojo/domReady!"
    ], function(MapView, WebMap, Legend, query) {
        
      // Webmap 
      var webmap = new WebMap({
        portalItem: {
          id: "d0260a4512d0431b84d628e000b9d25e"
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

Here's the CSS classes you can apply to different elements to create your own app layouts.

#### Body
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

#### Nav
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

#### Dropdown
* Base
 * `calcite-dropdown`
* Theme
 * `calcite-text-light`
 * `calcite-text-dark`
 * `calcite-bg-light`
 * `calcite-bg-dark`
 * `calcite-bg-custom`

#### Dropdown-menu
* Background Color
 * `calcite-bgcolor-xxx`

#### Panels
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
 *`calcite-bgcolor-xxx`

#### Map
* Base
 * `calcite-map`
* Position
 * `calcite-map-absolute`
 * `calcite-map-fixed`
* Widget Themes (ArcGIS 4.x only)
 * `calcite-widgets-dark` 

#### Utils
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

* [Bootstrap](http://getbootstrap.com) or [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap)

## Resources

* [ArcGIS for JavaScript API](http://developers.arcgis.com)
* [Esri-Leafllet](http://github.com/esri/esri-leaflet)
* [Calcite-Bootstrap](http://github.com/calcite-bootstrap)
* [Calcite-Web](http://github.com/calcite-web)
* [Calcite-Colors](http://github.com/calcite-colors)
* [Bootstrap](http://getbootstrap.com)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.  Thank you!

## Contributing

Anyone and everyone is welcome to contribute. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Credits
[Kevin Armstrong](https://github.com/xsokev) - [dojo-bootstrap](http://xsokev.github.io/Dojo-Bootstrap/)
[Bootstrap](http://getbootstrap.com/)

## Licensing
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](https://github.com/Esri/calcite-maps/blob/master/license.txt) file.

[](Esri Tags: Web Mapping ArcGIS Leaflet CSS Sass Frameworks esri-leaflet Design Basemaps Bootstrap Calcite Calcite-Maps JavaScript Calcite-Bootstrap Grunt)
[](Esri Language: CSS)
