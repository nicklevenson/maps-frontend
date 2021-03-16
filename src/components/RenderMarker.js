import mapboxgl from 'mapbox-gl'

const RenderMarker = (props) => {
  const coords = [props.marker.lng, props.marker.lat];
  if (sessionStorage.jwt) {
    
// create DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${props.marker.user.image})`
    if (props.currentUser.id === props.marker.user.id) {
      const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${props.marker.title}</h3>
          <textarea>${props.marker.info}</textarea>
          <div class="delete-marker">Delete</div>`
        ))
        .addTo(props.map);
  
        marker._popup._content.children[2].addEventListener('click', function removeMarker() {
          props.destroyMarker(props.marker)
          marker._popup._content.children[2].removeEventListener('click', removeMarker)
        })
    }else{
      const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${props.marker.title}</h3>
          <textarea>${props.marker.info}</textarea>
          ${props.currentUser.likedMarkers.map(m=>m.id).includes(props.marker.id) ? '<div class="like-marker">Remove from My Map</div>' : '<div class="like-marker">Add To My Map</div>'}
          `
        ))
        .addTo(props.map);

        marker._popup._content.children[2].addEventListener('click', function likeMarker() {
          if (props.currentUser.likedMarkers.map(m=>m.id).includes(props.marker.id)) {
            props.unlikeMarker(props.marker, props.currentUser.id)
          }else{
            props.likeMarker(props.marker, props.currentUser.id)
          }
     
          marker._popup._content.children[2].removeEventListener('click', likeMarker)
        })
    }
    // console.log(props.marker.user)
   
    
  }else {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${props.marker.user.image})`
      const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${props.marker.title}</h3>
          <textarea>${props.marker.info}</textarea>
          `
        ))
        .addTo(props.map);
  }
  
}



export default RenderMarker
