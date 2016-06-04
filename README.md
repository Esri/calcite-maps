# Calcite Maps
A framework for building map apps with Calcite styles and Bootstrap. 

This project contains a small set of colors, styles and layouts specifically designed for building responsive map apps with [Bootstrap](http://www.getbootstrap.com). You can use the styles with standard [Bootstrap](http://www.getbootstrap.com), [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap) or your own custom build. 

To create your own custom apps and designs, just [reference Calcite Maps](#getting-started) and then apply the desired styles (colors, themes, layouts...) to the `body`, `nav` and `panel` elements of your page (see below). If you want to integrate deeper, fork and clone the repo and compile the Sass to create your own [custom builds](#getting-started). 

Calcite Maps also works seamlessly with the new [ArcGIS API for JavaScript 4.x](https://developers.arcgis.com/javascript/).

**Example**

```html
<link rel="stylesheet" href="https://esri.github.io/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min.css">

<body class="calcite-nav-top theme-widgets-dark">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-dark calcite-bgcolor-dark-blue">
```

[Explore the styles and samples here](http://esri.github.io/calcite-maps/samples/index.html)

##What's included

* Calcite [colors](#documentation), [styles](#documentation) and [layouts](#documentation) for map apps
* Dark and light themes for apps and widgets (ArcGIS JS 4.x only)
* CSS and JS extensions for [Bootstrap](http://www.getbootstrap.com) components (navbar, menus, accordion and panels)
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
<meta name="description" content="Calcite-Maps - Example">
<title>Calcite Maps - ArcGIS JS 4.0 Example</title>

<!-- Calcite Maps -->
<link rel="stylesheet" href="https://esri.github.io/calcite-maps/dist/css/calcite-maps-arcgis-4.x.min.css">

<!-- ArcGIS JS 4.0 -->
<link rel="stylesheet" href="https://js.arcgis.com/4.0/esri/css/main.css">

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
</style>

</head>

<body class="calcite-nav-top">

  <!-- Navbar -->

  <nav class="navbar calcite-navbar navbar-fixed-top calcite-text-light calcite-bg-dark calcite-bgcolor-dark-blue">
    <!-- Header -->
    <div class="navbar-header">
      <a class="navbar-brand">
        <span class="esri-icon esri-icon-map-pin"></span>
      </a>
    </div>
    <!-- Title -->
    <div class="calcite-title">
      <div class="calcite-title-main calcite-overflow-hidden">Greater Los Angeles Demographics</div>
      <div class="calcite-title-sub calcite-overflow-hidden">Explore population, age, income and housing values</div> 
    </div>
    <!-- Nav -->
    <ul class="nav navbar-nav">                    
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
        location: "https://esri.github.io/calcite-maps/dist/vendor/dojo-bootstrap"
      },
      {
        name: "calcite-maps",
        location: "https://esri.github.io/calcite-maps/dist/js/dojo"
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

      // Bootstrap
      "bootstrap/Collapse", 

      // Calcite-maps
      "calcite-maps/calcitemaps",
      "dojo/domReady!"
    ], function(MapView, WebMap, Legend) {
        
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
            top: 64
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
      });

    });

  </script>

</body>
</html>
```

## Documentation

Here are the CSS classes you can apply to different elements.

#### <body/>
* Navbar - `calcite-nav-top`, `calcite-nav-bottom`, calcite-nav-margin-top`, `calcite-nav-margin-bottom`, `calcite-nav-margin-all`
* Zoom - `calcite-zoom-top-left`, `calcite-zoom-top-right`, `calcite-zoom-bottom-left`, `calcite-zoom-bottom-right` (ArcGIS 3.x and Esri-Leaflet only)
* Panel - `calcite-panel-left`, `calcite-panel-right`
* Widget Themes - `calcite-widgets-dark` (ArcGIS 4.x only)
* Layouts (optional) - `calcite-layout-small-title`, `calcite-layout-jumbo-title`, `calcite-layout-inline-right`, `calcite-layout-inline-left`, `calcite-layout-mobile-focus`

#### <nav/>
* Position - `navbar-fixed-top`, `navbar-fixed-bottom`
* Theme - `calcite-navbar`, `calcite-text-light`, `calcite-text-dark`, `calcite-bg-light`, `calcite-bg-dark`, `calcite-bg-custom`
* Background Color - `calcite-bgcolor-xxx`... See all colors [here](./lib/sass/_colors.scss)
* Title - `calcite-title`, `calcite-title-main`, `calcite-title-sub`
* Search - `calcite-navbar-search`

#### Dropdown
* Container - `calcite-dropdown`
* Theme - `calcite-text-light`, `calcite-text-dark`, `calcite-bg-light`, `calcite-bg-dark`, `calcite-bg-custom`

#### Dropdown-menu
* Background Color - `calcite-bgcolor-xxx`... See all colors [here](./lib/sass/_colors.scss)

#### Panels
* Container - `calcite-panels`
* Theme - `calcite-text-light`, `calcite-text-dark`, `calcite-bg-light`, `calcite-bg-dark`, `calcite-bg-custom`
* Background Color - `calcite-bgcolor-xxx`... See all colors [here](./lib/sass/_colors.scss)

#### Map
* Container - `calcite-map-absolute` or `map-position-relative`

#### Utils
* `calcite-overflow-hidden`

*Examples*

Navbar Top - Light Text - Dark Background

```html
<body class="calcite-nav-top">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-light calcite-bg-dark">
```

Navbar Bottom - Space - Light Text - Black 75% 

```html
<body class="calcite-nav-bottom calcite-nav-space-bottom">
  <nav class="calcite-navbar navbar navbar-fixed-bottom calcite-text-light calcite-bgcolor-black-75">
```

Navbar Top - Inline Layout - Dark Text - White 75%

```html
<body class="calcite-nav-top calcite-layout-inline-left">
  <nav class="calcite-navbar navbar navbar-fixed-top calcite-text-dark calcite-white-75">
```

## Requirements

* [Bootstrap](http://getbootstrap.com) and/or [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap)

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
