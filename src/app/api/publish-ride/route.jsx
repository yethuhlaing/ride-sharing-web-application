// pages/api/publish-ride.js
import { NextResponse } from 'next/server'
import prisma from "@/libs/db";

export async function POST(request) {
    try {
        const { driver_id, origin, destination, departure_time, available_seats } = await request.json()
        console.log(origin)
        // Create a new ride in the database
        const ride = await prisma.ride.create({
            data: {
                driver_id,
                origin,
                destination,
                departure_time,
                available_seats: parseInt(available_seats, 10),
            },
        })

        return NextResponse.json({ ride })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}