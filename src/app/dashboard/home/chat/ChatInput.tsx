"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { supabasebrowser } from '@/supabase/browser';

const supabase = supabasebrowser()

function ChatInput({ senderId, chatRoomId }: any) {

    const [message, setMessage] = useState('');
    const handleSendMessage = async (content: string) => {
        if (content.trim()) {
            const message_id = uuidv4();
            const { error } = await supabase
                .from("Message")
                .insert({ content, message_id, chat_room_id: chatRoomId, sender_id: senderId });
            setMessage('');
            if (error) {
                console.log(error)
                toast.error(error.message);
            }
        } else {
            toast.error("Message can not be empty!!");
        }
    }

    return (
        <div
            className="space-x-2 flex justify-center"
        >
            <input
                type="text"
                placeholder="Send message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                    handleSendMessage(message);
                    setMessage('');
                }}
                className='w-fit h-fit flex justify-center items-center  bg-secondary-foreground hover:bg-[#c7d640]'
            >
                <SendHorizonal size={16} className=' text-neutral-900'/>
            </Button>
        </div>

    )
}

export default ChatInput