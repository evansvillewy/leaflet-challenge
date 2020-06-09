// API key
const API_KEY = "pk.eyJ1IjoiZXZhbnN2aWxsZXd5IiwiYSI6ImNrN3pjcWlucDAyOXUzZm9oeDNuNmRramIifQ.XjFuS6W7cSTtZ2EybG7_VA";

// get the earth quakes for the last 7 days, this is updated every minute
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function getColor(d) {
    if (d < 1){
        return "RGB(80, 220, 100)";
    } else if (d < 2){
        return "RGB(152, 251, 152)";
    } else if (d < 3){
        return "RGB(255, 204, 0)";
    } else if (d < 4){
        return "RGB(255, 94, 19)";
    } else if (d < 5){
        return "RGB(150, 64, 0)";
    } else {
        return "red";
    };
};

// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
function forEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
    +"<p> Magnitude " + feature.properties.mag + "</p>");
  }

// Create the layer for the plates
var plates = new L.LayerGroup();

var plateUrl = "static/js/PB2002_plates.json"

d3.json(queryUrl, function(earthquakeData) {
    console.log(earthquakeData);

    d3.json(plateUrl,function(plateData){

        L.geoJSON(plateData, {
            style: function() {
              return {color: "orange", fillOpacity: 0}
            }
          }).addTo(plates);
    });

    var earthquakes = L.geoJSON(earthquakeData, {
        style: function(feature) {
            let circleColor = getColor(feature.properties.mag);

            return {
                color: circleColor
            };
        },
        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, { 
                stroke: true,
                weight: 3, 
                opacity: 1.0,
                fillOpacity: .75,
                fillcolor:getColor(feature.properties.mag),
                radius: Math.pow(1.75, feature.properties.mag)
            })},
        onEachFeature: forEachFeature
      });

    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });    

    // set the map center to be the latitude and longitude for Las Vegas
    var myMap = L.map("map", {
        center: [36.114647, -115.172813],
        zoom: 5,
        layers:[light,earthquakes,plates]
    });

    // Only one base layer can be shown at a time - default light
    var baseMaps = {
            Grayscale: light,
            Satellite: satellite,
            Outdoors: outdoors
            };     
            
    // Overlays that may be toggled on or off
    var overlayMaps = {
        Earthquakes: earthquakes,
        "Fault Lines": plates
    };            

    // source: https://leafletjs.com/examples/choropleth/
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'legend');

        var labels = [];
        var ranges = [.9,1.9,2.9,3.9,4.9,5];
        rangeLabels = ['0-1','1-2','2-3','3-4','4-5','5+'];

        for (var i = 0; i < ranges.length; i++) {

                div.innerHTML +=
                '<i style="background:' + getColor(ranges[i] ) + '"></i> ' +
                rangeLabels[i] + '<br>';

            }
            //console.log(labels);
        return div;
    };

    legend.addTo(myMap);

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(myMap);

    });

