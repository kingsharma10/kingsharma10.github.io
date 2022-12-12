// LOCATION IN LATITUDE AND LONGITUDE.
var center = new google.maps.LatLng(37.09024, -95.712891);
var flag;
var map;

const initialize = () => {
  // MAP ATTRIBUTES.
  var mapAttr = {
    center: center,
    zoom: 4.8,
    mapId: "b692d8abf7dbeef4",
  };

  // THE MAP TO DISPLAY.
  map = new google.maps.Map(document.getElementById("mapContainer"), mapAttr);
};


const parseCSV = (csv) => {
  var lines = csv.split("\n");

  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  flag = true;
  return result;
};

window.onload = () => {
  var fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("change", () => {
    var file = fileInput.files[0];
    var airportList;

    var reader = new FileReader();

    reader.onload = () => {
      var text = reader.result;
      airportList = parseCSV(text);

      for (let i in airportList) {
        console.log(airportList[i]);
        let lat = parseFloat(airportList[i].Latitude);
        let long = parseFloat(airportList[i].Longitude);
        let name = airportList[i]["Airport Name"];
        console.log(lat, long, name);
       
        while(flag === false){

        }
        document.getElementById('words').style.display='none';
        
        if (lat !== NaN && long !== NaN) {
          let center2 = new google.maps.LatLng(lat, long);

          var circle2 = new google.maps.Circle({
            center: center2,
            map: map,
            radius: 10000, // IN METERS.
            strokeColor: "#DE0948",
            fillColor: "#DE0948",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.35,
            title:
              '<div class="infowindow"><h3>' +
              name +
              "</h3><div>" +
              lat +
              ", " +
              long +
              "</div></div>",
          });
        }

        var infowindow = new google.maps.InfoWindow({});
        var marker = new google.maps.Marker({
          map: map,
        });

        google.maps.event.addListener(circle2, "mouseover", function () {
          if (typeof this.title !== "undefined") {
            marker.setPosition(this.getCenter()); // get circle's center
            infowindow.setContent("<b>" + this.title + "</b>"); // set content
            infowindow.open(map, marker); // open at marker's location
            marker.setVisible(false); // hide the marker
          }
        });

        google.maps.event.addListener(circle2, "mouseout", function () {
          infowindow.close();
        });

        //location.hash = '#' + JSON.stringify({ m:circle2, i:infowindow });

        // google.maps.event.addListener(circle2,'mouseover',function(){
        //     this.getMap().getDiv().setAttribute('title',this.get('title'));});

        // google.maps.event.addListener(circle2,'mouseout',function(){
        //     this.getMap().getDiv().removeAttribute('title');});
      }
    };
    reader.readAsText(file);
  });
};

google.maps.event.addDomListener(window, "load", initialize);
