// // import React from 'react'

// // function page() {
// //   return (
// //     <div>
// //       <h1>Attendence Page</h1>
// //     </div>
// //   )
// // }

// // export default page



// "use client";
// import { useEffect, useState, use } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, CheckCircle, Clock, Users, Activity } from "lucide-react";

// export default function AttendancePage({ params }) {
//   const { selectedGymID } = use(params);
//   const [summary, setSummary] = useState({});
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchData() {
//     setLoading(true);
//     const res = await fetch(`/api/dashboard/${selectedGymID}/attendance`);
//     const data = await res.json();
//     setSummary(data.summary);
//     setMembers(data.members);
//     setLoading(false);
//   }

//   async function handleAttendance(memberId, action) {
//     await fetch(`/api/dashboard/${selectedGymID}/attendance`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ memberId, action }),
//     });
//     fetchData();
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center p-6 text-gray-500">
//         <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading attendance...
//       </div>
//     );

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-xl font-semibold">Attendance Dashboard</h1>

//       {/* Metrics */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <MetricCard
//           icon={<Users className="w-5 h-5 text-blue-500" />}
//           label="Total Members"
//           value={summary.totalMembers}
//         />
//         <MetricCard
//           icon={<CheckCircle className="w-5 h-5 text-green-500" />}
//           label="Present Today"
//           value={summary.presentToday}
//         />
//         <MetricCard
//           icon={<Clock className="w-5 h-5 text-red-500" />}
//           label="Absent Today"
//           value={summary.absentToday}
//         />
//         <MetricCard
//           icon={<Activity className="w-5 h-5 text-yellow-500" />}
//           label="Overall Attendance Rate"
//           value={`${summary.overallAttendanceRate}%`}
//         />
//       </div>

//       {/* Member Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {members.map((m) => (
//           <Card key={m.id} className="p-4 flex flex-col justify-between">
//             <div>
//               <h3 className="font-semibold text-lg">{m.name}</h3>
//               <p className="text-sm text-gray-500">{m.email || "—"}</p>

//               <div className="mt-2 text-sm">
//                 <p>Present: <b>{m.totalPresent}</b></p>
//                 <p>Absent: <b>{m.totalAbsent}</b></p>
//                 <p>Streak: <b>{m.currentStreak} days</b></p>
//               </div>
//             </div>

//             <div className="mt-3 flex gap-2">
//               {!m.isPresentToday ? (
//                 <Button size="sm" onClick={() => handleAttendance(m.id, "CHECK_IN")}>
//                   Check In
//                 </Button>
//               ) : (
//                 <Button
//                   size="sm"
//                   variant="secondary"
//                   onClick={() => handleAttendance(m.id, "CHECK_OUT")}
//                 >
//                   Check Out
//                 </Button>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MetricCard({ icon, label, value }) {
//   return (
//     <Card className="p-4 flex items-center gap-3">
//       {icon}
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="text-lg font-semibold">{value}</p>
//       </div>
//     </Card>
//   );
// }



// "use client";

// import { useEffect, useState,use } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";

// export default function AttendancePage({ params }) {
//   const { selectedGymID } = use(params);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refresh, setRefresh] = useState(0);

//   async function fetchAttendance() {
//     setLoading(true);
//     const res = await fetch(`/api/dashboard/${selectedGymID}/attendance`);
//     const { members } = await res.json();
//     setMembers(members);
//     setLoading(false);
//   }

//   async function handleCheckIn(memberId) {
//     await fetch(`/api/dashboard/${selectedGymID}/attendance`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ memberId, method: "MANUAL" }),
//     });
//     setRefresh((p) => p + 1);
//   }

//   async function handleCheckOut(memberId) {
//     await fetch(`/api/dashboard/${selectedGymID}/attendance`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ memberId }),
//     });
//     setRefresh((p) => p + 1);
//   }

//   useEffect(() => {
//     fetchAttendance();
//   }, [selectedGymID, refresh]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center py-10 text-gray-500">
//         <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading attendance...
//       </div>
//     );

//   const totalMembers = members.length;
//   const presentToday = members.filter((m) => m.hasCheckedInToday).length;
//   const absentToday = totalMembers - presentToday;
//   const avgAttendance =
//     totalMembers > 0
//       ? ((presentToday / totalMembers) * 100).toFixed(1)
//       : 0;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Overview Metrics */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <Card className="p-4 text-center">
//           <h3 className="text-sm text-gray-500">Total Members</h3>
//           <p className="text-2xl font-semibold">{totalMembers}</p>
//         </Card>
//         <Card className="p-4 text-center">
//           <h3 className="text-sm text-gray-500">Present Today</h3>
//           <p className="text-2xl font-semibold text-green-600">
//             {presentToday}
//           </p>
//         </Card>
//         <Card className="p-4 text-center">
//           <h3 className="text-sm text-gray-500">Absent Today</h3>
//           <p className="text-2xl font-semibold text-red-500">{absentToday}</p>
//         </Card>
//         <Card className="p-4 text-center">
//           <h3 className="text-sm text-gray-500">Attendance Rate</h3>
//           <p className="text-2xl font-semibold text-blue-500">
//             {avgAttendance}%
//           </p>
//         </Card>
//       </div>

//       {/* Member Cards */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {members.map((m) => (
//           <Card
//             key={m.id}
//             className={`p-4 space-y-2 border ${
//               m.hasCheckedInToday ? "border-green-400" : ""
//             }`}
//           >
//             <h3 className="font-semibold text-lg">{m.name}</h3>
//             <p className="text-sm text-gray-600">
//               Present: {m.totalPresent} | Absent: {m.totalAbsent} | Streak:{" "}
//               {m.streak}
//             </p>
//             <div className="flex gap-2 mt-2">
//               <Button
//                 size="sm"
//                 disabled={m.hasCheckedInToday}
//                 onClick={() => handleCheckIn(m.id)}
//               >
//                 {m.hasCheckedInToday ? "Checked In" : "Check In"}
//               </Button>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 disabled={!m.hasCheckedInToday || m.checkOutDone}
//                 onClick={() => handleCheckOut(m.id)}
//               >
//                 {m.checkOutDone ? "Checked Out" : "Check Out"}
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState, use } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Users,
  UserCheck,
  UserX,
  Activity,
  LogIn,
  LogOut,
} from "lucide-react";
import AttendanceCharts from "./_components/AttendanceChart";
import { motion } from "framer-motion";

