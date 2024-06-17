import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import prisma from '@/libs/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { SubmitButton } from '@/components/specific/SubmitButton';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { Textarea } from '@/components/ui/textarea';
import AddVehicleDialog from '@/components/specific/AddVehicleDialog';

async function getData(userId: string) {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
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

export default async function ProfilePage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    async function postData(formData: FormData) {
        'use server';

        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const userBio = formData.get('useBio') as string;
        const profileImage = formData.get('profileImage') as string;

        await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                fullName: name ?? undefined,
                phone: phone ?? undefined,
                userBio: userBio ?? undefined,
                profileImage: profileImage ?? undefined,
            },
        });

        revalidatePath('/', 'layout');
    }

    return (
        <div className="container flex flex-col items-center justify-center">
            <Card className="max-w-lg">
                <form action={postData}>
                    <CardHeader>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>
                            Please provide general information about yourself.
                            Please dont forget to save.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label>Edit Profile Picture</Label>
                        <Input
                            name="profileImage"
                            className="py-2"
                            type="file"
                        />
                    </CardContent>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <Label className="mb-2">Your Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    defaultValue={data?.fullName ?? undefined}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Your Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    disabled
                                    defaultValue={data?.email as string}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Your Phone</Label>
                                <Input
                                    name="phone"
                                    type="phone"
                                    id="phone"
                                    placeholder="Your Phone"
                                    defaultValue={data?.phone as string}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label>Your Bio</Label>
                                <Textarea
                                    name="userBio"
                                    id="userBio"
                                    placeholder="Type your message here."
                                    defaultValue={data?.userBio as string}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardContent>
                        <AddVehicleDialog />
                    </CardContent>
                    <CardFooter>
                        <SubmitButton buttonName="Save Button"/>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
