import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToMongoDB from "@/lib/monogdb";

connectToMongoDB();

export async function PUT(req) {
  try {
    const { email, Newpassword } = await req.json();

    console.log(email);
    console.log(Newpassword);

    const user = await User.findOne({ email });

    if (user) {
      console.log("User found:", user);

      const updatedata = await User.updateOne(
        { email },
        { password: Newpassword }
      );

      console.log("Updated data:", updatedata);

      return NextResponse.json({
        msg: "Updated data successfully",
        updatedata,
      });
    } else {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "An error occurred in login api",
      error,
    });
  }
}
