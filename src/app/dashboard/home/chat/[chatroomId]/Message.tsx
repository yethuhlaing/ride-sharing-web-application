import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { MessageType } from "@/libs/type";
import defaultImage from "$/public/assets/avatar.png"
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default async function Message({ message }: { message: MessageType }) {
    const { getUser } = useKindeBrowserClient();
    const user = getUser()
    return (
        <div className="flex gap-2 justify-center items-center">
            <div>
                <Image
                    src={message.sender_profile! ?? defaultImage}
                    width={100}
                    height={100}
                    alt={message.sender_name}
                    className="lg:w-10 lg:h-10 w-7 h-7 rounded-full"
                />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <h1 className="font-bold text-xs lg:text-sm text-neutral-900">
                            {message.sender_name!}
                        </h1>

                        {message.is_edit && (
                            <h1 className="text-xs lg:text-sm text-gray-400">edited</h1>
                        )}
                    </div>
                    {/* Disabled the Message Edit & Delete Functionality */}
                    {/* {message.sender_id === user?.id && 
                        <MessageMenu message={message} />
                    } */}
                </div>
                <p className="text-xs lg:text-sm text-gray-800">{message.content}</p>
            </div>
        </div>
    );
}

const MessageMenu = ({ message }: { message: MessageType }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal size={18} className=" text-neutral-900" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <h1 className="text-xs lg:text-sm font-normal text-gray-400">
                        {new Date(message.createdAt).toDateString()}
                    </h1>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-edit")?.click();
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        document.getElementById("trigger-delete")?.click();
                    }}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};