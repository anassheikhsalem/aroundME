import { mailer } from "@/lib/mailer";
import { NextResponse } from "next/server";
import prisma from "@/prisma/index"
import bcryptjs from 'bcryptjs'

export const POST = async(req) => {
    try {
        const email = await req.json();    
        const user = await prisma.user.findFirst({
                where: {
                    email: email,
                }
        });
        if (user){
            const passToken = await bcryptjs.hash(user.id, 10);
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    passwordResetToken: passToken,
                    passwordResetExpairy: new Date(Date.now() + 36000000),
                },
            });
            if (updatedUser) {
                const url = `http://localhost:3000/login/password/new/${encodeURIComponent(passToken)}`;
                await mailer(user.email, 'RESET', user.id);
                return NextResponse.json({message:"reseting email sent"}, {status:200})
            } else {
                return NextResponse.json({message:"invalid data"}, {status:401})
            }
        }else {
            return NextResponse.json({message:"invalid data"}, {status:401})
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}