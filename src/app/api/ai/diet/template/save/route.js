import prisma from "@/lib/prisma";

export async function POST(req,{params}) {
  try {
    const body = await req.json();
    const { trainerId, gymId, name, goal, duration, plan } = body;

    if (!plan || !name) {
      return Response.json(
        { success: false, error: "Template name and plan required" },
        { status: 400 }
      );
    }

    const template = await prisma.dietTemplate.create({
      data: {
        gymId: gymId || "cmhbk59xj0003umigm080hoqd",
        trainerId: trainerId || "cmhd8ywp10001umbkwihd2w7r",
        name,
        goal,
        duration,
        plan,
      },
    });

    return Response.json({ success: true, template });
  } catch (err) {
    console.error("❌ Error saving diet template:", err);
    return Response.json(
      { success: false, error: err.message || "Failed to save template" },
      { status: 500 }
    );
  }
}
