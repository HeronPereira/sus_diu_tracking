import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest,
    {params}: {params: {cpf: string}}) {
    
    // realiza o pedido e retorna um body que a condição seja satisfeita (ou não caso não exista)
    const patient = await prisma.patient.findUnique(
        {
            where: {
                cpf: params.cpf
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


export async function PATCH(request: NextRequest,
    {params}: {params: {cpf: string}}) {
    
    // realiza o pedido e retorna um body
    const body = await request.json();
    
    // Verifica se a estrutura do body está de acordo com a estrutura do schema do Zod
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
                cpf: params.cpf,
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
            cpf: patient.cpf
        },
        data: body
    })

    
    console.log(updatedPatient);
    
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