_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var ParkModel = Backbone.Model.extend({
	urlRoot: '/',
	defaults: {
		'park_name': '',
		'park_latitude': '0',
		'park_longitude': '0',
		'parkFlickrCall': 'http://',
	},
	initialize: function() {
		this.fetch();
	}
});

var ParkCollection = Backbone.Collection.extend({
	model: ParkModel,
	url: '/',
	initialize: function() {
		this.fetch();
	}
});

var parkModel = new ParkModel();

var parkCollection = new Backbone.Collection({
	model: ParkModel
});
