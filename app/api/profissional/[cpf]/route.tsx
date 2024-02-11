import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest,
    {params}: {params: {cpf: string}}) {
    
    // realiza o pedido e retorna um body que a condição seja satisfeita (ou não caso não exista)
    const profissional = await prisma.profissional.findUnique(
        {
            where: {
                cpf: params.cpf
            }
        }
    );

    if (!profissional)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }

    return NextResponse.json(
        profissional
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

    const profissional = await prisma.profissional.findUnique(
        {
            where: {
                cpf: params.cpf,
            }
        }
    );


    if (!profissional)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }


    const updatedPatient = await prisma.profissional.update({
        where: {
            cpf: profissional.cpf
        },
        data: body
    })

    
    console.log(updatedPatient);
    
    return NextResponse.json(updatedPatient);
}


export async function DELETE(request: NextRequest,
    {params}: {params: {cpf: string}}) {
    
        // realiza o pedido e retorna um body que a condição seja satisfeita (ou não caso não exista)
        const profissional = await prisma.profissional.findUnique(
            {
                where: {
                    cpf: params.cpf
                }
            }
        );
    
        if (!profissional)
        {
            return NextResponse.json(
                {error: 'Profissional not found'},
                {status: 404},
                );
        }

        await prisma.profissional.delete({
            where: {
                cpf: profissional.cpf
            }
        });

        return NextResponse.json(
            {}
            );
    }
 