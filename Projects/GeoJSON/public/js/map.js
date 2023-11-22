mapboxgl.accessToken = 'pk.eyJ1IjoibG92aXMtMTIzIiwiYSI6ImNsY29zNmZwZTF6dWYzdm10cXp6aTRrMjkifQ.pvih7ZomPoalfoN5obpOhA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-71.157895, 42.707741]
});

function loadMap() {
    map.on('load', () => {
        // Add a data source containing one point feature.
        map.addSource('point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [-77.4144, 25.0759]
                        }
                    }
                ]
            }
        });
    })
}