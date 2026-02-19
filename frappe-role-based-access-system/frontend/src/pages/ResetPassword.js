import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import frappe from "../api/frappe";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ===============================
  // TOKEN VALIDATION
  // ===============================
  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link.");
    }
  }, [token]);

  // ===============================
  // PASSWORD VALIDATION
  // ===============================
  const validatePassword = () => {
    if (!password.trim()) return "Password is required.";
    if (password.length < 6)
      return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number.";
    if (password !== confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  // ===============================
  // FRAPPE ERROR EXTRACTOR
  // ===============================
  const extractFrappeError = (err) => {
    const data = err.response?.data;

    if (!data) return "Something went wrong.";

    if (data._server_messages) {
      try {
        const parsed = JSON.parse(data._server_messages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const msgObj = JSON.parse(parsed[0]);
          return msgObj.message || "Reset failed.";
        }
      } catch {
        return "Reset failed.";
      }
    }

    return data.message || "Reset failed.";
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async () => {
    if (loading) return;

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await frappe.post(
        "/api/method/company_access_portal.api.user_api.reset_password_from_frontend",
        {
          token,
          new_password: password,
        }
      );

      setSuccess("Password set successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(extractFrappeError(err));
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Set Your Password</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {!success && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Setting..." : "Set Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}