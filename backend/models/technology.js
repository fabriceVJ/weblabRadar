import mongoose from "mongoose";

const technologySchema = mongoose.Schema({
    name: {type: String, required: true},
    ring: {type: String, required: true},
    category: {type: String, required: true},
    descriptionTechnology: {type: String, required: true},
    descriptionOnRing: {type: String, required: true},
    publishDate: Date,
    datesEdited: [Date]
})


export default mongoose.model("Technology", technologySchema);