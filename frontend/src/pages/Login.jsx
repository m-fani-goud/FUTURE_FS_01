import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      if(!token){
        throw new Error("Token not received");
      }

      localStorage.setItem("token",token);
      setToken(token);

      // redirect to dashboard
      navigate("/");

    } catch(err) {

      const message =
        err.response?.data?.message ||
        "Login failed. Check credentials or API connection.";

      setError(message);

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">

      <div className="bg-white shadow-xl rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          CRM Admin Login
        </h2>

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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="border p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            disabled={loading}
            className={`text-white p-3 w-full rounded font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
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