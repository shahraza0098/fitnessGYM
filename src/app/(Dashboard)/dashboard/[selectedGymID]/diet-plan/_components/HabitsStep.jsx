// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// const eatingHabits = [
//   "Vegetarian",
//   "Non-Vegetarian",
//   "Vegan",
//   "Eggetarian",
//   "Keto / Low-Carb",
// ];

// const workHabits = [
//   "Desk Job (Sedentary)",
//   "Standing / Field Job",
//   "Physically Active",
//   "Mixed / Hybrid",
// ];

// export default function HabitsStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [eating, setEating] = useState(formData.eatingHabits || "");
//   const [work, setWork] = useState(formData.workHabit || "");

//   const handleNext = () => {
//     updateFormData("eatingHabits", eating);
//     updateFormData("workHabit", work);
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Lifestyle & Habits</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Describe the member’s work style and eating preferences.
//       </p>

//       <div className="mb-6">
//         <label className="font-medium text-gray-700 text-sm">Work Habit</label>
//         <div className="grid grid-cols-2 gap-3 mt-2">
//           {workHabits.map((option) => (
//             <button
//               key={option}
//               onClick={() => setWork(option)}
//               className={`border rounded-md px-4 py-2 text-sm transition ${
//                 work === option
//                   ? "bg-orange-100 border-orange-600 text-orange-700"
//                   : "bg-white border-gray-300"
//               }`}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <label className="font-medium text-gray-700 text-sm">Eating Habits</label>
//         <div className="grid grid-cols-2 gap-3 mt-2">
//           {eatingHabits.map((option) => (
//             <button
//               key={option}
//               onClick={() => setEating(option)}
//               className={`border rounded-md px-4 py-2 text-sm transition ${
//                 eating === option
//                   ? "bg-orange-100 border-orange-600 text-orange-700"
//                   : "bg-white border-gray-300"
//               }`}
//             >
//               {option}
//             </button>
//           ))}
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
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

// ✅ Options
const eatingHabits = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Eggetarian",
  "Keto / Low-Carb",
];

const workHabits = [
  "Desk Job (Sedentary)",
  "Standing / Field Job",
  "Physically Active",
  "Mixed / Hybrid",
];

// ✅ Zod schema
const habitsSchema = z.object({
  workHabit: z.string().min(1, "Please select a work habit."),
  eatingHabit: z.string().min(1, "Please select an eating habit."),
});

export default function HabitsStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(habitsSchema),
    defaultValues: {
      workHabit: formData.workHabit || "",
      eatingHabit: formData.eatingHabits || "",
    },
  });

  const onSubmit = (values) => {
    updateFormData("workHabit", values.workHabit);
    updateFormData("eatingHabits", values.eatingHabit);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Lifestyle & Habits</CardTitle>
        <CardDescription>
          Describe the member’s work style and eating preferences.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Work Habit */}
            <FormField
              control={form.control}
              name="workHabit"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">Work Habit</label>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {workHabits.map((option) => {
                        const isSelected = field.value === option;
                        return (
                          <Button
                            key={option}
                            type="button"
                            variant={isSelected ? "secondary" : "outline"}
                            onClick={() => field.onChange(option)}
                            className={`justify-center ${
                              isSelected
                                ? "bg-orange-100 text-orange-700 border-orange-500"
                                : ""
                            }`}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Eating Habit */}
            <FormField
              control={form.control}
              name="eatingHabit"
              render={({ field }) => (
                <FormItem>
                  <label className="font-medium text-gray-700 text-sm">Eating Habits</label>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {eatingHabits.map((option) => {
                        const isSelected = field.value === option;
                        return (
                          <Button
                            key={option}
                            type="button"
                            variant={isSelected ? "secondary" : "outline"}
                            onClick={() => field.onChange(option)}
                            className={`justify-center ${
                              isSelected
                                ? "bg-orange-100 text-orange-700 border-orange-500"
                                : ""
                            }`}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show Selected */}
            <div className="flex flex-wrap gap-2 mt-3">
              {form.watch("workHabit") && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {form.watch("workHabit")}
                </Badge>
              )}
              {form.watch("eatingHabit") && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {form.watch("eatingHabit")}
                </Badge>
              )}
            </div>

            <CardFooter className="flex justify-end p-0 pt-4">
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Next Step
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
