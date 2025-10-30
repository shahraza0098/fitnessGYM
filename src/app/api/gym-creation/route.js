import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, address, contactEmail, contactPhone, plan } = body;

    if (!name || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Step 1: Get Owner record
    const owner = await prisma.owner.findUnique({
      where: { clerkUserId: userId },
    });

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    // ✅ Step 2: Create an organization in Clerk via REST API
    const orgResponse = await fetch("https://api.clerk.com/v1/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        name,
        created_by: userId, // The owner becomes admin
        public_metadata: {
          gymName: name,
          address,
          plan,
        },
      }),
    });

    if (!orgResponse.ok) {
      const err = await orgResponse.text();
      console.error("Clerk org creation failed:", err);
      return NextResponse.json({ error: "Failed to create Clerk organization" }, { status: 500 });
    }

    const organization = await orgResponse.json();

    // ✅ Step 3: Save Gym to Prisma
    const gym = await prisma.gym.create({
      data: {
        name,
        address,
        contactEmail,
        contactPhone,
        plan,
        ownerId: owner.id,
        clerkOrgId: organization.id,
      },
    });

    return NextResponse.json(
      {
        message: "Gym created successfully",
        gym,
        organization,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gym:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
