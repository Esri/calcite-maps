# Calcite+Bootstrap CHANGELOG

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
