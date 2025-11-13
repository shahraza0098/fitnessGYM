import  prisma  from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { gymId } =await  params;
    const notifications = await prisma.notification.findMany({
      where: { gymId },
      orderBy: { createdAt: "desc" },
      include: { member: true },
    });

    return Response.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return Response.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
