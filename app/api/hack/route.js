import Hack from "@/models/Hack";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { useRecipe } from "@chakra-ui/react";

export async function POST(req) {
    await connectDB();

    try {
        // Parse the JSON body
        const { title, description, user } = await req.json();

        // Create a new hack entry
        const hack = await Hack.create({
            user,
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

export async function GET(req) {
    await connectDB();

    try {
        // Fetch all the hacks
        const hacks = await Hack.find({});

        return NextResponse.json({ hacks });

    } catch (error) {
        console.error("Error while fetching hacks", error);
        return NextResponse.json({ message: "Error while fetching hacks", error: error.message }, { status: 500 });
    }
}
