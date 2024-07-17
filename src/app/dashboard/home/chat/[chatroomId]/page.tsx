import { Card } from '@/components/ui/card'
import ChatInput from '../ChatInput'
import ChatHeader from './ChatHeader'
import prisma from '@/libs/db'
import { redirect } from 'next/navigation'

export default async function ChatPage({ params } : any) {
    const { chatroomId } = params
    const chatroom = await prisma.chatRoom.findUnique({
        where: {
            chat_room_id: chatroomId
        }
    })
    if(!chatroom) {
        redirect('/dashboard/home/chat')
    }
    
    console.log(chatroom)
    return (
        <Card className='hidden lg:flex lg:flex-col h-full w-full p-2 items-center justify-between bg-secondary text-secondary-foreground '>
            {/* <ChatHeader user={chatroom.}/> */}
            <div>ChatBody</div>
            <ChatInput />
        </Card>
    )
}
