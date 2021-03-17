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
          <i>By: ${props.marker.user.username}</i>
          <br>
          <i>Coordinates: [${coords}]</i>
          <textarea readonly>${props.marker.info}</textarea>
          <div class="delete-marker">Delete</div>`
        ))
        .addTo(props.map);
  
        marker._popup._content.children[5].addEventListener('click', function removeMarker() {
          props.destroyMarker(props.marker)
          marker._popup._content.children[5].removeEventListener('click', removeMarker)
          
        })
    }else{
      const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `<h3>${props.marker.title}</h3>
          <i>By: ${props.marker.user.username}</i>
          <br>
          <i>Coordinates: [${coords}]</i>
          <textarea readonly>${props.marker.info}</textarea>
          ${props.currentUser.maps.map(m=>m.markers).map(mk=>mk.id).includes(props.marker.id) ? '<div class="like-marker">Remove from My Map</div>' : '<div class="like-marker">Add To My Map</div>'}
          `
          // ${props.currentUser.likedMarkers.map(m=>m.id).includes(props.marker.id) ? '<div class="like-marker">Remove from My Map</div>' : '<div class="like-marker">Add To My Map</div>'}
        ))
        .addTo(props.map);
       
        marker._popup._content.children[5].addEventListener('click', function likeMarker() {
          const renderForm = () => {
            marker._popup._content.children[5].removeEventListener('click', likeMarker)
            return(
              `
              <div id="add-marker-to-map-container">
                <h4>Which Map?</h4>
                <form id="add-marker-to-map-form">
                  <select name="mapTitle">
                    ${props.currentUser.maps.map(m=>{return `<option>${m.title}</option>`})}
                  </select>
                  <input type="submit" value="Add">
                </form>
              </div>
              `
            )
          }
          marker._popup._content.innerHTML += renderForm()
          document.getElementById("add-marker-to-map-form").addEventListener("submit", e=>props.handleMarkerAdd(e, props.marker.id))
        
          // marker._popup._content.children[5].removeEventListener('click', likeMarker)
          // marker.remove()
          // RenderMarker(props)
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
          <i>By: ${props.marker.user.username}</i>
          <br>
          <i>Coordinates: [${coords}]</i>
          <textarea readonly>${props.marker.info}</textarea>
          `
        ))
        .addTo(props.map);
  }
  
}



export default RenderMarker
