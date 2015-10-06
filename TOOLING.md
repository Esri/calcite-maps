# Tooling

## Development

`grunt` will build everything and start a server at `localhost:8888`

## Deploy Docs to gh-pages

`grunt deploy` will do a build and push whatever is in `./docs/build` to gh-pages. 

## Release

`grunt release` will to a build and take the contents of `./dist` and package it into a release at github. 

It will use the package version from `package.json` and take along CHANGELOG.md for good measure. 

**Please Note:** You can not release multiple times with the same package version number.

## Validating GH Pages Hosted CSS
- [https://jsbin.com/payuva](https://jsbin.com/payuva) is a simple page that pulls in the css from gh-pages
