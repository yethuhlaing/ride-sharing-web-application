"use server"

import { LIMIT_MESSAGE } from "@/libs/data";
import prisma from "@/libs/db";
import { stripe } from "@/libs/stripe";
import { RideDataType, RideType, StatusType, UserData, UserType } from "@/libs/type";
import { getFromAndTo, getRandomAvatarUrl } from "@/libs/utils";
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function createBooking(ride_id: any, passenger_id: any) {
    "use server"

    try {
        const newBooking = await prisma.booking.create({
            data: {
                ride_id,
                passenger_id,
                status: "Pending",
            },
        });
        console.log(newBooking);
        revalidatePath('/dashboard/home/', 'layout')
    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('Booking.ride_id_passenger_id_unique')) {
            console.log("Duplicate booking error");
        } else {
            console.log('Error creating booking:', error);
        }
    }
}

export async function deleteBooking(booking_id: string) {

    try {
        await prisma.booking.delete({
            where: { booking_id: booking_id },
        });
        revalidatePath('/dashboard/home/', 'layout')

    } catch (error: any) {
        console.error('Error creating booking:', error);
    }
}

export async function updateBooking(booking_id: string, status: StatusType) {
    noStore()
    try {
        await prisma.booking.update({
            where: {
                booking_id: booking_id,
            },
            data: { status: status },
        });
        
        revalidatePath('/dashboard/home/', 'layout')
    } catch (error) {
        console.error('Something Wrong!', error);
        return error;
    }
}


export async function getUserData(user_id: string) {
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


export async function createRide({ driver_id,
    origin,
    destination,
    departure_time,
    available_seats } : any) {
    try {
        const newRide = await prisma.ride.create({
            data: {
                driver_id,
                origin,
                destination,
                departure_time,
                available_seats
            },
        });
        console.log('Ride created:', newRide);
        return newRide;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw error;
    }
}
export async function findRides(origin: string, destination: string, departureTime: Date) {
    try {
        // Create a range for the entire day
        const startOfDay = new Date(departureTime);
        startOfDay.setHours(0, 0, 0, 0);

        const rides = await prisma.ride.findMany({
            where: {
                origin: origin,
                destination: destination,
                departure_time: {
                    gte: startOfDay, 
                },
            },
            orderBy: {
                departure_time: 'asc',
            },
            include: {
                driver: true
            }
        });
        console.log(rides)
        return rides;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
export async function getRides() {
    try {
        const rides = await prisma.ride.findMany({
            include: {
                driver: true,
            },
        });
        console.log(rides)
        return rides;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
export async function getDataDashboard({
    email,
    id,
    firstName,
    lastName,
    profileImage,
}: UserData) {
    noStore();
    const user = await prisma.user.findUnique({
        where: {
            user_id: id,
        },
        select: {
            user_id: true,
            stripeCustomerId: true,
        },
    });
    if (!user) {
        const fullName = `${firstName ?? ''} ${lastName ?? ''}`;
        const avatarUrl = getRandomAvatarUrl();
        await prisma.user.create({
            data: {
                email: email,
                user_id: id,
                fullName: fullName,
                profileImage: avatarUrl,
            },
            select: {
                user_id: true,
            },
        });
    }
    if (!user?.stripeCustomerId) {
        const data = await stripe.customers.create({
            email: email,
        })
        await prisma.user.update({
            where: {
                user_id: id
            },
            data: {
                stripeCustomerId: data.id
            }
        })
    }
}
export async function getVehicles(user_id: string) {
    const vehicles = await prisma.vehicle.findMany({
        where: {
            user_id: user_id,
        }
    });
    console.log(vehicles)
    return vehicles;
}

export async function deleteVehicle(formData: FormData) {
    "use server";

    const vehicle_id = formData.get("vehicle_id") as string;

    await prisma.vehicle.delete({
        where: {
            vehicle_id: vehicle_id,
        },
    });

    revalidatePath('/dashboard', 'layout');
}
export async function getRidewithDriverId(driver_id: string) {
    noStore();
    try {
        const ride = await prisma.ride.findMany({
            where: {
                driver_id: driver_id
            },
            include: {
                reviews: true
            }

        });
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}

export async function getCompleteBooking(user_id: string) {
    const currentDate = new Date()
    const rides = await prisma.booking.findMany({
        where: {
            passenger_id: user_id,
            status: "Confirmed",
            ride: {
                departure_time: {
                    lt: currentDate,
                }
            },           
        },
        include: {
            ride: {
                include: {
                    driver: true,
                    reviews: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc',  // Assuming `createdAt` field exists in your model
        },

    })
    console.log(rides)
    return rides
}

export async function getRidewithRideId(ride_id: string) {
    noStore();
    try {
        const ride = await prisma.ride.findUnique({
            where: {
                ride_id: ride_id
            },
            include: {
                driver: true,
                bookings: {
                    include: {
                        passenger: true
                    }
                }
            },
        });
        if (!ride) {
            return null;
        }
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        return error;
    }
}

export async function getBookingwithUserId(user_id: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                passenger_id: user_id
            },
            include: {
                ride: {
                    include: {
                        driver: true
                    }
                },
                passenger: true
            },
        });     
        if (!bookings) {
            return null;
        }   
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return error;
    }
}

export async function getBookingwithRideIdAndPassengerId(ride_id: string, passenger_id: string) {
    noStore()
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                ride: true,
                passenger: true
            },
            where: {
                ride_id: ride_id,
                passenger_id: passenger_id
            },

        });
        if (!bookings) {
            return null;
        }
        console.log(bookings)
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return error;
    }
}
export async function getChatRoomWithUserId(user_id: string) {
    const chatRooms = await prisma.chatRoom.findMany({
        include: {
            passenger: true,
            driver: true
        },
        where: {
            OR: [
                { driver_id: user_id },
                { passenger_id: user_id }
            ]
        }
    });
    return chatRooms
}
export async function getChatRoomWithId(chatRoom_Id: string) {
    const chatRooms = await prisma.chatRoom.findUnique({
        where: {
            chat_room_id: chatRoom_Id
        },
        include: {
            passenger: true,
            driver: true
        },
    })
    return chatRooms
}
export async function deleteChatRoomWithId(chatRoomId: string) {
    try {
        const deletedChatRoom = await prisma.chatRoom.delete({
            where: {
                chat_room_id: chatRoomId,
            },
        });

        console.log('ChatRoom deleted:', deletedChatRoom);
        revalidatePath('/chat', 'page')
    } catch (error) {
        console.error('Error deleting ChatRoom:', error);
        throw error;
    }
}
export async function getBookingwithRideId(ride_id: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                ride_id: ride_id
            },
            include: {
                ride: true,
                passenger: true
            },
        });
        if (!bookings) {
            return null;
        }
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return error;
    }
}

