
To install Calcite Bootstrap with npm, type:

```
npm install --save-dev Esri/calcite-bootstrap#v{{data.pkg.version}}
```

You must add the current version in order to get the `dist/` folder that contains the compiled css and the source sass files.

## Using the Compiled CSS

In your build tool (grunt/gulp/npm etc) you need to add a step to copy the compiled resource out of the `node_modules/calcite-bootstrap/dist/css` folder into your projects assets folder.

## Using Sass
Initially this will seem like a lot more setup and work, but you get a lot more flexibility as well as the ability to greatly reduce the size of the css file loaded into the browser. We also recommend using a project scaffolding tool such as [Yeoman's](http://yeoman.io) [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp) which can greatly streamline getting all the tooling setup.

### Sass Import Paths
In order to use calcite-bootstrap in your sass/scss files, you will need to inform your sass processor where to look.

The syntax varies depending on the build system you are using, but with grunt-sass, it looks like this:

```
  'sass': {
    options: {
      includePaths: [
        './node_modules/bootstrap-sass/assets/stylesheets'
        './node_modules/calcite-bootstrap/dist'
      ]
    }
    ...other configuration as needed...
  }
```

If you are using Ember, this is done in the `ember-cli-build.js` file and looks like this:

```
    // ember-cli-sass
    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets',
        'node_modules/calcite-bootstrap/dist/sass'
      ]
    },
```


Then, in your applications sass/scss file add the following:
```
/* Now we load calcite variables as overrides*/
@import 'calcite-bootstrap';
/* set the output folder for fonts */
$icon-font-path: './fonts/';
@import 'bootstrap';
```

## Fonts

Also add a task in your build process to copy the bootstrap fonts (glyphicons) into your projects assets folder.

