import { useState } from "react";
import API from "./api"; // Import the instance we created above

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // If your backend route is just /login, this becomes:
      // https://future-fs-01-tg5r.onrender.com/api/login
      const res = await API.post("/login", { email, password });

      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      // Provides feedback if the 404 persists or credentials fail
      const message = err.response?.data?.message || "Connection Error. Check API URL.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">CRM Admin Login</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 text-sm rounded text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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
            className={`text-white p-3 w-full rounded font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md"
            }`}
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;