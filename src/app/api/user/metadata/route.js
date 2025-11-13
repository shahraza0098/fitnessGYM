import { auth, clerkClient, currentUser} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser()

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // console.log("user getting", user);
  
  const role = user.publicMetadata?.role || null;

  console.log("user role", role);

  // if(role==="MANAGER" || "TRAINER"){

  // }

  const selectedGymID = user.publicMetadata?.gymId || null;
  console.log("selectedGymID", selectedGymID);

  return NextResponse.json({ role, selectedGymID });
}
