import prisma from "@/lib/prisma";
import { sendDietPlanEmail } from "@/lib/sendDietPlanEmail";
export async function POST(req) {
  try {
    const {searchParams} = new URL(req.url);
    const memberId = searchParams.get('memberId');
    const body = await req.json();
    const { plan, trainerId, goal } = body;

    console.log("📝 Received diet plan save request for member ID:", memberId);

    if (!plan || !plan.days) {
      return Response.json(
        { success: false, error: "Invalid or missing plan data" },
        { status: 400 }
      );
    }


    const result = await sendDietPlanEmail({
      memberId,
       plan,
       
    });

    const savedPlan = await prisma.mealPlan.create({
      data: {
        gymId: "cmhbk59xj0003umigm080hoqd", // TODO: make dynamic
        memberId: memberId || "cmhehs55m0001umqwykj09maj",
        trainerId: trainerId || "cmhd8ywp10001umbkwihd2w7r",
        goal,
        weekStart: new Date(),
        weekEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        targetMacros: plan.targetMacros || {},
        days: {
          create: plan.days.map((d) => ({
            dayOfWeek: d.dayOfWeek,
            dailyMacros: d.dailyMacros,
            meals: {
              create: d.meals.map((m) => ({
                type: m.type,
                title: m.title,
                description: m.description || "",
                ingredients: m.ingredients,
                calories: m.calories,
                macros: m.macros,
              })),
            },
          })),
        },
      },
      include: { days: { include: { meals: true } } },
    });

    return Response.json({ success: true, plan: savedPlan });
  } catch (err) {
    console.error("❌ Error saving diet plan:", err);
    return Response.json(
      { success: false, error: err.message || "Failed to save plan" },
      { status: 500 }
    );
  }
}
