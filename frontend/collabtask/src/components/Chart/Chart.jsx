import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ completed, inProgress, pending }) => {
  const total = completed + inProgress + pending;

  const hasData = total > 0;

  const data = {
    labels: hasData ? ["Completed", "In Progress", "Pending"] : ["No Data"],
    datasets: [
      {
        data: hasData ? [completed, inProgress, pending] : [1],
        backgroundColor: hasData
          ? ["#4ade80", "#60a5fa", "#facc15"]
          : ["#d1d5db"], // Tailwind gray-300
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xs bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h2 className="text-lg font-semibold text-center mb-2">Task Status</h2>
      <Doughnut data={data} />

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p className="text-center font-medium">Total Tasks: {total}</p>
        <div className="flex justify-between px-2">
          <span className="text-green-600">Completed: {completed}</span>
          <span className="text-blue-600">In Progress: {inProgress}</span>
          <span className="text-yellow-600">Pending: {pending}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
