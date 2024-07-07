import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import prisma from '@/libs/db';
import { Plus } from 'lucide-react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';

export default async function AddVehicleDialog() {

    async function createVehicle(formData) {
        "use server";

        const brand = formData.get("brand");
        const model = formData.get("model");
        const color = formData.get("color");
        const year = Number(formData.get("year"));
        const licensePlate = formData.get("licensePlate");
        try {
            const { getUser } = getKindeServerSession();
            const user = await getUser();
            const user_id = user?.id 

            if (!user){
                throw new Error(`User with ID ${user_id} not found`);
            }

            const newVehicle = await prisma.vehicle.create({
                data: {
                    brand: brand ?? undefined,
                    model: model ?? undefined,
                    color: color ?? undefined,
                    year: year ?? undefined,
                    licensePlate: licensePlate ?? undefined,
                    user_id: user_id,
                },
            });
            toast.success('New Vehicle Created!');
        } catch (error) {
            console.error('Error creating vehicle:', error);
            throw error;
        } 

        revalidatePath("/dashboard/profile", "page");
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus size={20} />
                    Add Vehicle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='mb-3'>Your vehicle</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <form action={createVehicle}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">
                                brand
                            </Label>
                            <Input
                                id="brand"
                                name="brand"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">
                                Model
                            </Label>
                            <Input
                                id="model"
                                name="model"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            <Input
                                id="color"
                                name="color"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                                Year
                            </Label>
                            <Input
                                id="year"
                                name="year"
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="licensePlate" className="text-right">
                                LicensePlate
                            </Label>
                            <Input
                                id="licensePlate"
                                name="licensePlate"
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                        <DialogFooter>
                            <DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}