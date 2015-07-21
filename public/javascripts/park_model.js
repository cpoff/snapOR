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
        var boogie = JSON.stringify(flickrUrl);
        console.log(boogie);
    },
    events: {
        'load info.setContent' : 'fireApi'
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

var parkModel, parkView, parkCollection;

parkModel = new ParkModel();
parkView = new ParkView({
    model: parkModel
});
parkView = new ParkView({
    model: parkModel
});
parkCollection = new Backbone.Collection({
    model: ParkModel
});

parkView.render();
$("#parkdiv").append(parkView.$el);

