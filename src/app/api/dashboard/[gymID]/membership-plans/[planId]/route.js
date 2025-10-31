import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { planId } = params;
  try {
    const data = await req.json();
    const plan = await prisma.membershipPlan.update({
      where: { id: planId },
      data,
    });
    return NextResponse.json(plan);
  } catch (err) {
    console.error("❌ Error updating membership plan:", err);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { planId } = params;
  try {
    const plan = await prisma.membershipPlan.update({
      where: { id: planId },
      data: { deletedAt: new Date() },
    });
    return NextResponse.json({ message: "Plan deleted" });
  } catch (err) {
    console.error("❌ Error deleting membership plan:", err);
    return NextResponse.json({ error: "Failed to delete plan" }, { status: 500 });
  }
}
