import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToMongoDB from "@/lib/monogdb";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        await connectToMongoDB(); // Connect to MongoDB
        const { email, password } = await req.json(); // Parse JSON data from request body

        // Use findOne instead of findone
        const user = await User.findOne({ email });

        if (user) {
            console.log("User found:", user);
            
            // Check if the passwords match (consider using password hashing for security)
            if (user.password === password) {
                const tokendata = {
                    username: user.name,
                    id: user._id
                }
                const token = jwt.sign(tokendata, process.env.jwt_SECRET_KEY, { expiresIn: "900" });

                // Set the token as a cookie
                const response = NextResponse.json({ message: "true", userinfo: { username: user.name, useremail: user.email },status:200 });
                response.cookies.set("token", token, { httpOnly: true });

                // Return the response
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
        return NextResponse.json({ message: "An error occurred", error });
    }
}
