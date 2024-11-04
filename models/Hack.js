import mongoose from "mongoose";

const hackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Hack = mongoose.model.Hack || mongoose.model("Hack", hackSchema);

export default Hack;
