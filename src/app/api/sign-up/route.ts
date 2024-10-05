import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerification";

//can be GET, POST PATCH
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingVerifiedUsername = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUsername) {
            return Response.json({
                success: false,
                message: 'Username is already taken by a verified user'
            },
                { status: 400 })
        }

        const existingVerifiedEmail = await UserModel.findOne({ email })
        let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingVerifiedEmail) {
            if (existingVerifiedEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: 'User already exists with this email.'
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingVerifiedEmail.password = hashedPassword;
                existingVerifiedEmail.verifyCode = verifyCode;
                existingVerifiedEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingVerifiedEmail.save();
            }

        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }

        //sending verification email
        const emailResponse = await sendVerificationEmail({ email, username, verifyCode });
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: 'User registered successfully. Please verify your email.'
        }, { status: 200 })

    } catch (error) {
        console.error('Error registering user');
        return Response.json({
            success: false,
            message: 'Error registering user'
        }, {
            status: 500
        })
    }
}