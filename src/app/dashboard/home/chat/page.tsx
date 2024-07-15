import React from 'react'
import ConversationFallback from './ConversationFallback'
import ConversationContainer from './ConversationContainer'

export default function ChatPage() {
    return (
        <React.Fragment>
            <ConversationContainer>
                <ConversationFallback />
            </ConversationContainer>
        </React.Fragment>
    )
}