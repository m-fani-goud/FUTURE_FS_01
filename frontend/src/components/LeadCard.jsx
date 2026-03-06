import axios from "axios";

function LeadCard({ lead, refresh }) {

  const updateStatus = async (status) => {

    await axios.put(
      `http://localhost:5000/api/leads/${lead._id}`,
      { status }
    );

    refresh();
  };

  const deleteLead = async () => {

    const confirmDelete = window.confirm("Delete this lead?");

    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:5000/api/leads/${lead._id}`
    );

    refresh();
  };

  const today = new Date().toISOString().split("T")[0];

  return (

    <div className="border p-4 rounded mb-3 bg-white shadow">

      <h3 className="text-lg font-semibold">
        {lead.name}
      </h3>

      <p className="text-gray-600">{lead.email}</p>

      <p className="text-sm text-gray-500">
        Source: {lead.source}
      </p>

      {/* Status */}
      <p className="mt-2">

        Status:

        <span
          className={`ml-2 px-2 py-1 rounded text-white text-sm
          ${
            lead.status === "New"
              ? "bg-gray-500"
              : lead.status === "Contacted"
              ? "bg-yellow-500"
              : "bg-green-600"
          }`}
        >
          {lead.status}
        </span>

      </p>

      {/* Notes */}
      {lead.notes && (
        <p className="text-sm mt-1 text-gray-600">
          Notes: {lead.notes}
        </p>
      )}

      {/* Follow-up Reminder */}
      {lead.followUpDate && (
        <p className="text-sm mt-1">

          Follow-up: {lead.followUpDate}

          {lead.followUpDate === today && (
            <span className="text-red-500 font-semibold ml-2">
              🔔 Today
            </span>
          )}

        </p>
      )}

      {/* Actions */}
      <div className="space-x-2 mt-3">

        <button
          onClick={() => updateStatus("Contacted")}
          className="bg-yellow-400 px-3 py-1 rounded"
        >
          Contacted
        </button>

        <button
          onClick={() => updateStatus("Converted")}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Converted
        </button>

        <button
          onClick={deleteLead}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default LeadCard;