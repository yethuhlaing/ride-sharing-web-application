"use client"

import React, { useEffect, useState } from 'react'
import { MessageType } from '@/libs/type';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { supabasebrowser } from '@/supabase/browser';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { useMessage } from '@/context/MessageContext';
import { createMessages } from '@/actions/action';


function ChatInput({ senderId, chatRoomId }: any) {
    const [newMessage, setNewMessage] = useState('')


    const handleSendMessage = async (content: string) => {

        if (!content.trim()) return 
        try {
            await createMessages(content, senderId, chatRoomId )
            setNewMessage("");
        } catch (error: any) {
            console.log(error)
            toast.error(error?.message);
        }
    }

    return (
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
                    }
                }}
                className="text-neutral-900 flex-1 px-4 py-2 rounded-lg outline-none focus:ring-0 focus:border-transparent text-xs placeholder:text-xs"
            />
            <Button
                onClick={() => {
                    handleSendMessage(newMessage);
                }}
                className='w-fit h-fit flex justify-center items-center  bg-secondary-foreground hover:bg-[#c7d640]'
            >
                <SendHorizonal size={16} className=' text-neutral-900' />
            </Button>
        </div>

    )
}

export default ChatInput