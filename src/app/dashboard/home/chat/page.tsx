"use client"

import { Card } from '@/components/ui/card'
import ChatInput from './ChatInput'

function ChatPage() {
    return (
        <Card className='hidden lg:flex lg:flex-col h-full w-full p-2 items-center justify-between bg-secondary text-secondary-foreground '>
            <div className='m-auto text-sm px-6 py-1 bg-primary rounded-3xl text-neutral-50'>Select a chat to start messaging</div>
        </Card>
    )
}

export default ChatPage