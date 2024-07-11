import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getUserData } from '@/actions/action';


async function ProfilePage({params} : any) {
    const { id } = params
    const useData = await getUserData(id as string);

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