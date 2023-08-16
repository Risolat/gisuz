import axios from "axios";
const http = axios.create({
  baseURL: "https://back.gis.uz",
});

export default http;
