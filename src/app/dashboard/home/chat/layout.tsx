import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import prisma from '@/libs/db';
import ChatRoom from './ChatRooms';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ChatRoomType } from '@/libs/type';


export default async function ChatLayout({ children }: React.PropsWithChildren) {

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const chatRooms = await prisma.chatRoom.findMany({
        include: {
            passenger: true,
            driver: true
        },
        where: {
            OR: [
                { driver_id: user?.id },
                { passenger_id: user?.id }
            ]
        }
    });

    return (
        <div className='w-full h-full p-2 md:flex md:flex-row gap-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChatRoom ChatRooms={chatRooms} />
                </CardContent>
            </Card>
            {children}
        </div>
    )
}