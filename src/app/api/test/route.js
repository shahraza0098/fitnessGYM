import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await axios.get("http://localhost:8000/");

    console.log("External API response: ", response.data);

    return NextResponse.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("Error fetching external API:", error.message);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
