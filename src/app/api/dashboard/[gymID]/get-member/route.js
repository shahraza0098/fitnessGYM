import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { gymID } = await params;
    const { searchParams } = new URL(req.url);
    const memberName = searchParams.get("memberName");

    // ❗ If no name provided, avoid fetching all members
    if (!memberName || memberName.trim() === "") {
      return NextResponse.json({
        success: true,
        member: [], // return empty array
        message: "No member name provided — skipped heavy query.",
      });
    }

    const member = await prisma.member.findMany({
      where: {
        gymId: gymID,
        deletedAt: null,
        name: {
          contains: memberName,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    console.log("getting member from grt-member api", member)

    // 🧩 If no matches
    if (!member || member.length === 0) {
      return NextResponse.json(
        { success: false, error: "No matching member found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("❌ Error fetching member:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch member" },
      { status: 500 }
    );
  }
}
