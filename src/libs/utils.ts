import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Location } from "./type";

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
export const getFirstLocationName = (str: string) => {
    return str.split(',')[0];
};
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function getLatAndLng(place: any): Promise<Location | null> {
    return new Promise((resolve) => {
        console.log(place)
        const placeId = place?.value.place_id;
        if (!placeId) {
            resolve(null);
            return;
        }

        const service = new window.google.maps.places.PlacesService(document.createElement('div'));

        service.getDetails({ placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry && place?.geometry.location) {
                const result = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    name: place.formatted_address,
                    label: place.name,
                };
                console.log(result);
                resolve(result);
            } else {
                resolve(null);
            }
        });
    });
}
export function getFromAndTo(page: number, itemPerPage: number) {
    let from = page * itemPerPage;
    let to = from + itemPerPage;

    if (page > 0) {
        from += 1;
    }
    return { from, to };
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
