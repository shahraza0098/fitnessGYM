// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// export default function MealTimesStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [mealTimes, setMealTimes] = useState(formData.mealTimes || [""]);

//   const addMealTime = () => setMealTimes([...mealTimes, ""]);
//   const removeMealTime = (index) =>
//     setMealTimes(mealTimes.filter((_, i) => i !== index));

//   const updateTime = (index, value) => {
//     const updated = [...mealTimes];
//     updated[index] = value;
//     setMealTimes(updated);
//   };

//   const handleNext = () => {
//     updateFormData("mealTimes", mealTimes.filter((t) => t));
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Meal Times</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Add typical meal times for this member’s routine.
//       </p>

//       <div className="space-y-3">
//         {mealTimes.map((time, i) => (
//           <div key={i} className="flex items-center gap-2">
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => updateTime(i, e.target.value)}
//               className="border rounded-md p-2 w-40"
//             />
//             {i > 0 && (
//               <button
//                 onClick={() => removeMealTime(i)}
//                 className="text-sm text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={addMealTime}
//         className="mt-3 text-orange-600 text-sm font-medium hover:underline"
//       >
//         + Add another meal time
//       </button>

//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={handleNext}
//           className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
//         >
//           Finish
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useDietPlan } from "../context/DietPlanContext";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

// ✅ Validation schema
const mealTimesSchema = z.object({
  mealTimes: z
    .array(
      z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time (HH:MM).")
    )
    .min(1, "At least one meal time is required."),
});

export default function MealTimesStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(mealTimesSchema),
    defaultValues: {
      mealTimes: formData.mealTimes?.length ? formData.mealTimes : [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mealTimes",
  });

  const onSubmit = (values) => {
    updateFormData("mealTimes", values.mealTimes.filter(Boolean));
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Meal Times</CardTitle>
        <CardDescription>
          Add typical meal times for this member’s daily routine.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`mealTimes.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="w-40"
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="button"
              variant="link"
              className="text-orange-600 text-sm font-medium p-0"
              onClick={() => append("")}
            >
              + Add another meal time
            </Button>

            <CardFooter className="flex justify-end p-0 pt-4">
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Finish
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
