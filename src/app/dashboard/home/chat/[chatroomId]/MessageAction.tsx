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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import toast from "react-hot-toast";
import { MessageState, MessageType } from "@/libs/type";
import { useMessage } from "@/store/message";
import { deleteChatRoomWithId, deleteMessageWithId, updateMessageWithId } from "@/actions/action";
import { CopyX } from 'lucide-react';
import { revalidatePath } from "next/cache";


export async function DeleteChatRoom({ style, chat_room_id } : any){
    const handleDeleteChatRoom = async () => {
        try {
            await deleteChatRoomWithId(chat_room_id as string)
            revalidatePath('/chat','page')
            toast.success("Successfully delete the conversation");
        } catch (error) {
            console.log(error)
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
export async function DeleteAlert() {
    const actionMessage = useMessage((state: MessageState) => state.actionMessage);
    const optimisticDeleteMessage = useMessage(
        (state: MessageState) => state.optimisticDeleteMessage
    );
    const handleDeleteMessage = async () => {
        optimisticDeleteMessage(actionMessage?.message_id!);
    
        try {
            await deleteMessageWithId(actionMessage?.message_id as string)
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

export function EditAlert() {
    const actionMessage = useMessage((state: MessageState) => state.actionMessage);
    const optimisticUpdateMessage = useMessage(
        (state: MessageState) => state.optimisticUpdateMessage
    );

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const handleEdit = async () => {
        const content = inputRef.current.value.trim();
        if (content) {
            optimisticUpdateMessage({
                ...actionMessage,
                content,
                is_edit: true,
            } as MessageType);

            try {
                await updateMessageWithId(actionMessage?.message_id as string, content )
                toast.success("Update Successfully");
            } catch (error) {
                console.log(error)
                toast.error("Failed to Update message");
            }
      
        
            document.getElementById("trigger-edit")?.click();
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