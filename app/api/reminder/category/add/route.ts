import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session){

        const checkForDuplicate = await prisma.reminder_category.findFirst({
            where:{
                name: {
                    equals: data.name
                },
                user_id: session.user.user_id
                
            }
        })

        if(checkForDuplicate){
            return NextResponse.json({error: "Name is already exist."}, {status: 400})
        }else{
            const newCategory = await prisma.reminder_category.create({
                data:{
                    name: data.name,
                    user_id: session.user.user_id as number
                }
            })
            return NextResponse.json(newCategory)
        }

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
