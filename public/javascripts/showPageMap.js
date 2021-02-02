mapboxgl.accessToken = mapToken;
rinkCoords = rink.geometry.coordinates;


function getDirections() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  }
}

function showPosition(position) {
  let coords = [];
  coords.push(position.coords.longitude);
  coords.push(position.coords.latitude);
  directions.setOrigin(coords);
  directions.setDestination(rinkCoords)
}

// Shift the map south slightly to move marker out from behind directions
function adjustedCoords(coords) {
    let newCoords = [];
    newCoords.push(coords[0])
    newCoords.push(coords[1] + 0.001)
    return newCoords;
}
const adjustedRinkCoords = adjustedCoords(rinkCoords)


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: adjustedRinkCoords,
    zoom: 13.75
});

let directions = new MapboxDirections({
    accessToken: mapToken,
    unit: 'metric',
    profile: 'mapbox/driving',
    controls: {
        profileSwitcher: false,
        instructions: false
    }
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(directions, 'top-left');
new mapboxgl.Marker()
    .setLngLat(rink.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<h3>${rink.title}</h3><p>${rink.location}</p>`
        )
    )
    .addTo(map)