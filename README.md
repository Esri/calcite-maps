# Contributing to Calcite Bootstrap

Installing Calcite Bootstrap was designed to be fairly painless. If you have any problems, be sure to [submit an issue](https://github.com/Esri/calcite-bootstrap/issues/).

## Where to Find Contributors
Contributors communicate on the Slack [ESRI Patterns Team](https://esri-patterns.slack.com/) in the #calcite-bootstrap channel.

### Install Dependencies

Calcite Boostrap has three main dependencies. If you already have these on your computer, you can skip these steps:

1. Visit [nodejs.org](http://nodejs.org/) to install Node.
2. `$ npm install -g grunt-cli` to install Grunt.
3. `$ gem install sass` to install SASS.

### Fork the Repository

All the code for Calcite Bootstrap lives [on GitHub](https://github.com/ArcGIS/calcite-bootstrap). We use the [fork and pull model](https://help.github.com/articles/using-pull-requests/) to manage contribution.

1. Fork the repository so you have your own copy (`$ your-username/calcite-bootstrap`)
2. Clone the repo locally with `$ git clone https://github.com/your-username/calcite-bootstrap`
3. Move into the clone repo:  `$ cd calcite-bootstrap`

### Setting up the Repository
1. Install npm modules: `$ npm install`
2. Install bower components: `$ bower install`

### Git Remote
You should also add `ArcGIS/calcite-bootstrap` as a remote at this point. We generally call this remote branch 'upstream':

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

## Development

To run a development environment, just type `$ gulp serve`. You should have a copy of the documentation site live at [localhost:9000](http://localhost:9000).

### Common Tasks

- `$ gulp serve` - serves up local environment at localhost:9000
