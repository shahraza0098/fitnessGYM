// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // ✅ GET — fetch members and today's attendance summary
// export async function GET(req, { params }) {
//   const { gymID } =await params;
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   // Fetch all members
//   const members = await prisma.member.findMany({
//     where: { gymId: gymID, deletedAt: null },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       membershipPlanId: true,
//     },
//   });

//   // Fetch today's attendance records
//   const todaysAttendance = await prisma.attendance.findMany({
//     where: {
//       gymId: gymID,
//       checkIn: { gte: startOfDay, lte: endOfDay },
//     },
//     select: {
//       id: true,
//       memberId: true,
//       checkIn: true,
//       checkOut: true,
//     },
//   });

//   // Fetch all attendance (for stats)
//   const allAttendance = await prisma.attendance.groupBy({
//     by: ["memberId"],
//     _count: { memberId: true },
//   });

//   // Build summary data
//   const totalMembers = members.length;
//   const presentToday = todaysAttendance.length;
//   const absentToday = totalMembers - presentToday;
//   const totalCheckIns = allAttendance.reduce((sum, r) => sum + r._count.memberId, 0);
//   const overallAttendanceRate = totalMembers
//     ? Math.round((totalCheckIns / (totalMembers * 30)) * 100)
//     : 0;

//   // Combine with per-member stats
//   const membersWithStats = await Promise.all(
//     members.map(async (m) => {
//       const attendanceRecords = await prisma.attendance.findMany({
//         where: { memberId: m.id },
//         orderBy: { checkIn: "desc" },
//       });

//       const totalPresent = attendanceRecords.length;
//       const totalAbsent = Math.max(0, 30 - totalPresent); // Example based on 30 days
//       let currentStreak = 0;

//       // Compute streak (continuous days present from last)
//       for (let i = 0; i < attendanceRecords.length - 1; i++) {
//         const d1 = new Date(attendanceRecords[i].checkIn);
//         const d2 = new Date(attendanceRecords[i + 1].checkIn);
//         const diff = (d1 - d2) / (1000 * 60 * 60 * 24);
//         if (diff <= 1.1) currentStreak++;
//         else break;
//       }

//       const isPresentToday = todaysAttendance.some((a) => a.memberId === m.id);

//       return {
//         ...m,
//         totalPresent,
//         totalAbsent,
//         currentStreak,
//         isPresentToday,
//       };
//     })
//   );

//   return NextResponse.json({
//     summary: {
//       totalMembers,
//       presentToday,
//       absentToday,
//       overallAttendanceRate,
//     },
//     members: membersWithStats,
//   });
// }

// // ✅ POST — mark attendance (check-in or check-out)
// export async function POST(req, { params }) {
//   const { gymID } = await params;
//   const { memberId, action, method = "MANUAL" } = await req.json();

//   if (!memberId || !action)
//     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

//   const now = new Date();

//   if (action === "CHECK_IN") {
//     const record = await prisma.attendance.create({
//       data: {
//         gymId: gymID,
//         memberId,
//         checkIn: now,
//         method,
//       },
//     });
//     return NextResponse.json({ success: true, record });
//   }

//   if (action === "CHECK_OUT") {
//     const today = new Date();
//     const startOfDay = new Date(today.setHours(0, 0, 0, 0));

//     const record = await prisma.attendance.findFirst({
//       where: {
//         gymId: gymID,
//         memberId,
//         checkIn: { gte: startOfDay },
//       },
//     });

//     if (!record) {
//       return NextResponse.json({ error: "No check-in found for today" }, { status: 404 });
//     }

//     const updated = await prisma.attendance.update({
//       where: { id: record.id },
//       data: { checkOut: now },
//     });

//     return NextResponse.json({ success: true, record: updated });
//   }

//   return NextResponse.json({ error: "Invalid action" }, { status: 400 });
// }


// //this is good but can be more better to avoid bugs
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // ✅ Helper: Get all working days excluding off days and future days
// async function getWorkingDaysInMonth(gymID, year, month) {
//   const today = new Date();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   // Fetch off days (weekly + custom)
//   const offDays = await prisma.gymOffDay.findMany({
//     where: { gymId: gymID },
//     select: { date: true, dayOfWeek: true },
//   });

