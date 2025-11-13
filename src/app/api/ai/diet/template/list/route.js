import prisma from "@/lib/prisma";

export async function GET(req,{params}) {
    const {searchParams}= new URL(req.url);
    const gymId = searchParams.get("gymId"); 

    console.log("Fetching templates for gymId:", gymId);

  try {
    const templates = await prisma.dietTemplate.findMany({
      where: { gymId: gymId || "cmhbk59xj0003umigm080hoqd" },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ success: true, templates });
  } catch (err) {
    console.error("Error fetching templates:", err);
    return Response.json({ success: false, error: err.message });
  }
}
