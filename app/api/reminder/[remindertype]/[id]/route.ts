import { PrismaClient } from '@prisma/client';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../../auth/authOptions"
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { remindertype: string, id: string} }) {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions)
    if(session){
        
        let newReminder;
        let includCondition = {
            reminder_category:{
                select:{
                    name:true
                }
            }
        };
        if(parseInt(params.remindertype) == 0){
            newReminder = await prisma.reminder.findMany({
                include:includCondition,
                where:{
                    reminder_category:{
                        id: parseInt(params.id)
                    },
                }
            })
        }else if(parseInt(params.remindertype) == 1){
            newReminder = await prisma.reminder.findMany({
                include:includCondition
                ,where:{
                    reminder_category:{
                        AND:{
                            id: parseInt(params.id),
                            shared_reminders:{
                                some:{
                                    user_id: session.user.user_id
                                }
                            }
                        }
                    },
                }
            })
        }else{
            newReminder = await prisma.reminder.findMany({
                include:includCondition
                ,where:{
                    OR:[
                        {
                            reminder_category:{
                                user_id: session.user.user_id
                            },
                        },
                        {
                            reminder_category:{
                                shared_reminders:{
                                    some:{
                                        user_id: session.user.user_id
                                    }
                                }
                            },
                        }

                    ],
                    reminder_date:{
                        not: null
                    }
                },orderBy:[
                    {is_completed:"asc"},
                    {reminder_date:"asc"}
                ]
            })
        }

        if(!newReminder){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }else{
            return NextResponse.json(newReminder)
        }
    
    

    }else{
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
}
