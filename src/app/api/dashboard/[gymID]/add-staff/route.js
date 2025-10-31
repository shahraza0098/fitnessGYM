// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function POST(req, { params }) {
//   try {
//     const { userId } = await auth();
//     console.log("this is user ID", userId);
    
//     if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

//     const { gymId, type, name, email, phone, permissions, specialty, experience } = await req.json();

//     if (!gymId || !type) {
//       return Response.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     let staff;
//     if (type === "MANAGER") {
//       staff = await prisma.manager.create({
//         data: { gymId, clerkUserId: "", name, email, phone, permissions: permissions || [] },
//       });
//     } else if (type === "TRAINER") {
//       staff = await prisma.trainer.create({
//         data: { gymId, clerkUserId: "", name, email, phone, specialty, experience: Number(experience) || 0, certifications: [], permissions: permissions || [] },
//       });
//     } else {
//       return Response.json({ error: "Invalid staff type" }, { status: 400 });
//     }

//     return Response.json(staff, { status: 201 });
//   } catch (error) {
//     console.error("Error creating staff:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const gymId = searchParams.get("gymId");
//     const type = searchParams.get("type");

//     if (!gymId) return Response.json({ error: "Gym ID required" }, { status: 400 });

//     let staff = [];
//     if (type === "MANAGER") {
//       staff = await prisma.manager.findMany({ where: { gymId } });
//     } else if (type === "TRAINER") {
//       staff = await prisma.trainer.findMany({ where: { gymId } });
//     } else {
//       const [managers, trainers] = await Promise.all([
//         prisma.manager.findMany({ where: { gymId } }),
//         prisma.trainer.findMany({ where: { gymId } }),
//       ]);
//       staff = [...managers, ...trainers];
//     }

//     return Response.json(staff);
//   } catch (error) {
//     console.error("Error fetching staff:", error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createUserAndAddToOrg } from "@/lib/clerkOrg";

export async function POST(req, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    // const { gymId } = params;
     const { gymId, type, name, email, phone, permissions, specialty, experience } = await req.json();
    // const { type, name, email, phone, permissions, specialty, experience } = await req.json();

    if (!gymId || !type || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find the gym to get its Clerk organization ID
    const gym = await prisma.gym.findUnique({
      where: { id: gymId },
      select: { clerkOrgId: true },
    });

    if (!gym?.clerkOrgId)
      return Response.json({ error: "Gym not linked with Clerk organization" }, { status: 400 });

    // 🔹 Invite user to Clerk org
    const clerkUserId = await createUserAndAddToOrg({
      orgId: gym.clerkOrgId,
      email,
      name,
      role: type,
    });

    // 🔹 Create staff record in DB
    let staff;
    if (type === "MANAGER") {
      staff = await prisma.manager.create({
        data: {
          gymId,
          clerkUserId,
          name,
          email,
          phone,
          permissions: permissions || [],
        },
      });
    } else if (type === "TRAINER") {
      staff = await prisma.trainer.create({
        data: {
          gymId,
          clerkUserId,
          name,
          email,
          phone,
          specialty,
          experience: Number(experience) || 0,
          certifications: [],
          permissions: permissions || [],
        },
      });
    } else {
      return Response.json({ error: "Invalid staff type" }, { status: 400 });
    }

    return Response.json(staff, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating staff:", error);
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