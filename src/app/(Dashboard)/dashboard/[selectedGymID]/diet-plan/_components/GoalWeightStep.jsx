// "use client";

// import { useState } from "react";
// import { useDietPlan } from "../context/DietPlanContext";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// export default function GoalWeightStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [goal, setGoal] = useState(formData.goal || "");

//   const handleNext = () => {
//     if (!goal) return; // Optional: prevent empty selection
//     updateFormData("goal", goal);
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">Goal Weight</CardTitle>
//         <CardDescription>
//           Select or enter the member’s goal for this diet plan.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <div className="grid gap-3">
//           <Label htmlFor="goal">Goal</Label>
//           <Select value={goal} onValueChange={setGoal}>
//             <SelectTrigger id="goal" className="w-full">
//               <SelectValue placeholder="Select goal" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Weight Loss">Weight Loss</SelectItem>
//               <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
//               <SelectItem value="Fat Loss">Fat Loss</SelectItem>
//               <SelectItem value="General Fitness">General Fitness</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardContent>

//       <CardFooter className="flex justify-end">
//         <Button
//           onClick={handleNext}
//           disabled={!goal}
//           className="bg-orange-600 hover:bg-orange-700 text-white"
//         >
//           Next Step
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }


"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormMessage, FormControl } from "@/components/ui/form";

// ✅ Define Zod schema
const goalSchema = z.object({
  goal: z
    .string({
      required_error: "Please select a goal.",
    })
    .min(1, "Goal is required."),
});

export default function GoalWeightStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goal: formData.goal || "",
    },
  });

  const onSubmit = (values) => {
    updateFormData("goal", values.goal);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Goal Weight</CardTitle>
        <CardDescription>
          Select or enter the member’s goal for this diet plan.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="goal">Goal</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                        <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                        <SelectItem value="Fat Loss">Fat Loss</SelectItem>
                        <SelectItem value="General Fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
