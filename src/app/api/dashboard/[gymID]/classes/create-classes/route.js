// app/api/classes/create/route.js
import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import nodemailer from "nodemailer";



export async function POST(req,{params}) {
  try {

    const {gymID}= await params;
    const body = await req.json();
    const { name, start,trainerId, end, capacity } = body;
  
    // const trainerId="cmhd8ywp10001umbkwihd2w7r"

    // Create class

    const trainer= await prisma.trainer.findUnique({
      where:{
        id:trainerId
      }
    })


    const trainerName=trainer?.name
    const newClass = await prisma.classSchedule.create({
      data: { gymId:gymID, name, trainerId, start:new Date(start), end: new Date(end), capacity:parseInt(capacity) },
    });

    // Fetch all active members
    const members = await prisma.member.findMany({
      where: { gymId:gymID },
      select: { id: true, email: true, name: true },
    });


    //node mailer configuration step:

    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        // user: process.env.EMAIL_USER,
        // pass: process.env.EMAIL_PASS,
        user: "razashahk007@gmail.com",
        pass: "lvntvsmoshalqoiv",
      },
    });
    



    // Send email to all members
    for (const member of members) {
      const bookingLink = `${process.env.NEXT_PUBLIC_DOMAIN}/book-class/${newClass.id}?memberId=${member.id}`;

    //   await resend.emails.send({
    //     from: "Gym Scheduler <no-reply@yourgym.com>",
    //     to: member.email,
    //     subject: `New Class Available: ${newClass.name}`,
    //     html: `
    //       <h2>New Class Scheduled!</h2>
    //       <p><strong>${newClass.name}</strong></p>
    //       <p>${new Date(newClass.start).toLocaleString()}</p>
    //       <p>Trainer: ${trainerId || "TBA"}</p>
    //       <a href="${bookingLink}" style="display:inline-block;margin-top:10px;padding:10px 16px;background:#0070f3;color:white;text-decoration:none;border-radius:6px;">Book This Class</a>
    //     `,
    //   });


      //node mailer send method

    const mailOptions = {
        from: "Gym Scheduler <no-reply@yourgym.com>",
        to: member.email,
        subject: `New Class Available: ${newClass.name}`,
        html: `
          <h2>New Class Scheduled!</h2>
          <p><strong>${newClass.name}</strong></p>
          <p>${new Date(newClass.start).toLocaleString()}</p>
          <p>Trainer: ${trainerName || "TBA"}</p>
          <a href="${bookingLink}" style="display:inline-block;margin-top:10px;padding:10px 16px;background:#0070f3;color:white;text-decoration:none;border-radius:6px;">Book This Class</a>
        `,
    };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ success: true, newClass });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 });
  }
}
