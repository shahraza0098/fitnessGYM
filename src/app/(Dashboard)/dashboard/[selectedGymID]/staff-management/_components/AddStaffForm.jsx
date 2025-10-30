"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AddStaffForm({ gymId, type, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/dashboard/${gymId}/add-staff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gymId, type, ...form }),
    });

    if (res.ok) {
      const data = await res.json();
      onAdd(data);
      toast.success(`${type} added successfully!`);
      setForm({ name: "", email: "", phone: "" });
    } else {
      toast.error("Failed to add staff");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-xl border w-full max-w-md">
      <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <Button disabled={loading}>{loading ? "Adding..." : `Add ${type}`}</Button>
    </form>
  );
}

