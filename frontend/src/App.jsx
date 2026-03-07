import { useEffect, useState } from "react";
import API from "./api";

import {
  FiSearch,
  FiX,
  FiList,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiLogOut
} from "react-icons/fi";

import AddLead from "./components/AddLead";
import LeadList from "./components/LeadList";
import Dashboard from "./components/Dashboard";
import LeadChart from "./components/LeadChart";
import Login from "./pages/Login";

import "./index.css";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch Leads
  const fetchLeads = async () => {

    try {

      const res = await API.get("/leads");

      setLeads(res.data);

    } catch (error) {

      console.error("Failed to fetch leads:", error);

    }

  };

  useEffect(() => {

    if (token) {

      fetchLeads();

    }

  }, [token]);

  // Search + Filter
  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

  };

  // Login page
  if (!token) {

    return <Login setToken={setToken} />;

  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow">

        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            CRM Admin Dashboard
          </h1>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* Dashboard + Chart */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="md:col-span-2">
            <Dashboard leads={leads} />
          </div>

          <div>
            <LeadChart leads={leads} />
          </div>

        </div>

        {/* Search */}

        <div className="relative mb-4">

          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border p-2 pl-10 pr-10 w-full rounded-lg shadow-sm"
          />

          {search && (

            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-2 text-gray-500"
            >
              <FiX />
            </button>

          )}

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3 mb-4">

          <button
            onClick={() => setStatusFilter("All")}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              statusFilter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FiList />
            All
          </button>

          <button
            onClick={() => setStatusFilter("New")}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              statusFilter === "New"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FiUser />
            New
          </button>

          <button
            onClick={() =>
              setStatusFilter("Contacted")
            }
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              statusFilter === "Contacted"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FiPhone />
            Contacted
          </button>

          <button
            onClick={() =>
              setStatusFilter("Converted")
            }
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              statusFilter === "Converted"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            <FiCheckCircle />
            Converted
          </button>

        </div>

        {/* Add Lead */}

        <AddLead refresh={fetchLeads} />

        {/* Lead List */}

        <LeadList
          leads={filteredLeads}
          refresh={fetchLeads}
        />

      </div>

    </div>

  );

}

export default App;