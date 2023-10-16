import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session){
    
        let checkCategory;
        if(data.reminderType == 0 || data.reminderType == 2){
            checkCategory = await prisma.reminder_category.findFirst({
                where:{
                    id: data.category_id,
                    user_id: session.user.user_id as number
                }
            })
        }
        if(data.reminderType == 1 || (data.reminderType == 2 && !checkCategory)){
            checkCategory = await prisma.shared_reminder.findFirst({
                where:{
                    category_id: data.category_id,
                    user_id: session.user.user_id
                }
            })
        }
        
        if(!checkCategory){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            const newReminder = await prisma.reminder.update({
                where:{
                    id: data.id,
                },data:{
                    is_completed: data.is_completed
                }
            })
            return NextResponse.json(newReminder)
        }
    
    

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
