/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0ytpI7V7cyT1Kq5rT9Z1A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    scrollZoom: false,
    //   center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    //   zoom: 9, // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.classList = 'marker';

    // Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.Day}: ${loc.description}</p>`)
      .addTo(map);

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.cordinates)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.cordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 },
  });
};
