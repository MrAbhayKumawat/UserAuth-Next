import { NextResponse } from "next/server";
export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred", error });
  }
}
