"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import Message from "./Message";
import { ChatRoomType, MessageType } from "@/libs/type";
import { fetchMoreMessages } from "@/actions/action";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { supabasebrowser } from '@/supabase/browser';
import { LIMIT_MESSAGE } from "@/libs/data";

type ChatMessagesType = {
    ChatMessages: MessageType[]
    chatRoom: ChatRoomType,
}
export default function ChatMessages({ chatRoom, ChatMessages }: ChatMessagesType) {
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;    
    const [userScrolled, setUserScrolled] = useState(false);
    const [notification, setNotification] = useState(0);
    const [messages, setMessages] = useState<MessageType[]>(ChatMessages)
    const [hasMore, setHasMore ] = useState<Boolean>(false)
    const channelName = `room-${chatRoom.chat_room_id}`;
    const supabase = supabasebrowser()

    useEffect(() => {
        const channel = supabase.channel(channelName)
        .on("postgres_changes",
            { event: "INSERT", schema: "public", table: "Message", filter: `chat_room_id=eq.${chatRoom.chat_room_id}` },
            async (payload: any) => {
                setMessages(current => [...current, payload.new])

                const scrollContainer = scrollRef.current;
                if (
                    scrollContainer &&
                    scrollContainer.scrollTop <
                    scrollContainer.scrollHeight -
                    scrollContainer.clientHeight -
                    10
                ) {
                    setNotification((current) => current + 1);
                }
            }
        )
        .on(
            "postgres_changes",
            { event: "DELETE", schema: "public", table: "Message" },
            (payload: any) => {
                console.log(payload)
                // optimisticDeleteMessage(payload.old.id);
            }
        )
        .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "Message" },
            (payload: any) => {
                console.log(payload)
                // optimisticUpdateMessage(payload.new as MessageType);
            }
        )
        .subscribe((status: any) => {
            if (status === 'SUBSCRIBED') {
                console.log(`Successfully subscribed to ${channelName}`);
            } else if (status === 'CHANNEL_ERROR') {
                console.error(`Failed to subscribe to ${channelName}`);
            }
        });

        return () => {
            supabase.removeChannel(channel)
        };
    }, [supabase, messages, setMessages]); 

    useEffect(() => {
        setHasMore(messages.length >= LIMIT_MESSAGE)
        const scrollContainer = scrollRef.current;
        if (scrollContainer && !userScrolled) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [messages]); 

    const handleOnScroll = () => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const isScroll =
                scrollContainer.scrollTop <
                scrollContainer.scrollHeight -
                scrollContainer.clientHeight -
                10;
            setUserScrolled(isScroll);
            if (
                scrollContainer.scrollTop ===
                scrollContainer.scrollHeight - scrollContainer.clientHeight
            ) {
                setNotification(0);
            }
        }
    };
    const scrollDown = () => {
        setNotification(0);
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };
    const handleLoadMore = async () => {
        if (messages.length === 0) return

        const oldestMessageTimestamp = messages[0].createdAt
        const olderMessages = await fetchMoreMessages(oldestMessageTimestamp) as MessageType[]
        setMessages((current) => [...olderMessages, ...current])
    }
    return (
        <>
            <div
                className="flex flex-col h-full py-4 no-scrollbar overflow-y-auto"
                ref={scrollRef}
                onScroll={handleOnScroll}
            >
                <div className="flex-1">
                    { hasMore && (
                        <Button variant="outline" className="w-full" onClick={handleLoadMore}>
                            Load More
                        </Button>
                    )}
                </div>

                <div className="flex flex-col space-y-1 px-2">
                    {messages.map((message: MessageType, index: any) => {
                        return (
                             <>
                                <Message key={index} message={message} />
                                <DeleteAlert actionMessage={message} />
                                <EditAlert actionMessage={message} />
                            </>
                        );
                    })}
                </div>
            </div>
            {userScrolled && (
                <div className="absolute left-35 bottom-20 w-full">
                    {notification ? (
                        <div
                            className="w-36 mx-auto bg-primary px-2 py-1 rounded-lg cursor-pointer"
                            onClick={scrollDown}
                        >
                            <h1 className="text-secondary-foreground text-xs lg:text-sm text-center">New {notification} messages</h1>
                        </div>
                    ) : (
                        <div
                            className="w-10 h-10 bg-primary rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
                            onClick={scrollDown}
                        >
                            <ArrowDown />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}