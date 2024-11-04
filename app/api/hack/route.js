import Hack from "@/models/Hack";
import connectDB from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const { title, description } = req.body;
    try {
        const hack = await Hack.create({
            title,
            description,
        });

        console.log(hack);

        await Hack.create({ title, description });

        return NextResponse.json({ message: "hack created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error while creating hack", error);
        return NextResponse.json({ message: "Error while registering the user" }, { status: 500 });
    }
}
