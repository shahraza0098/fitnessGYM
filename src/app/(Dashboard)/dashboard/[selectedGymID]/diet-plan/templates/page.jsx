// // export default function DietPlanTemplatesPage() {
// //   return <div className="p-6">📋 Templates list and send-to-member UI</div>;
// // }


// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { Eye, SendHorizonal, ArrowLeft, Loader2 } from "lucide-react";
// import GetMembersList from "@/components/GetMembersList";

// export default function DietPlanTemplatesPage() {
//   const router = useRouter();
//   const { selectedGymID } = useParams();
//   console.log("Selected Gym ID:", selectedGymID);

//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [assigning, setAssigning] = useState(false);
//   const [message, setMessage] = useState("");
//   const [memberList, setMemberList] = useState(false); // For future member selection

//   // Fetch templates
//   useEffect(() => {
//     async function fetchTemplates() {
//       try {
//         const res = await fetch(`/api/ai/diet/template/list?gymId=${selectedGymID}`);
//         const data = await res.json();
//         if (data.success) {
//           setTemplates(data.templates);
//         }
//       } catch (err) {
//         console.error("Error fetching templates:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTemplates();
//   }, [selectedGymID]);

//   // Assign template to a member
//   const handleAssign = async (template, memberId) => {
//     setMemberList(true)
//     setAssigning(true);
//     setMessage("");
//     console.log("selectedTemplate:", template);

//   };

//   // Return to main diet plan page
//   const goBack = () => router.push(`/dashboard/${selectedGymID}/diet-plan`);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="p-6 min-h-[80vh] bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <button
//           onClick={goBack}
//           className="flex items-center text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </button>
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Diet Plan Templates
//         </h1>
//         <div></div>
//       </div>

//       {message && (
//         <p
//           className={`text-sm mb-4 ${
//             message.includes("✅") ? "text-green-600" : "text-red-500"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       {/* Template Cards */}
//       {templates.length === 0 ? (
//         <p className="text-gray-500 text-center mt-10">
//           No templates found. Create and save a diet plan first.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {templates.map((tpl) => (
//             <motion.div
//               key={tpl.id}
//               className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg p-5 transition"
//               whileHover={{ scale: 1.03 }}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                 {tpl.name}
//               </h3>
//               <p className="text-sm text-gray-500 mb-2">
//                 Goal: {tpl.goal || "N/A"} | Duration: {tpl.duration || 4} weeks
//               </p>
//               <p className="text-xs text-gray-400 mb-4">
//                 Created on {new Date(tpl.createdAt).toLocaleDateString()}
//               </p>

//               <div className="flex justify-between items-center">
//                 <button
//                   onClick={() => setSelectedTemplate(tpl)}
//                   className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
//                 >
//                   <Eye className="w-4 h-4" /> Preview
//                 </button>

//                 <button
//                   onClick={() => handleAssign(tpl, "cmhehs55m0001umqwykj09maj")} // Replace with member selection later
//                   disabled={assigning}
//                   className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
//                 >
//                   <SendHorizonal className="w-4 h-4" />
//                   {assigning ? "Sending..." : "Assign"}
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* Preview Modal */}
//       {selectedTemplate && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               {selectedTemplate.name}
//             </h3>

//             <div className="space-y-6">
//               {selectedTemplate.plan.days.map((day) => (
//                 <div key={day.dayOfWeek} className="border rounded-lg p-4">
//                   <h4 className="text-lg font-medium text-orange-700 mb-2">
//                     {day.dayOfWeek}
//                   </h4>
//                   <table className="w-full text-sm border-collapse">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="border p-2">Meal</th>
//                         <th className="border p-2">Title</th>
//                         <th className="border p-2">Calories</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {day.meals.map((meal, i) => (
//                         <tr key={i} className="hover:bg-gray-50">
//                           <td className="border p-2">{meal.type}</td>
//                           <td className="border p-2">{meal.title}</td>
//                           <td className="border p-2 text-center">
//                             {meal.calories}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setSelectedTemplate(null)}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* get member list  */}
//       {memberList && <GetMembersList gymId={selectedGymID} selectedTemplate={templates} />}
//     </motion.div>
//   );
// }





//with dialog box

"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  SendHorizonal,
  ArrowLeft,
  Loader2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import GetMembersList from "@/components/GetMembersList";

export default function DietPlanTemplatesPage() {
  const router = useRouter();
  const { selectedGymID } = useParams();
  console.log("Selected Gym ID:", selectedGymID);

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch templates
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch(`/api/ai/diet/template/list?gymId=${selectedGymID}`);
        const data = await res.json();
        if (data.success) {
          setTemplates(data.templates);
        }
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [selectedGymID]);

  // Go back to main diet plan page
  const goBack = () => router.push(`/dashboard/${selectedGymID}/diet-plan`);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 min-h-[80vh] bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          Diet Plan Templates
        </h1>
        <div></div>
      </div>

      {/* Message */}
      {message && (
        <p
          className={`text-sm mb-4 ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* Template List */}
      {templates.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No templates found. Create and save a diet plan first.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <motion.div
              key={tpl.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg p-5 transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {tpl.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Goal: {tpl.goal || "N/A"} | Duration: {tpl.duration || 4} weeks
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Created on {new Date(tpl.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>

                <button
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    setShowDialog(true);
                  }}
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                >
                  <SendHorizonal className="w-4 h-4" /> Assign
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🧾 Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto relative">
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {previewTemplate.name}
            </h3>

            <div className="space-y-6">
              {previewTemplate.plan.days.map((day) => (
                <div key={day.dayOfWeek} className="border rounded-lg p-4">
                  <h4 className="text-lg font-medium text-orange-700 mb-2">
                    {day.dayOfWeek}
                  </h4>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Meal</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.meals.map((meal, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="border p-2">{meal.type}</td>
                          <td className="border p-2">{meal.title}</td>
                          <td className="border p-2 text-center">
                            {meal.calories}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧍 Assign Dialog (Member List) */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Assign Diet Plan
            </DialogTitle>
          </DialogHeader>

          <div className="mt-3">
            <GetMembersList
              gymId={selectedGymID}
              selectedTemplate={selectedTemplate}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
