function Dashboard({ leads }) {

  const total = leads.length;

  const newLeads = leads.filter(l => l.status === "New").length;
  const contacted = leads.filter(l => l.status === "Contacted").length;
  const converted = leads.filter(l => l.status === "Converted").length;

  return (

    <div className="grid grid-cols-4 gap-4 mb-6">

      <div className="bg-white p-4 shadow rounded text-center">
        <p>Total Leads</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </div>

      <div className="bg-yellow-100 p-4 shadow rounded text-center">
        <p>New</p>
        <h2 className="text-xl">{newLeads}</h2>
      </div>

      <div className="bg-blue-100 p-4 shadow rounded text-center">
        <p>Contacted</p>
        <h2 className="text-xl">{contacted}</h2>
      </div>

      <div className="bg-green-100 p-4 shadow rounded text-center">
        <p>Converted</p>
        <h2 className="text-xl">{converted}</h2>
      </div>

    </div>

  );
}

export default Dashboard;