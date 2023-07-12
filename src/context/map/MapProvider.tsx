import { Map, Marker, Popup } from "@maptiler/sdk";
import { MapContext } from "./MapContext";
import { useContext, useEffect, useReducer } from "react";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
// import { directionsApi } from "../../apis";


export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: []
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(mapReducer,INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
      state.markers.forEach( marker => marker.remove());
      const newMarkers: Marker[] = [];

      for(const place of places){
        const [lng, lat] = place.center;
        const popup = new Popup()
          .setHTML(`
            <h6>${place.text}</h6>
            <p>${place.place_name}</p>
          `)

          const newMarker = new Marker()
            .setPopup(popup)
            .setLngLat([lng, lat])
            .addTo(state.map!);
          
            newMarkers.push(newMarker);
      }

      dispatch({type:'setMarkers', payload: newMarkers});

    }, [places])
    

    const setMap = (map: Map) => {

      const myLocationPopup = new Popup()
        .setHTML(`
          <h4>I'm here</h4>
          <p>Somewhere in the world</p>
        `);

      new Marker({
        color: '#61DAFB'
      })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);

      dispatch({type:'setMap', payload: map})
    }

    // const getRouteBetweenPoint = async(start:[number,number], end: [number, number]) => {
    //   const resp = await directionsApi.get(`/${start.join(',')};${end.join(',')}`);
    //   const { distance, duration, geometry } = resp.data.routes[0];
    //  const { coordinates: coords} = geometry;
    //  let kms = distance / 1000;
    //  kms = Math.round(kms * 100);
    //  kms /= 100;
    //  const minutes == Mat.floor( duration / 60);
    //  console.log({kms,minutes});
    //  const bounce = new LngLatBounds(
    //    start,
    //    start
    //   );
    //  for( const coord of  coords) {
    //    const newCoord: [number,number];
    //    bounds.extend(newCoord);    
    //   }
    //  
    //  state.map?.fitBounds(bounds,{
    //   padding: 200
    //  });
    //
    // Polyline
    //  const sourceData: AnySourceData = {
    //      type:'geojson',
    //      data: {
     //         type: 'FeatureCollection',
     //         feature: [
      //            {
      //                type: 'Feature,
      //                properties: {},
      //                geometry: {
        //                  type: 'LineString',
        //                  coordinates: coords
      //                  }
     //             }
     //         ]
    //       }
    //   }
    //  
    //  if(state.map?.getLayer('RouteString')) {
     //   state.map.removeLayer('RouteString');
     //   state.map.removeSource('RouteString');
    //  }
    //
    // state.map?.addSource('RouteString', sourceData);
    //  state.map?.addLayer({
    //    id: 'RouteString',
    //    type: 'line',
    //    source: 'RouteString,
    //    layout: {
    //      'line-cap': 'round',
    //      'line-join': 'round'
    //    },
    //  paint: {
    //    'line-color': 'black',
    //    'line-width':3
    //  }
    //  })
    // }

  return (
    <MapContext.Provider value={{
        ...state,

        //Methods
        setMap,
        // getRouteBetweenPoint
    }}>
        {children}
    </MapContext.Provider>
  )
}
