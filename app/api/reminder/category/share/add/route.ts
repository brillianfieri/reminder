
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

        const checkUser = await prisma.user.findUnique({
            where:{
                username: data.username
            }
        })

        if(!checkCategory){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            if(!checkUser){
                return NextResponse.json({error: "User not found."}, {status: 400})
            }else{
                try{
                    const newSharedReminder = await prisma.shared_reminder.create({
                        data:{
                            category_id: data.category_id,
                            user_id: checkUser.id
                        }
                    })
                    return NextResponse.json(newSharedReminder)
                }catch (e){
                    return NextResponse.json({error: "User has already been added to the list"}, {status: 400})
                }
                
            }
            
        }

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
