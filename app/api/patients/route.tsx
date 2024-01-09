import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "./schema";

export async function GET(request: NextRequest){

    const patients = await prisma.patient.findMany();

    return NextResponse.json(patients);
}


export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = schema.safeParse(body);

    if (!validation.success)
    {
        return NextResponse.json(
            validation.error.errors,
            {status: 400},
            );
    }



    const patient = await prisma.patient.create({
        data: body
    })
    return NextResponse.json(
        patient, {status: 201});
}