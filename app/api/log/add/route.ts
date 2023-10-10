import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/authOptions"

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    const data = await request.json()
    const session = await getServerSession(authOptions)
    if(session){
        const newLog = await prisma.log.create({
            data:{
                log_date: new Date(),
                user_id: session.user.user_id as number,
                message: data.message
            }
        })
        return Response.json(newLog)

    }else{
        return new Response('Unauthorized', { status: 401 })
    }
}