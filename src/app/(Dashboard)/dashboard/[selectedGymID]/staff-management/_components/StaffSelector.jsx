"use client";
import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";

export default function StaffSelector({ onSelect }) {
  const [value, setValue] = useState("MANAGER");

  const handleChange = (val) => {
    setValue(val);
    onSelect(val);
  };

  return (
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MANAGER">Manager</SelectItem>
          <SelectItem value="TRAINER">Trainer</SelectItem>
        </SelectContent>
      </Select>
  );
}
