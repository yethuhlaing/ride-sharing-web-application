"use client";
import { LIMIT_MESSAGE } from "@/libs/data";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useMessage } from "./message";
import { MessageType } from "@/libs/type";


export default function InitMessages({ messages }: { messages: MessageType[] }) {
    const initState = useRef(false);
    const hasMore = messages.length >= LIMIT_MESSAGE;

    useEffect(() => {
        if (!initState.current) {
            useMessage.setState({ messages, hasMore });
        }
        initState.current = true;
        // eslint-disable-next-line
    }, []);

    return <></>;
}