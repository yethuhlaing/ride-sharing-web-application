import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar';


export default function ChatRoomAvatar({ passengerProfileImage, driverProfileImage }: any) {
    return (
        <div className="flex items-center space-x-2 relative">
            <Avatar className="lg:h-7 lg:w-7 h-6 w-6 rounded-full absolute lg:top-[-23px] top-[-20px] ring-1">
                <AvatarImage src={passengerProfileImage} alt="Profile Image" />
            </Avatar>
            <Avatar className="lg:h-7 lg:w-7 h-6 w-6 rounded-full absolute lg:bottom-[-23px] bottom-[-20px] left-1 ring-1">
                <AvatarImage src={driverProfileImage} alt="Profile Image" />
            </Avatar>
        </div>    
    )
}