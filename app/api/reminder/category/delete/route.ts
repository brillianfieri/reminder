import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session){
    
        const checkCategory = await prisma.reminder_category.findFirst({
            where:{
                id: data.category_id,
                user_id: session.user.user_id as number
            }
        })
        if(!checkCategory){
            return NextResponse.json({error: "not found"}, {status: 400})
        }else{
            const newReminder = await prisma.reminder_category.delete({
                where:{
                    id: data.category_id,
                    user_id: session.user.user_id as number
                }
            })
            return NextResponse.json(newReminder)
        }
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
