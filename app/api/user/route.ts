import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET() {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session?.user.role == "admin"){
        const users = await prisma.user.findMany({
            where:{
                delete_user: 0
            },select:{
                id:true,
                name:true,
                username:true,
                email:true,
                role:true,
            }
            ,orderBy:{
                name: "asc"
            }
        });    
        return NextResponse.json(users)
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}