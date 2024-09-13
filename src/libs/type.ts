import { Review } from "@prisma/client";

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
export type StatusType = "Pending" | "Confirmed" | "Declined"
    

export type UserType = {
    user_id: string;
    email: string;
    fullName?: string | null;
    phone?: string | null;
    userBio?: string | null;
    profileImage?: string | null;
    createdAt: Date;
    updatedAt: Date;
    stripeCustomerId?: string | null;
    Subscription?: SubscriptionType;
    vehicles?: VehicleType[];
    bookings?: BookingType[];
    rides?: RideType[];
    reviews?: ReviewType[];
    messages?: MessageType[];
    driverChatRooms?: ChatRoomType[];
    passengerChatRooms?: ChatRoomType[];
}

export interface UserData {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}

export type BookingType = {
    booking_id: string;
    ride_id: string;
    passenger_id: string;
    createdAt: Date;
    status: string;
    ride?: RideType;
    passenger?: UserType;
}

export type VehicleType = {
    vehicle_id: string;
    brand: string;
    model?: string | null;
    licensePlate?: string | null;
    user_id?: string;

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
export type Location = {
    lat: number;
    lng: number;
    name: string | undefined;
    label: string | undefined;
}
export type RideType = {
    ride_id: string;
    driver_id: string;
    origin: string;
    destination: string;
    departure_time: Date;
    available_seats: number;
    driver?: UserType;
    bookings?: BookingType[];
    reviews?: Review[]
};

export type ReviewType = {
    review_id: number;
    ride_id: string;
    passenger_id: string;
    rating: number;
    comment?: string | null;
};


export interface ChatRoomType {
    chat_room_id: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
    driver_id: string;
    passenger_id: string;
    driver?: UserType;
    passenger?: UserType;
}


export type MessageType = {
    message_id: string;
    content: string;
    createdAt: Date;
    is_edit: boolean;
    chat_room_id: string;
    sender_id: string;
    sender_name: string
    sender_profile: string  
    chatRoom?: ChatRoomType;
}

