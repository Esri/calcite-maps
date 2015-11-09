# calcite-maps
A theme for designing beautiful mapping apps for web and mobile devices. 

The theme works seamlessly with [Calcite-Bootstrap](https://github.com/Esri/calcite-bootstrap) styles, colors and custom builds, but will also work with Bootstrap 3.x. Learn more about Calcite-Bootstrap [here](https://github.com/Esri/calcite-bootstrap).

###Features

* Calcite colors and styles
* Different map app layouts
* Accordian panels for custom tools/tasks
* Responsive for web and mobile devices
* Create custom themes
* Support for Dojo and jQuery
* Compatible with any mapping api

###Demo

Explore the different styles, colors and layouts with [this app](http://esri.github.io/calcite-maps/index.html).

###Example
Run [this app](http://esri.github.io/calcite-maps/demos/arcgis-dojo-starter.html) in your browser and try changing the body classes. e.g. ```nav-space-none, orange-75, navbar-light, zoom-bottom-left...```. See the class documentation below for more details.

![calcite-maps.png](/calcite-maps.png?raw=true "Calcite Smart Map Apps")

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="description" content="Calcite-Maps Demo - ArcGIS">
    <meta name="author" content="">
    <link rel="icon" href="http://www.esri.com/favicon.ico">
    <title>Calcite-Maps - ArcGIS Sample</title>

    <!-- Calcite-Bootstrap -->
    <link rel="stylesheet" href="http://esri.github.io/calcite-bootstrap/assets/css/calcite-bootstrap.css">
    
    <!-- Calcite-Maps -->
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/calcite-maps.css">
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/calcite-maps-arcgis.css">
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/themes/themes.css">
    
    <!-- ArcGIS JS 4.0 -->
    <link rel="stylesheet" href="http://js.arcgis.com/4.0beta1/esri/css/esri.css">
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/demos/css/calcite-dojo-4.0.css">
    
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
        }
    </style>
</head>

<body class="calcite-maps map-position-absolute nav-position-top nav-space-top zoom-top-left">

    <!-- Navbar -->

    <nav class="navbar navbar-dark navbar-fixed-top dark-blue">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mainNav" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand">
                    <span class="glyphicon glyphicon-map-marker"></span>
                </a>
                <div class="navbar-info">
                    <div class="navbar-title text-overflow" data-toggle="modal" data-target="#modalSplash">The City of Los Angeles</div>
                    <div class="navbar-subtitle text-overflow">Explore neighborhoods in 2D and 3D</div> 
                </div>
            </div>
            <!-- Navbar collapse -->
            <div id="mainNav" class="collapse navbar-collapse" aria-expanded="false">
                <ul class="nav navbar-nav navbar-right">                    
                   <!-- Map and Scene -->
                    <li class="active"><a id="mapNav" class="hidden-xs hidden-sm" href="#2dTab" aria-controls="2Dtab" aria-expanded="true" role="tab" data-toggle="tab" data-tooltip="tip" title="2D View" data-placement="bottom">Map</a></li>
                    <li><a id="sceneNav" class="hidden-xs hidden-sm" href="#3dTab" aria-controls="3Dtab" role="tab" data-toggle="tab" data-tooltip="tip" title="3D View" data-placement="bottom">Scene</a></li>                  
                    <li><form id="searchNav" class="navbar-form navbar-search hidden-xs visible-sm visible-md visible-lg"><div id="searchNavDiv"></div></form></li>
                    <!-- Options dropdown menu -->
                    <li class="dropdown" role="presentation">
                        <a class="dropdown-toggle hidden-xs" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span></a>
                        <ul class="dropdown-menu">
                            <li><a class="hidden-xs visible-sm hidden-md hidden-lg" href="#2dTab" aria-controls="2Dtab" role="tab" data-toggle="tab">Map</a></li>
                            <li><a class="hidden-xs visible-sm hidden-md hidden-lg" href="#3dTab" aria-controls="3Dtab" role="tab" data-toggle="tab">Scene</a></li>
                            <li><a role="button" data-target="#panelInfo" aria-haspopup="true"><span class="glyphicon glyphicon-info-sign"></span> Info</a></li>
                            <li><a class="visible-xs" role="button" data-target="#panelSearch" aria-haspopup="true"><span class="glyphicon glyphicon-search"></span> Search</a></li>
                            <li><a role="button" data-target="#panelBasemaps" aria-haspopup="true"><span class="glyphicon glyphicon-th-large"></span> Basemaps</a></li>
                         </ul>
                    </li>      
                </ul><!--/.nav -->
            </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
    </nav><!--/.navbar -->

    <!-- Map Container  -->

    <div class="map-container">
        <div id="tabContainer" class="tab-content">
            <div id="2dTab" class="tab-pane fade in active" role="tabpanel">
                <div id="mapViewDiv" class="map-position-absolute"></div>
            </div>
            <div id="3dTab" class="tab-pane fade" role="tabpanel">
                <div id="sceneViewDiv" class="map-position-absolute"></div>
            </div>
        </div>
    </div><!-- /.container -->

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
                        <p>This is super simple but awesome map of Los Angeles. Try the 2D and 3D view. Change basemaps. Or just search and explore for your favorite places around town.</p>
                    </div>
                </div>
            </div>
            
            <!-- Search Panel -->

            <div id="panelSearch" class="panel panel-default collapse">
                <div id="headingSearch" class="panel-heading" role="tab">
                    <div class="panel-title">
                        <a class="panel-toggle collapsed" role="button" data-toggle="collapse" href="#collapseSearch" data-parent="#panelAccordion" aria-expanded="false" aria-controls="collapseSearch"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Search</a>
                        <a class="panel-close" role="button" data-toggle="collapse" data-target="#panelSearch"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>        
                    </div>
                </div>
                <div id="collapseSearch" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSearch">
                    <div class="panel-body"> 
                        <div id="searchDivPanel"></div>
                  </div>
                </div>
            </div>

            <!-- Basemaps Panel -->
            
            <div id="panelBasemaps" class="panel panel-default collapse"> 
                <div id="headingBasemaps" class="panel-heading" role="tab">
                    <div class="panel-title">
                        <a class="panel-toggle collapsed" role="button" data-toggle="collapse" href="#collapseBasemaps" aria-expanded="false" data-parent="#panelAccordion"  aria-controls="collapseBasemaps"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> Basemaps</a>
                        <a class="panel-close" role="button" data-toggle="collapse" data-target="#panelBasemaps"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>  
                    </div>
                </div>
                <div id="collapseBasemaps" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingBasemaps">
                    <div class="panel-body">
                        <select id="selectBasemapPanel" class="form-control">
                            <option value="streets" data-vector="vector-streets">Streets</option>
                            <option value="satellite" data-vector="satellite">Satellite</option>
                            <option value="hybrid" data-vector="hybrid">Hybrid</option>
                            <option value="national-geographic" data-vector="national-geographic">National Geographic</option>
                            <option value="topo" data-vector="vector-streets-relief">Topographic</option>
                            <option value="gray" data-vector="vector-canvas-light">Gray</option>
                            <option value="dark-gray" data-vector="vector-canvas-dark">Dark Gray</option>
                            <option value="osm" data-vector="vector-streets">Open Street Map</option>
                            <option value="dark-gray" data-vector="vector-streets-night">Streets Night</option>
                            <option value="streets" data-vector="vector-streets-mobile">Streets Mobile</option>
                        </select>
                    </div>
                </div>
            </div>
        </div> <!-- /.panel-group -->
    </div> <!-- /.panel-container -->

    <script type="text/javascript">
        var dojoConfig = {
            packages: [{
                name: "bootstrap",
                location: "//rawgit.com/xsokev/Dojo-Bootstrap/master"
            },
            {
                name: "calcite-maps",
                location: "//esri.github.io/calcite-maps/js/dojo"
            }]
        };
    </script>

    <!-- ArcGIS JS 4.0 -->
    <script src="//js.arcgis.com/4.0beta1/"></script>

    <script>

        var map, mapScene, mapView, sceneView, searchWidgetNav, searchWidgetPanel, activeView;

        require(["esri/Map",
            "esri/Basemap",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/widgets/Search",
            "esri/core/watchUtils",
            "dojo/query",
            "bootstrap/Collapse", 
            "bootstrap/Dropdown",
            "bootstrap/Tab",
            "bootstrap/Tooltip",
            "calcite-maps/calcitemapsdojo",
            "dojo/domReady!"
        ], function(Map, Basemap, MapView, SceneView, Search, watchUtils, query) {
            
            // Map 
            map = new Map({
                basemap: "vector-streets"
            });
            mapView = new MapView({
                container: "mapViewDiv",
                map: map,
                center: [-118, 34],
                zoom: 7
            });
            mapView.popup.anchor = "top";
         
            // Scene
            mapScene = new Map({
                basemap: "streets"
            });
            sceneView = new SceneView({
                container: "sceneViewDiv",
                map: mapScene,
                center: [-118, 34],
                zoom: 4
            });
            sceneView.popup.anchor = "top";

            activeView = mapView;

            // Search
            searchDivNav = createSearchWidget("searchNavDiv");
            searchWidgetPanel = createSearchWidget("searchDivPanel");

            function createSearchWidget(parentId) {
                var search = new Search({
                    view: activeView,
                    enableHighlight: false
                    }, parentId);
                search.startup();
                // Set active view
                search.watch(function(property, oldValue, newValue){
                    if (property === "searchResults") {
                        search.view = activeView;
                    }
                }); 
                return search;
            }

            query("li a[data-toggle='tab']").on("click", function(e) {
                if (e.target.text === "Map") {
                    activeView = mapView;                    
                } else {
                    activeView = sceneView;
                }
            });

            query("#selectBasemapPanel").on("change", function(e){
                map.basemap = e.target.options[e.target.selectedIndex].dataset.vector;
                mapScene.basemap = e.target.options[e.target.selectedIndex].value;
            });
        });<!-- dojo -->
    </script>

</body>
</html>
```

###Getting Started

1. Create a new [bootstrap page](http://getbootstrap.com).

2. Add a reference to [Calcite-Bootstrap](http://github.com/calcite-bootstrap) and remove bootstrap.css reference.
    
    ```
    <!-- Calcite-Bootstrap -->
    <link rel="stylesheet" href="http://esri.github.io/calcite-bootstrap/assets/css/calcite-bootstrap.css">
    ```

3. Add references (as necessary) to Calcite-Maps CSS.
    
    ```
    <!-- Calcite-Maps -->
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/calcite-maps.css">
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/calcite-maps-arcgis.css">
    <link rel="stylesheet" href="http://esri.github.io/calcite-maps/css/themes/themes.css">
    ```

4. Add references (as necessary for dojo or jquery) to JS files.
    
    ```
    <!-- ArcGIS -->
    <script type="text/javascript">
        var dojoConfig = {
            packages: [{
                name: "bootstrap",
                location: "//rawgit.com/xsokev/Dojo-Bootstrap/master"
            },
            {
                name: "calcite-maps",
                location: "//esri.github.io/calcite-maps/js/dojo"
            }]
        };
    </script>
    ```
    ```
    <!-- Esri-Leaflet -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="http://esri.github.io/calcite-maps/js/jquery/calcitemaps.js"></script>
    ```

5. Add id="mainNav" to your collapsible navbar div.
    
    ```
    <div id="mainNav" class="collapse navbar-collapse" aria-expanded="false">
    ```

6. Add/remove nav items and tooltips as necessary.

7. Add/remove panels as necessary.

###Documentation

These are the key CSS classes you can mix and match to create different mapping app layouts.

*Body - Map*

* ```map-position-absolute or map-position-relative```

*Body - Navigation*

* ```nav-position-top or nav-position-bottom```
* ```nav-space-top or nav-space-bottom or nav-space-all or nav-space-none```

*Nav - Position and Colors*

* ```navbar-fixed-top or navbar-fixed-bottom```
* ```navbar-default or navbar-inverse or navbar-light or navbar-dark```
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
* ``` theme-inline-right or theme-inline-left or theme-inline-combo```
* ```theme-side-nav```


## Requirements

* [Calcite-Bootstrap](https://github.com/Esri/calcite-bootstrap) or [Bootstrap](http://getbootstrap.com)

## Resources

* [ArcGIS for JavaScript API](http://developers.arcgis.com)
* [Esri-Leafllet](http://github.com/esri/esri-leaflet)
* [Calcite-Bootstrap](http://github.com/calcite-bootstrap)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.  Thank you!

## Contributing

Anyone and everyone is welcome to contribute. Please see our [guidelines for contributing](https://github.com/esri/contributing).

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

[](Esri Tags: Web Mapping ArcGIS Leaflet esri-leaflet Design Basemaps Bootstrap Calcite JavaScript Calcite-Bootstrap)
[](Esri Language: CSS)




