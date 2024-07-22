import { NextResponse } from "next/server";
import prisma from "@/prisma/index";
import bcryptjs from "bcryptjs";
import { mailer } from "@/lib/mailer"

export const POST = async (req) => {
  try {
    const userdata = await req.json();
    const { firstname, lastname, email, password, address, phone } = userdata;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        address,
        phone
      }
    });

    await mailer(email, 'VERIFY', user.id);
    return NextResponse.json({message: "user is registered", status: 200})

  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      status: 500,
      body: { message: "Error creating user" }
    });
  }
};