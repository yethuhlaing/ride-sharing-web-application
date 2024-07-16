"use client";

import React from "react";
import { User } from "@supabase/supabase-js";
import ChatPresence from "./ChatPresence";
import { UserType } from "@/libs/type";

export default function ChatHeader({ user }: { user: UserType }) {

    return (
        <div className="h-20">
            <div className="p-5 border-b flex items-center justify-between h-full">
                <div>
                    <h1 className="text-xl font-bold">Daily Chat</h1>
                    <ChatPresence user={user} />
                </div>
            </div>
        </div>
    );
}