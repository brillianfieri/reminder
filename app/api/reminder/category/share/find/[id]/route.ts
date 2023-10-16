import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string} }) {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session){ 
        const checkCategory = await prisma.reminder_category.findFirst({
            where:{
                user_id: session.user.user_id as number,
                id: parseInt(params.id)
            }
        })

        if(!checkCategory){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            const shared_reminder = await prisma.shared_reminder.findMany({
                where:{
                    category_id: checkCategory.id
                },include:{
                    user:{
                        select:{
                            username: true
                        }
                    }
                }
            })

            return NextResponse.json(shared_reminder)
        }
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
