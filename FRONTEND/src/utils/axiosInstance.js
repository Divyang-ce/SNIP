import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const axiosInstance = axios.create({
    baseURL,
    timeout:10000, //10s
    withCredentials:true
})

// Routes that should never trigger a silent refresh-and-retry,
// otherwise a failed login/refresh could loop on itself.
const NO_REFRESH_PATHS = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh"]

let isRefreshing = false
let pendingQueue = []

const processQueue = (error) => {
    pendingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error)
        else resolve()
    })
    pendingQueue = []
}

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config
        const status = error.response?.status

        const isAuthExempt = originalRequest && NO_REFRESH_PATHS.some((p) => originalRequest.url?.includes(p))

        // Access token expired — try a silent refresh once, then retry the original request.
        if (status === 401 && originalRequest && !originalRequest._retry && !isAuthExempt) {
            originalRequest._retry = true

            if (isRefreshing) {
                // Another request already triggered a refresh; wait for it to finish.
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject })
                }).then(() => axiosInstance(originalRequest))
                  .catch((err) => Promise.reject(err))
            }

            isRefreshing = true
            try {
                await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true })
                processQueue(null)
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError)
                return Promise.reject({
                    message: "Session expired. Please log in again.",
                    status: 401,
                })
            } finally {
                isRefreshing = false
            }
        }

        if (error.response) {
            const { data } = error.response;
            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    break;
                case 403:
                    console.error("Forbidden:", data);
                    break;
                case 404:
                    console.error("Not Found:", data);
                    break;
                case 500:
                    console.error("Server Error:", data);
                    break;
                default:
                    console.error(`Error (${status}):`, data);
            }
        } else if (error.request) {
            console.error("Network Error: No response received", error.request);
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject({
            message: error.response?.data?.message || error.message || "Unknown error occurred",
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);
export default axiosInstance
