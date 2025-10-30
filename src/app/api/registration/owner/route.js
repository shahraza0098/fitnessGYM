import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
 
  const { userId } =await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // const existingOwner = await prisma.owner.findUnique({
    //   where: { clerkUserId: userId },
    // });

    // if (existingOwner) {
    //   const updated = await prisma.owner.update({
    //     where: { clerkUserId: userId },
    //     data: { name, email, phone },
    //   });
    //   return NextResponse.json(updated);
    // }

    const owner = await prisma.owner.create({
      data: { clerkUserId: userId, name, email, phone },
    });

    // Update Clerk user metadata to mark onboarding as complete
//      await clerkClient.users.updateUserMetadata(userId, {
//   publicMetadata: { onboardingComplete: true },
// });

    return NextResponse.json(
  { owner, message: "Onboarding complete" },
  { status: 201 }
);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
