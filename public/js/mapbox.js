export const displayMap = locations => {
  mapboxgl.accessToken = 
  'pk.eyJ1IjoibXVyY2llZ2FsbyIsImEiOiJja2JqaWFtemEwbmF1MnJ0ZHJsNXFiOTByIn0.HCRDiCTZiILWMA7ZmzfYDQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom:false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(el => {
    //1. add markers
    const marker = document.createElement('div');
    marker.className = 'marker';
    new mapboxgl.Marker({
      element: marker,
      anchor: 'bottom'
    })
    //2. set markers
    .setLngLat(el.coordinates)
    .addTo(map);

    // PopUp
    new mapboxgl.Popup({offset:30})
    .setLngLat(el.coordinates)
    .setHTML(`<p>Day ${el.day}:${el.description}</p>`)
    .addTo(map);
    //Include current location on map
    bounds.extend(el.coordinates)
  });

  map.fitBounds(bounds, {
    padding:{
      top: 200,
      bottom: 200,
      left: 200,
      right: 100
    }
  });
}
