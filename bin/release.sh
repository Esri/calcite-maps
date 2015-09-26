#!/bin/bash
git branch -D temp-release-branch
git checkout -b temp-release-branch
grunt build:sass
git add -f dist/
git commit -m "Release"
git push upstream temp-release-branch
npm run gh-release
#git checkout master
#git branch -D temp-release-branch
#git push upstream :temp-release-branch
