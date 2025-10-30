
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddStaffForm from "./AddStaffForm"; // your form component

export default function AddStaffDialog({ gymId, type, onAdd }) {
  const [open, setOpen] = useState(false);

  const handleAdd = (data) => {
    onAdd(data);
    setOpen(false); // close dialog after success
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add {type}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
        </DialogHeader>
        <AddStaffForm gymId={gymId} type={type} onAdd={handleAdd} />
      </DialogContent>
    </Dialog>
  );
}
