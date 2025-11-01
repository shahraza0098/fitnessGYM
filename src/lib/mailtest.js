import nodemailer from "nodemailer";

export async function sendExpiryEmail({ to, name, plan, expiryDate, daysLeft }) {
  if (!to) return;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

  const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.example.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    // user: process.env.EMAIL_USER,
    // pass: process.env.EMAIL_PASS,
    user: "razashahk007@gmail.com",
    pass: "lvntvsmoshalqoiv",
  },
});

  const formattedDate = new Date(expiryDate).toLocaleDateString();

  const mailOptions = {
    from: `"Gym Management" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your ${plan} plan expires in ${daysLeft} days`,
    html: `
      <h3>Hi ${name},</h3>
      <p>This is a friendly reminder that your <b>${plan}</b> membership plan will expire on <b>${formattedDate}</b>.</p>
      <p>Please renew before expiry to continue uninterrupted access.</p>
      <p>– Gym Management</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
}

// ✅ Example call (for local test)

