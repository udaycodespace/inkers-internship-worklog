import React, { createContext, useState, useEffect } from "react";
import frappe from "../api/frappe";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    await frappe.post("/api/method/login", {
      usr: email,
      pwd: password
    });

    const res = await frappe.get(
      "/api/method/company_access_portal.api.user_api.get_current_user_info"
    );

    setUser(res.data.message);
  };

  const logout = async () => {
    await frappe.get("/api/method/logout");
    setUser(null);
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await frappe.get(
          "/api/method/company_access_portal.api.user_api.get_current_user_info"
        );
        setUser(res.data.message);
      } catch {
        setUser(null);
      }
    }
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
