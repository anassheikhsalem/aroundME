import prisma from '@/prisma/index'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
    try {
        
        const cookiesHeader = req.headers.get('cookie');
        if (!cookiesHeader) {
            return NextResponse.json({ message: 'No cookies found' }, { status: 400 });
        }

        const token = cookiesHeader.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 400 });
        }

        const tokenUser = await jwt.verify(token, process.env.SECRET_KEY);

        return NextResponse.json({ message: 'User read', user: tokenUser }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
