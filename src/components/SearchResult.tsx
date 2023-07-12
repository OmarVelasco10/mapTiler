import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from "./";
import { Feature } from "../interfaces/places";

export const SearchResult = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  const onPlaceClicked = (place: Feature) => {
    setActiveId(place.id);
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom:14,
      center:[lng,lat]
    })
  }

  // const getRoute = (place: Feature) => {
  //   if(!userLocation) return;
  //   const [lng,lat] = place.center

  //   getRouteBetweenPoint(userLocation, [lng,lat]);
  // }

  if(isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  if(places.length === 0){
    return <></>;
  }
  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li 
        className={`list-group-item list-group-item-action pointer ${(activeId === place.id) ? 'active' : ''}`}
        key={place.id}
        onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text}</h6>
          <p
            style={{
              fontSize: "12px",
            }}
          >
           {place.place_name}
          </p>
          <button
           className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
          //  onClick={ () => getRoute(place)}
           >Directions</button>
        </li>
      ))}
    </ul>
  );
};
