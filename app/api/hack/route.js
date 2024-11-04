import Hack from "@/models/Hack";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    try {
        // Parse the JSON body
        const { title, description } = await req.json();

        // Create a new hack entry
        const hack = await Hack.create({
            title,
            description,
        });

        console.log(hack);

        return NextResponse.json({ message: "Hack created successfully", hack }, { status: 201 });

    } catch (error) {
        console.error("Error while creating hack", error);
        return NextResponse.json({ message: "Error while creating hack", error: error.message }, { status: 500 });
    }
}