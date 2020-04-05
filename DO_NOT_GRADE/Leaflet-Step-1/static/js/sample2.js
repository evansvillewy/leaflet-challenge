var object = {"type":"FeatureCollection","metadata":{"generated":1564051101000,"url":"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-07-20&endtime=2019-07-21&minmagnitude=5","title":"USGS Earthquakes","status":200,"api":"1.8.1","count":4},"features":[{"type":"Feature","properties":{"mag":5.2000000000000002,"place":"79km ENE of L'Esperance Rock, New Zealand","time":1563662132538,"updated":1563663302040,"tz":-720,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us70004pu1","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us70004pu1&format=geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":416,"net":"us","code":"70004pu1","ids":",us70004pu1,","sources":",us,","types":",geoserve,origin,phase-data,","nst":null,"dmin":1.9299999999999999,"rms":1.28,"gap":70,"magType":"mww","type":"earthquake","title":"M 5.2 - 79km ENE of L'Esperance Rock, New Zealand"},"geometry":{"type":"Point","coordinates":[-178.1173,-31.174800000000001,35]},"id":"us70004pu1"},
{"type":"Feature","properties":{"mag":5.5999999999999996,"place":"23km NNW of Kandrian, Papua New Guinea","time":1563655424914,"updated":1563741959328,"tz":600,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us70004psn","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us70004psn&format=geojson","felt":1,"cdi":4.2999999999999998,"mmi":4.4779999999999998,"alert":"green","status":"reviewed","tsunami":1,"sig":483,"net":"us","code":"70004psn","ids":",us70004psn,","sources":",us,","types":",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,","nst":null,"dmin":3.2029999999999998,"rms":0.89000000000000001,"gap":28,"magType":"mww","type":"earthquake","title":"M 5.6 - 23km NNW of Kandrian, Papua New Guinea"},"geometry":{"type":"Point","coordinates":[149.5069,-6.0086000000000004,59.789999999999999]},"id":"us70004psn"},
{"type":"Feature","properties":{"mag":5.0999999999999996,"place":"Easter Island region","time":1563647034336,"updated":1563892918040,"tz":-420,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us70004pra","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us70004pra&format=geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":400,"net":"us","code":"70004pra","ids":",us70004pra,","sources":",us,","types":",geoserve,origin,phase-data,","nst":null,"dmin":2.7559999999999998,"rms":0.71999999999999997,"gap":118,"magType":"mb","type":"earthquake","title":"M 5.1 - Easter Island region"},"geometry":{"type":"Point","coordinates":[-111.38379999999999,-29.3232,10]},"id":"us70004pra"},
{"type":"Feature","properties":{"mag":5.0999999999999996,"place":"136km ESE of Pangai, Tonga","time":1563635789233,"updated":1563636880040,"tz":-720,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/us70004pp5","detail":"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us70004pp5&format=geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"reviewed","tsunami":0,"sig":400,"net":"us","code":"70004pp5","ids":",us70004pp5,","sources":",us,","types":",geoserve,origin,phase-data,","nst":null,"dmin":3.2749999999999999,"rms":1.3100000000000001,"gap":116,"magType":"mww","type":"earthquake","title":"M 5.1 - 136km ESE of Pangai, Tonga"},"geometry":{"type":"Point","coordinates":[-173.15700000000001,-20.294899999999998,10]},"id":"us70004pp5"}],"bbox":[-178.1173,-31.1748,10,149.5069,-6.0086,59.79]}


   var i = 0;

   document.writeln("<div>");
   for(i = 0;i<object.features.length;i++) {

    var timestamp = object.features[i].properties.time / 1000;
    date = new Date(timestamp * 1000);
    dateString = date.toUTCString();

    var today = date;
    today.setHours(today.getHours() + 4);


    // maps

    document.writeln("<div class='list'>");
    document.writeln("<div>" + object.features[i].properties.mag + " Mag</div>");
    document.writeln("</div>");
  }
  document.writeln("</div>");


        var map = L.map('map').setView([-31.174800000000001,-178.1173], 2);


        // load a tile layer
        L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            maxZoom: 18,
            }).addTo(map);


        // load GeoJSON from an external file
        $.getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-07-20&endtime=2019-07-21&minmagnitude=5",function(data){

          var geojsonMarkerOptions = {
            opacity: 0.8,
            fillOpacity: 0.6
          };

          // color indication by magnitude
          geoLayer = L.geoJson(data, {

          // popup div content
          onEachFeature: function(feature,layer) {

          // variable1 = L.marker([-31.174800000000001,-178.1173]).bindPopup('The html content').addTo(map);

          var popupText = "<b>Magnitude:</b> " + feature.properties.mag
                      + "<br><b>Location:</b> " + feature.properties.place;


                      layer.bindPopup(popupText, {
                        closeButton: true,
                        offset: L.point(0, -20)
                      });
                      layer.on('click', function() {
                        layer.openPopup();
                      });     
          },


          style: function(feature) {
            var mag = feature.properties.mag;
            if (mag >= 4.0) {
              return { color: "red" }; 
            } 
            else if (mag >= 3.0) {
              return { color: "orange" };
            } 
            else if (mag >= 2.0) {
              return { color: "yellow" };
            } 
            else {
              return { color: "black" };
            }
          },


          // add GeoJSON layer to the map once the file is loaded
          pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
            },
          }).addTo(map);

        });