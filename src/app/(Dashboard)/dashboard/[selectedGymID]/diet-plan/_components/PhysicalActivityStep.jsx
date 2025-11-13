// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// const activities = [
//   "Gym / Strength Training",
//   "Yoga",
//   "Running / Jogging",
//   "Cycling",
//   "Walking (1-2 hrs/day)",
//   "None / Sedentary",
// ];

// export default function PhysicalActivityStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [selected, setSelected] = useState(formData.activity || []);

//   const toggleActivity = (act) => {
//     setSelected((prev) =>
//       prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
//     );
//   };

//   const handleNext = () => {
//     updateFormData("activity", selected);
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Physical Activity</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Select the member’s usual physical activity pattern.
//       </p>

//       <div className="grid grid-cols-2 gap-3">
//         {activities.map((act) => (
//           <button
//             key={act}
//             onClick={() => toggleActivity(act)}
//             className={`border rounded-md px-4 py-2 text-sm transition ${
//               selected.includes(act)
//                 ? "bg-orange-100 border-orange-600 text-orange-700"
//                 : "bg-white border-gray-300"
//             }`}
//           >
//             {act}
//           </button>
//         ))}
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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

// 🏋️‍♀️ Available activities
const activities = [
  "Gym / Strength Training",
  "Yoga",
  "Running / Jogging",
  "Cycling",
  "Walking (1-2 hrs/day)",
  "None / Sedentary",
];

// ✅ Zod schema validation
const activitySchema = z.object({
  activity: z
    .array(z.string())
    .min(1, "Please select at least one activity.")
    .nonempty("Please select at least one activity."),
});

export default function PhysicalActivityStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activity: formData.activity || [],
    },
  });

  const onSubmit = (values) => {
    updateFormData("activity", values.activity);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Physical Activity</CardTitle>
        <CardDescription>
          Select the member’s usual physical activity pattern.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Activities</FormLabel>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {activities.map((act) => {
                      const isSelected = field.value.includes(act);
                      return (
                        <Button
                          key={act}
                          type="button"
                          variant={isSelected ? "secondary" : "outline"}
                          className={`justify-start text-left text-sm ${
                            isSelected ? "border-orange-600 text-orange-700" : ""
                          }`}
                          onClick={() =>
                            field.onChange(
                              isSelected
                                ? field.value.filter((a) => a !== act)
                                : [...field.value, act]
                            )
                          }
                        >
                          {act}
                        </Button>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex justify-end mt-6">
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
