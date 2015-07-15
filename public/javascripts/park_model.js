// snapOR homepage
var MasterView = Backbone.View.extend({
    render: function() {
        this.$el.html("<div>" + "Map API response goes here" + "</div>");
    }
});
var ParkCollection = Backbone.Collection.extend({
    model: ParkModel,
    //	url : "/parkdetail",
    initialize: function() {
        this.fetch();
    }
});
var parkCollection = new Backbone.Collection({
    model: ParkModel,
});

var ParkModel = Backbone.Model.extend({
    defaults: {
        'name': '',
        'features': [],
        'latitude': '0',
        'longitude': '0',
        'parkFlickrCall': '',
    },
    initialize: function() {
        this.fetch();
        this.flickrApi();
    },
    flickrApi: function() {
        var lat = this.get("latitude");
        var long = this.get("longitude");
        var flickrUrl = this.set('parkFlickrCall', "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0be06ecdf3fa1ac784e8fd10c279790c&tags=park&lat=" + lat + "&lon=" + long + "&radius=20&per_page=20&format=json");
    }
});
var ParkView = Backbone.View.extend({
    url: "/parkdetail",
    render: function() {
        this.$el.html("<div>" + "Park detail template goes here" + "</div>");
    },
});
var parkModel, parkView, parkCollection;
$(document).ready(function() {
    parkModel = new ParkModel();
    parkView = new ParkView({
        model: parkModel
    });
    parkCollection = new ParkCollection(parkArray);
    parkView = new ParkView({
        model: parkModel
    });
    parkView.render();
    $("#parkdiv").append(parkView.$el);
});