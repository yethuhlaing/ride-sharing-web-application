import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import toast from "react-hot-toast";
import { MessageType } from "@/libs/type";
import { deleteChatRoomWithId, deleteMessageWithId, updateMessageWithId } from "@/actions/action";
import { CopyX } from 'lucide-react';
import { revalidatePath } from "next/cache";


export function DeleteChatRoom({ style, chat_room_id } : any){
    const handleDeleteChatRoom = async () => {
        try {
            await deleteChatRoomWithId(chat_room_id as string)
            toast.success("Successfully delete the conversation");
        } catch (error) {
            toast.error("Failed to Delete conversation");
        }
    };
    return (
        <div className={style}>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="" variant={"destructive"}>
                        <CopyX size={14} />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the conversation.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteChatRoom}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
export function DeleteAlert({ actionMessage } : {
    actionMessage: MessageType
}) {

    const handleDeleteMessage = async () => {
    
        try {
            await deleteMessageWithId(actionMessage?.message_id as string, actionMessage.chat_room_id)
            toast.success("Successfully delete a message");
        } catch (error) {
            console.log(error)
            toast.error("Failed to Delete message");
        }
        
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button id="trigger-delete"></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the message.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteMessage}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function EditAlert({ actionMessage }: {
    actionMessage: MessageType
}) {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const handleEdit = async () => {
        const content = inputRef.current.value.trim();
        if (content) {
            try {
                await updateMessageWithId(actionMessage?.message_id as string, content, actionMessage.chat_room_id )
                toast.success("Update Successfully");
                document.getElementById("trigger-edit")?.click();
            } catch (error) {
                console.log(error)
                toast.error("Failed to Update message");
            }
        } else {
            document.getElementById("trigger-edit")?.click();
            document.getElementById("trigger-delete")?.click();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button id="trigger-edit"></button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Edit Message</DialogTitle>
                </DialogHeader>
                <Input defaultValue={actionMessage?.content} ref={inputRef} />
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}