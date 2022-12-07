import axios from "axios";
import { Buffer } from "buffer";

const a = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

/**
 * Requests something from the Backend
 * @param {String} endpoint
 * @param {{}} params
 */
export async function Get(endpoint, params) {
  const result = await a.get(endpoint, {
    params: params,
  });
  return result.data;
}

/**
 * Requests something from the Backend
 * @param {String} endpoint
 * @param {{}} body
 */
export async function Post(endpoint, body) {
  const result = await a.post(endpoint, body);
  return result.data;
}

/**
 * Requests an image from the backend
 * @param {String} imageID
 */
export async function GetImage(imageID) {
  return new Promise((resolve, reject) => {
    a.get(`/images/${imageID}`)
      .then((response) => {
        console.log(response);
        resolve("data:image/png;base64," + Buffer.from(response.data.data).toString("base64"));
      })
      .catch((error) => {
        console.error(error);
        if (error.code == "404") {
          console.log("Cannot find image with that id");
        } else {
          console.log("Something's wrong with the database");
        }
      });
  });
}
