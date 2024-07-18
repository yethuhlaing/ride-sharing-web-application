import React from "react";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MessageState, MessageType } from "@/libs/type";
import defaultImage from "@@/public/assets/avatar.png"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useMessage } from "@/store/message";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Message({ message }: { message: MessageType }) {
    const { getUser } = useKindeBrowserClient();
    const user = getUser()
    return (
        <div className="flex gap-2">
            <div>
                <Image
                    src={message.sender?.profileImage! ?? defaultImage}
                    alt={message.sender?.fullName!}
                    width={40}
                    height={40}
                    className=" rounded-full ring-2"
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <h1 className="font-bold">
                            {message.sender?.fullName!}
                        </h1>
                        <h1 className="text-sm text-gray-400">
                            {new Date(message.createdAt).toDateString()}
                        </h1>
                        {message.is_edit && (
                            <h1 className="text-sm text-gray-400">edited</h1>
                        )}
                    </div>
                    {message.sender_id === user?.id && (
                        <MessageMenu message={message} />
                    )}
                </div>
                <p className="text-gray-300">{message.content}</p>
            </div>
        </div>
    );
}

const MessageMenu = ({ message }: { message: MessageType }) => {
    const setActionMessage = useMessage((state: MessageState) => state.setActionMessage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-edit")?.click();
                        setActionMessage(message);
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-delete")?.click();
                        setActionMessage(message);
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};