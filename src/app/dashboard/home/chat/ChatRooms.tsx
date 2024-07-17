"use client"

import { useState, useEffect, Fragment } from 'react';
import { supabase } from '@/libs/supabase';
import { ChatRoomType, UserType } from '@/libs/type';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { getUserData } from '@/actions/action';
import { Avatar, AvatarImage , AvatarFallback} from '@/components/ui/avatar';
import Image from 'next/image';

interface ChatRoomProps {
    initialChatRooms: ChatRoomType[];
    user_id: String
}


const ChatRoom = ({ initialChatRooms, user_id }: ChatRoomProps) => {
    const [chatRooms, setChatRooms] = useState<ChatRoomType[]>(initialChatRooms);
    const [passengerAvatar, setPassengerAvatar] = useState<string | undefined| null>("");
    useEffect(() => {
        const channel = supabase
            .channel('chat room')
            .on('postgres_changes', {
                event: "INSERT",
                schema: "public",
                table: 'ChatRoom',
                filter: `driver_id.eq.${user_id},passenger_id.eq.${user_id}`
            }, async (payload: any) => {
                const newChatRoom = payload.new as ChatRoomType
                const chatRoom: ChatRoomType = {
                    chat_room_id: newChatRoom.chat_room_id,
                    name: newChatRoom.name,
                    createdAt: newChatRoom.createdAt,
                    updatedAt: newChatRoom.createdAt,
                    driver_id: newChatRoom.driver_id,
                    passenger_id: newChatRoom.passenger_id,
                    passenger: newChatRoom.passenger,
                    driver: newChatRoom.driver
                };


                setChatRooms((prevChatRooms) => [...prevChatRooms, chatRoom]);
            })
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className='flex flex-col space-y-2 lg:min-w-[300px]'>
            {chatRooms.map((chatRoom: ChatRoomType) => (
                <Link key={chatRoom.chat_room_id} href={`/dashboard/home/chat/${chatRoom.chat_room_id}`}>
                    <div className="flex flex-row max-w-lg justify-start items-center min-h-14 space-x-14 border px-4 py-2 hover:bg-slate-300 rounded-lg">
                        {
                            <div className="flex items-center space-x-2 relative">
                                <Avatar className="h-7 w-7 rounded-full absolute">
                                    <AvatarImage src={chatRoom.passenger.profileImage as string} alt="Profile Image" />
                                </Avatar>
                                <Avatar className="h-7 w-7 rounded-full absolute bottom-[-30px] left-1">
                                    <AvatarImage src={chatRoom.driver.profileImage as string} alt="Profile Image" />
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
