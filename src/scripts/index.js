import axios from "axios";
import { Buffer } from "buffer";

const a = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 30 * 1000,
});

/**
 * Requests something from the Backend
 * @param {String} endpoint
 * @param {{}} params
 */
export async function Get(endpoint, params) {
  return new Promise((resolve, reject) => {
    a.get(endpoint, {
      params: params,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.message);
        reject(error);
      });
  });
}

/**
 * Posts something to the Backend
 * @param {String} endpoint
 * @param {{}} body
 */
export async function Post(endpoint, body) {
  return new Promise((resolve, reject) => {
    a.post(endpoint, body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.message);
        reject(error);
      });
  });
}

/**
 * Patches something in the Backend
 * @param {String} endpoint
 * @param {{}} body
 */
export async function Patch(endpoint, body) {
  return new Promise((resolve, reject) => {
    a.patch(endpoint, body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.message);
        reject(error);
      });
  });
}

/**
 * Deletes something in the Backend
 * @param {String} endpoint
 * @param {{}} body
 */
export async function Delete(endpoint, body) {
  return new Promise((resolve, reject) => {
    a.delete(endpoint, body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.message);
        reject(error);
      });
  });
}

/**
 * Requests an image from the backend
 * @param {String} imageID
 */
export async function GetImage(imageID) {
  return new Promise((resolve, reject) => {
    a.get(`/images/${imageID}`)
      .then((response) => {
        resolve("data:image/png;base64," + Buffer.from(response.data.data).toString("base64"));
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.message);
        if (error.code == "404") {
          console.log("Cannot find image with that id");
        } else {
          console.log("Something's wrong with the database");
        }
        reject(error);
      });
  });
}
