import prisma from '@/prisma/index'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        const reqBody = await req.json();
        const { hashedpassword, decodedToken } = reqBody;
        const now = new Date(Date.now());
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: decodedToken,
                passwordResetExpairy: {
                    gt: now
                }
            }
        });

        if (!user) {
            console.log("invalid or expaiered token");
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: null,
                passwordResetExpairy: null,
                password: hashedpassword
            }
        });
        
        if (user) {
            console.log("Password is updated!");
            return NextResponse.json({ message: "Password is updated!" }, {status:200});
        } else {
            console.log("invalid or expaiered token");
            return NextResponse.json({message: "invalid or expaiered token"}, {status:400})   
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}