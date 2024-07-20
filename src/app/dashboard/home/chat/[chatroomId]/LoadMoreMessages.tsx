import React from "react";
import toast from "react-hot-toast";
import { MessageState } from "@/libs/type";
import { useMessage } from "@/store/message";
import { getFromAndTo } from "@/libs/utils";
import { LIMIT_MESSAGE } from "@/libs/data";
import { supabase } from "@/libs/supabase";
import { Button } from "@/components/ui/button";

export default function LoadMoreMessages() {
    const page = useMessage((state: MessageState) => state.page);
    const setMesssages = useMessage((state: MessageState) => state.setMesssages);
    const hasMore = useMessage((state: MessageState) => state.hasMore);

    const fetchMore = async () => {
        const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
        const { data, error } = await supabase
            .from("Message")
            .select("*,Sender(*)")
            .range(from, to)
            .order("created_at", { ascending: false });

        if (error) {
            toast.error(error.message);
        } else {
            setMesssages(data.reverse());
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