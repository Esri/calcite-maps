# Calcite Maps
A framework for building map apps with Calcite styles and Bootstrap. 

This project contains Calcite colors, styles, themes and layouts for creating responsive map apps with [Bootstrap](http://www.getbootstrap.com) and [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap). The framework extends a number of Bootstrap components and is compatible with [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/4) and [Esri Leaflet](https://github.com/Esri/esri-leaflet). 

##What's included

* Calcite CSS colors, styles, themes and layouts for map apps (top, bottom, jumbo and in-line...)
* Dark and light themes for apps and widgets (ArcGIS JS 4.x only)
* CSS and JS extension for [Bootstrap](http://www.getbootstrap.com) components (navbar, accordion and panels)
* Customizable Sass build for [Bootstrap](http://www.getbootstrap.com) and [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap)
* Support for [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/) and [Esri Leaflet](https://github.com/Esri/esri-leaflet)
* Support for Dojo and jQuery

Visit the [samples](http://esri.github.io/calcite-maps/extras/index.html) to see the different types of apps you can create.

![calcite-maps.png](./calcite-maps.png?raw=true "Calcite Maps")

##Getting started

Here's a few ways to get started:

1. **Explore the styles** - Use the [Styler](http://esri.github.io/calcite-maps/extras/index.html) to explore the different CSS styles and layouts. When you find a design you like, inspect the HTML and apply those styles to your own app.

2. **Reference the libraries** - Download the latest release or just reference the appropriate [calcite-maps-xxx.min.css](./dist/css) and [calcite-maps.js](./dist/js) in your app (for testing only). See the [samples](./extras/index.html) and the [example](#example) below. Please note that all of the [calcite-maps-xxx.css](./dist/css) files bundle both the Bootstrap CSS and the required CSS for each mapping API.

3. **Create a local build** - Fork and clone the repo to create a local build. The default build includes the required Bootstrap components to support the framework (core, navbar, panels...), but you can further customize by overriding variables, adding or removing style files, or adding/removing other Bootstrap components.

 To get started, run the commands below and be sure to check out the [gruntfile.js](gruntfile.js), [build.scss](./lib/sass/build.scss) and [_variables.scss](./lib/sass/_variables.scss) files.

 * Fork and clone the repo 
 * Run `npm install` (node_modules/bootstrap and calcite-bootstrap)
 * Run `bower install` (bower_components/dojo-bootstrap)
 * Run `grunt` (build out project to ./dist/**)

## Example

[View it live](http://esri.github.io/calcite-maps/extras/samples/arcgis-4.x-example.html)

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

<body class="calcite-maps map-position-absolute nav-position-top nav-space-none">

  <!-- Navbar -->

  <nav class="navbar navbar-fixed-top calcite-text-light calcite-dark-blue-75">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand">
          <span class="esri-icon esri-icon-map-pin"></span>
        </a>
        <div class="navbar-info">
          <div class="navbar-title text-overflow">Greater Los Angeles Demographics</div>
          <div class="navbar-subtitle text-overflow">Explore population, age, income and housing values</div> 
        </div>
      </div>
    </div><!--/.container-fluid -->
  </nav><!--/.navbar -->

  <!-- Map Container  -->

  <div class="map-container">
      <div id="mapViewDiv" class="map-position-absolute"></div>
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
      "esri/WebMap"

      // Bootstrap
      "bootstrap/Collapse", 
      "bootstrap/Dropdown",
      "bootstrap/Tab",

      // Calcite-maps
      "calcite-maps/calcitemaps",
      "dojo/domReady!"
    ], function(MapView, WebMap, query) {
        
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

    });

  </script>

</body>
</html>
```

## Documentation

Here's the main CSS classes you can mix and match to create different designs.

#### Body
* Map - `map-position-absolute` or `map-position-relative`
* Navbar - `nav-space-top` or `nav-space-bottom` or `nav-space-all` or `nav-space-none`
* Zoom - `zoom-top-left` or `zoom-top-right` or `zoom-bottom-left` or `zoom-bottom-right` (ArcGIS 3.x and Esri-Leaflet only)
* Panel - `panel-left` or `panel-right`
* Themes - `calcite-theme-dark` (no theme is default light)
* Layouts (optional) - `layout-jumbo-title` or `layout-inline-right` or `layout-inline-left`

#### Navbar
* Background Color - `calcite-dark-blue` or `calcite-black-75` or `calcite-transparent`... See all Calcite colors [here](./lib/sass/_colors.scss)
* Text Color - `calcite-text-dark` or `calcite-text-light`
* Position - `navbar-fixed-top` or `navbar-fixed-bottom`

Examples

Navbar Top - Dark Blue - Dark Text

```html
<body class="calcite-maps map-position-absolute nav-position-top">
  <nav class="navbar navbar-fixed-top calcite-text-dark calcite-dark-blue">
```

Navbar Bottom - Space - Black - Light Text

```html
<body class="calcite-maps map-position-absolute nav-position-bottom nav-space-bottom">
  <nav class="navbar navbar-fixed-bottom calcite-text-light calcite-black">
```

Navbar Top - Inline Layout - Dark Theme - White 75% Background - Dark Text

```html
<body class="calcite-maps map-position-absolute nav-position-top layout-inline-left calcite-theme-dark">
  <nav class="navbar navbar-fixed-bottom calcite-text-dark calcite-white-75">
```

## Requirements

* [Bootstrap](http://getbootstrap.com) and [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap)

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

[](Esri Tags: Web Mapping ArcGIS Leaflet CSS Sass Frameworks esri-leaflet Design Basemaps Bootstrap Calcite Calcite-Maps JavaScript Calcite-Bootstrap)
[](Esri Language: CSS)




