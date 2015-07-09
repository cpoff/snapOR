var ParkModel = Backbone.Model.extend({
    initialize : function () {
        this.fetch();
    }    
});

var ParkView = Backbone.View.extend({
    render: function () {      
        this.$el.html("<div>" + "Flickr api response goes here" + "</div>");
    },

    initialize: function () {
        this.model.on("change", this.render, this);
    },
    
var ParkCollection = Backbone.Collection.extend({
    model : ParkModel,
    url : "/parkdetail",
    initialize: function () {
        this.fetch();
    }
});

    
//var parkCollection, parkCollectionView;
$(document).ready( function () {
 
//parkCollection = new ParkCollection();
//parkCollectionView = new ParkCollectionView({ collection : parkCollection});
//parkCollectionView.render();
//$("#detaildiv").append(parkCollectionView.$el);

});