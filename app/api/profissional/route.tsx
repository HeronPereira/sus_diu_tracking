import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";
import { encryptPassword } from "@/app/utils/crypto";

export async function GET(request: NextRequest){

    const profissionals = await prisma.profissional.findMany();

    return NextResponse.json(profissionals);
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



    const profissional = await prisma.profissional.create({
        data: body
    })
    console.log(profissional)
    return NextResponse.json(
        profissional, {status: 201});
}