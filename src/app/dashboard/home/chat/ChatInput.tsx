"use client"

import React, { useRef, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import { SubmitButton } from '@/components/specific/SubmitButton'
import { createMessages, getUserData } from '@/actions/action';
import { MessageState, MessageType } from '@/libs/type';
import toast from 'react-hot-toast';
import { useMessage } from '@/store/message';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { supabasebrowser } from '@/supabase/browser';

const supabase = supabasebrowser()

function ChatInput({ senderId, chatRoomId }: any) {

    const addMessage = useMessage((state) => state.addMessage);
    const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
    const [message, setMessage] = useState('');
    const handleSendMessage = async (content: string) => {
        if (content.trim()) {
            const message_id = uuidv4();
            // const senderData = await getUserData(senderId);
            // const newMessage = {
            //     message_id,
            //     content,
            //     createdAt: new Date(),
            //     is_edit: false,
            //     sender_id: senderId,
            //     chat_room_id: chatRoomId,
            //     sender: senderData
            // } as MessageType;
            // addMessage(newMessage as MessageType);
            // setOptimisticIds(newMessage.message_id);

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