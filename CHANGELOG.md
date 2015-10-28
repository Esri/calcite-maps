# Calcite+Bootstrap CHANGELOG

## v0.2.5
- Compiled Calcite variables files into a single _variables.scss file.
- Added Calcite-Web loading animation
- added opensans font files
- added build process for *-open.css files
- renamed `calcite-custom.scss` to `components.scss` because that's what it is.

## v0.2.4
- updated the very old grunt-sass which was using a very old node-sass which could not handle @at-root and thus passed it thru into the css... breaking the glyphicons. 

## v0.2.3
- bumped version to address bizzaro caching @ github or proxies or whatever.

## v0.2.2
### Changed
- added build-*.scss files that include bootstrap
- removed the bootstrap include from the .scss files that ship in dist.
- made `bootstrap-sass@3.3.5` a dependancy of this project so it will be auto-installed
- added missing bootstrap vars into calcite files
- distibutions will have the combined & minified bootstrap javascript
- added docs describing this
- added a better example page and the example page markup to the static section so people can copy-paste and be working with calcite-bootstrap.
- added missing /dist/sass/calcite folder to the build process

## v0.2.1
### Changed
- swapped acetate for assemble
- converted minimal docs to acetate
- added deploy.js which builds the json files needed for the Patterns site

## v0.2.0

### Changed
- project structure so we have `./bin`, `./docs` and `./lib`. Source js and sass live in lib, the docs are in doc and bin has a script for releasing.

### Added
- `grunt build:sass` to build the css and package the sass files in `./dist` in prep of a release
