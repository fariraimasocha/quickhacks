import mongoose from "mongoose";

// Check if the model exists and delete it
if (mongoose.models.Hack) {
    delete mongoose.models.Hack;
}

// Define the new hack schema
const hackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
);


const Hack = mongoose.model("Hack", hackSchema);

export default Hack;