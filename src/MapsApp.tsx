import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens/HomeScreen";
import "./styles.css";
import * as maptilersdk from "@maptiler/sdk";

maptilersdk.config.apiKey = "KvY16xYv87UldSFsKqdo";

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </PlacesProvider>
  );
};