export async function createMessages(content: string, senderId: string, chatRoomId: string ) {
    try {
        const newMessage = await prisma.message.create({
            data: {
                content,
                sender_id: senderId,
                chat_room_id: chatRoomId,                
            },
            include: {
                sender: true,  // Include sender data
            },
        });
        return newMessage;
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
}

export async function deleteMessageWithId(message_id: string){
    try {
        const deletedMessage = await prisma.message.delete({
            where: {
                message_id: message_id,
            },
        });
        console.log(deletedMessage)
        revalidatePath('/chat', 'page')

    } catch (error: any) {
        console.error('Error deleting message:', error);
        throw error

    } 

}

export async function updateMessageWithId(message_id: string, content: string) {
    try {
        const updatedMessage = await prisma.message.update({
            where: {
                message_id: message_id,
            },
            data: {
                content: content,
                is_edit: true,
            },
        });
        console.log('Message updated:', updatedMessage);
    } catch (error) {
        console.error('Error updating message:', error);
        throw error
    } 
}
export async function deleteRide(rideId: string) {
    try {
        const deletedRide = await prisma.ride.delete({
            where: { ride_id: rideId },
        });

        console.log('Deleted ride:', deletedRide);
        revalidatePath('/dashboard/home/history', 'page')
    } catch (error) {
        console.error('Error deleting ride:', error);
        throw error
    }
}
export async function getMessagesWithChatRoomId(limit: number, chatRoomId: string) {
    try {
        const messages = await prisma.message.findMany({
            include: {
                sender: true,
                chatRoom: true
            },
            where: {
                chat_room_id: chatRoomId
            },
            orderBy: {
                createdAt: 'desc',  // Assuming `createdAt` field exists in your model
            },
            take: limit,
        });
        return messages;
    } catch (error) {
        throw error
    }
}
export async function getMessageWithPage(page: number ){
    try {
        const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
        const messages = await prisma.message.findMany({
            skip: from,
            take: to - from + 1,
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                sender: true,
            },
        });
        return messages
    } catch (error) {
        throw error
    }
}

export async function createReview(ride_id: string, passenger_id: string, rating: number, comment: string) {
    try {
        const review = await prisma.review.create({
            data: {
                ride_id: ride_id,
                passenger_id: passenger_id,
                rating: rating,
                comment: comment,
            },
        });
        revalidatePath('/dashboard/home/review', 'page')
        console.log('Review created:', review);
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    } 
}

export async function getReviewWithUserId( user_id: string) {
    try {
        const review = await prisma.review.findMany({
            where: {
                passenger_id : user_id,
            }
        });

        console.log('Review:', review);
    } catch (error) {
        console.error( error);
        throw error;
    }
}