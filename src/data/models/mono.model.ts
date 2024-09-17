import mongoose from "mongoose";

const monoSchema = new mongoose.Schema({
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        default: false
    },
    age:{
        type: Number,
        default: false
    },
    creationDate:{
        type: Date,
        default: false
    },
    isSent:{
        type: Boolean,
        default: false
    }
});



export const MonoModel = mongoose.model("MonoCase", monoSchema)