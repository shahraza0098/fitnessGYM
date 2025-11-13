// "use client";
// import { useDietPlan } from "./context/DietPlanContext";
// import GoalWeightStep from "./components/GoalWeightStep";
// import BMIStep from "./components/BMIStep";
// import ChronicDiseaseStep from "./components/ChronicDiseaseStep";
// import PhysicalActivityStep from "./components/PhysicalActivityStep";
// import HabitsStep from "./components/HabitsStep";
// import MealTimesStep from "./components/MealTimesStep";

// export default function DietPlanPage() {
//   const { step } = useDietPlan();

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <GoalWeightStep />;
//       case 2:
//         return <BMIStep />;
//       case 4:
//         return <ChronicDiseaseStep />;
//       case 6:
//         return <PhysicalActivityStep />;
//       case 7:
//         return <HabitsStep />;
//       case 8:
//         return <MealTimesStep />;
//       default:
//         return <GoalWeightStep />;
//     }
//   };

//   return <div className="max-w-3xl mx-auto">{renderStep()}</div>;
// }


// "use client";
// import { useDietPlan } from "./context/DietPlanContext";
// import GoalWeightStep from "./_components/GoalWeightStep";
// import BMIStep from "./_components/BMIStep";
// import InfoStep from "./_components/InfoStep";
// import ChronicDiseaseStep from "./_components/ChronicDiseaseStep";
// import NormalDayStep from "./_components/NormalDayStep";
// import PhysicalActivityStep from "./_components/PhysicalActivityStep";
// import HabitsStep from "./_components/HabitsStep";
// import MealTimesStep from "./_components/MealTimesStep";
// import ReviewGenerateStep from "./_components/ReviewGenerateStep";

// export default function DietPlanPage() {
//   const { step } = useDietPlan();

//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return <GoalWeightStep />;
//       case 2:
//         return <BMIStep />;
//       case 3:
//         return <InfoStep />;
//       case 4:
//         return <ChronicDiseaseStep />;
//       case 5:
//         return <NormalDayStep />;
//       case 6:
//         return <PhysicalActivityStep />;
//       case 7:
//         return <HabitsStep />;
//       case 8:
//         return <MealTimesStep />;
//       case 9:
//         return <ReviewGenerateStep />;
//       default:
//         return <GoalWeightStep />;
//     }
//   };

//   return <div className="max-w-3xl mx-auto">{renderStep()}</div>;
// // }


"use client";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardPlus, FolderOpen } from "lucide-react";

export default function DietPlanMainPage() {
  const router = useRouter();
  const { selectedGymID } = useParams(); // 👈 dynamic gym ID
  console.log("Selected Gym ID:", selectedGymID);

  const handleNewPlan = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/new`);

  const handleTemplates = () =>
    router.push(`/dashboard/${selectedGymID}/diet-plan/templates`);

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-8 rounded-2xl shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-gray-800 mb-3">
        Diet Plan Management
      </h1>
      <p className="text-gray-500 mb-10 text-center max-w-lg">
        Create personalized diet plans for your gym members using AI, or reuse
        existing templates to quickly send diet plans.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Create New Plan */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleNewPlan}
          className="flex flex-col items-center justify-center border border-gray-200 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition w-72"
        >
          <ClipboardPlus className="w-12 h-12 text-orange-600 mb-3" />
          <h3 className="text-lg font-medium text-gray-800">
            Create New Diet Plan
          </h3>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Generate a customized 7-day diet plan using AI and trainer inputs.
          </p>
        </motion.button>

        {/* Use Existing Templates */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleTemplates}
          className="flex flex-col items-center justify-center border border-gray-200 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition w-72"
        >
          <FolderOpen className="w-12 h-12 text-indigo-600 mb-3" />
          <h3 className="text-lg font-medium text-gray-800">
            Use Existing Templates
          </h3>
          <p className="text-sm text-gray-500 mt-1 text-center">
            View saved diet templates and send them directly to members.
          </p>
        </motion.button>
      </div>
    </motion.div>
  );
}
