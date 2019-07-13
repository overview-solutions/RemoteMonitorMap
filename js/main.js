mapboxgl.accessToken = 'pk.eyJ1IjoiZWFydGhhZGFtIiwiYSI6ImNqd3Y3amlwczBnMzc0YW4xc2x1NWVuNGoifQ.jQvOGeLkupgLxp31-Oa6gw';

//Add commas and stuff to cost value
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var map = new mapboxgl.Map({
    container: 'map',
    //style: 'mapbox://styles/earthadam/cjvy2aoum109m1ct7j4cce74d',
    //style: 'mapbox://styles/earthadam/cjggo2pka002c2so00qaetnaz',	//Website
    style: 'mapbox://styles/earthadam/cjxo0sdri31o01clrrw3qesbq',	//Presentation
    //style: 'mapbox://styles/earthadam/cjggwweef00002rpuoj1t93h3',	//Desert
    //style: 'mapbox://styles/earthadam/cjs968jaf2e1j1fmp6hj0pwwn',
    center: [13.902049,3.489016],
    zoom: 2
});

var icon = "circle";

map.on('load', function() {
    var layers = ['Retired','Active', 'Future'];
    var colors = ['#39DFff','#00FF00', '#FFFF00'];
    for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;
      
        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
      }
    //map.addSource('projects', { type: 'geojson', data: 'projects.geojson' });
    map.addSource('projects', { type: 'geojson', data: 'https://raw.githubusercontent.com/overview-solutions/RemoteMonitorMap/master/projects.geojson' });
    // Add a layer showing the places.
    map.addLayer({
        "id": "sites",
        "type": "circle",
        source: "projects",
        'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 20,
                'stops': [[12, 5], [22, 180]]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'Map Color'],
                'G', '#00ff00',
                'Y', '#ffff00',
                'B', '#39DFff',
                /* other */ '#fff'
            ],
            'circle-stroke-color': [
                'match',
                ['get', 'Map Color'],
                'G', '#004400',
                'Y', '#444400',
                'B', '#00497A',
                /* other */ '#444'
            ],
            'circle-stroke-width':1
        }
    });
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseover', 'sites', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
            "<img src=\"./Img/"+e.features[0].properties["Country"]+".png\"style=\"width:100px;height:67px;\"/>"+
            "<h2>"+ e.features[0].properties["Organization Contracted"]+"</h2>"+
            e.features[0].properties["Project Name"]+"<br>"+
            "<b>Country:</b> "+e.features[0].properties["Country"]+"<br>"+
            "<b>2017/2018 Award:</b> $"+numberWithCommas(e.features[0].properties["2017\/2018 Award"])+"<br>"+
            "<b>Years Active: </b>"+e.features[0].properties["Years Active"])
            //.setHTML(e.features[0].properties.description)
            .addTo(map);
    });
    map.on('click', 'sites', function(e) {
        el.className = 'marker';
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
            "<img src=\"./Img/"+e.features[0].properties["Country"]+".png\"style=\"width:100px;height:67px;\"/>"+
            "<h2>"+ e.features[0].properties["Organization Contracted"]+"</h2>"+
            e.features[0].properties["Project Name"]+"<br>"+
            "<b>Country:</b>"+e.features[0].properties["Country"]+"<br>"+
            "<b>2017/2018 Award:</b> $"+numberWithCommas(e.features[0].properties["2017\/2018 Award"])+"<br>"+
            "<b>Years Active: </b>"+e.features[0].properties["Years Active"])
            //.setHTML(e.features[0].properties.description)
            .addTo(map);
    });

    map.on('click', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    
});