// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// export default function InfoStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();

//   const [info, setInfo] = useState({
//     memberName: formData.memberName || "",
//     gender: formData.gender || "",
//     durationWeeks: formData.durationWeeks || 4,
//     notes: formData.notes || "",
//   });

//   const handleChange = (field, value) => {
//     setInfo((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleNext = () => {
//     updateFormData("memberName", info.memberName);
//     updateFormData("gender", info.gender);
//     updateFormData("durationWeeks", info.durationWeeks);
//     updateFormData("notes", info.notes);
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Member Information</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Fill in basic details about the member to help personalize the AI diet plan.
//       </p>

//       <div className="space-y-4">
//         <div>
//           <label className="text-sm font-medium">Member Name</label>
//           <input
//             type="text"
//             value={info.memberName}
//             onChange={(e) => handleChange("memberName", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//             placeholder="Enter member name"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Gender</label>
//           <div className="flex gap-3 mt-2">
//             {["Male", "Female", "Other"].map((g) => (
//               <button
//                 key={g}
//                 onClick={() => handleChange("gender", g)}
//                 className={`border rounded-md px-4 py-2 text-sm transition ${
//                   info.gender === g
//                     ? "bg-orange-100 border-orange-600 text-orange-700"
//                     : "bg-white border-gray-300"
//                 }`}
//               >
//                 {g}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Goal Duration (in weeks)</label>
//           <input
//             type="number"
//             min="1"
//             max="24"
//             value={info.durationWeeks}
//             onChange={(e) => handleChange("durationWeeks", e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Trainer Notes (optional)</label>
//           <textarea
//             value={info.notes}
//             onChange={(e) => handleChange("notes", e.target.value)}
//             rows={4}
//             placeholder="Add any custom notes or member preferences..."
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleNext}
//         className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
//       >
//         Next Step
//       </button>
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
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

// ✅ Validation schema
const infoSchema = z.object({
  memberName: z.string().min(2, "Member name must be at least 2 characters."),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Please select a gender." }),
  }),
  durationWeeks: z
    .number({ invalid_type_error: "Duration must be a number." })
    .min(1, "Duration must be at least 1 week.")
    .max(24, "Duration cannot exceed 24 weeks."),
  notes: z.string().optional(),
});

export default function InfoStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      memberName: formData.memberName || "",
      gender: formData.gender || "",
      durationWeeks: formData.durationWeeks || 4,
      notes: formData.notes || "",
    },
  });

  const onSubmit = (values) => {
    updateFormData("memberName", values.memberName);
    updateFormData("gender", values.gender);
    updateFormData("durationWeeks", values.durationWeeks);
    updateFormData("notes", values.notes);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Member Information</CardTitle>
        <CardDescription>
          Fill in basic details about the member to help personalize the AI diet plan.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Member Name */}
            <FormField
              control={form.control}
              name="memberName"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">Member Name</label>
                  <FormControl>
                    <Input placeholder="Enter member name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">Gender</label>
                  <FormControl>
                    <div className="flex gap-3 mt-2">
                      {["Male", "Female", "Other"].map((g) => {
                        const isSelected = field.value === g;
                        return (
                          <Button
                            key={g}
                            type="button"
                            variant={isSelected ? "secondary" : "outline"}
                            onClick={() => field.onChange(g)}
                            className={`${
                              isSelected
                                ? "bg-orange-100 border-orange-600 text-orange-700"
                                : ""
                            }`}
                          >
                            {g}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}
            <FormField
              control={form.control}
              name="durationWeeks"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">
                    Goal Duration (in weeks)
                  </label>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="24"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">
                    Trainer Notes (optional)
                  </label>
                  <FormControl>
                    <Textarea
                      placeholder="Add any custom notes or member preferences..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end p-0 pt-4">
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
