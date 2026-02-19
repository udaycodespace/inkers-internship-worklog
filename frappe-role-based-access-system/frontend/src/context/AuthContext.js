import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import frappe from "../api/frappe";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // 🔐 CHECK SESSION (ONLY IF REACT LOGIN)
  // =========================================
  const checkSession = useCallback(async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.user_api.get_current_user_info"
      );

      if (res?.data?.message?.email) {
        setUser(res.data.message);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================
  // 🔑 STRICT LOGIN (React Controlled)
  // =========================================
  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password required");
    }

    try {
      setLoading(true);

      await frappe.post("/api/method/login", {
        usr: email.trim(),
        pwd: password,
      });

      // 🔥 Mark React session explicitly
      localStorage.setItem("react_auth", "true");

      await checkSession();
    } catch (error) {
      localStorage.removeItem("react_auth");
      setUser(null);
      throw error;
    }
  };

  // =========================================
  // 🚪 FULL CLEAN LOGOUT (NO GHOST SESSION)
  // =========================================
  const logout = async () => {
    try {
      await frappe.get("/api/method/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 🔥 Remove React session marker
      localStorage.removeItem("react_auth");

      // 🔥 Clear everything
      window.localStorage.clear();
      window.sessionStorage.clear();

      setUser(null);

      // 🔥 Force full reload to kill cookie memory
      window.location.replace("/");
    }
  };

  // =========================================
  // 🧠 INITIAL LOAD
  // =========================================
  useEffect(() => {
    const hasReactAuth = localStorage.getItem("react_auth");

    if (hasReactAuth) {
      checkSession();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [checkSession]);

  // =========================================
  // 👑 ADMIN CHECK
  // =========================================
  const isAdmin =
    !!user &&
    Array.isArray(user.roles) &&
    user.roles.includes("Company Admin");

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}