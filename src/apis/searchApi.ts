import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.maptiler.com/geocoding",
  params: {
    limit: 5,
    key: "KvY16xYv87UldSFsKqdo",
  },
});

export default searchApi;
