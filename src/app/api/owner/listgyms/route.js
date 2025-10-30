import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Find the owner in your DB
    const owner = await prisma.owner.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!owner)
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });

    // Get all gyms owned by this owner
    const gyms = await prisma.gym.findMany({
      where: { ownerId: owner.id },
      select: {
        id: true,
        name: true,
        address: true,
        contactEmail: true,
        contactPhone: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ gyms });
  } catch (err) {
    console.error("GET /api/gyms error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
