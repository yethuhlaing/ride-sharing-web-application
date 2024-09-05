"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChatRoomType } from '@/libs/type';
import { cn } from '@/libs/utils';
import { useConversation } from '@/hooks/useConversation';
import ChatRoomAvatar from '@/components/specific/ChatRoomAvatar';
import defaultImage from "@@/public/assets/avatar.png"
export default function ConversationList({ chatRooms }: {chatRooms: ChatRoomType[]}) {

    const { isActive } = useConversation()
    return (
        <Card className={cn("hidden w-full h-full lg:flex-none lg:w-80", {
            "block": !isActive,
            "lg:block": isActive
        })}>
            <CardHeader>
                <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col space-y-2 w-full'>
                    {chatRooms.map((chatRoom: ChatRoomType) => (
                        <a key={chatRoom.chat_room_id} href={`/dashboard/home/chat/${chatRoom.chat_room_id}`}>
                            <div className="flex flex-row max-w-lg justify-start items-center min-h-14 space-x-14 border px-4 py-2 hover:bg-slate-300 rounded-lg">
                                <ChatRoomAvatar passengerProfileImage={chatRoom.passenger?.profileImage! ?? defaultImage
                                } driverProfileImage={chatRoom.driver?.profileImage ?? defaultImage} />
                                <div className='text-sm font-semibold'>{chatRoom.name}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}