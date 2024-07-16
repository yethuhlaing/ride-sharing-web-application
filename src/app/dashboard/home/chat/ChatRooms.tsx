"use client"

import { useState, useEffect, Fragment } from 'react';
import { supabase } from '@/libs/supabase';
import { UserType } from '@/libs/type';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { getUserData } from '@/actions/action';
import { Avatar, AvatarImage , AvatarFallback} from '@/components/ui/avatar';
import Image from 'next/image';

interface ChatRoomProps {
    initialChatRooms: ChatRoomType[];
}

interface ChatRoomType {
    chat_room_id: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    passenger_avatar: String
    driver_avatar: String
}

const ChatRoom = ({ initialChatRooms }: ChatRoomProps) => {
    const [chatRooms, setChatRooms] = useState<ChatRoomType[]>(initialChatRooms);
    useEffect(() => {
        const channel = supabase
            .channel('chat room')
            .on('postgres_changes', {
                event: "INSERT",
                schema: "public",
                table: 'ChatRoom'
            }, async (payload: any) => {

                const chatRoom: ChatRoomType = {
                    chat_room_id: payload.new.chat_room_id,
                    name: payload.new.name,
                    createdAt: payload.new.createdAt,
                    updatedAt: payload.new.createdAt,
                    passenger_avatar: payload.new.passenger_id,
                    driver_avatar: payload.new.driver_id,
                };

                setChatRooms((prevChatRooms) => [...prevChatRooms, chatRoom]);
            })
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className='flex flex-col space-y-2 lg:min-w-[250px]'>
            {chatRooms.map((chatRoom: ChatRoomType) => (
                <Link key={chatRoom.chat_room_id} href={`/dashboard/home/chat/${chatRoom.chat_room_id}`}>
                    <div className="flex flex-row max-w-lg justify-start items-center min-h-14 space-x-14 border px-4 py-2 hover:bg-slate-300 rounded-lg">
                        {
                            <div className="flex items-center space-x-2 relative">
                                <Avatar className="h-7 w-7 rounded-full absolute">
                                    <AvatarImage src={chatRoom.passenger_avatar as string} alt="Profile Image" />
                                </Avatar>
                                <Avatar className="h-7 w-7 rounded-full absolute bottom-[-30px] left-1">
                                    <AvatarImage src={chatRoom.driver_avatar as string} alt="Profile Image" />
                                </Avatar>
                            </div>
                        }
                        <div>{chatRoom.name}</div>
                    </div>
                    
                </Link>
            ))}
        </div>
    );
};

export default ChatRoom;
