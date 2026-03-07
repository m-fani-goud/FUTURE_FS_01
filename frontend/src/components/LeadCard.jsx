import API from "../api";

function LeadCard({ lead, refresh }) {

  const updateStatus = async (status) => {

    try {

      await API.put(`/leads/${lead._id}`, { status });

      refresh();

    } catch (error) {

      console.error("Status update failed:", error);

      alert("Failed to update status");

    }

  };

  const deleteLead = async () => {

    const confirmDelete = window.confirm("Delete this lead?");

    if (!confirmDelete) return;

    try {

      await API.delete(`/leads/${lead._id}`);

      refresh();

    } catch (error) {

      console.error("Delete failed:", error);

      alert("Failed to delete lead");

    }

  };

  const today = new Date().toISOString().split("T")[0];

  return (

    <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition">

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800">
        {lead.name}
      </h3>

      {/* Email */}
      <p className="text-gray-600">
        {lead.email}
      </p>

      {/* Source */}
      <p className="text-sm text-gray-500">
        Source: {lead.source}
      </p>

      {/* Status */}
      <p className="mt-2">

        Status:

        <span
          className={`ml-2 px-2 py-1 rounded text-white text-xs font-semibold
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

      {/* Buttons */}
      <div className="flex gap-2 mt-4">

        <button
          onClick={() => updateStatus("Contacted")}
          className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm font-medium"
        >
          Contacted
        </button>

        <button
          onClick={() => updateStatus("Converted")}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
        >
          Converted
        </button>

        <button
          onClick={deleteLead}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default LeadCard;