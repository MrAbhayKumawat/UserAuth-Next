import { NextResponse } from "next/server";
import connectToMongoDB from "@/lib/monogdb";
import User from "@/models/user";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        await connectToMongoDB();
        await User.create({ name, email, password });
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
       
            return NextResponse.json({ message: "An error occurred while registering the user" }, { status: 500 });
        }
    }
    
    