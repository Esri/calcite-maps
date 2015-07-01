# Contributing to Calcite Bootstrap

Installing Calcite Bootstrap was designed to be fairly painless. If you have any problems, be sure to [submit an issue](https://github.com/Esri/calcite-bootstrap/issues/).

## Where to Find Contributors
Contributors communicate on the Slack [ESRI Patterns Team](https://esri-patterns.slack.com/) in the #calcite-bootstrap channel.

### Install Dependencies

Calcite Boostrap has these main dependencies. 

- Xcode Command Line Tools (for Git)
- Node.js
- Grunt
- Gulp
- Bower
- Sass

1. Open Terminal (or your favorite command line tool. For OSX, I recommend iTerm) and check to see if you have Git installed just by entering `$ git`. You should see a list of commands for git if it is. If Git is not installed, OSX will automatically prompt you to install the XCode Command Line Developers Tools. Follow the prompts to complete the install.
2. Visit [nodejs.org](http://nodejs.org/) to install Node. Check the install by entering `$ node -v` in Terminal
3. Install Grunt by entering `$ npm install -g grunt-cli` in Terminal.
4. Install Gulp by entering `$ npm install --global gulp` in Terminal.
5. Install Bower by entering `$ npm install -g bower` in Terminal.
6. Install SASS by entering `$ gem install sass` in Terminal.

If you run into errors during the installs, Mac Users my want to try using `sudo`. For example:

`$ sudo npm install -g grunt-cli` or `$ sudo gem install sass`

### Fork the Repository

All the code for Calcite Bootstrap lives [on GitHub](https://github.com/ArcGIS/calcite-bootstrap). We use the [fork and pull model](https://help.github.com/articles/using-pull-requests/) to manage contribution.

1. Fork the repository so you have your own copy (`$ your-username/calcite-bootstrap`)
2. Clone the repo locally with `$ git clone https://github.com/your-username/calcite-bootstrap`
3. Move into the clone repo:  `$ cd calcite-bootstrap`

### Setting up the Repository

1. Install npm modules: `$ npm install`
2. Install bower components: `$ bower install`

Again, if you run into errors during, Mac Users my want to try using `sudo`.

When the installs complete run `$ gulp serve` to start the application. It will automatically open your browser and take you to http://localhost:9000.

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

To run a development environment, just type `$ gulp serve`. You should have a copy of the documentation site live at [localhost:9000](http://localhost:9000).

### Common Tasks

- `$ gulp serve` - serves up local environment at localhost:9000

## Doing the git dance

Please use the practice of creating a new branch for the the task you are working on

`$ git checkout -b calcite-buttons`

Once you are ready to commit, push the changes to your fork.

`$ git push origin calcite-buttons`

Then go to the main repo page and click the button to create a Pull Request.
