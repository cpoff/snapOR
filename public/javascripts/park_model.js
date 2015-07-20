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
        'park_name': '',
        'features': [],
        'park_latitude': '0',
        'park_longitude': '0',
        'parkFlickrCall': 'URL',
    },
    initialize: function() {
        this.fetch();
    }
});
var ParkView = Backbone.View.extend({
    url: '/parkdetail',
    //	park_template : _.template('<h1>Here are the details of this particular park.</h1>'),
    render: function() {
        var template = _.template('<h1>{{parkName}}</h1><div>{{FlickrInfo}}</div>');
        this.$el.html(template({
            //                parkName: this.model.get('park_name'),
            parkName: 'park_name',
            //                FlickrInfo: this.model.get('flickr_data')
            FlickrInfo: 'flickr_data'
        }));
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
// parkCollection = new ParkCollection(parkArray);
parkView = new ParkView({
    model: parkModel
});
parkCollection = new Backbone.Collection({
    model: ParkModel
});
//$(document).ready(function() {
parkView.render();
$("#parkdiv").append(parkView.$el);
//});