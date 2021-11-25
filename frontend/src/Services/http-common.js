import axios from "axios";

export default axios.create({
  baseURL: "https://polar-forest-09224.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
