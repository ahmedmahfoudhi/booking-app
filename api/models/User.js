import mongoose from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

        password: {
            type: String,
            required: true
        },
    },
    { timestamps: true}

)

export default mongoose.model('User',userSchema)