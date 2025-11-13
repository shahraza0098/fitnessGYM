// "use client";
// import { useState } from "react";

// export default function DietPlanViewer({ initialPlan }) {
//   const [dietPlan, setDietPlan] = useState(initialPlan);
//   const [saving, setSaving] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleMealChange = (dayIndex, mealIndex, field, value) => {
//     const updated = { ...dietPlan };
//     updated.days[dayIndex].meals[mealIndex][field] = value;
//     setDietPlan(updated);
//   };

//   const handleMacroChange = (dayIndex, field, value) => {
//     const updated = { ...dietPlan };
//     updated.days[dayIndex].dailyMacros[field] = value;
//     setDietPlan(updated);
//   };

// const handleSave = async () => {
//   try {
//     setSaving(true);
//     setMessage("");
//     const res = await fetch("/api/ai/diet/save", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         plan: dietPlan,
//         memberId: "cmhehs55m0001umqwykj09maj", // or dynamic
//         trainerId: "cmhd8ywp10001umbkwihd2w7r",
//         goal: dietPlan.goal || "Custom",
//       }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setMessage("✅ Diet plan saved successfully!");
//       setEditMode(false);
//     } else {
//       setMessage("❌ Failed to save diet plan.");
//     }
//   } catch (err) {
//     console.error(err);
//     setMessage("❌ Error saving plan.");
//   } finally {
//     setSaving(false);
//   }
// };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 mt-6">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           Weekly Diet Plan
//         </h2>
//         <div className="flex gap-3">
//           {!editMode ? (
//             <button
//               onClick={() => setEditMode(true)}
//               className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
//             >
//               Edit Plan
//             </button>
//           ) : (
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           )}
//         </div>
//       </div>

//       {message && (
//         <p
//           className={`text-sm mb-3 ${
//             message.includes("✅") ? "text-green-600" : "text-red-500"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <div className="space-y-8">
//         {dietPlan.days.map((day, dayIndex) => (
//           <div
//             key={day.dayOfWeek}
//             className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-lg font-semibold text-orange-700">
//                 {day.dayOfWeek}
//               </h3>
//               <div className="flex gap-3 text-sm text-gray-600">
//                 {["calories", "protein", "carbs", "fat"].map((macro) => (
//                   <div key={macro}>
//                     <span className="font-medium">{macro}: </span>
//                     {editMode ? (
//                       <input
//                         type="number"
//                         value={day.dailyMacros[macro]}
//                         onChange={(e) =>
//                           handleMacroChange(dayIndex, macro, e.target.value)
//                         }
//                         className="border-b border-gray-300 w-16 text-center bg-gray-50"
//                       />
//                     ) : (
//                       <span>{day.dailyMacros[macro]}</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Meals Table */}
//             <table className="w-full text-sm border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th className="p-2 border">Meal</th>
//                   <th className="p-2 border">Title</th>
//                   <th className="p-2 border">Calories</th>
//                   <th className="p-2 border">Protein</th>
//                   <th className="p-2 border">Carbs</th>
//                   <th className="p-2 border">Fat</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {day.meals.map((meal, mealIndex) => (
//                   <tr key={mealIndex} className="border-b hover:bg-gray-50">
//                     <td className="p-2 border font-medium">{meal.type}</td>
//                     <td className="p-2 border">
//                       {editMode ? (
//                         <input
//                           type="text"
//                           value={meal.title}
//                           onChange={(e) =>
//                             handleMealChange(
//                               dayIndex,
//                               mealIndex,
//                               "title",
//                               e.target.value
//                             )
//                           }
//                           className="w-full border-b border-gray-300 bg-gray-50"
//                         />
//                       ) : (
//                         meal.title
//                       )}
//                     </td>
//                     <td className="p-2 border text-center">
//                       {editMode ? (
//                         <input
//                           type="number"
//                           value={meal.calories}
//                           onChange={(e) =>
//                             handleMealChange(
//                               dayIndex,
//                               mealIndex,
//                               "calories",
//                               e.target.value
//                             )
//                           }
//                           className="w-20 border-b border-gray-300 bg-gray-50 text-center"
//                         />
//                       ) : (
//                         meal.calories
//                       )}
//                     </td>
//                     <td className="p-2 border text-center">
//                       {meal.macros?.protein}
//                     </td>
//                     <td className="p-2 border text-center">
//                       {meal.macros?.carbs}
//                     </td>
//                     <td className="p-2 border text-center">
//                       {meal.macros?.fat}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";

