"use client";

import { useEffect, useRef } from "react";
import { useUser } from "./user";
import { UserType } from "@/libs/type";

export default function InitUser({ user }: { user: UserType | undefined }) {
    const initState = useRef(false);

    useEffect(() => {
        if (!initState.current) {
            useUser.setState({ user });
        }
        initState.current = true;
        // eslint-disable-next-line
    }, []);

    return null;
}