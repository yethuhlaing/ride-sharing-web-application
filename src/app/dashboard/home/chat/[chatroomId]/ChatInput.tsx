"use client"

import React, { useEffect, useRef, useState } from 'react'
import { MessageType } from '@/libs/type';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { supabasebrowser } from '@/supabase/browser';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { useMessage } from '@/context/MessageContext';
import { getUserData } from '@/actions/action';


function ChatInput({ senderId, chatRoomId }: any) {

    const { setMessages } = useMessage()
    const [newMessage, setNewMessage] = useState<string>("");

    const supabase = supabasebrowser()

    useEffect(() => {
        fetchMessages();
        const messageSubscription = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                },
                (payload) => {
                    const newMessage: MessageType = payload.new as MessageType;
                    setMessages((messages) => [...messages, newMessage])

                }

            )
        .subscribe()

        return () => {
            supabase.removeChannel(messageSubscription)
        };
    }, [])

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('Message')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) console.error('Error fetching messages:', error.message);
        else setMessages(data);
    };

    const handleSendMessage = async (content: string) => {
        if (content.trim()) {
            const message_id = uuidv4();
            const newMessage = {
                message_id,
                content,
                createdAt: new Date(),
                is_edit: false,
                sender_id: senderId,
                chat_room_id: chatRoomId,
            } as MessageType;
            // addMessage(newMessage as MessageType);
            // setOptimisticIds(newMessage.message_id);
            const { error } = await supabase
                .from("Message")
                .insert({ ...newMessage });
            setNewMessage("");
            if (error) {
                console.log(error)
                toast.error(error.message);
            }
        } else {
            toast.error("Message can not be empty!!");
        }
    }

    return (
        // <div className='space-x-2 flex justify-center'>
        //     <input
        //         className='flex-1 px-4 py-2 rounded-lg outline-none focus:ring-0 focus:border-transparent text-xs placeholder:text-xs'
        //         placeholder="send message"
        //         value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //         onKeyDown={(e: any) => {
        //             if (e.key === "Enter") {
        //                 handleSendMessage();
        //             }
        //         }}
        //     />
        //     <Button type="submit" className='bg-primary-foreground flex justify-center items-center' onClick={handleSendMessage}>
        //         <SendHorizonal size={10} />
        //     </Button>
        // </div>
        <div
            className="space-x-2 flex justify-center"
        >
            <input
                type="text"
                placeholder="Send message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
                className="text-neutral-900 flex-1 px-4 py-2 rounded-lg outline-none focus:ring-0 focus:border-transparent text-xs placeholder:text-xs"
            />
            <Button

                onClick={() => {
                    handleSendMessage(newMessage);
                    setNewMessage("");
                }}
                className='w-fit h-fit flex justify-center items-center  bg-secondary-foreground hover:bg-[#c7d640]'
            >
                <SendHorizonal size={16} className=' text-neutral-900' />
            </Button>
        </div>

    )
}

export default ChatInput