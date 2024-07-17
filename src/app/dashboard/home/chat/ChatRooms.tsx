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
    ChatRooms: ChatRoomType[];
}


const ChatRoom = ({ ChatRooms }: ChatRoomProps) => {

    return (
        <div className='flex flex-col space-y-2 lg:min-w-[300px]'>
            {ChatRooms.map((chatRoom: ChatRoomType) => (
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
