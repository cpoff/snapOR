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
    url: '/',
    el: '#photoview',
    render: function() {
        var template = _.template('<h1>{{parkName}}</h1><div>{{FlickrInfo}}</div>');
        this.$el.html(template({
            parkName: 'dog',
            FlickrInfo: 'flickr_data'
        }));
    },
});

var MarkerView = Backbone.View.extend({
    el: '#markerview',
    initialize: function() {
        var self = this;
        //loop to create markers for all the state parks
        var marker_position = new google.maps.LatLng(self.model.get('latitude'), self.model.get('longitude'));
        var info = new google.maps.InfoWindow();
        // console.log(theMap);
        // console.log(self);
        var marker = new google.maps.Marker({
            position: marker_position,
            map: theMap.map,
            title: self.model.attributes.name,
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                info.setContent("<div><p>" + self.model.attributes.name + "</p><button id='showPictures'>See more</button></div>");
                info.open(theMap.map, marker);

                var flickrURL = self.model.attributes.parkFlickrCall;
                console.log(flickrURL);
                $.getJSON(flickrURL)
                    .always(function(data) {
                        console.log('dot done');
                        data = JSON.parse(data.responseText)
                        if (data && data.items) {
                            $.each(data.items, function(item) {
                                $("<img>").attr("src", item.media.m).appendTo("#markerdiv");
                            });
                        }
                        console.log(data);
                    });

            };
        })(marker));

    }
});

var markerArray = [];
var theMap = {};

var MapView = Backbone.View.extend({
    el: '#map_canvas',
    render: function() {
        //creates map on the page
        var mapCanvas = document.getElementById('map_canvas');
        var Bend = new google.maps.LatLng(44.058173, -121.31531);
        var mapOptions = {
            center: Bend,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        theMap.map = new google.maps.Map(mapCanvas, mapOptions);
        //builds marker views as map is generated
        this.collection.each(function(park) {
            var markerView = new MarkerView({
                model: park,
                map: theMap.map,
            });
            markerView.render();
            //            markerView.map = map;
            markerArray.push(markerView);
        });
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

var parkView = new ParkView({
    model: parkModel
});

parkView.render();
$("#markerview").append(parkView.$el);

//$("#markerdiv").append(markerView.$el);

var parkCollection = new Backbone.Collection({
    model: ParkModel
});

var mapView = new MapView({
    model: parkModel,
    collection: parkCollection
});

$("#map_canvas").append(mapView.$el);