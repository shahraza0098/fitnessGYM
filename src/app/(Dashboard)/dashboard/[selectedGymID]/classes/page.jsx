"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, CalendarPlus } from "lucide-react";

export default function Classes() {
  const router = useRouter();
  const { selectedGymID } = useParams();

  const goToSchedule = () =>
    router.push(`/dashboard/${selectedGymID}/classes/schedule-class`);

  const goToUpcoming = () =>
    router.push(`/dashboard/${selectedGymID}/classes/upcoming-classes`);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Class Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your gym’s classes efficiently: schedule new sessions or review upcoming ones.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1 — Schedule Class */}
        <motion.button
          onClick={goToSchedule}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-left w-full border border-gray-200 p-6 rounded-2xl shadow-sm 
                     hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <CalendarPlus className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Schedule a Class
            </h1>
          </div>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Create new fitness sessions by setting instructors, times, and class limits.
          </p>
        </motion.button>

        {/* Card 2 — View Classes */}
        <motion.button
          onClick={goToUpcoming}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-left w-full border border-gray-200 p-6 rounded-2xl shadow-sm 
                     hover:shadow-lg transition bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <CalendarDays className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              View Upcoming Classes
            </h1>
          </div>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Review scheduled classes, track enrollments, and manage existing entries.
          </p>
        </motion.button>

      </div>
    </div>
  );
}
