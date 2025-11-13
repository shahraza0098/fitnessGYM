// import { GoogleGenAI } from "@google/genai";
// import prisma from "@/lib/prisma";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const {
//       memberId,
//       trainerId,
//       goal,
//       bodyMetrics,
//       diseases,
//       workHabit,
//       activity,
//       eatingHabits,
//       mealTimes,
//       memberName,
//       gender,
//       durationWeeks,
//       notes,
//       wakeTime,
//       sleepTime,
//       workHours,
//       commute,
//       stressLevel,
//     } = body;
// console.table([goal,bodyMetrics,diseases,workHabit,activity,eatingHabits,mealTimes,memberName,gender,durationWeeks,notes,wakeTime,sleepTime,workHours,commute,stressLevel], [goal,bodyMetrics,diseases,workHabit,activity,eatingHabits,mealTimes,memberName,gender,durationWeeks,notes,wakeTime,sleepTime,workHours,commute,stressLevel]);
//     // ----------------------------------
//     // 🧠 Gemini Prompt (All Inputs)
//     // ----------------------------------
//     const prompt = `
// You are a certified nutritionist creating a personalized 7-day diet plan.

// Member Details:
// - Name: ${memberName || "N/A"}
// - Gender: ${gender || "Unspecified"}
// - Goal: ${goal || "General Fitness"}
// - Duration: ${durationWeeks || 4} weeks
// - Trainer Notes: ${notes || "None"}

// Physical Metrics:
// - Age: ${bodyMetrics?.age || "N/A"} years
// - Height: ${bodyMetrics?.height || "N/A"} cm
// - Weight: ${bodyMetrics?.weight || "N/A"} kg
// - BMI: ${bodyMetrics?.bmi || "N/A"}

// Health & Lifestyle:
// - Chronic Diseases: ${diseases?.length ? diseases.join(", ") : "None"}
// - Work Habit: ${workHabit || "Not specified"}
// - Physical Activity: ${activity?.length ? activity.join(", ") : "None"}
// - Eating Habits: ${eatingHabits || "Unspecified"}
// - Wake Time: ${wakeTime || "Not specified"}
// - Sleep Time: ${sleepTime || "Not specified"}
// - Work Hours per Day: ${workHours || "N/A"} hours
// - Commute Time: ${commute || "N/A"} minutes
// - Stress Level: ${stressLevel || "Moderate"}
// - Typical Meal Times: ${mealTimes?.join(", ") || "Not provided"}

// Instructions:
// - Generate a 7-day diet plan suitable for the above individual.
// - Include daily meal breakdowns (Breakfast, Lunch, Dinner, Snacks if needed).
// - Each meal must include:
//   - Title
//   - Ingredients (with quantities)
//   - Calories
//   - Macros: protein, carbs, and fat
// - Ensure total daily calories and macros align with the member's goal and BMI.
// - Consider diseases, stress level, and activity when suggesting foods.
// - Keep meals practical for Indian dietary context if unspecified.
// - Return output in **strict JSON only** using the structure below.

// Example Output:
// {
//   "weekStart": "Monday",
//   "weekEnd": "Sunday",
//   "days": [
//     {
//       "dayOfWeek": "Monday",
//       "dailyMacros": { "calories": 1800, "protein": 120, "carbs": 200, "fat": 60 },
//       "meals": [
//         {
//           "type": "Breakfast",
//           "title": "Oatmeal with Milk",
//           "ingredients": [
//             { "name": "Oats", "quantity": "50g" },
//             { "name": "Milk", "quantity": "200ml" }
//           ],
//           "calories": 350,
//           "macros": { "protein": 20, "carbs": 40, "fat": 10 }
//         }
//       ]
//     }
//   ]
// }
// Return ONLY valid JSON — no markdown, no text outside JSON.
// `;

//     // ----------------------------------
//     // ⚙️ Gemini API Call
//     // ----------------------------------
//     const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
//     const response = await genAI.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//     });

//     const text = response.text;
//     const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
//     const dietPlan = JSON.parse(cleaned);

