import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToMongoDB from "@/lib/mongodb"; // Fixed typo in "mongodb"
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
            const passwordsMatch = user.password === password; // This is a basic comparison, consider using a secure method for comparing passwords

            if (passwordsMatch) {
                const tokendata = {
                    username: user.name,
                    id: user._id
                }
                const token = jwt.sign(tokendata, process.env.jwt_SECRET_KEY, { expiresIn: "15m" }); // Corrected expiresIn to "15m" for 15 minutes

                // Set the token as a cookie
                const response = NextResponse.json({ message: "true", userinfo: { username: user.name, useremail: user.email }, status: 200 });
                response.cookies.set("token", token, { httpOnly: true });

                // Return the response
                return response;    
            } else {
                return NextResponse.json({ message: "Incorrect password", status: 401 }); // Set status code to 401 for unauthorized
            }
        } else {
            console.log("User not found");
            return NextResponse.json({ message: "User not found", status: 404 }); // Set status code to 404 for not found
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred", error, status: 500 }); // Set status code to 500 for internal server error
    }
}
