import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Track login errors
  const [loading, setLoading] = useState(false); // UI feedback

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Note: Ensure the /login path matches your actual backend route
      const res = await axios.post(
        "https://future-fs-01-tg5r.onrender.com/login", 
        { email, password }
      );

      const token = res.data.token;
      
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">CRM Admin Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 text-sm rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={login}>
          <input
            type="email"
            required
            placeholder="Admin Email"
            className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="border p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className={`text-white p-3 w-full rounded transition ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">Admin Access Only</p>
      </div>
    </div>
  );
}

export default Login;