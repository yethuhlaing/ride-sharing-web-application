import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import prisma from '@/libs/db';
import ChatRoom from './ChatRooms';


export default async function ChatLayout({ children }: React.PropsWithChildren) {
    const chatRooms = await prisma.chatRoom.findMany();
    return (
        <div className='w-full h-full p-2 md:flex md:flex-row gap-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChatRoom initialChatRooms={chatRooms} />
                </CardContent>
            </Card>
            {children}
        </div>
    )
}