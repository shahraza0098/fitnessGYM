// import prisma  from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req, { params }) {
//   const { gymID } = await params;
//   const { searchParams } = new URL(req.url);
//   console.log("gymID:", gymID);
//   console.log("searchParams:", searchParams.toString());
//   const year = parseInt(searchParams.get("year") || new Date().getFullYear());

//   const members = await prisma.member.findMany({
//     where: {
//       gymId:gymID,
//       deletedAt: null,
//     },
//     select: { joinDate: true },
//   });

//   // Group by month
//   const monthlyData = Array(12).fill(0);
//   for (const member of members) {
//     const joinDate = new Date(member.joinDate);
//     if (joinDate.getFullYear() === year) {
//       const monthIndex = joinDate.getMonth();
//       monthlyData[monthIndex]++;
//     }
//   }

//   const data = monthlyData.map((count, i) => ({
//     label: new Date(0, i).toLocaleString("default", { month: "short" }),
//     count,
//   }));

//   console.log("Join stats data:", data);

//   return NextResponse.json(data);
// }



import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { gymID } = await params;
  const { searchParams } = new URL(req.url);

  const year = parseInt(searchParams.get("year") || new Date().getFullYear());
  const month = searchParams.get("month") ? parseInt(searchParams.get("month")) : null;

  const members = await prisma.member.findMany({
    where: {
      gymId: gymID,
      deletedAt: null,
      joinDate: {
        gte: new Date(year, month ? month - 1 : 0, 1),
        lt: new Date(year, month ? month : 12, month ? 1 : 31),
      },
    },
    select: { joinDate: true },
  });

  let data = [];

  if (month) {
    // 📅 MONTHLY VIEW — Group by day
    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyData = Array(daysInMonth).fill(0);

    for (const member of members) {
      const joinDate = new Date(member.joinDate);
      if (
        joinDate.getFullYear() === year &&
        joinDate.getMonth() + 1 === month
      ) {
        const dayIndex = joinDate.getDate() - 1;
        dailyData[dayIndex]++;
      }
    }

    data = dailyData.map((count, i) => ({
      label: `${i + 1}`, // Day label
      count,
    }));
  } else {
    // 📆 YEARLY VIEW — Group by month
    const monthlyData = Array(12).fill(0);
    for (const member of members) {
      const joinDate = new Date(member.joinDate);
      if (joinDate.getFullYear() === year) {
        const monthIndex = joinDate.getMonth();
        monthlyData[monthIndex]++;
      }
    }

    data = monthlyData.map((count, i) => ({
      label: new Date(0, i).toLocaleString("default", { month: "short" }),
      count,
    }));
  }

  // console.log("Join stats data:", { view: month ? "monthly" : "yearly", data });

  return NextResponse.json(data);
}
