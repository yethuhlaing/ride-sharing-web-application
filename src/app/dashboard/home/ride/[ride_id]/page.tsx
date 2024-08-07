import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/libs/db';
import { formatDate, formatTime, getFirstName } from '@/libs/utils';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createBooking, deleteBooking, getBookingwithRideId, getBookingwithRideIdAndPassengerId, getRidewithRideId, getUserData, updateBooking } from '@/actions/action';
import { revalidatePath, unstable_cache } from 'next/cache';
import { CancelButton, SubmitButton } from '@/components/specific/SubmitButton';
import NotFound from '../../NotFound';
import { BookingType, RideType } from '@/libs/type';



export default async function RidePage({ params } : any) {

    const { ride_id } = params;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const passenger_id = user?.id as string

    const ride = await getRidewithRideId(ride_id) as RideType
    const bookings = await getBookingwithRideId(ride_id) as BookingType[]
    const bookingsWithPassengerId = await getBookingwithRideIdAndPassengerId(ride_id, passenger_id ) as BookingType[]
    console.log(bookingsWithPassengerId)
    async function handleSubmit() {
        "use server"

        try {
            await createBooking(ride_id, passenger_id);
            revalidatePath(`/dashboard/home/`, "layout")

        } catch (error: any) {
            if (error.stack?.includes("Unique constraint failed on the fields")) {
                console.log('Error: Passenger already booked this ride');
            } else {
                console.log('Error creating booking:', error);
            }

        }
    }

    async function handleAccept(booking_id: string, passenger_id: string, driver_id: string) {
        "use server"

        try {
            await updateBooking(booking_id, "Confirmed")
            const driver = await getUserData(driver_id)
            const passenger = await getUserData(passenger_id)
            const chatRoomname = `${getFirstName(driver?.fullName as string)} • ${getFirstName(passenger?.fullName as string) }`
            await prisma.chatRoom.create({
                data: {
                    name: chatRoomname,
                    driver_id: driver_id,
                    passenger_id: passenger_id,
                },

            });
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }

    }
    async function handleRequestAgain(booking_id: string) {
        "use server"

        try {
            await updateBooking(booking_id, "Pending")
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }

    }
    async function handleDecline(booking_id: string) {
        "use server"

        try {
            await updateBooking(booking_id, "Declined")
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }
    }
    async function handleDelete() {
        "use server"

        try {
            await deleteBooking(ride?.bookings?.[0]?.booking_id as string)
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            { ride ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
                        <div className="flex flex-row justify-between py-4">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <Image
                                        src={ride?.driver?.profileImage as string | StaticImport}
                                        alt="User Profile Image"
                                        width={80}  // Set the appropriate width
                                        height={80} // Set the appropriate height
                                        className="rounded-full aspect-square object-cover"
                                        priority
                                    />

                                </div>
                                <div className="flex flex-col space-y-2 text-base lg:text-xl font-bold">
                                    {ride?.driver?.fullName}
                                    <Button className='btn-primary text-xs mr-2 mt-2 w-fit h-fit' >
                                        <Link href={`/dashboard/home/profile/${ride?.driver?.user_id}`}>
                                            Check Profile
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700">Origin: </span>
                                <span className="ml-2 text-gray-600">{ride?.origin}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Destination: </span>
                                <span className="ml-2 text-gray-600">{ride?.destination}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Departure Date: </span>
                                <span className="ml-2 text-gray-600">{formatDate(ride?.departure_time.toLocaleString() as string)}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Departure Time: </span>
                                <span className="ml-2 text-gray-600">{formatTime(ride?.departure_time.toLocaleString() as string)}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Available Seats: </span>
                                <span className="ml-2 text-gray-600">{ride?.available_seats}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent>
                        {
                            ride?.driver?.user_id !== user?.id ? (                                                                
                                <>
                                    {bookingsWithPassengerId.length === 0 ? (
                                        <form action={handleSubmit}>
                                            <SubmitButton buttonName='Request Ride' />
                                        </form>
                                    ) : (
                                        <>
                                            {bookingsWithPassengerId[0]?.status === "Pending" && (
                                                <form action={handleDelete}>
                                                    <CancelButton buttonName='Cancel Request' />
                                                </form>
                                            )}
                                            {bookingsWithPassengerId[0]?.status === "Declined" && (
                                                    <form action={handleRequestAgain.bind(null, bookingsWithPassengerId[0].booking_id)}>
                                                    <SubmitButton buttonName='Request Again' />
                                                </form>
                                            )}
                                            {bookingsWithPassengerId[0]?.status === "Confirmed" && (
                                                <Button className='bg-green-400 hover:bg-green-500 text-xs mr-2 mt-2 w-full md:w-20 h-fit'>
                                                    <Link href='/dashboard/home/chat'>
                                                        Chat
                                                    </Link>
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    
                                </>
                                    
                                
                            ) : (
                                <div className='w-full md:flex flex-wrap flex-row space-x-0 space-y-2 md:space-x-4 md:space-y-0'>
                                    {
                                        bookings.length > 0 ? (
                                                bookings?.filter((booking: BookingType) => booking.status !== 'Declined').map((booking: BookingType) => (
                                                <Card key={booking.booking_id}>
                                                    <CardHeader>
                                                        <div className="flex flex-row justify-between py-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div>
                                                                    <Image
                                                                        src={booking.passenger?.profileImage as string | StaticImport}
                                                                        alt="User Profile Image"
                                                                        width={80}  // Set the appropriate width
                                                                        height={80} // Set the appropriate height
                                                                        className="rounded-full aspect-square object-cover"
                                                                        priority
                                                                    />

                                                                </div>
                                                                <div className="flex flex-col space-y-2 text-base lg:text-xl font-bold">
                                                                    <span className='font-normal text-sm'>{booking.passenger?.fullName}</span>
                                                                    <Button className='btn-primary text-xs mr-2 mt-2 w-full h-fit' >
                                                                        <Link href={`/dashboard/home/profile/${booking.passenger_id}`}>
                                                                            Check Profile
                                                                        </Link>
                                                                    </Button>                                                            
                                                                    {
                                                                        booking.status === "Confirmed" && (
                                                                            <Button className='bg-green-400 hover:bg-green-500 text-xs mr-2 mt-2 w-full h-fit'>
                                                                                <Link href={'/dashboard/home/chat'}>
                                                                                    Chat
                                                                                </Link>
                                                                            </Button>
                                                                        )
                                                                    }                                                                    
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {
                                                            booking.status === "Pending" && (
                                                                <div className='flex flex-row space-x-2'>
                                                                    <form action={handleAccept.bind(null, booking.booking_id, booking.passenger_id, booking.ride?.driver_id as string)}>
                                                                        <SubmitButton buttonName='Accept Ride' />
                                                                    </form>
                                                                    <form action={handleDecline.bind(null, booking.booking_id)}>
                                                                        <CancelButton buttonName='Decline Ride' />
                                                                    </form>
                                                                </div>
                                                            )
                                                        }
                                                    </CardHeader>
                                                </Card>
                                            ))
                                        ) : (
                                            <p>No pending bookings</p>
                                        )
                                    }
                                </div>
                            )
                        }
                    </CardContent>
                </Card >
                ): 
                (
                    <NotFound />
                )
            }
        </>
    )
}


