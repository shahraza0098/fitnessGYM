// "use client";
// import { createContext, useContext, useState } from "react";

// const DietPlanContext = createContext();

// export const DietPlanProvider = ({ children }) => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     goal: "",
//     bodyMetrics: { age: "", height: "", weight: "", bmi: "" },
//     diseases: [],
//     workHabit: "",
//     activity: [],
//     eatingHabits: "",
//     mealTimes: [],
//   });

//   const updateFormData = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   return (
//     <DietPlanContext.Provider value={{ step, setStep, formData, updateFormData }}>
//       {children}
//     </DietPlanContext.Provider>
//   );
// };

// export const useDietPlan = () => useContext(DietPlanContext);



"use client";

  import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const DietPlanContext = createContext();

export const DietPlanProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    goal: "",

    // Step 2
    bodyMetrics: { age: "", height: "", weight: "", bmi: "" },

    // Step 3 - InfoStep
    memberName: "",
    gender: "",
    durationWeeks: 4,
    notes: "",

    // Step 4 - Diseases
    diseases: [],

    // Step 5 - Normal Day
    wakeTime: "",
    sleepTime: "",
    workHours: "",
    commute: "",
    stressLevel: "Moderate",

    // Step 6 - Physical Activity
    activity: [],

    // Step 7 - Habits
    workHabit: "",
    eatingHabits: "",

    // Step 8 - Meal Times
    mealTimes: [],
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };




useEffect(() => {
  const saved = localStorage.getItem("dietForm");
  if (saved) setFormData(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("dietForm", JSON.stringify(formData));
}, [formData]);


  return (
    <DietPlanContext.Provider value={{ step, setStep, formData, updateFormData }}>
      {children}
    </DietPlanContext.Provider>
  );
};

export const useDietPlan = () => useContext(DietPlanContext);
