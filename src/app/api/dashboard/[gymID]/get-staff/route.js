import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const {gymID}= await params;   // dynamic folder: /api/staff/[gymId]
    const searchParams = new URL(req.url).searchParams;

    const staffType = searchParams.get("staffType");

    if (!staffType) {
      return NextResponse.json(
        { message: "staffType is required" },
        { status: 400 }
      );
    }

    if (!gymID) {
      return NextResponse.json(
        { message: "gymId is missing" },
        { status: 400 }
      );
    }

    // -----------------------------
    // Manager query
    // -----------------------------
    if (staffType.toLowerCase() === "manager") {
      const managers = await prisma.manager.findMany({
        where: { gymId:gymID },
        
      });

      console.log("manager in server"), managers;
      
      return NextResponse.json({ success: true, data: managers });
    }

    // -----------------------------
    // Trainer query
    // -----------------------------
    if (staffType.toLowerCase() === "trainer") {
      const trainers = await prisma.trainer.findMany({
        where: { gymId : gymID},
      
      });

      console.log("trainer on server", trainers);
      

      return NextResponse.json({ success: true, data: trainers });
    }

    // -----------------------------
    // Invalid staff type
    // -----------------------------
    return NextResponse.json(
      { message: "Invalid staffType. Use 'manager' or 'trainer'." },
      { status: 400 }
    );
  } catch (error) {
    console.error("GET STAFF ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
