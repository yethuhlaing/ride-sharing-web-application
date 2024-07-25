"use client";

import { MessageType } from "@/libs/type";
import React, { useState, createContext, useContext } from "react";

// Define the MessageContext
export const MessageContext = createContext<MessageContextType | null>(null);

type MessageContextProviderProps = {
    children: React.ReactNode;
};

type MessageContextType = {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    hasMore: Boolean;
    setHasMore: React.Dispatch<React.SetStateAction<Boolean>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    actionMessage: MessageType | null ;
    setActionMessage: React.Dispatch<React.SetStateAction<MessageType | null>>;
};

// MessageProvider component
export function MessageProvider({
    children,
}: MessageContextProviderProps) {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [hasMore, setHasMore ] = useState<Boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [actionMessage, setActionMessage] = useState<MessageType | null>(null)

    
    return (
        <MessageContext.Provider value={{ messages, setMessages, hasMore, setHasMore, page, setPage, actionMessage, setActionMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

// Custom hook to use the MessageContext
export const useMessage = () => {
    const context = useContext(MessageContext);

    if (context === null) {
        throw new Error(
            "useMessage must be used within a MessageProvider"
        );
    }

    return context;
};
