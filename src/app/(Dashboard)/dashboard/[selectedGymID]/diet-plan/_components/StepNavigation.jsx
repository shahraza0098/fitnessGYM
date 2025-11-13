"use client";
import { useDietPlan } from "../context/DietPlanContext";

const steps = [
  "Goal Weight",
  "Body Mass Index",
  "Information",
  "Chronic Disease",
  "Normal Day",
  "Physical Activity",
  "Habits",
  "Meal Times",
];

export default function StepNavigation() {
  const { step, setStep } = useDietPlan();

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-t-xl">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = step === stepNumber;
        return (
          <button
            key={label}
            onClick={() => setStep(stepNumber)}
            className={`flex flex-col items-center transition-all ${
              active ? "text-orange-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                active ? "border-orange-600 bg-orange-100" : "border-gray-300"
              }`}
            >
              {stepNumber}
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
