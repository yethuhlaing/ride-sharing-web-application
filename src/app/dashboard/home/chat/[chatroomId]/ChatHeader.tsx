"use client";

import ChatRoomAvatar from "@/components/specific/ChatRoomAvatar";
import { ChatRoomType } from "@/libs/type";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import defaultImage from "$/public/assets/avatar.png"
import { DeleteChatRoom } from "./MessageAction";
import { supabasebrowser } from "@/supabase/browser";


export default function ChatHeader({chatRoom} : { chatRoom: ChatRoomType}) {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const { getUser } = useKindeBrowserClient();
    const user = getUser();

    useEffect(() => {
        if (!user) return;
        const channelName = `room-${chatRoom.passenger_id}-${chatRoom.driver_id}`;
        const supabase = supabasebrowser()
        const channel = supabase.channel(channelName);

        const handleSync = () => {
            const userIds: string[] = [];
            const presenceState = channel.presenceState();
            for (const id in presenceState) {
                // @ts-ignore
                userIds.push(presenceState[id][0].user_id);
            }
            setOnlineUsers([...new Set(userIds)].length);
        };

        channel
            .on('presence', { event: 'sync' }, handleSync)
            .subscribe(async (status: any) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        online_at: new Date().toISOString(),
                        user_id: user.id,
                    });
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, [user, chatRoom.passenger_id, chatRoom.driver_id]);

    if (!user) {
        return <div className="h-3 w-1"></div>;
    }

    return (                
        <div className="relative flex flex-row justify-start items-center min-h-14 border px-4 rounded-lg">
            <div className="lg:hidden pr-4">
                <a href={'/dashboard/home/chat'}>
                    <ArrowLeft />
                </a>
            </div>
            <ChatRoomAvatar passengerProfileImage={chatRoom.passenger?.profileImage ?? defaultImage} driverProfileImage={chatRoom.driver?.profileImage ?? defaultImage} />
            <div className="flex flex-col lg:px-14 px-12 items-start py-2">
                <h1 className="lg:text-sm text-xs font-bold  text-neutral-900">{chatRoom.name}</h1>
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 className="text-xs text-gray-400">{onlineUsers} onlines</h1>
                </div>
            </div>
            <DeleteChatRoom style={"absolute right-2"} chat_room_id={chatRoom.chat_room_id} />
        </div>
    );
}