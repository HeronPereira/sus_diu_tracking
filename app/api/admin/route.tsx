import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";
import { encryptPassword } from "@/app/utils/crypto";

export async function GET(request: NextRequest){

    const admins = await prisma.admin.findMany();

    return NextResponse.json(admins);
}


export async function POST(request: NextRequest) {
    
    const body = await request.json();
    body.senha = await encryptPassword(body.senha);

    const validation = schema.safeParse(body);

    if (!validation.success)
    {
        return NextResponse.json(
            validation.error.errors,
            {status: 400},
            );
    }



    const admin = await prisma.admin.create({
        data: body
    })
    console.log(admin)
    return NextResponse.json(
        admin, {status: 201});
}