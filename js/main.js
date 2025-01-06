mapboxgl.accessToken = 'pk.eyJ1IjoiZWFydGhhZGFtIiwiYSI6ImNqd3Y3amlwczBnMzc0YW4xc2x1NWVuNGoifQ.jQvOGeLkupgLxp31-Oa6gw';

//Add commas and stuff to cost value
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const COLORS = {
    completed: '#39DFff',
    active: '#00FF00',
    future: '#FFFF00',
    strokeCompleted: '#00497A',
    strokeActive: '#004400',
    strokeFuture: '#444400'
};

const IMAGE_BASE_URL = 'https://github.com/overview-solutions/RemoteMonitorMap/raw/master/Img/';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/earthadam/cjxo0sdri31o01clrrw3qesbq',
    projection: 'mercator', // Default to Mercator
    center: [13.902049, 3.489016],
    zoom: 2
});

var icon = "circle";

let isGlobeView = false;

document.getElementById('toggleProjection').addEventListener('click', () => {
    isGlobeView = !isGlobeView;
    map.setProjection(isGlobeView ? 'globe' : 'mercator');

    if (isGlobeView) {
        map.setFog({
            range: [0.5, 10],
            color: 'rgba(0, 0, 0, 0.5)',
            "horizon-blend": 0.3,
            "star-intensity": 0.8
        });
    } else {
        map.setFog(null);
    }
});

map.on('load', function() {
    //map.setFog({}); 
    var layers = ['Completed','Active', 'Future'];
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
            // color circles by project status, using a match expression
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
            'circle-opacity':[
                'match',
                ['get', 'Map Color'],
                'G', 1,
                'Y', 1,
                'B', 1,
                'D', 0,
                /* other */ 1
            ],
            'circle-stroke-opacity':[
                'match',
                ['get', 'Map Color'],
                'G', 1,
                'Y', 1,
                'B', 1,
                'D', 0,
                /* other */ 1
            ],
            'circle-stroke-width':1
        }
    });
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    function handleFeatureEvent(e) {
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(createPopupHTML(e.features[0]))
            .addTo(map);
    }

    map.on('mouseover', 'sites', handleFeatureEvent);
    map.on('click', 'sites', handleFeatureEvent);

    map.on('click', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    
    map.resize();
});

function createPopupHTML(feature) {
    const imgTag = `<img src="${IMAGE_BASE_URL}${feature.properties["Country"]}.png" style="width:100px;height:67px;"/>`;
    const linkTag = feature.properties["Link"] ? `<h3><a href="${feature.properties["Link"]}">Link to Project</a></h3>` : '';
    return `
        ${imgTag}
        <h2>${feature.properties["Organization Contracted"]}</h2>
        ${linkTag}
        ${feature.properties["Project Name"]}<br>
        <b>Country:</b> ${feature.properties["Country"]}<br>
        <b>Years Active:</b> ${feature.properties["Years Active"]}
    `;
}