//   const oneTimeOffs = new Set(
//     offDays
//       .filter((d) => d.date)
//       .map((d) => new Date(d.date).toDateString())
//   );

//   const weeklyOffs = new Set(
//     offDays
//       .filter((d) => d.dayOfWeek)
//       .map((d) => d.dayOfWeek)
//   );

//   const workingDays = [];
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(year, month, day);
//     if (date > today) break; // Skip future days

//     const dayName = date.toLocaleDateString("en-US", {
//       weekday: "long",
//     }).toUpperCase();

//     const isWeeklyOff = weeklyOffs.has(dayName);
//     const isHoliday = oneTimeOffs.has(date.toDateString());

//     if (!isWeeklyOff && !isHoliday) {
//       workingDays.push(date);
//     }
//   }

//   return workingDays;
// }

// // ✅ GET — Fetch Attendance Overview + Member Cards
// export async function GET(req, { params }) {
//   const { gymID } = await params;
//   const searchParams = new URL(req.url).searchParams;
//   const year = parseInt(searchParams.get("year") || new Date().getFullYear());
//   const month = parseInt(searchParams.get("month") || new Date().getMonth());

//   const members = await prisma.member.findMany({
//     where: { gymId: gymID, deletedAt: null },
//     select: { id: true, name: true },
//   });

//   const attendances = await prisma.attendance.findMany({
//     where: {
//       gymId: gymID,
//       checkIn: {
//         gte: new Date(year, month, 1),
//         lt: new Date(year, month + 1, 1),
//       },
//     },
//   });

//   const workingDays = await getWorkingDaysInMonth(gymID, year, month);

//   const data = members.map((m) => {
//     const memberAttendances = attendances.filter((a) => a.memberId === m.id);
//     const totalPresent = memberAttendances.length;

//     // only count past working days for absences
//     const totalAbsent = Math.max(
//       0,
//       workingDays.length - totalPresent
//     );

//     const presentDates = memberAttendances.map((a) =>
//       new Date(a.checkIn).toDateString()
//     );

//     return {
//       id: m.id,
//       name: m.name,
//       totalPresent,
//       totalAbsent,
//       streak: getStreak(presentDates, workingDays),
//       hasCheckedInToday: presentDates.includes(new Date().toDateString()),
//       checkOutDone: memberAttendances.some(
//         (a) =>
//           new Date(a.checkIn).toDateString() === new Date().toDateString() &&
//           a.checkOut
//       ),
//     };
//   });

//   return NextResponse.json({ members: data });
// }

// // ✅ Helper: Calculate streaks (consecutive present days)
// function getStreak(presentDates, workingDays) {
//   const sortedWorking = workingDays.map((d) => d.toDateString());
//   let streak = 0;

//   for (let i = sortedWorking.length - 1; i >= 0; i--) {
//     if (presentDates.includes(sortedWorking[i])) streak++;
//     else break;
//   }

//   return streak;
// }

// // ✅ POST — Mark Check-in
// export async function POST(req, { params }) {
//   const { gymID } =await params;
//   const body = await req.json();
//   const { memberId, method } = body;

//   const today = new Date();
//   const existing = await prisma.attendance.findFirst({
//     where: {
//       gymId: gymID,
//       memberId,
//       checkIn: {
//         gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
//       },
//     },
//   });

//   if (existing)
//     return NextResponse.json({ message: "Already checked in today" }, { status: 400 });

//   const attendance = await prisma.attendance.create({
//     data: {
//       gymId: gymID,
//       memberId,
//       checkIn: today,
//       method: method || "MANUAL",
//     },
//   });

//   return NextResponse.json(attendance);
// }

// // ✅ PATCH — Mark Checkout
// export async function PATCH(req, { params }) {
//   const { gymID } = params;
//   const body = await req.json();
//   const { memberId } = body;

//   const today = new Date();
//   const attendance = await prisma.attendance.findFirst({
//     where: {
//       gymId: gymID,
//       memberId,
//       checkIn: {
//         gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
//       },
//     },
//   });

//   if (!attendance)
//     return NextResponse.json({ message: "No check-in found" }, { status: 404 });

