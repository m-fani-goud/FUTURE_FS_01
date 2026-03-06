import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const login = async (e) => {

e.preventDefault();

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{ email,password }
);

localStorage.setItem("token",res.data.token);

setToken(res.data.token);

};

return (

<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500">

<div className="bg-white shadow-lg rounded-xl p-8 w-96">

<h2 className="text-2xl font-bold text-center mb-6">
CRM Admin Login
</h2>

<form onSubmit={login}>

<input
type="email"
placeholder="Admin Email"
className="border p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-3 mb-6 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-blue-500 hover:bg-blue-600 text-white p-3 w-full rounded transition"
>
Login
</button>

</form>

<p className="text-center text-sm text-gray-500 mt-4">
Admin Access Only
</p>

</div>

</div>

);

}

export default Login;