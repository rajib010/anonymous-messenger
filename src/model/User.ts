import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: String;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})



export interface User extends Document {
    username: String;
    email: String;
    password: String;
    verifyCode: String,
    verifyCodeExpiry: Date;
    isVerified: Boolean;
    isAcceptingMessage: Boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+ /, 'please use a valid email']
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verfiy code is required"],
        default: ''
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verfiy code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;