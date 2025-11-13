import { GoogleGenAI } from "@google/genai"
import prisma from "@/lib/prisma";

export async function GET(req) {
  const body = await req.json();
  const { memberId, trainerId, goal, bodyMetrics, diseases, workHabit, activity, eatingHabits, mealTimes } = body;
  // const goal="Weight Loss";
  // const bodyMetrics={age:30,height:175,weight:80,bmi:26};
  // const diseases=["None"];
  // const workHabit="Sedentary";
  // const activity=["Light exercise 1-2 times/week"];
  // const eatingHabits="Non-vegetarian";
  // const mealTimes=["8:00 AM","1:00 PM","7:00 PM"];


  const genAI = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
   

   const prompt = `
You are a certified nutritionist. Generate a 7-day personalized diet plan in JSON format.
The goal is: ${goal}.
User details:
- Age: ${bodyMetrics.age}
- Height: ${bodyMetrics.height} cm
- Weight: ${bodyMetrics.weight} kg
- BMI: ${bodyMetrics.bmi}
- Diseases: ${diseases.join(", ")}
- Work Habit: ${workHabit}
- Physical Activity: ${activity.join(", ")}
- Eating Habits: ${eatingHabits}
- Meal Times: ${mealTimes.join(", ")}

Requirements:
- Provide balanced meals for breakfast, lunch, dinner, and snacks if needed.
- Include calories and macros (protein, carbs, fat) for each meal.
- Total daily calories should fit the goal.
- Output in strict JSON format, like this example:

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
}
Return only JSON.
`


  try {
    // const result = await model.generateContent(prompt);
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      })
    const text = response.text;
    console.log("Generated diet plan:", text);
    const cleanedText = text
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
    const dietPlan = JSON.parse(cleanedText);

    // Save plan in DB
    const savedPlan = await prisma.mealPlan.create({
      data: {
        gymId: "cmhbk59xj0003umigm080hoqd",
        memberId:"cmhehs55m0001umqwykj09maj",
        trainerId:"cmhd8ywp10001umbkwihd2w7r",
        goal,
        weekStart: new Date(),
        weekEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        targetMacros: {},
        days: {
          create: dietPlan.days.map((d) => ({
            dayOfWeek: d.dayOfWeek,
            dailyMacros: d.dailyMacros,
            meals: {
              create: d.meals.map((m) => ({
                type: m.type,
                title: m.title,
                description: m.description || "",
                ingredients: m.ingredients,
                calories: m.calories,
                macros: m.macros
              })),
            },
          })),
        },
      },
      include: { days: { include: { meals: true } } },
    });

    return Response.json({ success: true, plan: savedPlan });
  } catch (err) {
    console.error("Error generating diet plan:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
