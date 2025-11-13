

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { gymID } = await params;
    const now = new Date();

    // Fetch members
    const members = await prisma.member.findMany({
      where: { gymId:gymID, deletedAt: null },
      select: {
        dob: true,
        gender: true,
        joinDate: true,
        expiryDate: true,
        status: true,
      },
    });

    const totalMembers = members.length;

    //  New this month
    const newThisMonth = members.filter((m) => {
      const d = new Date(m.joinDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    //  Active and expired plans
    const activePlans = members.filter(
      (m) => m.expiryDate && new Date(m.expiryDate) > now
    ).length;
    const expiredPlans = members.filter(
      (m) => m.expiryDate && new Date(m.expiryDate) <= now
    ).length;

    //  Gender stats
    const genderStats = members.reduce(
      (acc, m) => {
        if (m.gender === "MALE") acc.male++;
        else if (m.gender === "FEMALE") acc.female++;
        else acc.other++;
        return acc;
      },
      { male: 0, female: 0, other: 0 }
    );

    //  Average age
    const validAges = members
      .filter((m) => m.dob)
      .map((m) => {
        const diff = now - new Date(m.dob);
        return diff / (1000 * 60 * 60 * 24 * 365.25);
      });

    const avgAge =
      validAges.length > 0
        ? Math.round(validAges.reduce((a, b) => a + b, 0) / validAges.length)
        : null;

    return NextResponse.json({
      totalMembers,
      newThisMonth,
      activePlans,
      expiredPlans,
      genderStats,
      avgAge,
    });
  } catch (err) {
    console.error("❌ Error fetching member overview:", err);
    return NextResponse.json({ error: "Failed to load member overview" }, { status: 500 });
  }
}
