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
export function getRandomAvatarUrl() {
    const numbers = [3, 7, 43, 8, 49, 18, 22, 59, 85, 92, 71, 63, 59, 93, 94, 79, 67];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomIndex];
    const url = `https://avatar.iran.liara.run/public/${randomNumber}`;
    return url;
}
export const formatTime = (dateString: string  ) => {
    try {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true } as const;
        return new Intl.DateTimeFormat('en-US', options).format(date);    
    } catch (error) {
        console.log(error)
    }
};
export const getFirstName = (str: string) => {
    return str.split(' ')[0];
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
