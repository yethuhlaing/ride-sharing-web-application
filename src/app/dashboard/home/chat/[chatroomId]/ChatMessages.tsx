"use client";

import React, { useEffect, useRef, useState } from "react";
// import { DeleteAlert, EditAlert } from "./MessasgeActions";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./LoadMoreMessages";
import Message from "./Message";
import { ChatRoomType, MessageType } from "@/libs/type";
import toast from "react-hot-toast";
import { useMessage } from "@/store/message";
import { supabase } from "@/libs/supabase"
type ChatMessagesType = { 
    chatRoom: ChatRoomType,
}
export default function ChatMessages({ chatRoom }: ChatMessagesType ) {
    const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [userScrolled, setUserScrolled] = useState(false);
    const [notification, setNotification] = useState(0);

    const {
        messages,
        addMessage,
        optimisticIds,
        optimisticDeleteMessage,
        optimisticUpdateMessage,
    } = useMessage((state) => state);

    useEffect(() => {
        const channelName = `room-${chatRoom.chat_room_id}`;
        const channel = supabase.channel(channelName);

        channel.on("postgres_changes",
            { event: "INSERT", schema: "public", table: "Message" },
            (payload: any) => {
                console.log(payload)

                if (!optimisticIds.includes(payload.new.id)) {
                    const newMessage = {
                        ...payload.new,
                    } as MessageType;
                    addMessage(newMessage as MessageType);
                }
                
                const scrollContainer = scrollRef.current;
                if (
                    scrollContainer.scrollTop <
                    scrollContainer.scrollHeight -
                    scrollContainer.clientHeight -
                    10
                ) {
                    setNotification((current) => current + 1);
                }
            }
        )
        // .on(
        //     "postgres_changes",
        //     { event: "DELETE", schema: "public", table: "messages" },
        //     (payload) => {
        //         optimisticDeleteMessage(payload.old.id);
        //     }
        // )
        // .on(
        //     "postgres_changes",
        //     { event: "UPDATE", schema: "public", table: "messages" },
        //     (payload) => {
        //         optimisticUpdateMessage(payload.new as MessageType);
        //     }
        // )
        channel.subscribe((status: any) => {
            if (status === 'SUBSCRIBED') {
                console.log(`Successfully subscribed to ${channelName}`);
            } else if (status === 'CHANNEL_ERROR') {
                console.error(`Failed to subscribe to ${channelName}`);
            }
        });

        return () => {
            // console.log("REmove the Channel")
            // supabase.removeChannel(channel) 
            channel.unsubscribe();
        };
    }, [messages]);

    useEffect(() => {
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

    return (
        <>
            <div
                className="flex-1 flex flex-col p-5 h-full overflow-y-auto"
                ref={scrollRef}
                onScroll={handleOnScroll}
            >
                <div className="flex-1 pb-5 ">
                    <LoadMoreMessages />
                </div>
                <div className=" space-y-7">
                    {messages.map((message: MessageType, index: any) => {
                        return <Message key={index} message={message} />;
                    })}
                </div>

                {/* <DeleteAlert />
                <EditAlert /> */}
            </div>
            {userScrolled && (
                <div className=" absolute bottom-20 w-full">
                    {notification ? (
                        <div
                            className="w-36 mx-auto bg-indigo-500 p-1 rounded-md cursor-pointer"
                            onClick={scrollDown}
                        >
                            <h1>New {notification} messages</h1>
                        </div>
                    ) : (
                        <div
                            className="w-10 h-10 bg-blue-500 rounded-full justify-center items-center flex mx-auto border cursor-pointer hover:scale-110 transition-all"
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