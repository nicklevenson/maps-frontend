import React from 'react';
import mapboxgl from 'mapbox-gl'



class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 2 // starting zoom
    });
  
    map.on('load', () => {
      // Add an image to use as a custom marker
      
      map.loadImage(
          'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
          (error, image) => {
              if (error) throw error;
              map.addImage('custom-marker', image);
              // Add a GeoJSON source with 2 points
              map.addSource('points', {
                  'type': 'geojson',
                  'data': {
                      'type': 'FeatureCollection',
                      'features': this.props.points.map(point => 
                        (
                          {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    point.coordinates.lat,
                                    point.coordinates.long
                                ]
                            },
                            'properties': {
                                'title': point.title
                            }
                        }
                        )
                        )
                         
                      
                  }
              });

              // Add a symbol layer
              map.addLayer({
                  'id': 'points',
                  'type': 'symbol',
                  'source': 'points',
                  'layout': {
                      'icon-image': 'custom-marker',
                      // get the title name from the source's "title" property
                      'text-field': ['get', 'title'],
                      'text-font': [
                          'Open Sans Semibold',
                          'Arial Unicode MS Bold'
                      ],
                      'text-offset': [0, 1.25],
                      'text-anchor': 'top'
                  }
              });
          }
      );
    });
  }
  
  render(){
    return(
      <div id="map" style={{width:"90vw", height:"70vh"}}></div>
    )
  }
}

export default Map