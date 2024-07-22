
import React from 'react'
import { Card } from '@/components/ui/card'

export default function ChatLayout() {
    return (
        <Card className='hidden lg:flex flex-col h-full w-full p-2 items-center justify-between bg-secondary text-secondary-foreground '>
            <div className='m-auto text-sm px-6 py-1 bg-primary rounded-3xl text-neutral-50'>Select a chat to start messaging</div>
        </Card>
    )
}