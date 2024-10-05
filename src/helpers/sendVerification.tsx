import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/Verification";
import { ApiResponse } from "@/types/ApiResponse";

type verificationEmailTypes = {
    email: string,
    username: string,
    verifyCode: string
}

export async function sendVerificationEmail({ email, username, verifyCode }: verificationEmailTypes): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymous Messenger Verification Code',
            react: VerificationEmail({ username, otp: verifyCode })
        })
        return { success: true, message: 'Verification email send successfully' };
    } catch (emailError) {
        console.error('Error sending verification Email', emailError);
        return { success: false, message: 'Failed to send verification email' };
    }
}

