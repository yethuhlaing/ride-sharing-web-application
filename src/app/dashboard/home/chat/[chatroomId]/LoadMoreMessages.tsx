import React from "react";
import toast from "react-hot-toast";
import { MessageState } from "@/libs/type";
import { useMessage } from "@/store/message";
import { getFromAndTo } from "@/libs/utils";
import { LIMIT_MESSAGE } from "@/libs/data";
import { Button } from "@/components/ui/button";
import { getMessageWithPage } from "@/actions/action";

export default function LoadMoreMessages() {
    const page = useMessage((state: MessageState) => state.page);
    const setMesssages = useMessage((state: MessageState) => state.setMesssages);
    const hasMore = useMessage((state: MessageState) => state.hasMore);

    const fetchMore = async () => {
        try {
            const messages = await getMessageWithPage(page)
            // Reverse the messages to maintain the original order
            setMesssages(messages.reverse());
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error("Failed Loading messages");
        }
    };

    if (hasMore) {
        return (
            <Button variant="outline" className="w-full" onClick={fetchMore}>
                Load More
            </Button>
        );
    }
    return <></>;
}