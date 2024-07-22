import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import prisma from "@/prisma/index";
import jwt from "jsonwebtoken"

export const POST = async(req) => {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            console.log('Invalid credentials');
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const passwordMatched = await bcryptjs.compare(password, user.password);

        if (!passwordMatched) {
            console.log('Invalid credentials');
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
        console.log('user found');
        console.log('Password matched');
        const secretKey = process.env.SECRET_KEY;
        const tokenData = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            isActive: user.isActive
        }

        const token = jwt.sign(tokenData, secretKey, { expiresIn: '1h' });
        const res = NextResponse.json({ message: "login successfully" }, { status: 200 });
        res.cookies.set('token', token, {
            httpOnly: true
        });
        
        return res
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:`server error: ${error}`}, {status:501})
    }
}