import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
    const params = useParams();

    const chatRoomId = useMemo(() => {
        return params?.chatRoomId || "";
    }, [params?.chatRoomId]);

    const isActive = useMemo(() => {
        return !!chatRoomId;
    }, [chatRoomId]);

    return {
        isActive,
        chatRoomId
    };
};