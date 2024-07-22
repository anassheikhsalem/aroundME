import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const response = NextResponse.json({ message: "logout successfully" }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return response;
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
} 