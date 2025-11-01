import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    // You might get member data from the request body
  const gymId = "cmhbk59xj0003umigm080hoqd"; // Example gym ID

  

    const notify = await prisma.notification.create({
      data: {
        gymId,
        type: "PLAN_EXPIRY_SOON",
        audience: "SYSTEM",
        message: "Membership is going to expire soon. for Test User",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
      notification: notify,
    });
  } catch (error) {
    console.error("[NOTIFICATION_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send notification",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
