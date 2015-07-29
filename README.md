#snapOR

url: [snapOR on Heroku](https://snaporegon.herokuapp.com/)

landing page: [wireframe](https://moqups.com/angelariggs/zbq8VzMg/p:a418af527)

##APIs
* [Oregon State Parks](http://oregonstateparks.org/data/index.cfm/)
* [500PX](https://github.com/500px/api-documentation)
* [Flickr](https://www.flickr.com/services/api/)
* [Weather Underground](http://www.wunderground.com/weather/api?MR=1)
* [Google Maps](https://developers.google.com/maps/documentation/javascript/) 

Outline of mvp [Mind Map](https://bubbl.us/mindmap?h=2b3e64/5740cb/28h3pIVw29bJE)

##Areas of responsibility
* Angela: state parks API, express server, foundation/SCSS, user backbone
* Nate: google maps API, database (orchestrate), tests, park backbone
* Curt: flickr API, heroku, bdd descriptions, parks backbone

##Initial BDD descriptions:

##To contribute
######Local workflow
* Pull from master
* Create your own branch
* Merge master with your branch
* Work from your branch
* Commit to your branch
* Push from your branch

######Remote workflow
* Create a remote branch that has the same name as your local branch
* After a push, submit a pull request

##Gulp
if 'gulp command not found', run npm install gulp -g

To make style changes
	1. run 'gulp watch' in terminal
	2. in another terminal window, run 'npm start'
	3. make changes in main.scss and save, then refresh the browser
To make changes in lat-lang.js
	1.run 'gulp watch' and 'npm start' like before
	2. make changes in lat-long.js, wait for gulp to concat and minify, then refresh browser to see changes