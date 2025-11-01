import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");
    if (!gymId) return new NextResponse("Gym ID is required", { status: 400 });

    // const members = await prisma.member.findMany({
    //   where: { gymId },
    //   orderBy: { createdAt: "desc" },
    // });

    const members = await prisma.member.findMany({
  where: { gymId },
  include: {
    membershipPlan: { select: { name: true } }
  },
  orderBy: { createdAt: "desc" },
});




    return NextResponse.json(members);
  } catch (err) {
    console.error("[MEMBERS_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userId } =await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });


    

    const body = await req.json();
    const { gymId, name, email, phone, dob, gender, address, emergencyContact, membershipPlanId } = body;

    const plan = await prisma.membershipPlan.findUnique({
      where: { id: membershipPlanId },
    })

    
    //compute expiryDate based on membership plan duration
    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(joinDate.getMonth() + plan.durationMonths);

    if (!gymId || !name) return new NextResponse("Missing fields", { status: 400 });

    const member = await prisma.member.create({
      data: {
        gymId,
        name,
        email,
        phone,
        dob: dob ? new Date(dob) : null,
        gender,
        address,
        emergencyContact,
        membershipPlanId,
        expiryDate,
      },
    });

    return NextResponse.json(member);
  } catch (err) {
    console.error("[MEMBERS_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
