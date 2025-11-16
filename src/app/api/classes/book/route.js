// app/api/classes/book/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { classId, memberId } = await req.json();

    const classData = await prisma.classSchedule.findUnique({
      where: { id: classId },
      include: { bookings: true },
    });

    if (!classData) throw new Error("Class not found");

    if (classData.bookings.length >= classData.capacity) {
      return NextResponse.json({ success: false, message: "Class full!" });
    }

    await prisma.booking.create({
      data: {
        gymId: classData.gymId,
        classId,
        memberId,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({ success: true, message: "Booking confirmed!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
