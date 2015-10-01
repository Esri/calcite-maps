# Tooling

## Development

`grunt` will build everything and start a server at `localhost:8888`

## Deploy Docs to gh-pages

`grunt gh-pages` will push whatever is in `./docs/build` to gh-pages. Be sure to have run `grunt` at least once before deploying

## Release

`sh bin/release.sh` will take the contents of `./dist` and package it into a release at github. 

It will use the package version from `package.json` and take along CHANGELOG.md for good measure. 

**Please Note:** You can not release multiple times with the same package version number.
