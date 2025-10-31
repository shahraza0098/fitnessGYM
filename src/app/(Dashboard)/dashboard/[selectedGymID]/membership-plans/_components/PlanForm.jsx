"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlanForm({ form, setForm, onSubmit }) {
  return (
    <Card className="p-4 flex flex-wrap gap-4 items-center">
      <Input
        placeholder="Plan Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Duration (months)"
        value={form.durationMonths}
        onChange={(e) => setForm({ ...form, durationMonths: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <Input
        placeholder="Benefits (comma separated)"
        value={form.benefits}
        onChange={(e) => setForm({ ...form, benefits: e.target.value })}
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.autoRenew}
          onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })}
        />
        Auto Renew
      </label>
      <Button onClick={onSubmit}>Create Plan</Button>
    </Card>
  );
}
