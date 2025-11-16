// import React from 'react'

// function Upcomingclasses() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Upcomingclasses


"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarClock, Edit2, Trash2 } from "lucide-react";

export default function UpcomingClasses() {
  const { selectedGymID } = useParams();
  const router = useRouter();

  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await fetch(`/api/dashboard/${selectedGymID}/classes/get-classes`);
        const data = await res.json();

        if (!data.success) {
          setErrorMsg("Failed to fetch classes.");
          return;
        }

        setClassesList(data.classes);
      } catch (err) {
        setErrorMsg("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, [selectedGymID]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/${selectedGymID}/classes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error);
        return;
      }

      // Remove deleted class from UI
      setClassesList((prev) => prev.filter((cls) => cls.id !== id));
    } catch (err) {
      setErrorMsg("Failed to delete class.");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarClock className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Upcoming Classes</h1>
          <p className="text-gray-600">Review and manage all scheduled sessions.</p>
        </div>
      </div>

      {/* Errors */}
      {errorMsg && (
        <div className="p-3 mb-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {errorMsg}
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-gray-600">Loading classes...</p>}

      {/* No Classes */}
      {!loading && classesList.length === 0 && (
        <p className="text-gray-600 mt-4">No upcoming classes found.</p>
      )}

      {/* Table */}
      {!loading && classesList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto rounded-lg border"
        >
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-100 border-b">
              <tr className="text-left text-gray-700">
                <th className="p-4">Class Name</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Start</th>
                <th className="p-4">End</th>
                <th className="p-4">Capacity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classesList.map((cls, index) => (
                <motion.tr
                  key={cls.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{cls.name}</td>
                  <td className="p-4">{cls.trainerName || "—"}</td>
                  <td className="p-4">{formatDate(cls.start)}</td>
                  <td className="p-4">{formatDate(cls.end)}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        cls.capacity >= 30
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cls.capacity}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex gap-3 justify-end">
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/${selectedGymID}/classes/${cls.id}/edit`
                        )
                      }
                      className="p-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

