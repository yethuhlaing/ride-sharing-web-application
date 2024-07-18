import { LIMIT_MESSAGE } from "@/libs/data";
import { MessageState, MessageType } from "@/libs/type";
import { create } from "zustand";


export const useMessage = create<MessageState>()((set) => ({
    hasMore: true,
    page: 1,
    messages: [] as MessageType[],
    optimisticIds: [],
    actionMessage: undefined,
    setMesssages: (messages) =>
        set((state) => ({
            messages: [...messages, ...state.messages],
            page: state.page + 1,
            hasMore: messages.length >= LIMIT_MESSAGE,
        })),
    setOptimisticIds: (id: string) =>
        set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
    addMessage: (newMessages) =>
        set((state) => ({
            messages: [...state.messages, newMessages],
        })),
    setActionMessage: (message) => set(() => ({ actionMessage: message })),
    optimisticDeleteMessage: (messageId) =>
        set((state) => {
            return {
                messages: state.messages.filter(
                    (message) => message.message_id !== messageId
                ),
            };
        }),
    optimisticUpdateMessage: (updateMessage) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => {
                    if (message.message_id === updateMessage.message_id) {
                        (message.content = updateMessage.content),
                            (message.is_edit = updateMessage.is_edit);
                    }
                    return message;
                }),
            };
        }),
}));