import React from 'react'
import ConversationList from './ConversationList';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getChatRoomWithUserId } from '@/actions/action';

export default async function ChatLayout({ children }: React.PropsWithChildren) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const chatRooms = await getChatRoomWithUserId(user?.id as string)
    return (
        <div className='w-full h-full p-2 md:flex md:flex-row gap-2'>
            <ConversationList chatRooms={chatRooms} /> 
            {children}
        </div>
    )
}