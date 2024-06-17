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

import { SubmitButton, TrashDelete } from '@/components/specific/SubmitButton';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { Textarea } from '@/components/ui/textarea';
import AddVehicleDialog from '@/components/specific/AddVehicleDialog';
import Link from 'next/link';

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
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);
    const vehicles = await getVehicles(user?.id as string);

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
    async function getVehicles(userId: string){
        const vehicles = await prisma.vehicle.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                brand: true,
                model: true,
                color: true,
                year: true,
                licensePlate: true,
            },
        });
        console.log(vehicles)
        return vehicles;    
    }

    async function deleteVehicle(formData: FormData) {
        "use server";

        const vehicleId = Number(formData.get("vehicleId")) as number;

        await prisma.vehicle.delete({
            where: {
                id: vehicleId,
            },
        });

        revalidatePath("/dasboard");
    }
    return (
        <div className="container flex flex-col md:flex-row gap-5 justify-center">
            <Card className="max-w-lg">
                <form action={postData}>
                    <CardHeader>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>
                            Please provide general information about yourself.
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

                    {/* {
                        vehicles?.length == 0  (
                            {
                                vehicles.map((vehicle, index) => {
                                    <div>Helllo</div>
                                })
                            }
                        ):(
                            <div>Loading</div>
                        )
                    } */}
                    <CardFooter className='mt-auto'>
                        <SubmitButton buttonName="Save Button"/>
                    </CardFooter>
                </form>
            </Card>
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>Your Vehicle</CardTitle>
                    <CardDescription>
                        Please provide general information about your car.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddVehicleDialog />
                </CardContent>
                <div className="flex flex-col px-6 gap-2 mt-4 sm:mt-auto justify-center items-left">
                    {vehicles?.map((vehicle) => (
                        <Card
                            key={vehicle.id}
                            className="flex items-center justify-between p-4"
                        >
                            <div>
                                <h2 className="font-semibold text-normal text-primary">
                                    {vehicle.brand} | {vehicle.model}
                                </h2>
                                <p className='text-slate-600'>
                                    {vehicle.year} {" "}
                                    {vehicle.licensePlate}
                                    
                                </p>
                            </div>

                            <div className="flex gap-x-4">
                                <form action={deleteVehicle}>
                                    <input type="hidden" name="vehicleId" value={vehicle.id} />
                                    <TrashDelete />
                                </form>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
}
