import { Card } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ChatHeader from './ChatHeader'
import { getChatRoomWithId, getMessagesWithChatRoomId, getSenderData } from '@/actions/action';
import { LIMIT_MESSAGE } from "@/libs/data";
import { Suspense } from 'react';
import ChatMessages from './ChatMessages';
import LoadingComponent from '@/components/specific/LoadingComponent';
import ChatInput from './ChatInput';

export default async function ChatPage({ params } : any) {
    const { chatRoomId } = params

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const senderData = await getSenderData(user?.id as string) 
    const chatRoom = await getChatRoomWithId(chatRoomId)
    if (!chatRoom) {
        redirect('/dashboard/home/chat')
    }
    const messages = await getMessagesWithChatRoomId(LIMIT_MESSAGE, chatRoomId)

    return (
        <Card className='flex flex-col h-full w-full p-2 justify-between bg-secondary text-secondary-foreground'>
            <ChatHeader chatRoom={chatRoom} />
            <Suspense fallback={<LoadingComponent />}>
                <ChatMessages chatRoom={chatRoom} ChatMessages={messages} />
            </Suspense>
            <ChatInput 
                sender_id={senderData?.user_id as string}
                sender_name={senderData?.fullName as string} 
                sender_profile={senderData?.profileImage as string} 
                chat_room_id={chatRoomId}
            />
        </Card>
    )
}
