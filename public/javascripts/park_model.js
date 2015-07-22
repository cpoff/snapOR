_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

// snapOR homepage
var MasterView = Backbone.View.extend({
    render: function() {
        this.$el.html("<div>" + "Map API response goes here" + "</div>");
    }
});

var ParkModel = Backbone.Model.extend({
    // urlRoot: '/parkdetail',
    urlRoot: '/',
    defaults: {
        'park_name': 'blah',
        'park_latitude': '0',
        'park_longitude': '0',
        'parkFlickrCall': 'http://',
    },
    initialize: function() {
        this.fetch();
    } 
});

var ParkView = Backbone.View.extend({
    url: '/parkdetail',
    render: function() {
        var template = _.template('<h1>{{parkName}}</h1><div>{{FlickrInfo}}</div>');
        this.$el.html(template({
            parkName: 'park_name',
            FlickrInfo: 'flickr_data'
        }));
    },
    fireApi: function() {
        var flickrUrl = this.model.get('parkFlickrCall');
			$.getJSON(flickrUrl)
	},
    events: {
        'load info.setContent' : 'fireApi'
    }
});

var MapView = Backbone.View.extend({
    el: '#map_canvas',
    render: function(){
        var mapCanvas = document.getElementById('map_canvas');
        var Bend = new google.maps.LatLng(44.058173, -121.31531);
        var mapOptions = {
            center: Bend,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
    }
});
	
var ParkCollection = Backbone.Collection.extend({
    model: ParkModel,
    //  url : "/parkdetail", commented out until we create a route in index.js, which may be unnecessary to keep this as a spa
    url: '/',
    initialize: function() {
        this.fetch();
    }
});


var parkModel = new ParkModel();
var parkView = new ParkView({model: parkModel});
var parkCollection = new Backbone.Collection({model: ParkModel});

var mapView = new MapView({model: parkModel});
mapView.render();
$("#map_canvas").append(mapView.$el);
parkView.render();
markerView.render();
$("#parkdiv").append(parkView.$el);

