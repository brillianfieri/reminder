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
        if(data.reminderType == 0){
            checkCategory = await prisma.reminder_category.findFirst({
                where:{
                    id: data.category_id,
                    user_id: session.user.user_id as number
                }
            })
        }else{
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
            let reminderData
            if(data.reminder_date){
                reminderData={
                    category_id: data.category_id,
                    reminder_title: data.reminder_title,
                    reminder_desc: data.reminder_desc,
                    reminder_date: data.reminder_date,
                    time_flag: data.time_flag
                }
            }else{
                reminderData={
                    category_id: data.category_id,
                    reminder_title: data.reminder_title,
                    reminder_desc: data.reminder_desc
                }
            }
            const newReminder = await prisma.reminder.create({
                data:reminderData
            })
            return NextResponse.json(newReminder)
        }
    
    

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
