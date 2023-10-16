import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session){
        try{
            const newReminder = await prisma.reminder_category.update({
                where:{
                    user_id: session.user.user_id,
                    id: data.id
                },data:{
                    name: data.name
                }

            })
        }catch(e){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
