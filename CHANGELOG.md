# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Upcoming changes][unreleased]

* Better integration with ArcGIS JS 4 Sass

## [0.0.3-beta]

### Changed

* Removed dependency on Calcite Bootstrap and simplified build
* Removed overscroll work-around
* Updated http to https refs
* Fine-tuned styles and navbar heights
* Fixed some layout panel positioning
* Updated themes to support ArcGIS JS 3.19 and 4.2
* Updated Bootstrap Sass
* Renamed calcite-bootstrap to calcite-maps-bootstrap for Bootstrap build
* Updated all samples to ref v0.3

### Added

* Calcite fonts
* Sass refs to local fonts

## [0.0.2-beta]

### Changed

Classes
* “calcite-“ appended to all classes - no longer required to add calcite-maps to <body>
* Colors are now calcite-bgcolor-xxx

Navbar
* Required calcite-bg-light calcite-text-dark and calcite-bg-dark calcite-text-light or calcite-bg-custom
* Flex-based
* Removed container-fluid and collapse
* Single dropdown-toggle
* Nav toggle via menu vs brand

Theme
* Support for custom themes (calcite-bg-custom) on-the-fly (navbar, dropdown and panel)

Panels
* Required calcite-bg-light calcite-text-dark and calcite-bg-dark calcite-text-light or calcite-bg-custom
* Removed outer panel container

calcitemaps.js 
* Simplified logic
* Added options
* Toggle is controlled from an li a

Samples
* Styler - Custom theme and color picker, improved panelsettings.js
* Samples - 4.x - Added panel/popup collision logic

Build
* Separated calcite maps from calcite bootstrap build (now can be referenced independently)
* Pure bootstrap builds can be referenced alongside calcite-maps

### Added

* Custom themes
* Mixins
* Options for calcitemaps.js

## [0.0.1-beta]

### Changed

* Initial install of main CSS files and demos
* Demo apps for:
   * ArcGIS JS 4.0 Beta 1
   * ArcGIS JS 3.15 or less
   * Esri-Leaflet

### Added

* CSS files, JS in dojo and jQuery, demos