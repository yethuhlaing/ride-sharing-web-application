import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const validateString = (
    value: unknown,
    maxLength: number
): value is string => {
    if (!value || typeof value !== "string" || value.length > maxLength) {
        return false;
    }

    return true;
};

export const formatDate = (dateString: string ) => {
    try {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
        return new Intl.DateTimeFormat('en-US', options).format(date); 
    } catch (error) {
        console.log(error)
    }
};

export const formatTime = (dateString: string  ) => {
    try {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true } as const;
        return new Intl.DateTimeFormat('en-US', options).format(date);    
    } catch (error) {
        console.log(error)
    }
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message);
    } else if (typeof error === "string") {
        message = error;
    } else {
        message = "Something went wrong";
    }

    return message;
};
