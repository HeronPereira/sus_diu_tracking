import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest,
    {params}: {params: {user: string}}) {
    
    // realiza o pedido e retorna um body que a condição seja satisfeita (ou não caso não exista)
    const admin = await prisma.admin.findUnique(
        {
            where: {
                user: params.user
            }
        }
    );

    if (!admin)
    {
        return NextResponse.json(
            {error: 'Admin not found'},
            {status: 404},
            );
    }

    return NextResponse.json(
        admin
        );
}


export async function PATCH(request: NextRequest,
    {params}: {params: {user: string}}) {
    
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

    const admin = await prisma.admin.findUnique(
        {
            where: {
                user: params.user,
            }
        }
    );


    if (!admin)
    {
        return NextResponse.json(
            {error: 'Patient not found'},
            {status: 404},
            );
    }


    const updatedPatient = await prisma.admin.update({
        where: {
            user: admin.user
        },
        data: body
    })

    
    console.log(updatedPatient);
    
    return NextResponse.json(updatedPatient);
}


export async function DELETE(request: NextRequest,
    {params}: {params: {user: string}}) {
    
        // realiza o pedido e retorna um body que a condição seja satisfeita (ou não caso não exista)
        const admin = await prisma.admin.findUnique(
            {
                where: {
                    user: params.user
                }
            }
        );
    
        if (!admin)
        {
            return NextResponse.json(
                {error: 'Profissional not found'},
                {status: 404},
                );
        }

        await prisma.admin.delete({
            where: {
                user: admin.user
            }
        });

        return NextResponse.json(
            {}
            );
    }
 