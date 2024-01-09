import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest,
    {params}: {params: {id: string}}) {
    
    const patient = await prisma.patient.findUnique(
        {
            where: {
                id: parseInt(params.id)
            }
        }
    );


    if (!patient)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }
    return NextResponse.json(
        patient
        );
}

export async function PUT(request: NextRequest,
    {params}: {params: {id: string}}) {

    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
    {
        return NextResponse.json(
            validation.error.errors,
            {status: 400},
            );
    }

    const patient = await prisma.patient.findUnique(
        {
            where: {
                id: parseInt(params.id),
                cpf: body.cpf,
            }
        }
    );


    if (!patient)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }

    const updatedPatient = await prisma.patient.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            name: body.name,
            socialname: body.socialname,
        }
    })
    return NextResponse.json(updatedPatient);
}


export async function DELETE(request: NextRequest,
    {params}: {params: {id: number}}) {

    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
    {
        return NextResponse.json(
            validation.error.errors,
            {status: 400},
            );
    }

    const existingPatient = await prisma.patient.findUnique({
        where: {
            cpf: body.cpf
        }
    })

    if (!existingPatient)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }

    await prisma.patient.delete({
        where: {
            cpf: body.cpf
        }
    })

    return NextResponse.json(
        {message: 'Patient deleted'},
        );
}