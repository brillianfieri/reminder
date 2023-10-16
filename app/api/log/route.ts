import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET() {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session?.user.role == "admin"){
        const logs = await prisma.log.findMany({
            include:{
                user:{
                    select:{
                        username: true
                    }
                }
            },orderBy:{
                log_date:"desc"
            }
        })
        return NextResponse.json(logs)
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}