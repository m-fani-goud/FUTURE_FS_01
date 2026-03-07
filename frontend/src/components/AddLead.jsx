import { useState } from "react";
import API from "../api";

function AddLead({ refresh }) {

  const [lead, setLead] = useState({
    name: "",
    email: "",
    source: "",
    notes: "",
    followUpDate: ""
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const submitLead = async (e) => {

    e.preventDefault();

    try {

      await API.post("/leads", lead);

      // Reset form
      setLead({
        name: "",
        email: "",
        source: "",
        notes: "",
        followUpDate: ""
      });

      refresh();

    } catch (error) {

      console.error("Failed to add lead:", error);

    }

  };

  return (

    <div className="bg-white p-6 shadow-lg rounded-lg mb-6">

      <h2 className="text-xl font-semibold mb-4">
        Add Lead
      </h2>

      <form
        onSubmit={submitLead}
        className="grid grid-cols-2 gap-4"
      >

        <input
          name="name"
          placeholder="Name"
          value={lead.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <select
          name="source"
          value={lead.source}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Select Source</option>
          <option value="Website">Website</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Ads">Ads</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="followUpDate"
          value={lead.followUpDate}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes about the lead..."
          value={lead.notes}
          onChange={handleChange}
          className="border p-2 col-span-2 w-full rounded"
        />

        <button
          className="col-span-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Add Lead
        </button>

      </form>

    </div>

  );

}

export default AddLead;