import { NextResponse } from "next/server";
import prisma from "@/prisma/index"
export const POST = async (req) => {
    try {
        const reqBody = await req.json();
        const { token } = reqBody  

        const now = new Date(Date.now());
        if (token) {
            const user = await prisma.user.findFirst({
            where: {
                    verifyToken: token,
                    verifyExpairy: {
                        gt: now
                    }
                }
            });

            if (!user) {
                return NextResponse.json({ message: 'invalid or expaiered token' }, { status: 404 });
            }

            const updatedUser= await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    isVerified: true,
                    verifyToken: null,
                    verifyExpairy:null
                }
            })
            
            return NextResponse.json({ message: 'user is verified!' }, {status:200});
            
        } else {
            return NextResponse.json({ message: "token is not passed!" }, {status:404});
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}