"use client"

import React, {  useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import { createMessages } from '@/actions/action';


function ChatInput({ sender_name, sender_id, sender_profile, chat_room_id }: {
    sender_name: string,
    sender_id: string,
    sender_profile: string,
    chat_room_id: string
}) {
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = async (content: string) => {

        if (!content.trim()) return 
        try {
            await createMessages(content, sender_id, sender_name, sender_profile, chat_room_id)
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