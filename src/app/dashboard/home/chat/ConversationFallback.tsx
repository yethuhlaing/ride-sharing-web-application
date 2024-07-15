"use client"

import { Card } from '@/components/ui/card'
import ChatInput from './ChatInput'

function ConversationFallback() {
    return (
        <Card className='hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground '>
            <div>ChatBody</div>
            <ChatInput />
        </Card>
    )
}

export default ConversationFallback