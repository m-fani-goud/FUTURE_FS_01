import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function LeadChart({ leads }) {

const newLeads =
leads.filter(l => l.status === "New").length;

const contacted =
leads.filter(l => l.status === "Contacted").length;

const converted =
leads.filter(l => l.status === "Converted").length;

const data = {

labels: ["New","Contacted","Converted"],

datasets: [
{
label: "Lead Status",
data: [newLeads, contacted, converted],

backgroundColor: [
"#60a5fa",
"#facc15",
"#4ade80"
]
}
]

};

return (

<div className="bg-white p-6 rounded shadow mb-6 max-w-sm mx-auto">

<h2 className="text-xl font-semibold mb-4 text-center">
Lead Analytics
</h2>

<div className="h-64">
<Pie data={data}/>
</div>

</div>

);

}

export default LeadChart;