export default function AttendancePage({ params }) {
  const { selectedGymID } = use(params);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  async function fetchAttendance() {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/${selectedGymID}/attendance`);
      const { members } = await res.json();
      setMembers(members);
    } catch (error) {
      console.error("Failed to load attendance:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckIn(memberId) {
    await fetch(`/api/dashboard/${selectedGymID}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, method: "MANUAL" }),
    });
    setRefresh((p) => p + 1);
  }

  async function handleCheckOut(memberId) {
    await fetch(`/api/dashboard/${selectedGymID}/attendance`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId }),
    });
    setRefresh((p) => p + 1);
  }

  useEffect(() => {
    fetchAttendance();
  }, [selectedGymID, refresh]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-[#5e548e]">
        <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading attendance...
      </div>
    );

  const totalMembers = members.length;
  const presentToday = members.filter((m) => m.hasCheckedInToday).length;
  const absentToday = totalMembers - presentToday;
  const avgAttendance =
    totalMembers > 0 ? ((presentToday / totalMembers) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 space-y-8 bg-[#f8f6fa] min-h-screen">
      {/* Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users className="text-[#231942]" />}
          title="Total Members"
          value={totalMembers}
        />
        <MetricCard
          icon={<UserCheck className="text-green-600" />}
          title="Present Today"
          value={presentToday}
        />
        <MetricCard
          icon={<UserX className="text-red-500" />}
          title="Absent Today"
          value={absentToday}
        />
        <MetricCard
          icon={<Activity className="text-[#9f86c0]" />}
          title="Attendance Rate"
          value={`${avgAttendance}%`}
        />
      </div>

        {/* 📊 Charts Section */}
    <AttendanceCharts
      trendData={[
        { date: "Oct 1", count: 22 },
        { date: "Oct 2", count: 25 },
        { date: "Oct 3", count: 27 },
        { date: "Oct 4", count: 19 },
        { date: "Oct 5", count: 24 },
      ]}
      presentCount={presentToday}
      absentCount={absentToday}
    />


      {/* Member Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card
              className={`p-5 rounded-2xl shadow-md transition-all border-2 ${
                m.hasCheckedInToday
                  ? "border-green-400 bg-green-50"
                  : "border-[#e0b1cb] bg-white"
              } hover:shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-[#231942]">
                  {m.name}
                </h3>
                {m.hasCheckedInToday ? (
                  <UserCheck className="text-green-600 w-5 h-5" />
                ) : (
                  <UserX className="text-gray-400 w-5 h-5" />
                )}
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Present: {m.totalPresent} | Absent: {m.totalAbsent} | Streak:{" "}
                {m.streak}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  disabled={m.hasCheckedInToday}
                  onClick={() => handleCheckIn(m.id)}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  {m.hasCheckedInToday ? "Checked In" : "Check In"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-[#9f86c0] text-[#5e548e] hover:bg-[#f0e6ff]"
                  disabled={!m.hasCheckedInToday || m.checkOutDone}
                  onClick={() => handleCheckOut(m.id)}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {m.checkOutDone ? "Checked Out" : "Check Out"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Metric Card Component */
function MetricCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Card className="p-4 text-center rounded-2xl shadow-sm border border-[#e0b1cb] hover:shadow-md bg-white transition-all">
        <div className="flex justify-center mb-1">{icon}</div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-[#231942] mt-1">{value}</p>
      </Card>
    </motion.div>
  );
}
