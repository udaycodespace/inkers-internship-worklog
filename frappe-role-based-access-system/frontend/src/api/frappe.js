import axios from "axios";

const frappe = axios.create({
  baseURL: "http://localhost:8002",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

// ========================================
// RESPONSE INTERCEPTOR (SAFE VERSION)
// ========================================
frappe.interceptors.response.use(
  (response) => response,

  (error) => {
    // Network / server down
    if (!error.response) {
      console.error("Server not reachable");
      return Promise.reject({
        message: "Server not reachable"
      });
    }

    const { status, data } = error.response;

    // 🔒 DO NOT REDIRECT HERE
    // AuthContext controls navigation
    if (status === 401 || status === 403) {
      return Promise.reject({
        message: "Session expired",
        status
      });
    }

    // Frappe throws 417 for frappe.throw()
    if (status === 417) {
      let message = "Operation failed";

      if (data?.message) {
        message = data.message;
      }

      if (data?._server_messages) {
        try {
          const parsed = JSON.parse(data._server_messages);
          if (parsed.length > 0) {
            message = parsed[0];
          }
        } catch {}
      }

      return Promise.reject({
        message,
        status
      });
    }

    return Promise.reject(error);
  }
);

export default frappe;