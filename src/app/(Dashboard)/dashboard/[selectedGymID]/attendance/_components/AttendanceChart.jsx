// "use client";

// import React from "react";
// import { Card } from "@/components/ui/card";
// import { Typography } from "@mui/material";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { PieChart } from "@mui/x-charts/PieChart";

// export default function AttendanceCharts({ trendData = [], presentCount = 0, absentCount = 0 }) {
//   const total = presentCount + absentCount;

//   const pieData = [
//     { id: 0, value: presentCount, label: "Present" },
//     { id: 1, value: absentCount, label: "Absent" },
//   ];

//   const colors = ["#4caf50", "#f44336"];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Attendance Trend Line Chart */}
//       <Card className="p-5">
//         <Typography variant="h6" gutterBottom>
//           📈 Attendance Trend (Last 30 Days)
//         </Typography>
//         {trendData.length === 0 ? (
//           <p className="text-gray-500 text-sm text-center py-8">No data available</p>
//         ) : (
//           <LineChart
//             xAxis={[
//               {
//                 data: trendData.map((d) => d.date),
//                 label: "Date",
//                 scaleType: "band",
//               },
//             ]}
//             series={[
//               {
//                 data: trendData.map((d) => d.count),
//                 label: "Members Present",
//                 color: "#1976d2",
//                 area: true,
//               },
//             ]}
//             height={300}
//             grid={{ vertical: true, horizontal: true }}
//           />
//         )}
//       </Card>

//       {/* Attendance Ratio Pie Chart */}
//       <Card className="p-5">
//         <Typography variant="h6" gutterBottom>
//           🥧 Attendance Status (Today)
//         </Typography>

//         {total === 0 ? (
//           <p className="text-gray-500 text-sm text-center py-8">No members to display</p>
//         ) : (
//           <PieChart
//             series={[
//               {
//                 data: pieData,
//                 innerRadius: 40,
//                 outerRadius: 100,
//                 paddingAngle: 4,
//                 cornerRadius: 5,
//                 startAngle: -90,
//                 endAngle: 270,
//                 valueFormatter: (v) => `${((v.value / total) * 100).toFixed(1)}%`,
//               },
//             ]}
//             colors={colors}
//             height={300}
//             slotProps={{
//               legend: {
//                 direction: "row",
//                 position: { vertical: "bottom", horizontal: "middle" },
//                 padding: 10,
//               },
//             }}
//           />
//         )}
//       </Card>
//     </div>
//   );
// }



"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function AttendanceCharts({
  trendData = [],
  presentCount = 0,
  absentCount = 0,
}) {
  const total = presentCount + absentCount;

  const pieData = [
    { id: 0, value: presentCount, label: "Present" },
    { id: 1, value: absentCount, label: "Absent" },
  ];

  const colors = ["#4caf50", "#f44336"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart for Attendance Trend */}
      <Card className="p-5">
        <Typography variant="h6" gutterBottom>
          📈 Attendance Trend (Last 30 Days)
        </Typography>

        {trendData.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No trend data available
          </p>
        ) : (
          <LineChart
            xAxis={[
              {
                data: trendData.map((d) => d.date),
                label: "Date",
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: trendData.map((d) => d.count),
                label: "Present Count",
                color: "#1976d2",
                area: true,
              },
            ]}
            height={300}
            grid={{ vertical: true, horizontal: true }}
          />
        )}
      </Card>

      {/* Pie Chart for Attendance Ratio */}
      <Card className="p-5">
        <Typography variant="h6" gutterBottom>
          🥧 Attendance Summary (Today)
        </Typography>

        {total === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No attendance data available
          </p>
        ) : (
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 4,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 270,
                valueFormatter: (v) =>
                  `${((v.value / total) * 100).toFixed(1)}%`,
              },
            ]}
            colors={colors}
            height={300}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                padding: 10,
              },
            }}
          />
        )}
      </Card>
    </div>
  );
}
