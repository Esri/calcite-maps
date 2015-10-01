
To install Calcite Bootstrap with npm, type:

```
npm install --save-dev Esri/calcite-bootstrap#v0.2.0
```

You must add the current version in order to get the `dist/` folder that contains the compiled css and the source sass files.

## Using the Compiled CSS

In your build tool (grunt/gulp/npm etc) you need to add a step to copy the compiled resource out of the `node_modules/calcite-bootstrap/dist/css` folder into your projects assets folder.

## Using Sass
Initially this will seem like a lot more setup and work, but you get a lot more flexibility as well as the ability to greatly reduce the size of the css file loaded into the browser. We also recommend using a project scaffolding tool such as [Yeoman's](http://yeoman.io) [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp) which can greatly streamline getting all the tooling setup.


Calcite Bootstrap depends on the Bootstrap. To install that with npm:

```
npm install --save-dev bootstrap-sass
```

To install with bower:

```
bower install --save bootstrap-sass-official
```

Once installed, be sure to add `node_modules/calcite-bootstrap/dist/sass/` (for node) or `bower_components/bootstrap-sass-official/assets/stylesheets` (for bower) to your sass load path.

Then, in your applications sass/scss file add the following:
```
/* Calcite has two color options out of the box - colors-default and colors-dark */
@import 'colors-default';
/* Now we load the main calcite variables */
@import 'calcite';

/* 
  These are variables needed in bootstrap that are not in the calcite files.
  This section will be removed as we update calcite-bootstrap
*/
$btn-border-radius-base:         $border-radius-base !default;
$btn-border-radius-large:        $border-radius-large !default;
$btn-border-radius-small:        $border-radius-small !default;

$jumbotron-heading-font-size:    ceil(($font-size-base * 4.5)) !default;

/* 
Set the output folder for fonts. This is relative to where the css file is loaded from. 
So if the css file is loadred from http://mysite.com/css/app.css, using ./fonts/ will mean
the browser will expect to find the font files in  http://mysite.com/css/fonts
*/
$icon-font-path: './fonts/';

/* 
Now bootstrap, which will use the calcite variables and cook the css 

The nice thing about loading bootstrap like this is we can easily comment out sections 
for components we are not using - thus slimming down the output css
 */
@import "bootstrap/mixins";

// Reset and dependencies
@import "bootstrap/normalize";
@import "bootstrap/print";
@import "bootstrap/glyphicons";

// Core CSS
@import "bootstrap/scaffolding";
@import "bootstrap/type";
@import "bootstrap/code";
@import "bootstrap/grid";
@import "bootstrap/tables";
@import "bootstrap/forms";
@import "bootstrap/buttons";

// Components
@import "bootstrap/component-animations";
@import "bootstrap/dropdowns";
@import "bootstrap/button-groups";
@import "bootstrap/input-groups";
@import "bootstrap/navs";
@import "bootstrap/navbar";
@import "bootstrap/breadcrumbs";
@import "bootstrap/pagination";
@import "bootstrap/pager";
@import "bootstrap/labels";
@import "bootstrap/badges";
@import "bootstrap/jumbotron";
@import "bootstrap/thumbnails";
@import "bootstrap/alerts";
@import "bootstrap/progress-bars";
@import "bootstrap/media";
@import "bootstrap/list-group";
@import "bootstrap/panels";
@import "bootstrap/responsive-embed";
@import "bootstrap/wells";
@import "bootstrap/close";

// Components w/ JavaScript
@import "bootstrap/modals";
@import "bootstrap/tooltip";
@import "bootstrap/popovers";
@import "bootstrap/carousel";

// Utility classes
@import "bootstrap/utilities";
@import "bootstrap/responsive-utilities";
```

## Fonts

Also add a task in your build process to copy the bootstrap fonts into your projects assets folder.

