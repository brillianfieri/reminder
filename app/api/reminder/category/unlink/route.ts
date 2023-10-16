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
    
        let checkCategory;
        checkCategory = await prisma.shared_reminder.findFirst({
            where:{
                category_id: data.category_id,
                user_id: session.user.user_id
            }
        })
        if(!checkCategory){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            const newCategory = await prisma.shared_reminder.deleteMany({
                where:{
                    category_id: data.category_id,
                    user_id:session.user.user_id,
                }
            })
            return NextResponse.json(newCategory)
        }
    
    

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