//     // ----------------------------------
//     // 💾 Save in Prisma (MealPlan + Days + Meals)
//     // ----------------------------------
//     const savedPlan = await prisma.mealPlan.create({
//       data: {
//         gymId: "cmhbk59xj0003umigm080hoqd", // TODO: dynamic
//         memberId: memberId || "cmhehs55m0001umqwykj09maj",
//         trainerId: trainerId || "cmhd8ywp10001umbkwihd2w7r",
//         goal,
//         weekStart: new Date(),
//         weekEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         targetMacros: dietPlan?.targetMacros || {},
//         days: {
//           create: dietPlan.days.map((d) => ({
//             dayOfWeek: d.dayOfWeek,
//             dailyMacros: d.dailyMacros,
//             meals: {
//               create: d.meals.map((m) => ({
//                 type: m.type,
//                 title: m.title,
//                 description: m.description || "",
//                 ingredients: m.ingredients,
//                 calories: m.calories,
//                 macros: m.macros,
//               })),
//             },
//           })),
//         },
//       },
//       include: { days: { include: { meals: true } } },
//     });

//     return Response.json({ success: true, plan: savedPlan });
//   } catch (err) {
//     console.error("❌ Error generating diet plan:", err);
//     return Response.json(
//       { success: false, error: err.message || "Failed to generate diet plan" },
//       { status: 500 }
//     );
//   }
// }



import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      goal,
      bodyMetrics,
      diseases,
      workHabit,
      activity,
      eatingHabits,
      mealTimes,
      memberName,
      gender,
      durationWeeks,
      notes,
      wakeTime,
      sleepTime,
      workHours,
      commute,
      stressLevel,
    } = body;

    // -----------------------------
    // 🧠 Construct Gemini Prompt
    // -----------------------------
    const prompt = `
You are a certified nutritionist creating a personalized 7-day diet plan.

Member Details:
- Name: ${memberName || "N/A"}
- Gender: ${gender || "Unspecified"}
- Goal: ${goal || "General Fitness"}
- Duration: ${durationWeeks || 4} weeks
- Trainer Notes: ${notes || "None"}

Physical Metrics:
- Age: ${bodyMetrics?.age || "N/A"} years
- Height: ${bodyMetrics?.height || "N/A"} cm
- Weight: ${bodyMetrics?.weight || "N/A"} kg
- BMI: ${bodyMetrics?.bmi || "N/A"}

Health & Lifestyle:
- Chronic Diseases: ${diseases?.length ? diseases.join(", ") : "None"}
- Work Habit: ${workHabit || "Not specified"}
- Physical Activity: ${activity?.length ? activity.join(", ") : "None"}
- Eating Habits: ${eatingHabits || "Unspecified"}
- Wake Time: ${wakeTime || "Not specified"}
- Sleep Time: ${sleepTime || "Not specified"}
- Work Hours per Day: ${workHours || "N/A"} hours
- Commute Time: ${commute || "N/A"} minutes
- Stress Level: ${stressLevel || "Moderate"}
- Typical Meal Times: ${mealTimes?.join(", ") || "Not provided"}

Instructions:
- Generate a 7-day diet plan suitable for the above individual.
- Include daily meal breakdowns (Breakfast, Lunch, Dinner, Snacks if needed).
- Each meal must include title, ingredients (with quantities), calories, and macros.
- Ensure total daily calories and macros align with the goal and BMI.
- Keep meals practical for Indian dietary context if unspecified.
- Return ONLY strict JSON (no markdown).

JSON Output Example:
{
  "weekStart": "Monday",
  "weekEnd": "Sunday",
  "days": [
    {
      "dayOfWeek": "Monday",
      "dailyMacros": { "calories": 1800, "protein": 120, "carbs": 200, "fat": 60 },
      "meals": [
        {
          "type": "Breakfast",
          "title": "Oatmeal with Milk",
          "ingredients": [
            { "name": "Oats", "quantity": "50g" },
            { "name": "Milk", "quantity": "200ml" }
          ],
          "calories": 350,
          "macros": { "protein": 20, "carbs": 40, "fat": 10 }
        }
      ]
    }
  ]
}`;

    // -----------------------------
    // ⚙️ Call Gemini
    // -----------------------------
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const dietPlan = JSON.parse(cleaned);

    // ✅ Return only generated plan (don’t save)
    return Response.json({ success: true, plan: dietPlan });
  } catch (err) {
    console.error("❌ Error generating diet plan:", err);
    return Response.json(
      { success: false, error: err.message || "Failed to generate plan" },
      { status: 500 }
    );
  }
}
