import  prisma  from "@/lib/prisma";
import { sendExpiryEmail } from "@/lib/mailer";

export async function GET() {


  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  const now = new Date();
  const next7Days = new Date();
  next7Days.setDate(now.getDate() + 7);

  const expiringSoon = await prisma.member.findMany({
    where: {
      expiryDate: { gt: now, lt: next7Days },
      status: "ACTIVE",
    },
    include: { gym: true, membershipPlan: true },
  });

  const expired = await prisma.member.findMany({
    where: {
      expiryDate: { lt: now },
      status: "ACTIVE",
    },
    include: { gym: true, membershipPlan: true },
  });

  // 🔸 For each expiring soon member
  for (const member of expiringSoon) {
    await prisma.notification.create({
      data: {
        gymId: member.gymId,
        type: "PLAN_EXPIRY_SOON",
        audience: "SYSTEM",
        memberId: member.id,
        message: `Membership for ${member.name} (${member.membershipPlan?.name}) is expiring on ${new Date(member.expiryDate).toLocaleDateString()}.`,
      },
    });

    await sendExpiryEmail({
      to: member.email,
      name: member.name,
      plan: member.membershipPlan?.name,
      expiryDate: member.expiryDate,
      daysLeft: Math.ceil(
        (member.expiryDate - now) / (1000 * 60 * 60 * 24)
      ),
    });
  }

  // 🔸 For each expired member
  for (const member of expired) {
    await prisma.notification.create({
      data: {
        gymId: member.gymId,
        type: "PLAN_EXPIRED",
        audience: "SYSTEM",
        memberId: member.id,
        message: `Membership for ${member.name} has expired.`,
      },
    });

    await prisma.member.update({
      where: { id: member.id },
      data: { status: "EXPIRED" },
    });
  }

  return Response.json({
    message: `Notifications added: ${expiringSoon.length + expired.length}`,
  });
}
