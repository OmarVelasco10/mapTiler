import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.maptiler.com/geocoding/driving",
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    key: "KvY16xYv87UldSFsKqdo",
  },
});

export default directionsApi;
