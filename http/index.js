import axios from "axios";
let baseURL;
if (typeof window === "undefined") {
  baseURL = "http://back.gis.uz";
} else {
  baseURL = "https://back.gis.uz";
}

let http = axios.create({
  baseURL,
});

export default http;
