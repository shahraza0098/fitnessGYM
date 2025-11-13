
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function AddMemberDialog({ gymId, onMemberAdded }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "UNSPECIFIED",
    address: "",
    emergencyContact: "",
    membershipPlanId: "", 
  });

  // Fetch available plans for the gym
  useEffect(() => {
    if (!open) return; // Only fetch when dialog opens
    const fetchPlans = async () => {
      setPlansLoading(true);
      try {
        const res = await axios.get(`/api/dashboard/${gymId}/membership-plans`);
        setPlans(res.data || []);
      } catch (err) {
        console.error(" Error loading plans:", err);
        toast.error("Failed to load membership plans.");
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, [open, gymId]);

  async function handleSubmit() {
    if (!form.membershipPlanId) {
      toast.error("Please select a membership plan.");
      return;
    }

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
        membershipPlanId: "",
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
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* DOB */}
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="border rounded-md w-full p-2"
            >
              <option value="UNSPECIFIED">Unspecified</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <Label>Emergency Contact</Label>
            <Input
              value={form.emergencyContact}
              onChange={(e) =>
                setForm({ ...form, emergencyContact: e.target.value })
              }
            />
          </div>

          {/* Membership Plan Selection */}
          <div>
            <Label>Membership Plan</Label>
            <select
              value={form.membershipPlanId}
              onChange={(e) =>
                setForm({ ...form, membershipPlanId: e.target.value })
              }
              className="border rounded-md w-full p-2"
              disabled={plansLoading}
            >
              <option value="">
                {plansLoading
                  ? "Loading plans..."
                  : plans.length > 0
                  ? "Select a plan"
                  : "No plans available"}
              </option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} — ₹{Number(plan.price)} ({plan.durationMonths}{" "}
                  months)
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Adding..." : "Add Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
