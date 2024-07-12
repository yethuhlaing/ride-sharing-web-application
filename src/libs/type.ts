import { Review } from "@prisma/client";
import { Home, Settings } from "lucide-react";

export interface TeamProps {
    imageUrl: string;
    name: string;
    position: string;
    socialNetworks: SociaNetworkslProps[];
}

export interface SociaNetworkslProps {
    name: string;
    url: string;
}

export type UserType = {
    user_id: string;
    email: string;
    fullName?: string;
    phone?: string;
    userBio?: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
    stripeCustomerId?: string;
}
export type BookingType = {
    booking_id: string;
    ride_id: string;
    passenger_id: string;
    createdAt: Date;
    status: string;
    ride: RideType;
    passenger: UserType;
}

export type VehicleType = {
    vehicle_id: string;
    brand: string;
    model?: string;
    color?: string;
    year?: number;
    licensePlate?: string;
    user_id: string;
};

export type SubscriptionType = {
    stripeSubscriptionId: string;
    interval: string;
    status: string;
    planId: string;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    createdAt: Date;
    updatedAt: Date;
    user_id: string;
};

export type RideType = {
    ride_id: string;
    driver_id: string;
    origin: string;
    destination: string;
    departure_time: Date;
    available_seats: number;
    driver: UserType;
    bookings: BookingType[];
    reviews: Review
};

export type ReviewType = {
    review_id: number;
    ride_id: string;
    passenger_id: string;
    rating: number;
    comment?: string;
};



export type RideDataType = {
    driver: {
        user_id: string;
        email: string;
        fullName: string | null;
        phone: string | null;
        userBio: string | null;
        profileImage: string | null;
        createdAt: Date;
        updatedAt: Date;
        stripeCustomerId: string | null;
    };
    bookings: {
        booking_id: string,
        passenger_id: string,
        status: string,
        passenger: {
            fullName: string,
            profileImage: string
        }
    }[];
} & RideType