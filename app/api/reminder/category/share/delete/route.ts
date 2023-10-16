
import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    
    const session = await getServerSession(authOptions)
    if(session){
        const checkCategory = await prisma.reminder_category.findFirst({
            where:{
                user_id: session.user.user_id as number,
                id: data.category_id
            }
        })
        if(!checkCategory){

            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            const newSharedReminder = await prisma.shared_reminder.deleteMany({
                where:{
                    user_id:parseInt(data.user_id),
                    category_id: parseInt(data.category_id),
                }
            })
            return NextResponse.json(newSharedReminder)
            // return NextResponse.json({error: checkShared?.user_id}, {status: 400})
        }
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
