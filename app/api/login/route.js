import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToMongoDB from "@/lib/monogdb";
import jwt from "jsonwebtoken";
connectToMongoDB();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (user) {
      console.log("User found:", user);

      if (user.password === password) {
        const tokendata = {
          username: user.name,
          id: user._id,
        };
        const jwt_SECRET_KEY = "nextjswithmongodbuserauth-by-abhay";
        const token = jwt.sign(tokendata, jwt_SECRET_KEY, { expiresIn: "900" });

        const response = NextResponse.json({
          message: "true",
          userinfo: { username: user.name, useremail: user.email },
          status: 200,
        });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
      } else {
        return NextResponse.json({ message: "Incorrect password" });
      }
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
