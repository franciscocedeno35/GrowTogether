import axios from "axios";

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
