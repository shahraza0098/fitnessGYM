// import React from 'react'
// import GymSelector from './_components/GymSelector'
// function SelectGym() {
//   return (
//      <div>
//       <header className="p-4 border-b flex justify-between items-center">
//         <div>Logo</div>
//         <GymSelector />
//       </header>
//     </div>
//   )
// }

// export default SelectGym


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelectedGym } from "@/context/SelectedGymContext";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SelectGymPage() {
  const { isSignedIn } = useAuth();
  const { setSelectedGym } = useSelectedGym();
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) return;
    (async () => {
      try {
        const res = await fetch("/api/owner/listgyms");
        if (!res.ok) throw new Error("Failed to load gyms");
        const data = await res.json();
        setGyms(data.gyms || []);
      } catch (err) {
        console.error("Error loading gyms:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isSignedIn]);

  const handleSelectGym = (gymId) => {
    setSelectedGym(gymId);
    localStorage.setItem("selectedGym", gymId);
    router.push(`/dashboard/${gymId}`); // Redirect to dashboard after selection
  };

  if (!isSignedIn)
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Please sign in to continue.
      </div>
    );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );

  if (gyms.length === 0)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <p className="text-lg mb-4">You don’t have any gyms yet.</p>
        <button
          onClick={() => router.push("/add-gym")}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Add Gym
        </button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Select a Gym to Continue
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gyms.map((gym) => (
          <button
            key={gym.id}
            onClick={() => handleSelectGym(gym.id)}
            className="w-32 h-32 flex flex-col items-center justify-center rounded-full shadow-md bg-white border hover:bg-blue-100 transition transform hover:scale-105"
          >
            <div className="text-lg font-medium text-gray-800 text-center px-2">
              {gym.name.length > 15 ? gym.name.slice(0, 15) + "…" : gym.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

