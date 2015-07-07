var url = 'http://oregonstateparks.org/data/index.cfm';

var parkData;
var data = {
  endpoint: '/parks',
  parkName: ""
};
var parkArray = [];

function latLong () {
  parkData.forEach(function(feature) {
    var parkObj = {"name": feature.park_name, "latitude": feature.park_latitude, "longitude": feature.park_longitude};
    parkArray.push(parkObj);
  })
};

console.log(parkArray[1]);

function go() {
  $.ajax(url, {data: data})
  .then(function(data, status, xhr) {
    console.log("data");
    console.log(data);
    parkData = data;
    latLong();
  })
};

go();
