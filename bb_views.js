var ParkModel = Backbone.Model.extend({
    initialize : function () {
        this.fetch();
    } 
    defaults : {'parkName' : '',
                'parkFeatures':[], 
                'parkAda':'', 
                'parkLatitude':'', 
                'parkLongitude':'', 
                'parkNarrative':''
                }
});

// snapOR homepage
var MasterView = Backbone.View.extend({
    render: function () {      
        this.$el.html("<div>" + "Map API response goes here" + "</div>");
    },

// individual park pages
var ParkView = Backbone.View.extend({
    render: function () {      
        this.$el.html("<div>" + "Flickr API response goes here" + "</div>");
    },
});

//user page
var userModel = Backbone.Model.extend({
    defaults: {"email": "", "name": "", "home": ""}
});// closes userModel

var userView = Backbone.View.extend({
    
});// closes userView

// collection of park pages
var ParkCollection = Backbone.Collection.extend({
    model : ParkModel,
    url : "/parkdetail",
    initialize: function () {
        this.fetch();
    }
});

$(document).ready( function () {
    var parkModel = new Park();
    var parkCollection = new ParkCollection();
    var parkView = new parkView({model : parkModel});

  parkView.render();

  $("#parkdiv").append(parkView.$el);
});


