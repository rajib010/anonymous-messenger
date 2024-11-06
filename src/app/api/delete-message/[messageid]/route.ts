import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import UserModel from "@/model/User";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";


export async function DELETE(req: Request, { params }: { params: { messageid: string } }) {
    const messageID = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: ' NOT AUTHENTICATED.'
        }, { status: 401 })
    }

    try {
        const updateResult = await UserModel.updateOne(
            { _id: user._id },
            { $pull: { messages: { _id: messageID } } }
        )

        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: 'Message not found or already deleted.'
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: ' Message Deleted Successfully.'
        }, { status: 404 })
    } catch (error) {
        console.log('Error in delete message Route', error);
        return Response.json({
            success: false,
            message: 'Error deleting message'
        }, { status: 500 })
    }
}