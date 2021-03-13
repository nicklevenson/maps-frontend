import mapboxgl from 'mapbox-gl'

const RenderMarker = (props) => {
  var coords = [props.marker.coordinates.lng, props.marker.coordinates.lat];
  // var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
  //   `<h2>${marker.title}</h2>
  //   <p>${marker.info}</p>`
  // )
// create DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker(el)
    .setLngLat(coords)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + props.marker.title + '</h3><p>' + props.marker.info + '</p>'))
    .addTo(props.map);



    // let markerEvent = (marker, handleMarkerSelect) => {
    //   el.addEventListener("click", function renderInfo(event) {
    //     handleMarkerSelect(marker)
    //     const container = document.getElementById("marker-info-container")
    //     var x = event.clientX;
    //     var y = event.clientY;
    //     container.style.position = 'absolute';
    //     container.style.left = x + 'px';
    //     container.style.top = y + 'px';
    //     container.style.width = "30vw";
   
    //   })
    // }
    // markerEvent(props.marker, props.handleMarkerSelect) 
}


export default RenderMarker
