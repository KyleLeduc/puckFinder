mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: rink.geometry.coordinates,
    zoom: 13.75
});

new mapboxgl.Marker()
    .setLngLat(rink.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${rink.title}</h3><p>${rink.location}</p>`
        )
    )
    .addTo(map)