//   if (attendance.checkOut)
//     return NextResponse.json({ message: "Already checked out" }, { status: 400 });

//   const updated = await prisma.attendance.update({
//     where: { id: attendance.id },
//     data: { checkOut: new Date() },
//   });

//   return NextResponse.json(updated);
// }

// //some improvements made to avoid bugs
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // ✅ Utility: Calculate streaks (consecutive present working days)
// function calculateStreak(presentDates, workingDays) {
//   const sortedWorking = workingDays.map((d) => d.toDateString());
//   let streak = 0;
//   for (let i = sortedWorking.length - 1; i >= 0; i--) {
//     if (presentDates.includes(sortedWorking[i])) streak++;
//     else break;
//   }
//   return streak;
// }

// // ✅ Utility: Get all valid working days in month (excluding off days + future)
// async function getWorkingDaysInMonth(gymId, year, month) {
//   const today = new Date();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const offDays = await prisma.gymOffDay.findMany({
//     where: { gymId },
//     select: { date: true, dayOfWeek: true },
//   });

//   const oneTimeOffs = new Set(
//     offDays
//       .filter((d) => d.date)
//       .map((d) => new Date(d.date).toDateString())
//   );

//   const weeklyOffs = new Set(
//     offDays
//       .filter((d) => d.dayOfWeek)
//       .map((d) => d.dayOfWeek)
//   );

//   const workingDays = [];
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(year, month, day);
//     if (date > today) break; // Skip future days

//     const dayName = date
//       .toLocaleDateString("en-US", { weekday: "long" })
//       .toUpperCase();

//     const isWeeklyOff = weeklyOffs.has(dayName);
//     const isHoliday = oneTimeOffs.has(date.toDateString());

//     if (!isWeeklyOff && !isHoliday) workingDays.push(date);
//   }

//   return workingDays;
// }

// /* -------------------------------------------------------------------------- */
// /*                                GET REQUEST                                 */
// /* -------------------------------------------------------------------------- */

// export async function GET(req, { params }) {
//   try {
//     const { gymID } =await  params;
//     if (!gymID)
//       return NextResponse.json({ error: "Missing gym ID" }, { status: 400 });

//     const searchParams = new URL(req.url).searchParams;
//     const year = parseInt(searchParams.get("year")) || new Date().getFullYear();
//     const month =
//       parseInt(searchParams.get("month")) || new Date().getMonth();

//     const [members, attendances, workingDays] = await Promise.all([
//       prisma.member.findMany({
//         where: { gymId: gymID, deletedAt: null },
//         select: { id: true, name: true },
//       }),
//       prisma.attendance.findMany({
//         where: {
//           gymId: gymID,
//           checkIn: {
//             gte: new Date(year, month, 1),
//             lt: new Date(year, month + 1, 1),
//           },
//         },
//         select: { id: true, memberId: true, checkIn: true, checkOut: true },
//       }),
//       getWorkingDaysInMonth(gymID, year, month),
//     ]);

//     const data = members.map((member) => {
//       const records = attendances.filter((a) => a.memberId === member.id);
//       const presentDates = records.map((a) =>
//         new Date(a.checkIn).toDateString()
//       );
//       const totalPresent = records.length;
//       const totalAbsent = Math.max(0, workingDays.length - totalPresent);
//       const streak = calculateStreak(presentDates, workingDays);
//       const hasCheckedInToday = presentDates.includes(
//         new Date().toDateString()
//       );
//       const checkOutDone = records.some(
//         (a) =>
//           new Date(a.checkIn).toDateString() === new Date().toDateString() &&
//           a.checkOut
//       );

//       return {
//         id: member.id,
//         name: member.name,
//         totalPresent,
//         totalAbsent,
//         streak,
//         hasCheckedInToday,
//         checkOutDone,
//       };
//     });

//     return NextResponse.json({ members: data });
//   } catch (error) {
//     console.error("Error in GET /attendance:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch attendance data" },
//       { status: 500 }
//     );
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                               POST REQUEST                                 */
// /* -------------------------------------------------------------------------- */
// // ✅ Mark Check-in
// export async function POST(req, { params }) {
//   try {
//     const { gymID } =await params;
//     const { memberId, method = "MANUAL" } = await req.json();

