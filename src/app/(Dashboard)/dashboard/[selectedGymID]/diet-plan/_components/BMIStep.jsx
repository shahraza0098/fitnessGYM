// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState, useEffect } from "react";

// export default function BMIStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [age, setAge] = useState(formData.bodyMetrics.age);
//   const [height, setHeight] = useState(formData.bodyMetrics.height);
//   const [weight, setWeight] = useState(formData.bodyMetrics.weight);
//   const [bmi, setBmi] = useState(formData.bodyMetrics.bmi);

//   useEffect(() => {
//     if (height && weight) {
//       const heightM = height / 100;
//       setBmi((weight / (heightM * heightM)).toFixed(2));
//     }
//   }, [height, weight]);

//   const handleNext = () => {
//     updateFormData("bodyMetrics", { age, height, weight, bmi });
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Body Mass Index</h2>
//       <p className="text-sm text-gray-500 mb-6">
//         Enter member’s age, height, and weight to auto-calculate BMI.
//       </p>

//       <div className="space-y-4">
//         <div>
//           <label className="text-sm font-medium">Age</label>
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Height (cm)</label>
//           <input
//             type="number"
//             value={height}
//             onChange={(e) => setHeight(e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Weight (kg)</label>
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             className="w-full border rounded-md p-2 mt-1"
//           />
//         </div>

//         <div className="text-center text-gray-700 font-medium mt-2">
//           BMI: {bmi || "--"}
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

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDietPlan } from "../context/DietPlanContext";

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
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

// ✅ Zod schema with validation rules
const bmiSchema = z.object({
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(10, "Minimum age is 10")
    .max(100, "Maximum age is 100"),
  height: z
    .number({ invalid_type_error: "Height must be a number" })
    .min(100, "Height must be at least 100 cm")
    .max(250, "Height cannot exceed 250 cm"),
  weight: z
    .number({ invalid_type_error: "Weight must be a number" })
    .min(30, "Weight must be at least 30 kg")
    .max(250, "Weight cannot exceed 250 kg"),
  bmi: z.number().optional(),
});

export default function BMIStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      age: formData.bodyMetrics.age || "",
      height: formData.bodyMetrics.height || "",
      weight: formData.bodyMetrics.weight || "",
      bmi: formData.bodyMetrics.bmi || "",
    },
  });

  // Auto-calculate BMI when height or weight changes
  useEffect(() => {
    const height = form.watch("height");
    const weight = form.watch("weight");

    if (height && weight && height > 0) {
      const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
      form.setValue("bmi", parseFloat(bmi));
    }
  }, [form.watch("height"), form.watch("weight")]);

  const onSubmit = (values) => {
    updateFormData("bodyMetrics", values);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Body Mass Index</CardTitle>
        <CardDescription>
          Enter member’s age, height, and weight to auto-calculate BMI.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="age">Age</Label>
                  <FormControl>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="height">Height (cm)</Label>
                  <FormControl>
                    <Input
                      id="height"
                      type="number"
                      placeholder="Enter height in cm"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <FormControl>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight in kg"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BMI Display */}
            <div className="text-center text-gray-700 font-medium mt-2">
              BMI: {form.watch("bmi") || "--"}
            </div>

            <CardFooter className="flex justify-end p-0">
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
