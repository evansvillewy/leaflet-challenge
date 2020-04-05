let markersArray = {}; // create the associative array
  let magsArray = {}; // here hold the ids that correspond to the mags


  // load GeoJSON from an external file
  $.getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-07-20&endtime=2019-07-21&minmagnitude=5", data => {

    // color indication by magnitude
    L.geoJson(data, {

      // add GeoJSON layer to the map once the file is loaded
      pointToLayer: function(feature, latlng) {
        const mag = feature.properties.mag;
        const geojsonMarkerOptions = {
          opacity: 0.8,
          fillOpacity: 0.6,
          // here define the style using ternary operators for circles
          color: mag >= 4.0 ? 'red' : mag >= 3.0 ? 'orange' : mag >= 2.0 ? 'yellow' : 'black'
        };

        // here store the circle markers in the array
        markersArray[feature.id] = L.circleMarker(latlng, geojsonMarkerOptions)
               .addTo(map)
               .bindPopup(
              `<b>Magnitude:</b> " ${feature.properties.mag} 
               <br><b>Location:</b>  ${feature.properties.place}`, {
          closeButton: true,
          offset: L.point(0, -20)
        });

        // here record the mags
        magsArray[feature.id] = feature.properties.mag;

        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
    })

    // add dynamically anchor tags
    let markup = '';
    for (let i in markersArray) {
      markup += `<a href="#" onclick="markersArray['${i}'].openPopup()"><b>${magsArray[i]} Mag</b></a><br/>`;
    }
    document.getElementById('anchors').innerHTML = markup;
  });