//     if (!memberId)
//       return NextResponse.json(
//         { error: "Member ID is required" },
//         { status: 400 }
//       );

//     const today = new Date();
//     const startOfToday = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate()
//     );

//     const existing = await prisma.attendance.findFirst({
//       where: {
//         gymId: gymID,
//         memberId,
//         checkIn: { gte: startOfToday },
//       },
//     });

//     if (existing)
//       return NextResponse.json(
//         { message: "Already checked in today" },
//         { status: 400 }
//       );

//     const attendance = await prisma.attendance.create({
//       data: { gymId: gymID, memberId, checkIn: today, method },
//     });

//     return NextResponse.json(attendance);
//   } catch (error) {
//     console.error("Error in POST /attendance:", error);
//     return NextResponse.json(
//       { error: "Failed to check in" },
//       { status: 500 }
//     );
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                              PATCH REQUEST                                 */
// /* -------------------------------------------------------------------------- */
// // ✅ Mark Checkout
// export async function PATCH(req, { params }) {
//   try {
//     const { gymID } = await params;
//     const { memberId } = await req.json();

//     if (!memberId)
//       return NextResponse.json(
//         { error: "Member ID is required" },
//         { status: 400 }
//       );

//     const today = new Date();
//     const startOfToday = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate()
//     );

//     const attendance = await prisma.attendance.findFirst({
//       where: {
//         gymId: gymID,
//         memberId,
//         checkIn: { gte: startOfToday },
//       },
//     });

//     if (!attendance)
//       return NextResponse.json(
//         { message: "No check-in found for today" },
//         { status: 404 }
//       );

//     if (attendance.checkOut)
//       return NextResponse.json(
//         { message: "Already checked out" },
//         { status: 400 }
//       );

//     const updated = await prisma.attendance.update({
//       where: { id: attendance.id },
//       data: { checkOut: new Date() },
//     });

//     return NextResponse.json(updated);
//   } catch (error) {
//     console.error("Error in PATCH /attendance:", error);
//     return NextResponse.json(
//       { error: "Failed to check out" },
//       { status: 500 }
//     );
//   }
// }




//responding line chart data also

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { subDays, eachDayOfInterval, format } from "date-fns";

/* -------------------------------------------------------------------------- */
/*                              Utility Functions                             */
/* -------------------------------------------------------------------------- */

// ✅ Calculate streaks (consecutive present working days)
function calculateStreak(presentDates, workingDays) {
  const sortedWorking = workingDays.map((d) => d.toDateString());
  let streak = 0;
  for (let i = sortedWorking.length - 1; i >= 0; i--) {
    if (presentDates.includes(sortedWorking[i])) streak++;
    else break;
  }
  return streak;
}

// ✅ Get all valid working days in month (excluding off days + future)
async function getWorkingDaysInMonth(gymId, year, month) {
  const today = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const offDays = await prisma.gymOffDay.findMany({
    where: { gymId },
    select: { date: true, dayOfWeek: true },
  });

  const oneTimeOffs = new Set(
    offDays.filter((d) => d.date).map((d) => new Date(d.date).toDateString())
  );

  const weeklyOffs = new Set(
    offDays.filter((d) => d.dayOfWeek).map((d) => d.dayOfWeek)
  );

  const workingDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    if (date > today) break; // skip future days
    const dayName = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    const isWeeklyOff = weeklyOffs.has(dayName);
    const isHoliday = oneTimeOffs.has(date.toDateString());
    if (!isWeeklyOff && !isHoliday) workingDays.push(date);
  }

  return workingDays;
}

