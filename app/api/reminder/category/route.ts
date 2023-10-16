import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session){
        
        const reminderCategory = await prisma.reminder_category.findMany({
            where:{
                user_id : session?.user.user_id as number
            },orderBy:{
                name: "asc"
            }
        })
    
        const sharedReminderCategory = await prisma.shared_reminder.findMany({
            where:{
                user_id : session?.user.user_id as number
            },include:{
                reminder_category:{
                    select:{
                        name:true,
                        id:true,
                    }
                }
            }
        })

        return NextResponse.json({reminderCategory, sharedReminderCategory})
    
    

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
