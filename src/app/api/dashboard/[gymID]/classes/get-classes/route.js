import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { success } from "zod";




// model ClassSchedule {
//   id          String       @id @default(cuid())
//   gymId       String
//   gym         Gym          @relation(fields: [gymId], references: [id], onDelete: Cascade)
//   name        String
//   description String?
//   trainerId   String?
//   trainer     Trainer?     @relation(fields: [trainerId], references: [id])
//   start       DateTime
//   end         DateTime
//   capacity    Int          // Max members allowed
//   bookings    Booking[]
//   status      String       @default("ACTIVE") // ACTIVE, CANCELLED, COMPLETED

//   createdAt   DateTime     @default(now())
//   updatedAt   DateTime     @updatedAt

//   @@index([gymId, start])
//   @@index([trainerId])
// }

export async function GET(req,{params}){

    try {
        const {gymID}= await params;
    
    
        const classes=await prisma.classSchedule.findMany({
            where:{
                gymId:gymID
            },
        })

        if(!classes){
            NextResponse.json({message:"Failed to fetch"}, {status:501})
        }

        return NextResponse.json({success:true, status:201, classes})
    
    } catch (error) {
        console.error("Failed to fetch classes: ", error)
        return NextResponse.json({success:false, message: "Error in fetching classes", status:501})
    }
    



}