export default function DietPlanViewer({ initialPlan }) {
  const [dietPlan, setDietPlan] = useState(initialPlan);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // 🆕 Template modal state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState("");

  // -----------------------------
  // 🧩 Meal & Macro Editing
  // -----------------------------
  const handleMealChange = (dayIndex, mealIndex, field, value) => {
    const updated = { ...dietPlan };
    updated.days[dayIndex].meals[mealIndex][field] = value;
    setDietPlan(updated);
  };

  const handleMacroChange = (dayIndex, field, value) => {
    const updated = { ...dietPlan };
    updated.days[dayIndex].dailyMacros[field] = value;
    setDietPlan(updated);
  };

  // -----------------------------
  // 💾 Save Diet Plan to DB
  // -----------------------------
  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      const res = await fetch("/api/ai/diet/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: dietPlan,
          memberId: "cmhehs55m0001umqwykj09maj", // dynamic later
          trainerId: "cmhd8ywp10001umbkwihd2w7r",
          goal: dietPlan.goal || "Custom",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Diet plan saved successfully!");
        setEditMode(false);
      } else {
        setMessage("❌ Failed to save diet plan.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving plan.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // 💾 Save as Template
  // -----------------------------
  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      setMessage("⚠️ Please enter a template name.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      const res = await fetch("/api/ai/diet/template/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: templateName,
          goal: dietPlan.goal || "General Fitness",
          duration: 4,
          plan: dietPlan,
          trainerId: "cmhd8ywp10001umbkwihd2w7r",
          gymId: "cmhbk59xj0003umigm080hoqd",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Template saved successfully!");
        setTemplateName("");
        setShowTemplateModal(false);
      } else {
        setMessage("❌ Failed to save template.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving template.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------
  // 🧱 Render
  // -----------------------------
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Weekly Diet Plan
        </h2>

        <div className="flex gap-3">
          {!editMode ? (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Edit Plan
              </button>

              {/* 🆕 Save as Template */}
              <button
                onClick={() => setShowTemplateModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save as Template
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </div>

      {/* 🧾 Message */}
      {message && (
        <p
          className={`text-sm mb-3 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* 🗂️ Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Save as Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save this diet plan as a reusable template for future clients.
            </p>
            <input
              type="text"
              placeholder="Template name (e.g. Weight Loss Vegetarian)"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                disabled={saving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🥗 Diet Plan Display */}
      <div className="space-y-8">
        {dietPlan.days.map((day, dayIndex) => (
          <div
            key={day.dayOfWeek}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-orange-700">
                {day.dayOfWeek}
              </h3>
              <div className="flex gap-3 text-sm text-gray-600">
                {["calories", "protein", "carbs", "fat"].map((macro) => (
                  <div key={macro}>
                    <span className="font-medium">{macro}: </span>
                    {editMode ? (
                      <input
                        type="number"
                        value={day.dailyMacros[macro]}
                        onChange={(e) =>
                          handleMacroChange(dayIndex, macro, e.target.value)
                        }
                        className="border-b border-gray-300 w-16 text-center bg-gray-50"
                      />
                    ) : (
                      <span>{day.dailyMacros[macro]}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 🥣 Meals Table */}
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Meal</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Calories</th>
                  <th className="p-2 border">Protein</th>
                  <th className="p-2 border">Carbs</th>
                  <th className="p-2 border">Fat</th>
                </tr>
              </thead>
              <tbody>
                {day.meals.map((meal, mealIndex) => (
                  <tr key={mealIndex} className="border-b hover:bg-gray-50">
                    <td className="p-2 border font-medium">{meal.type}</td>
                    <td className="p-2 border">
                      {editMode ? (
                        <input
                          type="text"
                          value={meal.title}
                          onChange={(e) =>
                            handleMealChange(
                              dayIndex,
                              mealIndex,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full border-b border-gray-300 bg-gray-50"
                        />
                      ) : (
                        meal.title
                      )}
                    </td>
                    <td className="p-2 border text-center">
                      {editMode ? (
                        <input
                          type="number"
                          value={meal.calories}
                          onChange={(e) =>
                            handleMealChange(
                              dayIndex,
                              mealIndex,
                              "calories",
                              e.target.value
                            )
                          }
                          className="w-20 border-b border-gray-300 bg-gray-50 text-center"
                        />
                      ) : (
                        meal.calories
                      )}
                    </td>
                    <td className="p-2 border text-center">
                      {meal.macros?.protein}
                    </td>
                    <td className="p-2 border text-center">
                      {meal.macros?.carbs}
                    </td>
                    <td className="p-2 border text-center">
                      {meal.macros?.fat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
