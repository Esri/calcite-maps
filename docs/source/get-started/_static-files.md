This is probably the easiest way, but you won't get any of the helpful Sass mixins and you will have to manually keep your project in sync with Calcite-Bootstrap. However, if you're looking to get up and running quickly, just [download the latest release](https://github.com/ArcGIS/calcite-bootstrap/releases) and move the zipped files to wherever you keep your assets (CSS, JavaScript, images). Be sure to use [the documentation site](http://esri.github.io/calcite-bootstrap/) and the [main Bootstrap site](http://getbootstrap.com) to copy and paste patterns, components, and even a sample html boilerplate.

Calcite-Bootstrap releases include the combined and minified bootstrap javascript files in the `/dist/js` folder. If you have a javascript build system, you can include a step to merge this file with your other scripts. Or you can create a task to simply copy this file into your project's javascript folder. We recommend you automate this instead of manually copying the file so that if/when you upgrade calcite-bootstrap, this file will also be upgraded at the same time.

**Note**: The bootstrap javascript files depend on jquery being loaded into the page. We recommend pulling this from the Google CDN.

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
```


### Content Delivery Network (CDN)

A CDN is being planned for future releases, allowing you to reference Calcite Bootstrap static assets on a server.

For the time being - FOR DEVELOPMENT ONLY - you can pull the css and javascript files from github.

```

```



