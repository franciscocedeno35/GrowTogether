import axios from "axios";

const a = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
});

/**
 * Requests something from the Backend
 * @param {String} endpoint
 * @param {{}} body
 */
export async function Get(endpoint, body) {
  const result = await a.get(endpoint, {
    data: body,
  });
  return result.data;
}
