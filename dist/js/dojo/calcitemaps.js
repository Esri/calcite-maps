/* calcite-maps - v0.0.1 - 2016-04-25
*  https://github.com/alaframboise/calcite-maps#readme
*  Copyright (c) 2016 Environmental Systems Research Institute, Inc.
*  Apache 2.0 License */
define(["dojo/query","dojo/dom-class","dojo/domReady!"],function(query,domClass){function isMobile(){return"none"!==query(".navbar-toggle").style("display")[0]}var _mobile=isMobile();query("#mainNav li > a").on("click",function(e){var panelBody,panels,panel=query(e.currentTarget.dataset.target);panel.length>0&&domClass.contains(panel[0],"panel")&&(panelBody=query(panel).query(".panel-collapse"),domClass.contains(panel[0],"in")||panel.collapse("show"),domClass.contains(panelBody[0],"in")||query(panel[0]).query(".panel-toggle")[0].click(),_mobile&&(panels=query("#panelAccordion .panel.in:not(:#"+panel.id+")"),panels.collapse("hide")))}),query("#mainNav").on("show.bs.collapse",function(e){_mobile&&query("#mainNav .dropdown").addClass("open")}),query("#mainNav").on("shown.bs.collapse",function(e){_mobile&&query("#mainNav .dropdown").addClass("open")}),query("#mainNav .dropdown").on("hide.bs.dropdown",function(e){var nav=query("#mainNav");domClass.contains(nav[0],"in")&&domClass.contains(e.target,"open")&&query("#mainNav").collapse("hide")}),query(".navbar-brand").on("click",function(){domClass.contains(query("body")[0],"nav-position-top-fixed")||domClass.contains(query("body")[0],"nav-position-bottom-fixed")||(domClass.contains(query("body")[0],"is-minibar")?(query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").removeClass("hidden"),query("body").removeClass("is-minibar")):(query("#mainNav ul.nav > li, .navbar-info, .navbar-toggle").addClass("hidden"),query("body").addClass("is-minibar")))}),query(window).on("resize",function(){if(!_mobile&&isMobile()){var panel,panels=query("#panelAccordion .panel.in");panels.length>0&&(panel=panels.query(".panel-collapse.in"),panel.length>0?panels=query("#panelAccordion .panel.in:not(#"+panel.parent().attr("id")+")"):(panel=panels[0],panels=query("#panelAccordion .panel.in:not(#"+panel.id+")")),panels.collapse("hide"))}_mobile=isMobile()})});