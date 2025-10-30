// src/app/api/owner/selected-gym/route.js
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const owner = await prisma.owner.findUnique({
      where: { clerkUserId: userId },
      select: { selectedGymId: true },
    });

    return NextResponse.json({ selectedGymId: owner?.selectedGymId || null });
  } catch (err) {
    console.error("GET selected gym error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { gymId } = await req.json();
    if (!gymId) return NextResponse.json({ error: "Missing gymId" }, { status: 400 });

    // Verify that the owner actually owns that gym
    const gym = await prisma.gym.findUnique({ where: { id: gymId } });
    if (!gym) return NextResponse.json({ error: "Gym not found" }, { status: 404 });

    // Verify owner record (owner's clerkUserId must match userId)
    const owner = await prisma.owner.findUnique({ where: { clerkUserId: userId } });
    if (!owner) return NextResponse.json({ error: "Owner not found" }, { status: 404 });

    if (gym.ownerId !== owner.id) {
      return NextResponse.json({ error: "Not allowed to select this gym", status: 403 }, { status: 403 });
    }

    // Save selected gym on Owner
    const updated = await prisma.owner.update({
      where: { id: owner.id },
      data: { selectedGymId: gymId },
    });

    return NextResponse.json({ selectedGymId: updated.selectedGymId });
  } catch (err) {
    console.error("POST selected gym error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
