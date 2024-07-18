"use client";

import ChatRoomAvatar from "@/components/specific/ChatRoomAvatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/libs/supabase";
import { ChatRoomType, UserType } from "@/libs/type";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
 


export default function ChatHeader({chatRoom} : { chatRoom: ChatRoomType}) {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const { getUser } = useKindeBrowserClient();
    const user = getUser();

    useEffect(() => {
        if (!user) return;

        const channelName = `room-${chatRoom.passenger_id}-${chatRoom.driver_id}`;
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
            .subscribe(async (status) => {
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
        <div className="flex flex-row justify-start items-center min-h-14 border px-4 hover:bg-slate-300 rounded-lg">
            <div className="lg:hidden pr-4">
                <Link href={'/dashboard/home/chat'}>
                    <ArrowLeft />
                </Link>
            </div>
            <ChatRoomAvatar passengerProfileImage={chatRoom.passenger.profileImage} driverProfileImage={chatRoom.driver.profileImage} />
            <div className="flex flex-col px-14 items-start py-2">
                <h1 className="text-sm font-bold">{chatRoom.name}</h1>
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <h1 className="text-xs text-gray-400">{onlineUsers} onlines</h1>
                </div>
            </div>
        </div>
    );
}