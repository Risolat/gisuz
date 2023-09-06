import axios from "axios";
let http;
if (typeof window != "undefined") {
  http = axios.create({
    baseURL: "http://back.gis.uz",
  });
} else {
  http = axios.create({
    baseURL: "https://back.gis.uz",
  });
}

export default http;
