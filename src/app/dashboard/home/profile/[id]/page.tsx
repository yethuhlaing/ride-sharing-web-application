import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/libs/db';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';


async function getData(user_id: string) {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            user_id: user_id,
        },
        select: {
            fullName: true,
            email: true,
            phone: true,
            userBio: true,
            profileImage: true,
        },
    });

    return data;
}

async function ProfilePage({params} : any) {
    const { id } = params
    console.log(id)
    const useData = await getData(id as string);

    return (
        <Card>
            <CardContent>
                <div className="mt-2">
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">FullName: </span>
                        <span className="ml-2 text-gray-600">{useData?.fullName}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-gray-700">UserBio: </span>
                        <span className="ml-2 text-gray-600">{useData?.userBio}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Email: </span>
                        <span className="ml-2 text-gray-600">{useData?.email}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProfilePage