"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ClassSchema = z.object({
  name: z.string().min(3, "Class name is required"),
  trainerId: z.string().min(1, "Select a trainer"),
  start: z.string().min(1, "Start date/time required"),
  end: z.string().min(1, "End date/time required"),
  capacity: z.string().min(1, "Capacity required"),
  description: z.string().optional(),
});

export default function ScheduleClassPage() {
  const router = useRouter();
  const { selectedGymID } = useParams();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

 
  useEffect(() => {
    async function fetchTrainers() {
      try {
        const res = await fetch(`/api/dashboard/${selectedGymID}/get-staff?staffType=trainer`);
        const data = await res.json();
        // console.log("frontend data", data)
        setTrainers(data.data || []);
      } catch (err) {
        setErrorMsg("Failed to load trainers.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrainers();
  }, [selectedGymID]);

   console.log("trainer data inspection", trainers)

  const form = useForm({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      name: "",
      trainerId: "",
      start: "",
      end: "",
      capacity: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`/api/dashboard/${selectedGymID}/classes/create-classes`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.error);
        return;
      }

      setSuccessMsg("Class scheduled successfully!");

      setTimeout(() => {
        router.push(`/dashboard/${selectedGymID}/classes/upcoming`);
      }, 1000);
    } catch (err) {
      setErrorMsg("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Schedule a Class</h1>
        <p className="text-gray-600 mt-2">
          Create a new fitness session by setting instructors, timing, and capacity.
        </p>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-3 mb-4 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 mb-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
          {successMsg}
        </div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 bg-white p-6 rounded-xl shadow-sm border"
      >
        {/* Class Name */}
        <div>
          <Label>Class Name</Label>
          <Input {...form.register("name")} placeholder="e.g., Morning Yoga" />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Trainer Select */}
        <div>
          <Label>Trainer</Label>
          <select
            {...form.register("trainerId")}
            className="w-full border rounded-md p-2 bg-white"
          >
            <option value="">Select Trainer</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              trainers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))
            )}
          </select>
          {form.formState.errors.trainerId && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.trainerId.message}
            </p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <Label>Start Date & Time</Label>
          <Input type="datetime-local" {...form.register("start")} />
          {form.formState.errors.start && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.start.message}
            </p>
          )}
        </div>

        {/* End Time */}
        <div>
          <Label>End Date & Time</Label>
          <Input type="datetime-local" {...form.register("end")} />
          {form.formState.errors.end && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.end.message}
            </p>
          )}
        </div>

        {/* Capacity */}
        <div>
          <Label>Capacity</Label>
          <Input
            type="number"
            placeholder="e.g., 25"
            {...form.register("capacity")}
          />
          {form.formState.errors.capacity && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.capacity.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label>Description (Optional)</Label>
          <Textarea
            {...form.register("description")}
            placeholder="Describe class goals, intensity, focus, etc."
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium w-full"
        >
          Schedule Class
        </motion.button>
      </motion.form>
    </div>
  );
}
