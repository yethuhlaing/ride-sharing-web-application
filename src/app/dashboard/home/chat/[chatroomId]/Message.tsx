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
import { MessageState, MessageType } from "@/libs/type";
import defaultImage from "@@/public/assets/avatar.png"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useMessage } from "@/store/message";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Message({ message }: { message: MessageType }) {
    const { getUser } = useKindeBrowserClient();
    const user = getUser()
    return (
        <div className="flex gap-2 justify-center items-center">
            <div>
                <img
                    src={message.sender?.profileImage! ?? defaultImage}
                    alt={message.sender?.fullName!}
                    className="lg:w-10 lg:h-10 w-7 h-7 rounded-full"
                />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                        <h1 className="font-bold text-xs lg:text-sm">
                            {message.sender?.fullName!}
                        </h1>

                        {message.is_edit && (
                            <h1 className="text-xs lg:text-sm text-gray-400">edited</h1>
                        )}
                    </div>
                    {message.sender_id === user?.id && (
                        <MessageMenu message={message} />
                    )}
                </div>
                <p className="text-xs lg:text-sm text-gray-800">{message.content}</p>
            </div>
        </div>
    );
}

const MessageMenu = ({ message }: { message: MessageType }) => {
    const setActionMessage = useMessage((state: MessageState) => state.setActionMessage);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal size={18}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <h1 className="text-xs lg:text-sm text-gray-400">
                        {new Date(message.createdAt).toDateString()}
                    </h1>
                </DropdownMenuLabel>
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