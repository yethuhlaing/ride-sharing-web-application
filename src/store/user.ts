import { UserType } from "@/libs/type";
import { create } from "zustand";

interface UserState {
    user: UserType | undefined;
}

export const useUser = create<UserState>()(() => ({
    user: undefined,
}));