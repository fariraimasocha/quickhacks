import Hack from "@/models/Hack";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    try {
        // Parse the JSON body
        const { title, description, user, votes } = await req.json();

        // Create a new hack entry
        const hack = await Hack.create({
            user,
            title,
            description,
            votes
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

        console.log(hacks); // Move the console.log statement before the return statement

        return NextResponse.json({ hacks });

    } catch (error) {
        console.error("Error while fetching hacks", error);
        return NextResponse.json({ message: "Error while fetching hacks", error: error.message }, { status: 500 });
    }
}


export async function PATCH(req) {
    await connectDB();

    try {
        const { id, action } = await req.json(); // Expecting an id and action ('add' or 'subtract')

        // Find the hack by ID
        const hack = await Hack.findById(id);
        if (!hack) {
            return NextResponse.json({ message: "Hack not found" }, { status: 404 });
        }

        // Update votes based on action
        if (action === 'add') {
            hack.votes += 1;
        } else if (action === 'subtract') {
            hack.votes = Math.max(0, hack.votes - 1); // Prevent negative votes
        } else {
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }

        await hack.save(); // Save the updated hack

        return NextResponse.json({ message: "Votes updated successfully", votes: hack.votes });

    } catch (error) {
        console.error("Error while updating votes", error);
        return NextResponse.json({ message: "Error while updating votes", error: error.message }, { status: 500 });
    }
}