"use client";
import { useState } from "react";
import { useDietPlan } from "../context/DietPlanContext";
import DietPlanViewer from "./DietPlanViewer";

export default function ReviewGenerateStep() {
  const { formData, updateFormData } = useDietPlan();
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/diet/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setDietPlan(data.plan);
      } else {
        setError(data.error || "Failed to generate diet plan.");
      }
    } catch (err) {
      setError("An error occurred while generating the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-3">Review & Generate Plan</h2>
      <p className="text-sm text-gray-500 mb-4">
        Please review the information entered and generate the AI-based diet plan.
      </p>

      <div className="bg-gray-50 border rounded-lg p-4 text-sm mb-4">
        <p><strong>Goal:</strong> {formData.goal}</p>
        <p>
          <strong>Body:</strong> {formData.bodyMetrics.age}y, {formData.bodyMetrics.height}cm,{" "}
          {formData.bodyMetrics.weight}kg (BMI: {formData.bodyMetrics.bmi})
        </p>
        <p><strong>Diseases:</strong> {formData.diseases.join(", ") || "None"}</p>
        <p><strong>Work Habit:</strong> {formData.workHabit}</p>
        <p><strong>Physical Activity:</strong> {formData.activity.join(", ") || "None"}</p>
        <p><strong>Eating Habits:</strong> {formData.eatingHabits}</p>
        <p><strong>Meal Times:</strong> {formData.mealTimes.join(", ")}</p>
      </div>

      {!dietPlan && (
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
        >
          {loading ? "Generating..." : "Generate Diet Plan"}
        </button>
      )}

      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

      {/* {dietPlan && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Generated Diet Plan</h3>
          <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-x-auto max-h-[400px]">
            {JSON.stringify(dietPlan, null, 2)}
          </pre>
        </div>
      )} */}
      {dietPlan && (
       <div className="mt-6">
       <DietPlanViewer initialPlan={dietPlan} />
       </div>
      )}

    </div>
  );
}
