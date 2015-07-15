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
        'park_name': '',
        'features': [],
        'park_latitude': '0',
        'park_longitude': '0',
        'parkFlickrCall': 'URL',
    },
    initialize: function() {
        this.fetch();
        this.flickrApi();
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