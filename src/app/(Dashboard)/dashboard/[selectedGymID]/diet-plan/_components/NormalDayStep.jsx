// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// export default function NormalDayStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();

//   const [day, setDay] = useState({
//     wakeTime: formData.wakeTime || "",
//     sleepTime: formData.sleepTime || "",
//     workHours: formData.workHours || "",
//     commute: formData.commute || "",
//     stressLevel: formData.stressLevel || "Moderate",
//   });

//   const handleChange = (field, value) => {
//     setDay((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleNext = () => {
//     Object.entries(day).forEach(([key, value]) => updateFormData(key, value));
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Normal Day Routine</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Tell us about the member’s typical day — this helps tailor meal timing and energy balance.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm font-medium">Wake-up Time</label>
//           <input
//             type="time"
//             value={day.wakeTime}
//             onChange={(e) => handleChange("wakeTime", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Sleep Time</label>
//           <input
//             type="time"
//             value={day.sleepTime}
//             onChange={(e) => handleChange("sleepTime", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Work Hours per Day</label>
//           <input
//             type="number"
//             min="1"
//             max="16"
//             value={day.workHours}
//             onChange={(e) => handleChange("workHours", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Commute Time (minutes)</label>
//           <input
//             type="number"
//             min="0"
//             max="180"
//             value={day.commute}
//             onChange={(e) => handleChange("commute", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Stress Level</label>
//           <div className="flex gap-2 mt-2">
//             {["Low", "Moderate", "High"].map((lvl) => (
//               <button
//                 key={lvl}
//                 onClick={() => handleChange("stressLevel", lvl)}
//                 className={`border rounded-md px-3 py-2 text-sm transition ${
//                   day.stressLevel === lvl
//                     ? "bg-orange-100 border-orange-600 text-orange-700"
//                     : "bg-white border-gray-300"
//                 }`}
//               >
//                 {lvl}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end mt-6">
//         <button
//           onClick={handleNext}
//           className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
//         >
//           Next Step
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useDietPlan } from "../context/DietPlanContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

// ✅ Validation schema
const normalDaySchema = z.object({
  wakeTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Enter a valid wake-up time."),
  sleepTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Enter a valid sleep time."),
  workHours: z
    .string()
    .refine((val) => Number(val) >= 1 && Number(val) <= 16, {
      message: "Work hours must be between 1 and 16.",
    }),
  commute: z
    .string()
    .refine((val) => Number(val) >= 0 && Number(val) <= 180, {
      message: "Commute time must be between 0 and 180 minutes.",
    }),
  stressLevel: z.enum(["Low", "Moderate", "High"]),
});

export default function NormalDayStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(normalDaySchema),
    defaultValues: {
      wakeTime: formData.wakeTime || "",
      sleepTime: formData.sleepTime || "",
      workHours: formData.workHours?.toString() || "",
      commute: formData.commute?.toString() || "",
      stressLevel: formData.stressLevel || "Moderate",
    },
  });

  const onSubmit = (values) => {
    Object.entries(values).forEach(([key, value]) => updateFormData(key, value));
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Normal Day Routine</CardTitle>
        <CardDescription>
          Tell us about the member’s typical day to help tailor meal timing and energy balance.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wake-up Time */}
            <FormField
              control={form.control}
              name="wakeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wake-up Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sleep Time */}
            <FormField
              control={form.control}
              name="sleepTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Work Hours */}
            <FormField
              control={form.control}
              name="workHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Hours per Day</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="16" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Commute Time */}
            <FormField
              control={form.control}
              name="commute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commute Time (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="180" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stress Level */}
            <FormField
              control={form.control}
              name="stressLevel"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Stress Level</FormLabel>
                  <div className="flex gap-3 mt-2">
                    {["Low", "Moderate", "High"].map((lvl) => (
                      <Button
                        key={lvl}
                        type="button"
                        variant={field.value === lvl ? "secondary" : "outline"}
                        onClick={() => field.onChange(lvl)}
                      >
                        {lvl}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="col-span-full flex justify-end pt-4">
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                Next Step
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
