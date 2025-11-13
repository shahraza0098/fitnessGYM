import nodemailer from "nodemailer";

/**
 * Sends a weekly diet plan email to a member.
 * @param {Object} params
 * @param {string} params.to - Member's email address.
 * @param {string} params.name - Member's name.
 * @param {Object} params.plan - Full diet plan JSON (with weekStart, weekEnd, days).
 * @param {string} params.trainerName - Trainer's name.
 */
export async function sendDietPlanEmail({ memberId, plan}) {

    console.log("📧 Preparing to send diet plan email to member ID:", memberId);
    // console.log("📧 Plan details:", plan);
    // console.log("📧 Trainer ID:");

    //make dynamic fetch of member and trainer details
    const member = await prisma.member.findUnique({
        where: { id: memberId },
      });
      

        const to = member?.email;
        const name = member?.name;
        const trainerName= "Bruce Lee"; //hardcoded for now
  if (!to || !plan) {
    console.error("❌ Missing recipient email or plan data");
    return;
  }

  // -------------------------------
  // ⚙️ Configure Transporter
  // -------------------------------
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com", // change if using another SMTP provider
    port: 465,
    secure: true,
    auth: {
    //   user: process.env.EMAIL_USER, // e.g. "yourgym@gmail.com"
    //   pass: process.env.EMAIL_PASS, // app password or SMTP password

        user: "razashahk007@gmail.com",
    pass: "lvntvsmoshalqoiv",
    },
  });

  // -------------------------------
  // 🗓️ Build Plan HTML Table
  // -------------------------------
  const planHTML = plan?.days
    ?.map(
      (day) => `
      <div style="margin-bottom:20px;">
        <h3 style="color:#e67e22;">${day.dayOfWeek}</h3>
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="border:1px solid #ddd; padding:6px;">Meal</th>
              <th style="border:1px solid #ddd; padding:6px;">Title</th>
              <th style="border:1px solid #ddd; padding:6px;">Calories</th>
            </tr>
          </thead>
          <tbody>
            ${day.meals
              .map(
                (meal) => `
              <tr>
                <td style="border:1px solid #ddd; padding:6px;">${meal.type}</td>
                <td style="border:1px solid #ddd; padding:6px;">${meal.title}</td>
                <td style="border:1px solid #ddd; padding:6px; text-align:center;">${
                  meal.calories
                }</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `
    )
    .join("");

  const weekStart = plan?.weekStart
    ? new Date(plan.weekStart).toLocaleDateString()
    : "N/A";
  const weekEnd = plan?.weekEnd
    ? new Date(plan.weekEnd).toLocaleDateString()
    : "N/A";

  // -------------------------------
  // 📩 Build Email
  // -------------------------------
  const mailOptions = {
    from: `"${trainerName || "Your Trainer"}" `,
    to,
    subject: `Your Weekly Diet Plan (${weekStart} - ${weekEnd})`,
    html: `
      <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">
        <h2>Hi ${name},</h2>
        <p>Your personalized diet plan is ready! Please follow this meal schedule carefully to achieve your fitness goals.</p>
        <p><b>Trainer:</b> ${trainerName || "Assigned Gym Trainer"}</p>
        <hr />
        ${planHTML}
        <hr />
        <p style="color:#555;">Stay consistent and hydrate well throughout the week.</p>
        <p>Best,<br/><b>${trainerName || "Your Gym Team"}</b></p>
      </div>
    `,
  };

  // -------------------------------
  // 🚀 Send Email
  // -------------------------------
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Diet Plan Email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    return { success: false, error: err.message };
  }
}
