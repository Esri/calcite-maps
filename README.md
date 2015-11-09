# Introducing Calcite+Bootstrap

First off, **Calcite** is a flexible design framework, created at ESRI, in which the map and data are the most important component of the user interface. All elements and interactions strengthen a geo-centered user experience.

**Calcite+Bootstrap** is a UI Kit built on the popular Bootstrap CSS framework. It was originally conceived as a boilerplate for ESRI products built with Bootstrap that we are now sharing with the public.

We have applied the robust set of patterns and utilities that are core to the Calcite framework to Calcite+Bootstrap. The purpose is to have designs be consistent, but also embrace the characteristics that make each medium unique.

Calcite+Bootstrap was built for developers who have experience working with Bootstrap markup and classes.

For more info about this framework, go to the **[documentation site](http://esri.github.io/calcite-bootstrap/)**

# Using Calcite+Bootstrap

There are two main ways to use Calcite+Boostrap: copying compiled css files into your project or installing via a package manager and using a SASS build step in your project.

## Static Files

This is probably the easiest way. If you're looking to get up and running quickly, just [download the latest release](https://github.com/esri/calcite-bootstrap/releases) and move the zipped files to wherever you keep you assets. Be sure to use [the documentation site](http://esri.github.io/calcite-bootstrap/) and the main [Bootstrap](http://getbootstrap.com) to copy and paste patterns, components, and even a sample html boilerplate.

## NPM

To install Calcite+Bootstrap with npm, type:

```
npm install --save-dev Esri/calcite-bootstrap#v0.2.5
```

You must add the current version in order to get the `dist/` folder.

If you're using sass, be sure to add `node_modules/calcite-bootstrap/dist/sass/` to your load path. If you're using `grunt-contrib-sass` you add that like this:

```
'sass': {
  target: {
    options: {
      loadPath: 'node_modules/calcite-bootstrap/dist/sass/'
    },
    files: {
      'path/to.css': 'path/to.scss'
    }
  }
}
```

Then in your main `.scss` file, you can just require the framework: `@import "calcite-bootstrap";`.

# Contributing to Calcite+Bootstrap

Installing Calcite+Bootstrap was designed to be fairly painless. If you have any problems, be sure to [submit an issue](https://github.com/Esri/calcite-bootstrap/issues/) and use the label `install issues`.

### Install Dependencies

Calcite Boostrap has these main dependencies. 

- Xcode Command Line Tools (for Git)
- Node.js
- Grunt
- Bower
- Sass

1. Open Terminal (or your favorite command line tool. For OSX, I recommend iTerm) and check to see if you have Git installed just by entering `$ git`. You should see a list of commands for git if it is. If Git is not installed, OSX will automatically prompt you to install the XCode Command Line Developers Tools. Follow the prompts to complete the install.
2. Visit [nodejs.org](http://nodejs.org/) to install Node. Check the install by entering `$ node -v` in Terminal
3. Install Grunt by entering `$ npm install -g grunt-cli` in Terminal.
4. Install Bower by entering `$ npm install -g bower` in Terminal.
5. Install SASS by entering `$ gem install sass` in Terminal.

If you run into errors during the installs, Mac Users my want to try using `sudo`. For example:

`$ sudo npm install -g grunt-cli` or `$ sudo gem install sass`

### Fork the Repository

All the code for Calcite+Bootstrap lives [on GitHub](https://github.com/Esri/calcite-bootstrap). We use the [fork and pull model](https://help.github.com/articles/using-pull-requests/) to manage contribution.

1. Fork the repository so you have your own copy (`$ your-username/calcite-bootstrap`)
2. Clone the repo locally with `$ git clone https://github.com/your-username/calcite-bootstrap`
3. Move into the clone repo:  `$ cd calcite-bootstrap`

### Setting up the Repository

1. Install npm modules: `$ npm install`
2. Install bower components: `$ bower install`

Again, if you run into errors during, Mac Users my want to try using `sudo`.

When the installs complete run `$ grunt` to start the application. Open a new browser and navigate to `http://localhost:8888`.

### Git Remote
You should also add `Esri/calcite-bootstrap` as a remote at this point. We generally call this remote branch 'upstream':

```
$ git remote add upstream https://github.com/Esri/calcite-bootstrap
```

Check your configuration: `$ git remote -v`

The results should look like:
```
origin	https://github.com/your-username/calcite-bootstrap.git (fetch)
origin	https://github.com/your-username/calcite-bootstrap.git (push)
upstream	https://github.com/Esri/calcite-bootstrap.git (fetch)
upstream	https://github.com/Esri/calcite-bootstrap.git (push)
```

## Troubleshooting

When running `$ bower install` if you get an error stating `unable to connect to gihub.com` you will need to run the following command: `git config --global url."https://".insteadOf git://`

If the above doesn't work, try manually modifying the `.git-config` file under your user directory (note: it is a hidden file).

```
[url "https://"]
	insteadOf = git://
```
[link to stackoverflow](http://stackoverflow.com/questions/27417175/bower-install-libraries-issues)

You might also want to try installing `sudo npm install -g n` and `sudo npm install -g nvm`

## Development

To run a development environment, just type `$ grunt`. You should have a copy of the documentation site live at [localhost:8888](http://localhost:8888).

### Common Tasks

- `$ grunt` - [default] builds and then serves up local environment at localhost:8888 (includes watch for updated files)
- `$ grunt serve` - serves local environment at localhost:8888 (no build)
- `$ grunt build` - builds local environment only (no localhost)
- `$ grunt release` - creates `calcite-bootstrap.zip` file for release in root directory 
- `$ grunt publish` - publishes new release candidate to Amazon S3 (requires credentials)

## Doing the git dance

Please use the practice of creating a new branch for the the task you are working on

`$ git checkout -b my-new-feature`

Once you are ready to commit, push the changes to your fork.

`$ git push origin my-new-feature`

Then go to the main repo page and click the button to create a Pull Request.