let map;

export function setMap(lat, lon) {
  // Check if map already exists
  if (map) {
    // If map exists, just set the new view
    map.setView([lat, lon], 12);
  } else {
    // If map doesn't exist, create a new one
    map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  }
}
