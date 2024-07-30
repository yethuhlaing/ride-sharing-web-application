import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getRidewithDriverId, getUserData } from '@/actions/action';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


async function ProfilePage({params} : any) {
    const { id } = params
    const useData = await getUserData(id as string);
    const rides = await getRidewithDriverId(id as string)
    return (
        <Card>
            <CardHeader>
                <Image
                    src={useData?.profileImage as string | StaticImport}
                    alt="User Profile Image"
                    width={80}  // Set the appropriate width
                    height={80} // Set the appropriate height
                    className="rounded-full aspect-square object-cover"
                    priority
                />
            </CardHeader>
            <CardContent>
                <div className="mt-2">
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">FullName: </span>
                        <span className="ml-2 text-gray-600">{useData?.fullName}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">UserBio: </span>
                        <span className="ml-2 text-gray-600">{useData?.userBio || "..."}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Email: </span>
                        <span className="ml-2 text-gray-600">{useData?.email}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Phone: </span>
                        <span className="ml-2 text-gray-600">{useData?.phone || "..."}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfilePage