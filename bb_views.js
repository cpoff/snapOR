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

var MasterView = Backbone.View.extend({
    render: function () {      
        this.$el.html("<div>" + "Map API response goes here" + "</div>");
    },

var ParkView = Backbone.View.extend({
    render: function () {      
        this.$el.html("<div>" + "Flickr API response goes here" + "</div>");
    },
});

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


