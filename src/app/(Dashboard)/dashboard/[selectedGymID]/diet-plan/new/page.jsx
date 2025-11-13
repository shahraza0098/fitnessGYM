// export default function NewDietPlanPage() {
//   return <div className="p-6">🧠 Diet Plan Generator coming soon...</div>;
// }




"use client";
import { useDietPlan } from "../context/DietPlanContext";
import GoalWeightStep from "../_components/GoalWeightStep";
import BMIStep from "../_components/BMIStep";
import InfoStep from "../_components/InfoStep";
import ChronicDiseaseStep from "../_components/ChronicDiseaseStep";
import NormalDayStep from "../_components/NormalDayStep";
import PhysicalActivityStep from "../_components/PhysicalActivityStep";
import HabitsStep from "../_components/HabitsStep";
import MealTimesStep from "../_components/MealTimesStep";
import ReviewGenerateStep from "../_components/ReviewGenerateStep";

export default function DietPlanPage() {
  const { step } = useDietPlan();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GoalWeightStep />;
      case 2:
        return <BMIStep />;
      case 3:
        return <InfoStep />;
      case 4:
        return <ChronicDiseaseStep />;
      case 5:
        return <NormalDayStep />;
      case 6:
        return <PhysicalActivityStep />;
      case 7:
        return <HabitsStep />;
      case 8:
        return <MealTimesStep />;
      case 9:
        return <ReviewGenerateStep />;
      default:
        return <GoalWeightStep />;
    }
  };

  return <div className="max-w-3xl mx-auto">{renderStep()}</div>;
 }
