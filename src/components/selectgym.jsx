"use client";

import { useEffect, useState } from "react";
import { useSelectedGym } from "@/context/SelectedGymContext";
import { useAuth } from "@clerk/nextjs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"; // adjust imports
import { Button } from "@/components/ui/button";

export default function GymSelector() {
  const { selectedGym, setSelectedGym, loading } = useSelectedGym();
  const { isSignedIn } = useAuth();
  const [gyms, setGyms] = useState([]);
  const [loadingGyms, setLoadingGyms] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;
    (async () => {
      try {
        const res = await fetch("/api/owner/listgyms");
        if (!res.ok) return;
        const data = await res.json();
        setGyms(data.gyms || []);
      } catch (err) {
        console.error("Failed to load gyms:", err);
      } finally {
        setLoadingGyms(false);
      }
    })();
  }, [isSignedIn]);

  if (!isSignedIn) return null;
  if (loadingGyms) return <div className="px-4">Loading gyms…</div>;

  // selectedGym might be id; show name
  const current = gyms.find((g) => g.id === selectedGym) || (gyms[0] || null);

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-gray-600">Selected Gym:</div>
      <Select
        value={current?.id || ""}
        onValueChange={(val) => {
          setSelectedGym(val);
        }}
      >
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder={current ? current.name : "Choose a gym"} />
        </SelectTrigger>
        <SelectContent>
          {gyms.map((g) => (
            <SelectItem key={g.id} value={g.id}>
              {g.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