/* -------------------------------------------------------------------------- */
/*                                GET REQUEST                                 */
/* -------------------------------------------------------------------------- */
export async function GET(req, { params }) {
  try {
    const { gymID } = await params;
    if (!gymID)
      return NextResponse.json({ error: "Missing gym ID" }, { status: 400 });

    const searchParams = new URL(req.url).searchParams;
    const year = parseInt(searchParams.get("year")) || new Date().getFullYear();
    const month = parseInt(searchParams.get("month")) || new Date().getMonth();

    // Parallel queries
    const [members, attendances, workingDays] = await Promise.all([
      prisma.member.findMany({
        where: { gymId: gymID, deletedAt: null },
        select: { id: true, name: true },
      }),
      prisma.attendance.findMany({
        where: {
          gymId: gymID,
          checkIn: {
            gte: new Date(year, month, 1),
            lt: new Date(year, month + 1, 1),
          },
        },
        select: { id: true, memberId: true, checkIn: true, checkOut: true },
      }),
      getWorkingDaysInMonth(gymID, year, month),
    ]);

    /* --------------------------- Members Statistics --------------------------- */
    const data = members.map((member) => {
      const records = attendances.filter((a) => a.memberId === member.id);
      const presentDates = records.map((a) =>
        new Date(a.checkIn).toDateString()
      );

      const totalPresent = records.length;
      const totalAbsent = Math.max(0, workingDays.length - totalPresent);
      const streak = calculateStreak(presentDates, workingDays);
      const hasCheckedInToday = presentDates.includes(
        new Date().toDateString()
      );
      const checkOutDone = records.some(
        (a) =>
          new Date(a.checkIn).toDateString() === new Date().toDateString() &&
          a.checkOut
      );

      return {
        id: member.id,
        name: member.name,
        totalPresent,
        totalAbsent,
        streak,
        hasCheckedInToday,
        checkOutDone,
      };
    });

    /* --------------------------- Trend Data for Charts --------------------------- */
    // Get attendance counts for last 30 days
    const today = new Date();
    const last30Days = eachDayOfInterval({
      start: subDays(today, 29),
      end: today,
    });

    const trendData = await Promise.all(
      last30Days.map(async (day) => {
        const start = new Date(day.setHours(0, 0, 0, 0));
        const end = new Date(day.setHours(23, 59, 59, 999));
        const count = await prisma.attendance.count({
          where: {
            gymId: gymID,
            checkIn: { gte: start, lte: end },
          },
        });
        return { date: format(start, "MMM d"), count };
      })
    );

    // Pie chart data
    const presentToday = data.filter((m) => m.hasCheckedInToday).length;
    const absentToday = data.length - presentToday;

    return NextResponse.json({
      members: data,
      trendData,
      summary: { presentToday, absentToday, totalMembers: data.length },
    });
  } catch (error) {
    console.error("Error in GET /attendance:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                               POST REQUEST                                 */
/* -------------------------------------------------------------------------- */
// ✅ Mark Check-in
export async function POST(req, { params }) {
  try {
    const { gymID } = await params;
    const { memberId, method = "MANUAL" } = await req.json();

    if (!memberId)
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const existing = await prisma.attendance.findFirst({
      where: {
        gymId: gymID,
        memberId,
        checkIn: { gte: startOfToday },
      },
    });

    if (existing)
      return NextResponse.json(
        { message: "Already checked in today" },
        { status: 400 }
      );

    const attendance = await prisma.attendance.create({
      data: { gymId: gymID, memberId, checkIn: today, method },
    });

    return NextResponse.json(attendance);
  } catch (error) {
    console.error("Error in POST /attendance:", error);
    return NextResponse.json({ error: "Failed to check in" }, { status: 500 });
  }
}

/* -------------------------------------------------------------------------- */
/*                              PATCH REQUEST                                 */
/* -------------------------------------------------------------------------- */
// ✅ Mark Checkout
export async function PATCH(req, { params }) {
  try {
    const { gymID } = await params;
    const { memberId } = await req.json();

    if (!memberId)
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const attendance = await prisma.attendance.findFirst({
      where: {
        gymId: gymID,
        memberId,
        checkIn: { gte: startOfToday },
      },
    });

    if (!attendance)
      return NextResponse.json(
        { message: "No check-in found for today" },
        { status: 404 }
      );

    if (attendance.checkOut)
      return NextResponse.json(
        { message: "Already checked out" },
        { status: 400 }
      );

    const updated = await prisma.attendance.update({
      where: { id: attendance.id },
      data: { checkOut: new Date() },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error in PATCH /attendance:", error);
    return NextResponse.json({ error: "Failed to check out" }, { status: 500 });
  }
}
