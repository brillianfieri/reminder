import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string} }) {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session?.user.user_id == parseInt(params.id)){
        const user = await prisma.user.findUnique({
            where:{
                id: parseInt(params.id)
            },select:{
                id:true,
                name:true,
                username:true,
                email:true,
                role:true,
            }
        });    
        return NextResponse.json(user)
    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}