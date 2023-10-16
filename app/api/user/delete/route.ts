import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session && session?.user.role == 'admin'){
        const newUser = await prisma.user.update({
            where:{
                id: data.id
                
            },
            data: {
                delete_user: 1
            },
        })
        return NextResponse.json(newUser)

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}