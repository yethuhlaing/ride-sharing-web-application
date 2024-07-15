import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function ConversationContainer( {children} : React.PropsWithChildren) {
    return (
        <div className='w-full h-full p-2 md:flex md:flex-row gap-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Chat</CardTitle>
                </CardHeader>
                <CardContent>
                    Uses will be appear
                </CardContent>
            </Card>
            {children}
        </div>
    )
}

