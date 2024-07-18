import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


export default function ChatRoomAvatar({ passengerProfileImage, driverProfileImage }: any) {
    return (
        <div className="flex items-center space-x-2 relative">
            <Avatar className="h-7 w-7 rounded-full absolute top-[-23px] ring-1">
                <AvatarImage src={passengerProfileImage} alt="Profile Image" />
            </Avatar>
            <Avatar className="h-7 w-7 rounded-full absolute bottom-[-23px] left-1 ring-1">
                <AvatarImage src={driverProfileImage} alt="Profile Image" />
            </Avatar>
        </div>    
    )
}