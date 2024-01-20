import axios from "axios";

import routes from "@/routes";
import { localStorageManager } from "./LocalStorage";
import { REFRESH_TOKEN, TOKEN } from "@/constants";

const api = axios.create({
  baseURL: routes.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorageManager.getItem(TOKEN);

  if (config.headers) config.headers["Authorization"] = token;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const refreshToken = localStorageManager.getItem(REFRESH_TOKEN);

        const response = await axios.post(
          `${routes.baseURL}${routes.refresh}`,
          {
            refresh: refreshToken,
          }
        );

        if (response.status == 200) {
          const { access, refresh: newRefreshToken } = response.data;

          localStorageManager.setItem(TOKEN, access),
            localStorageManager.setItem(REFRESH_TOKEN, newRefreshToken);

          return api(originalRequest);
        }

        if (response.status !== 200) {
          localStorageManager.removeItem(TOKEN),
            localStorageManager.removeItem(REFRESH_TOKEN);

          return;
        }
      } catch (err) {
        localStorageManager.removeItem(TOKEN),
          localStorageManager.removeItem(REFRESH_TOKEN);
        // AuthEmitter.emit('interceptorError');
        console.log(err);
      }
    }

    return Promise.reject(error.response);
  }
);

export default api;
