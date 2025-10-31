

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// /**
//  * GET: Fetch all active membership plans for a gym
//  */
// export async function GET(req, { params }) {
//   const { gymID } =await params;

//   try {
//     if (!gymID) {
//       return NextResponse.json({ error: "Gym ID is required" }, { status: 400 });
//     }

//     const plans = await prisma.membershipPlan.findMany({
//       where: { gymId:gymID, deletedAt: null },
//       orderBy: { createdAt: "desc" },
//     });

//     // Handle empty case gracefully
//     if (!plans || plans.length === 0) {
//       return NextResponse.json({
//         message: "No membership plans found for this gym.",
//         plans: [],
//       });
//     }

//     // return NextResponse.json({ plans });
//     return NextResponse.json(plans || []);
//   } catch (err) {
//     console.error("❌ Error fetching membership plans:", err);
//     return NextResponse.json({ error: "Failed to load plans" }, { status: 500 });
//   }
// }

// /**
//  * POST: Create a new membership plan
//  */
// export async function POST(req, { params }) {
//   const { gymID } =await params;

//   try {
//     if (!gymID) {
//       return NextResponse.json({ error: "Gym ID is required" }, { status: 400 });
//     }

//     const body = await req.json();
//     const { name, durationMonths, price, benefits, autoRenew } = body;

//     // Basic validation
//     if (!name || !durationMonths || !price) {
//       return NextResponse.json(
//         { error: "Name, duration, and price are required" },
//         { status: 400 }
//       );
//     }

//     const parsedDuration = parseInt(durationMonths);
//     if (isNaN(parsedDuration) || parsedDuration <= 0) {
//       return NextResponse.json(
//         { error: "Duration must be a valid number greater than 0" },
//         { status: 400 }
//       );
//     }

//     const plan = await prisma.membershipPlan.create({
//       data: {
//         gymId: gymID,
//         name,
//         durationMonths: parsedDuration,
//         price: parseFloat(price),
//         benefits: Array.isArray(benefits)
//           ? benefits
//           : typeof benefits === "string"
//           ? benefits.split(",").map((b) => b.trim())
//           : [],
//         autoRenew: !!autoRenew,
//       },
//     });

//     return NextResponse.json(plan, { status: 201 });
//   } catch (err) {
//     console.error("❌ Error creating membership plan:", err);
//     return NextResponse.json({ error: "Failed to create plan" }, { status: 500 });
//   }
// }



import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { gymID } =await params;

  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { gymId:gymID, deletedAt: null },
      // removed invalid orderBy
      orderBy: { name: "asc" },
    });

    // Always return an array, even if empty
    return NextResponse.json(plans || []);
  } catch (err) {
    console.error("❌ Error fetching membership plans:", err);
    return NextResponse.json(
      { error: "Failed to load plans", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  const { gymID } = await params;

  try {
    const body = await req.json();
    const { name, durationMonths, price, benefits, autoRenew } = body;

    const plan = await prisma.membershipPlan.create({
      data: {
        gymId: gymID,
        name,
        durationMonths: parseInt(durationMonths),
        price,
        benefits,
        autoRenew,
      },
    });

    return NextResponse.json(plan);
  } catch (err) {
    console.error("❌ Error creating membership plan:", err);
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 500 }
    );
  }
}
