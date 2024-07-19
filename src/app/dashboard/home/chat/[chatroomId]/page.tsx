import { Card } from '@/components/ui/card'
import ChatInput from '../ChatInput'
import prisma from '@/libs/db'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ChatHeader from './ChatHeader'
import { getChatRoomWithId, getMessagesWithChatRoomId } from '@/actions/action';
import { useConversation } from '@/hooks/useConversation';
import { cn } from '@/libs/utils';
import { LIMIT_MESSAGE } from "@/libs/data";
import { Suspense } from 'react';
import ChatMessages from './ChatMessages';
import InitMessages from '@/store/initMessages';

export default async function ChatPage({ params } : any) {
    const { chatRoomId } = params
    const { getUser } = getKindeServerSession();
    const user = await getUser(); 

    const chatRoom = await getChatRoomWithId(chatRoomId)
    if (!chatRoom) {
        redirect('/dashboard/home/chat')
    }
    const messages = await getMessagesWithChatRoomId(LIMIT_MESSAGE, chatRoom.chat_room_id)

    return (
        <Card className={cn('flex flex-col h-full w-full p-2 justify-between bg-secondary text-secondary-foreground' )}>
            <ChatHeader chatRoom={chatRoom} />
            <ChatMessages chatRoom={chatRoom} />
            <InitMessages messages={messages?.reverse() || []} />
            <ChatInput senderId={user?.id} chatRoomId={chatRoomId} />
        </Card>
    )
}
