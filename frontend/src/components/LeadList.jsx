import LeadCard from "./LeadCard";

function LeadList({ leads, refresh }) {

  return (

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-semibold mb-4">
        Lead List
      </h2>

      {leads.length === 0 ? (

        <p className="text-gray-500">
          No leads found
        </p>

      ) : (

        leads.map((lead) => (

          <LeadCard
            key={lead._id}
            lead={lead}
            refresh={refresh}
          />

        ))

      )}

    </div>

  );
}

export default LeadList;