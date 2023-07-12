import { Map } from "@maptiler/sdk";
import { createContext } from "react";

interface MapContextProps {
    isMapReady: boolean;
    map?: Map,

    //Methods
    setMap: (map: Map) => void;
    // getRouteBetweenPoint: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext({} as MapContextProps);