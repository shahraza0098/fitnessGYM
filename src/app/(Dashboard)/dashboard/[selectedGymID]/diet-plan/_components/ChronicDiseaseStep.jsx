// "use client";
// import { useDietPlan } from "../context/DietPlanContext";
// import { useState } from "react";

// const diseaseOptions = [
//   "Diabetes",
//   "Hypertension",
//   "Thyroid Disorder",
//   "PCOS",
//   "Heart Disease",
//   "Asthma",
//   "None",
// ];

// export default function ChronicDiseaseStep() {
//   const { formData, updateFormData, setStep } = useDietPlan();
//   const [selected, setSelected] = useState(formData.diseases || []);

//   const toggleDisease = (disease) => {
//     setSelected((prev) =>
//       prev.includes(disease)
//         ? prev.filter((d) => d !== disease)
//         : [...prev, disease]
//     );
//   };

//   const handleNext = () => {
//     updateFormData("diseases", selected);
//     setStep((prev) => prev + 1);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-2">Chronic Diseases</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         Select if the member has any existing chronic medical conditions.
//       </p>

//       <div className="grid grid-cols-2 gap-3">
//         {diseaseOptions.map((disease) => (
//           <button
//             key={disease}
//             onClick={() => toggleDisease(disease)}
//             className={`border rounded-md px-4 py-2 text-sm transition ${
//               selected.includes(disease)
//                 ? "bg-orange-100 border-orange-600 text-orange-700"
//                 : "bg-white border-gray-300"
//             }`}
//           >
//             {disease}
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
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

// ✅ Disease options
const diseaseOptions = [
  "Diabetes",
  "Hypertension",
  "Thyroid Disorder",
  "PCOS",
  "Heart Disease",
  "Asthma",
  "None",
];

// ✅ Zod schema
const diseaseSchema = z.object({
  diseases: z
    .array(z.string())
    .min(1, "Please select at least one option.")
    .optional(),
});

export default function ChronicDiseaseStep() {
  const { formData, updateFormData, setStep } = useDietPlan();

  const form = useForm({
    resolver: zodResolver(diseaseSchema),
    defaultValues: {
      diseases: formData.diseases || [],
    },
  });

  const selectedDiseases = form.watch("diseases") || [];

  const toggleDisease = (disease) => {
    const current = form.getValues("diseases") || [];
    if (current.includes(disease)) {
      form.setValue(
        "diseases",
        current.filter((d) => d !== disease)
      );
    } else {
      // If "None" is selected, clear all others
      if (disease === "None") {
        form.setValue("diseases", ["None"]);
      } else {
        form.setValue(
          "diseases",
          current.filter((d) => d !== "None").concat(disease)
        );
      }
    }
  };

  const onSubmit = (values) => {
    updateFormData("diseases", values.diseases);
    setStep((prev) => prev + 1);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Chronic Diseases</CardTitle>
        <CardDescription>
          Select any existing chronic medical conditions of the member.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="diseases"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {diseaseOptions.map((disease) => {
                        const isSelected = selectedDiseases.includes(disease);
                        return (
                          <Button
                            key={disease}
                            type="button"
                            variant={isSelected ? "secondary" : "outline"}
                            onClick={() => toggleDisease(disease)}
                            className={`justify-center ${
                              isSelected
                                ? "bg-orange-100 text-orange-700 border-orange-500"
                                : ""
                            }`}
                          >
                            {disease}
                          </Button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display Selected Tags */}
            {selectedDiseases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDiseases.map((disease) => (
                  <Badge key={disease} variant="secondary" className="bg-orange-100 text-orange-700">
                    {disease}
                  </Badge>
                ))}
              </div>
            )}

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
