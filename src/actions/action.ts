"use server"

import { LIMIT_MESSAGE } from "@/libs/data";
import prisma from "@/libs/db";
import { StatusType } from "@/libs/type";
import { getFromAndTo, getRandomAvatarUrl } from "@/libs/utils";
import { revalidatePath } from 'next/cache';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function createBooking(ride_id: any, passenger_id: any) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated){
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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

    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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


export const getUserData = cache( async (user_id: string) => {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser()
    if (!isUserAuthenticated && user) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
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
    } catch (error) {
        console.error('Something Wrong!', error);
        throw error;
    }
})
export async function getUserSubscriptionData(user_id: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        console.log(user_id)
        const SubscriptionData = await prisma.user.findUnique({
            where: {
                user_id: user_id,
            },
            select: {
                email: true,
                plan: true,
                customerId: true
            },
        });
        return SubscriptionData;
    } catch (error) {
        console.error('Something Wrong!', error);
        throw error;
    }
}
export async function createRide({ driver_id,
    origin,
    destination,
    departure_time,
    available_seats } : any) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
// export async function getAllRides(page: number, pageSize: number){

//     try {
//         const rides = await prisma.ride.findMany({
//             orderBy: {
//                 departure_time: 'asc',
//             },
//             skip: (page - 1) * pageSize,
//             take: pageSize,
//             include: {
//                 driver: true
//             }
//         });
//         return rides
//     } catch (error) {
//         console.error('Error fetching rides:', error);
//         throw error;
//     }
// }
// export async function countAllRides() {
//     try {

//         const rideCount = await prisma.ride.count();
//         return rideCount
//     } catch (error) {
//         console.error('Error fetching rides:', error);
//         throw error;
//     }
// }
export async function countRides(origin: string, destination: string, departureTime: Date) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        // Create a range for the entire day
        const startOfDay = new Date(departureTime);
        startOfDay.setHours(0, 0, 0, 0);
        const rideCount = await prisma.ride.count({
            where: {
                origin: origin,
                destination: destination,
                departure_time: {
                    gte: startOfDay,
                },
            }
        });
        return rideCount
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
export async function findRides(origin: string, destination: string, departureTime: Date, page: number , pageSize: number ) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: {
                departure_time: 'asc',
            },
            include: {
                driver: true
            }
        });
        return rides
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}

export async function checkAuthStatus() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return { success: false };
    const existingUser = await prisma.user.findUnique({ where: { user_id: user.id } });

    // sign up
    if (!existingUser) {
        const fullName = `${user.given_name ?? ''} ${user.family_name ?? ''}`;
        const avatarUrl = getRandomAvatarUrl();
        await prisma.user.create({
            data: {
                email: user.email!,
                user_id: user.id,
                fullName: fullName,
                profileImage: user.picture || avatarUrl,
            },
            select: {
                user_id: true,
            },
        });
    }

    return { success: true };
} 
// export async function getDataDashboard({
//     email,
//     id,
//     firstName,
//     lastName,
//     profileImage,
// }: UserData) {
//     noStore();
//     const user = await prisma.user.findUnique({
//         where: {
//             user_id: id,
//         },
//         select: {
//             user_id: true,
//             stripeCustomerId: true,
//         },
//     });
//     if (!user) {
//         const fullName = `${firstName ?? ''} ${lastName ?? ''}`;
//         const avatarUrl = getRandomAvatarUrl();
//         await prisma.user.create({
//             data: {
//                 email: email,
//                 user_id: id,
//                 fullName: fullName,
//                 profileImage: avatarUrl,
//             },
//             select: {
//                 user_id: true,
//             },
//         });
//     }

// }
export const getVehicles = cache( async (user_id: string) => {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    const vehicles = await prisma.vehicle.findMany({
        where: {
            user_id: user_id,
        }
    });
    console.log(vehicles)
    return vehicles;
}
)
export async function deleteVehicle(formData: FormData) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    const vehicle_id = formData.get("vehicle_id") as string;

    await prisma.vehicle.delete({
        where: {
            vehicle_id: vehicle_id,
        },
    });

    revalidatePath('/dashboard', 'layout');
}
export const getRidewithDriverId = cache(async (driver_id: string) => {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        const ride = await prisma.ride.findMany({
            where: {
                driver_id: driver_id
            },
            include: {
                reviews: true,
                bookings: {
                    include: {
                        passenger: true
                    }
                }
            }
        });
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
)
export async function getCompleteBooking(user_id: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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

export const getRidewithRideId = cache(async (ride_id: string) =>{
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
}) 

export async function getBookingwithUserId(user_id: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                passenger_id: user_id
            },
            include: {
                ride: {
                    include: {
                        driver: true,
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
export async function updateProfileImage(user_id: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        const AvatarUrl = getRandomAvatarUrl()
        await prisma.user.update({
            where: {
                user_id: user_id,
            },
            data: {
                profileImage: AvatarUrl
            },
        });
    } catch (error) {
        console.log(error)
    }

    revalidatePath('/dashboard', 'layout');
}
export async function getBookingwithRideIdAndPassengerId(ride_id: string, passenger_id: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
export const getBookingwithRideId = cache( async (ride_id: string) => {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
}) 

export async function createMessages(content: string, senderId: string, chatRoomId: string ) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    console.log(messages)
    return messages;
}
export async function getMessageWithPage(page: number ){
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
}

export async function createReview(ride_id: string, passenger_id: string, rating: number, comment: string) {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
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
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) {
        redirect(process.env.KINDE_POST_LOGIN_REDIRECT_URL!)
    }
    try {
        const review = await prisma.review.findMany({
            where: {
                passenger_id : user_id,
            },

        });

        console.log('Review:', review);
    } catch (error) {
        console.error( error);
        throw error;
    }
}