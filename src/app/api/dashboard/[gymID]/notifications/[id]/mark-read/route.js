import  prisma  from "@/lib/prisma";

export async function PATCH(req, { params }) {
  const { id } =await params;
  try {
    await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
