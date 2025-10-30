
"use client";

import React, { useEffect, useState, use } from "react";
import { Users, PlusCircle } from "lucide-react";
import StaffSelector from "./_components/StaffSelector";
import StaffList from "./_components/StaffList";
import AddStaffDialog from "./_components/AddStaffDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function StaffManagementPage({ params }) {
  const { selectedGymID } = use(params);

  const [staffType, setStaffType] = useState("MANAGER");
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStaff = async (type) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/dashboard/${selectedGymID}/add-staff?gymId=${selectedGymID}&type=${type}`
      );
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      setStaff(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedGymID) fetchStaff(staffType);
  }, [selectedGymID, staffType]);

  const handleAdd = (newStaff) => setStaff((prev) => [...prev, newStaff]);

  return (
    <div className="p-6 space-y-6">
      {/* ---- Header Section ---- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Title */}
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold tracking-tight">
            Staff Management
          </h1>
        </div>

        {/* Right Side: Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Staff Type Selector */}
          <StaffSelector onSelect={setStaffType} currentType={staffType} />

          {/* Add Staff Button */}
          <AddStaffDialog
            gymId={selectedGymID}
            type={staffType}
            onAdd={handleAdd}
            trigger={
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4" />
                Add {staffType.charAt(0) + staffType.slice(1).toLowerCase()}
              </Button>
            }
          />
        </div>
      </div>

      <Separator />

      {/* ---- Staff Table Section ---- */}
      <div
        className={cn(
          "rounded-lg border bg-card shadow-sm p-4 transition-all duration-200"
        )}
      >
        {loading ? (
          <p className="text-center text-muted-foreground py-6">
            Loading {staffType.toLowerCase()}s…
          </p>
        ) : (
          <StaffList staff={staff} />
        )}
      </div>
    </div>
  );
}
