mapboxgl.accessToken = mapToken;
rinkCoords = rink.geometry.coordinates.reverse();

// // Get users geolocation (Needs error handling)
// function getDirections() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition)
//   }
// }
// function showPosition(position) {
//   let coords = [];
//   coords.push(position.coords.longitude);
//   coords.push(position.coords.latitude);
// //   Push users location and rink destination to mapbox map
//   directions.setOrigin(coords);
//   directions.setDestination(rinkCoords)
// }
// // Shift the map south slightly to move marker out from behind directions
// function adjustedCoords(coords) {
//     let newCoords = [];
//     newCoords.push(coords[0])
//     newCoords.push(coords[1] + 0.001)
//     return newCoords;
// }
// const adjustedRinkCoords = adjustedCoords(rinkCoords)

// Mapbox map creation
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: rinkCoords,
    zoom: 13.75
});

// // Mapbox-directions configuration
// let directions = new MapboxDirections({
//     accessToken: mapToken,
//     unit: 'metric',
//     profile: 'mapbox/driving',
//     controls: {
//         profileSwitcher: false,
//         instructions: false
//     }
// });

// Map controls and popup configuration
map.addControl(new mapboxgl.NavigationControl());
// map.addControl(directions, 'top-left');
new mapboxgl.Marker()
    .setLngLat(rinkCoords)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${rink.title}</h3><p>${rink.location}</p>`
        )
    )
    .addTo(map)