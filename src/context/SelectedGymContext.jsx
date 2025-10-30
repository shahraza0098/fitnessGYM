// src/context/SelectedGymContext.jsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const SelectedGymContext = createContext();

export function SelectedGymProvider({ children }) {
  const { isSignedIn } = useAuth();
  const [selectedGym, setSelectedGym] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage first, then confirm with server
  useEffect(() => {
    if (!isSignedIn) {
      setSelectedGym(null);
      setLoading(false);
      return;
    }

    const local = localStorage.getItem("selectedGymId");
    if (local) {
      setSelectedGym(local);
    }

    // Fetch server value and override local if present
    (async () => {
      try {
        const res = await fetch("/api/owner/selected-gym");
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data?.selectedGymId) {
          setSelectedGym(data.selectedGymId);
          localStorage.setItem("selectedGymId", data.selectedGymId);
        }
      } catch (e) {
        console.error("Failed to fetch selected gym:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [isSignedIn]);

  // Setter wrapper: update local + server
  const selectGym = async (gymId) => {
    setSelectedGym(gymId);
    localStorage.setItem("selectedGymId", gymId);

    try {
      const res = await fetch("/api/owner/selected-gym", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gymId }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        console.error("Failed to save selected gym on server:", json);
      }
    } catch (err) {
      console.error("Error syncing selected gym to server:", err);
    }
  };

  return (
    <SelectedGymContext.Provider value={{ selectedGym, setSelectedGym: selectGym, loading }}>
      {children}
    </SelectedGymContext.Provider>
  );
}

export function useSelectedGym() {
  return useContext(SelectedGymContext);
}
