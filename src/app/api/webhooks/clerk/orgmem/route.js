// import { Webhook } from "svix";
// import prisma from "@/lib/prisma";

// const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

// export async function POST(req) {
//   const payload = await req.text();
//   const headers = Object.fromEntries(req.headers);
  
//   const wh = new Webhook(CLERK_WEBHOOK_SECRET);
//   let evt;

//   try {
//     evt = wh.verify(payload, headers);
//   } catch (err) {
//     console.error("❌ Invalid Clerk webhook:", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   const { type, data } = evt;

//   try {
//     switch (type) {
//       case "user.created": {
//         console.log("✅ Clerk user created:", data.id, data.email_addresses?.[0]?.email_address);
//         break;
//       }

//       case "organizationMembership.created": {
//         const { organization, public_user_data } = data;
//         const userEmail = public_user_data?.identifier;
//         const userId = public_user_data?.user_id;

//         console.log(`✅ ${userEmail} joined org ${organization.id}`);

//         // Match staff by email, update with Clerk userId
//         await prisma.manager.updateMany({
//           where: { email: userEmail, clerkUserId: "" },
//           data: { clerkUserId: userId },
//         });

//         await prisma.trainer.updateMany({
//           where: { email: userEmail, clerkUserId: "" },
//           data: { clerkUserId: userId },
//         });

//         console.log(`🔗 Linked ${userEmail} → ${userId}`);
//         break;
//       }

//       default:
//         console.log("Unhandled event:", type);
//     }

//     return new Response("ok", { status: 200 });
//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     return new Response("Error", { status: 500 });
//   }
// }
