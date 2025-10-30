import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  try {
    const { userId } = await auth();
    console.log("this is user ID", userId);
    
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { gymId, type, name, email, phone, permissions, specialty, experience } = await req.json();

    if (!gymId || !type) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    let staff;
    if (type === "MANAGER") {
      staff = await prisma.manager.create({
        data: { gymId, clerkUserId: "", name, email, phone, permissions: permissions || [] },
      });
    } else if (type === "TRAINER") {
      staff = await prisma.trainer.create({
        data: { gymId, clerkUserId: "", name, email, phone, specialty, experience: Number(experience) || 0, certifications: [], permissions: permissions || [] },
      });
    } else {
      return Response.json({ error: "Invalid staff type" }, { status: 400 });
    }

    return Response.json(staff, { status: 201 });
  } catch (error) {
    console.error("Error creating staff:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");
    const type = searchParams.get("type");

    if (!gymId) return Response.json({ error: "Gym ID required" }, { status: 400 });

    let staff = [];
    if (type === "MANAGER") {
      staff = await prisma.manager.findMany({ where: { gymId } });
    } else if (type === "TRAINER") {
      staff = await prisma.trainer.findMany({ where: { gymId } });
    } else {
      const [managers, trainers] = await Promise.all([
        prisma.manager.findMany({ where: { gymId } }),
        prisma.trainer.findMany({ where: { gymId } }),
      ]);
      staff = [...managers, ...trainers];
    }

    return Response.json(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
