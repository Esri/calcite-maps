# Calcite Maps
A modern framework for designing map apps with Bootstrap. 

This project contains a custom Sass build and Calcite styles, colors and layouts specifically for designing map apps with Bootstrap. The build uses the minimum components from [Calcite Bootstrap](https://github.com/Esri/calcite-bootstrap) (a custom theme for [Bootstrap](http://www.getbootstrap.com)) in order to maximize performance. Calcite Maps also extends core [Bootstrap components](http://getbootstrap.com) such as the navbar and panels to make them more map app-friendly. Different app designs can be created very easily simply by applying styles to the ```body``` and ```navbar``` elements. e.g. ```nav-position-top``` ```calcite-dark-blue```. Custom themes can also be created and shared easily by assembling style sets for different layouts.

The framework is compatible with [ArcGIS JS 3.x](https://developers.arcgis.com/javascript/), [ArcGIS JS 4.x](https://developers.arcgis.com/javascript/4) and [Esri Leaflet](https://github.com/Esri/esri-leaflet).

###Features

* Calcite styles, layouts and themes for map apps (top, bottom, jumbo and in-line)
* Extensions for Bootstrap components (navbar, accordion and panels)
* Custom Sass build system for creating optimized builds
* Full integration and support for ArcGIS API for JavaScript 4.x
* Samples for ArcGIS JS 3.x, 4.x and Esri Leaflet
* Support for Dojo and jQuery

###Samples
Use the [Styler](http://esri.github.io/calcite-maps/extras/index.html) to design apps on the fly or just start with one of the [code samples](http://esri.github.io/calcite-maps/extras/index.html).

![calcite-maps.png](./calcite-maps.png?raw=true "Calcite Maps")

###Getting Started<a id="getting-started"></a>

Here's a few different ways to get started:

1. **Explore the styles** - Use the [Styler](http://esri.github.io/calcite-maps/extras/index.html) to explore the different styles and layouts. When you find a design you like, inspect the HTML and apply those styles to your own app.

2. **Start with a Sample** - Copy and paste the code from one of the [samples](http://esri.github.io/calcite-maps/extras/index.html) or just *Create an app from scratch* (see below). Don't forget to change the CSS and JS references!

3. **Create a local build**

* Fork and clone the repo 
* Run npm install (node_modules/bootstrap and calcite-bootstrap)
* Run bower install (bower_components/dojo-bootstrap)
* Run grunt (build out project to ./dist/**)

Add/remove styles, bootstrap components and update any variables as required. See ./lib/sass/build.scss to get started.

NOTE: Calcite Maps is built on Bootstrap. If you want to learn more about the core framework, please visit the [Bootstrap documentation site](http://getbootstrap.com).

### Create an app from scratch

1. Create a new [bootstrap page](http://getbootstrap.com).

2. Add CSS references to Calcite-Maps and remove the Bootstrap reference. This provides the Bootstrap framework, styles and components required to create your app.
    
  ```
  <!-- Calcite-Maps -->
  <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/calcite-maps-bootstrap-arcgis-4.x.css">
  ```

3. Add JS references as necessary. The Bootstrap framework requires a small library to support the framework components such as the navbar, dropdown and panels. If you are using ArcGIS JS API, use the dojo libraries. If you are using Esri Leaflet, use the jQuery library.
  
  ```
  <!-- ArcGIS JS API -->
  <script type="text/javascript">
      var dojoConfig = {
          packages: [{
              name: "bootstrap",
              location: "https://esri.github.io/calcite-maps/vendor/dojo-bootstrap"
          },
          {
              name: "calcite-maps",
              location: "https://esri.github.io/calcite-maps/js/dojo"
          }]
      };
  </script>

  <script>
      require(["esri/Map",
          "esri/views/MapView",

          // Bootstrap
          "bootstrap/Collapse", 
          "bootstrap/Dropdown",
          "bootstrap/Tab",
          "bootstrap/Tooltip",

          // Calcite-maps
          "calcite-maps/calcitemaps",
          "dojo/domReady!"
      ], function(Map, MapView) {
  ...
  </script>

  ```
  ```
  <!-- Esri-Leaflet -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

  <script src="http://esri.github.io/calcite-maps/dist/js/jquery/calcitemaps.js"></script>
  ```

4. Add a map container. For full page apps use ```map-position-absolute```.

  ```
    <!-- Map Container  -->

    <div class="map-container">
      <div id="mapViewDiv" class="map-position-absolute"></div>
    </div>
  ```

5. Set the ID of the navbar-collapse to ```mainNav``` and for the panel-container to ```panelAccordion```. This connects the components to Javascript to make them map app friendly.
    
  ```
    <!-- Navbar collapse -->
    <div id="mainNav" class="collapse navbar-collapse" aria-expanded="false">

    <!-- Panel -->
    <div class="panel-container">
      <div id="panelAccordion" class="panel-group"  role="tablist" aria-multiselectable="true">
    ...
  ```

6. Apply Calcite Maps classes to the ```body``` and ```navbar``` elements to configure the layout, style and color of your app. Styles for the ```body``` are for positioning and styles on the ```nav``` are primarily for colors and themes. Styles applied to the ```body``` may also affect other elements in the layout such as the ```panel```.

  ```html
    <body class="calcite-maps map-position-absolute nav-position-top nav-space-top zoom-top-left">

        <nav class="navbar navbar-text-light navbar-fixed-top dark-blue">
    ...
  ```

7. Add or remove nav items and panels as necessary. Nav items control panels by setting the data-target attribute. Learn more about Bootstrap collapseable panels [here](http://getbootstrap.com).

  ```
    <!-- Navbar collapse -->

    <ul class="dropdown-menu">
      <li><a role="button" data-target="#panelInfo" aria-haspopup="true"><span class="glyphicon glyphicon-info-sign"></span> Info</a></li>
    </ul>

    ...

    <!-- Panel -->

    <div class="panel-container">
      <div id="panelAccordion" class="panel-group"  role="tablist" aria-multiselectable="true">
          
        <!-- Info Panel -->
        
        <div id="panelInfo" class="panel panel-default collapse">
            <div id="headingInfo" class="panel-heading" role="tab">
                <div class="panel-title">
                    <a class="panel-toggle" role="button" data-toggle="collapse" href="#collapseInfo" data-parent="#panelAccordion" aria-expanded="true" aria-controls="collapseInfo"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Info</a>
                    <a class="panel-close" role="button" data-toggle="collapse" data-target="#panelInfo"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>  
                </div>
            </div>
            <div id="collapseInfo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingInfo">
                <div class="panel-body">
                    <p>This is super simple map of Los Angeles. Try the 2D and 3D view. Change basemaps. Or just search and explore for your favorite places around town.</p>
                    <p>ArcGIS 4.0 Beta</p>
                </div>
            </div>
        </div>
    ...
  ```

8. Add some map code.
  ```
  ...

    var app, mapView;

    require(["esri/Map",
      "esri/views/MapView"

      // Bootstrap
      "bootstrap/Collapse", 
      "bootstrap/Dropdown",
      "bootstrap/Tab",
      "bootstrap/Tooltip",
      
      // Calcite-maps
      "calcite-maps/calcitemaps",
      "dojo/domReady!"
    ], function(Map, Basemap, MapView, FeatureLayer, PopupTemplate, Search, query) {
        
      // App
      app = {
        lonlat: [-118.25, 34.15],
        zoom: 10,
        viewPadding: {
            top: 64
        }, 
        basemap: "streets"
      };

      // Map 
      var map = new Map({
        basemap: app.basemap
      });
            
      mapView = new MapView({
        container: "mapViewDiv",
        map: map,
        center: app.lonlat,
        zoom: app.zoom,
        padding: app.viewPadding
      });

    });
  ```

**That's it!** Now you can experiment with the other Calcite styles or Bootstrap components and build your app.

###Documentation

Here are the main CSS classes you can mix and match to create different mapping app layouts.

*Body - Map*

* ```map-position-absolute or map-position-relative```

*Body - Navigation*

* ```nav-position-top or nav-position-bottom```
* ```nav-space-top or nav-space-bottom or nav-space-all or nav-space-none```

*Nav - Position and Colors*

* ```navbar-fixed-top or navbar-fixed-bottom```
* ```navbar-default or navbar-inverse or navbar-text-dark or navbar-dark```
* ```grey or light-grey or blue...```

*Map*

* ```map-container```
* ```map-position-absolute or map-position-relative```

*Zoom*

* ```zoom-top-left or zoom-top-right or zoom-bottom-left or zoom-bottom-right```

*Panel*

* ```panel-left or panel-right```

Themes

* ```theme-jumbo-title```
* ``` theme-inline-right or theme-inline-left```

## Requirements

* [Bootstrap](http://getbootstrap.com) or [Calcite-Bootstrap](https://github.com/Esri/calcite-bootstrap) (recommended)

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




