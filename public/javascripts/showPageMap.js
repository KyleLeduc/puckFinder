mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: rink.geometry.coordinates,
    zoom: 13.75
});

new mapboxgl.Marker()
    .setLngLat(rink.geometry.coordinates)
    .addTo(map)