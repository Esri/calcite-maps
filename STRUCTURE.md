# Calcite+Bootstrap Structure

The following documents how the repo is organized and structured. The root directory is /calcite-bootstrap.

This repo is based on a default setup using the [Yeoman Gulp Webapp generator](https://github.com/yeoman/generator-gulp-webapp).


## Directory Structure

*The most important directories that development work takes place in are marked below in bold.*

* .publish - When the application is built by Gulp, the compiled files are stored here. This is a system directory, do not edit, add, or remove files from this directory.
* .sass-cache - This is a holding area for Sass generated tremplates and partials. This is a system directory, do not edit, add, or remove files from this directory.
* **app** - **This is where all of the work takes place**
  * extras - Ignore
  * images - Assets that are needed to support Calcite-Bootstrap (background images, PNGs, GIFs, SVGs, etc)
  * layouts - Template defintions used for Pages
  * **pages** - HTML Pages used for documentation, examples, etc
    * examples - Testing files for seeing Calcite integrated into app pages. (ArcGIS Open Data Admin samples are currently built.)
  * partials - UI partials and snippets that app builders will need, such as navbars, signin forms, etc.
  * scripts - Scripts needed in addition to the core Bootstrap javascripts
  * **styles** - Styles needed in addition to the core Bootstrap stylesheets
    * **calcite** - SCSS files with variables and custom Sass to make Bootstrap look and feel like Calcite Web
    * styleguide - SCSS files with variables and custom Sass solely for the Style Guide pages
  * useref - Ignore
* bower_components - The core Bootstrap files are stored here (Sass and Javascript). When developing, use them for reference to research what already exists in the Bootstrap framework, but NEVER modify the files.
* dist - This is where the compiled files that can be used for distribution are stores. This is a system directory, do not edit, add, or remove files from this directory.
* node_modules - This is where the modules are stored that are used in to many of the tasks required to build, run, deploy the app. This is a system directory, do not edit, add, or remove files from this directory.
* test - This is a system directory, do not edit, add, or remove files from this directory.