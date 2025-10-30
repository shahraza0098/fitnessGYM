"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";



export default function AddMemberDialog({ gymId, onMemberAdded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "UNSPECIFIED",
    address: "",
    emergencyContact: "",
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/${gymId}/add-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, gymId }),
      });

      if (!res.ok) throw new Error(await res.text());
      toast.success("Member added successfully!");
      setOpen(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "UNSPECIFIED",
        address: "",
        emergencyContact: "",
      });
      onMemberAdded?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add member");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Member</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Name</Label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
          </div>
          <div>
            <Label>Gender</Label>
            <select
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
              className="border rounded-md w-full p-2"
            >
              <option value="UNSPECIFIED">Unspecified</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <Label>Address</Label>
            <Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div>
            <Label>Emergency Contact</Label>
            <Input value={form.emergencyContact} onChange={e => setForm({ ...form, emergencyContact: e.target.value })} />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
