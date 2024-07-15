"use client"

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '@/components/ui/button'
import { SendHorizonal } from 'lucide-react'
import { SubmitButton } from '@/components/specific/SubmitButton'

const chatMessageSchema = z.object({
    content: z.string().min(1, { message: "This field can't be empty" })
})
function ChatInput() {
    const form = useForm<z.infer<typeof chatMessageSchema>>({
        resolver: zodResolver(chatMessageSchema),
        defaultValues: {
            content: "",
        }
    })
    const handleInputChange = (event: any) => {
        const { value , selectionStart} = event.target;
        if( selectionStart !== null) {
            form.setValue("content", value)
        }
    }
    const textaraRef = useRef<HTMLTextAreaElement | null>(null)
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (values: z.infer<typeof chatMessageSchema>) => {
        try {
            console.log(values.content);
            
     
        } finally {
            form.reset()
            setIsPending(false);
        }    
    }
    const handleKeyDown = async ( e: any) => {    
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await form.handleSubmit(handleSubmit)()
        }   
    }
    return (
        <Card className='w-full p-2 rounded-lg relative'>
            <div className='flex gap-2 items-end w-full'>
            <Form { ...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex gap-2 items-end w-full'>
                    <FormField control={form.control} name='content' render={({field})=> {                        
                        return (
                            <FormItem className="w-full h-full">
                                <FormControl>
                                    <TextareaAutosize rows={1} maxRows={3} {...field} onChange={handleInputChange} onClick={handleInputChange} onKeyDown={handleKeyDown} placeholder="Type a message..." className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground p-1.5 " />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        ) 
                    }} />
                    <Button disabled={isPending} size="icon">
                        <SendHorizonal />
                    </Button>
                </form>
            </Form>
            
            </div>
        </Card>
    )
}

export default ChatInput