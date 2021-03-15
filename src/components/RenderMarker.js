import mapboxgl from 'mapbox-gl'

const RenderMarker = (props) => {
  if (props.marker.user) {
    var coords = [props.marker.lng, props.marker.lat];
// create DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${props.marker.user.image})`

    // console.log(props.marker.user)
    new mapboxgl.Marker(el)
    .setLngLat(coords)
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${props.marker.title}</h3>
        <textarea>${props.marker.info}</textarea>`
      ))
    .addTo(props.map);
  }
}


export default RenderMarker
