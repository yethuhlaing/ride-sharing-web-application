import {
    Card,
    CardContent,
    CardDescription,
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
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { deleteVehicle, getUserData, getVehicles, updateProfileImage } from '@/actions/action';
import Link from 'next/link';
import AddVehicleDialog from './AddVehicleDialog';


export default async function ProfilePage() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    const data = await getUserData(user?.id as string);
    const vehicles = await getVehicles(user?.id as string);

    
    async function postProfileImage(formData: FormData) {
        'use server';

        const image = formData.get("profileImage") as File || null;


        const buffer = Buffer.from(await image.arrayBuffer()) as any;
        const relativeUploadDir = `/uploads/${new Date(Date.now())
            .toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-")}`;

        const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        
        try{
            await stat(uploadDir);
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${image.name.replace(
                /\.[^/.]+$/,
                ""
            )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            const fileUrl = `${relativeUploadDir}/${filename}`;

            await prisma.user.update({
                where: {
                    user_id: user?.id,
                },
                data: {
                    profileImage: fileUrl ?? undefined,
                },
            });
        }catch( e: any){
            if (e.code === "ENOENT") {
                // If the directory doesn't exist (ENOENT : Error No Entry), create one
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(
                    "Error while trying to create directory when uploading a file\n",
                    e
                );
            }
        }

        revalidatePath('/', 'layout');
    }

    async function postProfileData(formData: FormData) {
        'use server';

        const name = formData.get('name') as string;
        const phone = formData.get('phone') as string;
        const userBio = formData.get('userBio') as string;

        try{
            await prisma.user.update({
                where: {
                    user_id: user?.id,
                },
                data: {
                    fullName: name ?? undefined,
                    phone: phone ?? undefined,
                    userBio: userBio ?? undefined,
                },
            });
        }catch(error){
            console.log(error)
        }

        revalidatePath('/dashboard', 'layout');
    }
    // <RefreshCcw className="w-4 h-4 p-0 text-primary" />

    return (
        <div className="container flex flex-col md:flex-row gap-5 justify-center">
            <Card className="w-full lg:flex-1">
                    <CardHeader>
                    <CardTitle className='flex'>
                        Your Profile
                        <span className='text-xs m-auto px-4 py-1 bg-secondary-foreground rounded-3xl text-neutral-50 mx-2'>
                            <Link href={`/dashboard/home/profile/${user?.id}`}>
                                Link
                            </Link>
                        </span>
                    </CardTitle>
                        <CardDescription>
                            Please provide general information about yourself.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={postProfileImage}>
                                <Label>Edit Profile Picture</Label>
                                <Input
                                    name="profileImage"
                                    className="mt-2 mb-2"
                                    type="file"                                
                                />
                                <SubmitButton buttonName={"Upload Profile"}/>
                        </form>
                        <form action={updateProfileImage.bind(null, user?.id as string)}>
                            <SubmitButton buttonName={"Change Avatar"} />
                        </form>
                    </CardContent>
                    <CardContent>
                        <form action={postProfileData}>
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
                                    <Label htmlFor='userBio'>Your Bio</Label>
                                    <Textarea
                                        name="userBio"
                                        id="userBio"
                                        placeholder="Type your message here."
                                        defaultValue={data?.userBio as string}
                                    />
                                </div>
                                <SubmitButton buttonName="Save Now" />
                            </div>
                        </form>
                    </CardContent>

            </Card>
            <Card className="w-full lg:flex-1">
                <CardHeader>
                    <CardTitle>Your Vehicle</CardTitle>
                    <CardDescription>
                        Please provide general information about your car.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddVehicleDialog />
                </CardContent>
                <CardContent>
                    <div className="flex flex-col gap-2 sm:mt-auto justify-center items-left">
                        {vehicles?.map((vehicle) => (
                            <Card
                                key={vehicle.vehicle_id}
                                className="flex items-center justify-between p-4"
                            >
                                <div>
                                    <h2 className="font-semibold text-normal text-primary">
                                        {vehicle.brand} {vehicle.model}
                                    </h2>
                                    <p className='text-slate-600'>
                                        License - {vehicle.licensePlate}
                                    </p>
                                </div>

                                <div className="flex gap-x-4">
                                    <form action={deleteVehicle}>
                                        <input type="hidden" name="vehicle_id" value={vehicle.vehicle_id} />
                                        <TrashDelete />
                                    </form>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
