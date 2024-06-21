import { DashboardSidebar } from "@/components/specific/DashboardSidebar";
import prisma from "@/libs/db";
import RideCard from "@/components/specific/RideCard"

async function getRides() {
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
export default async function DashboardPage(){
    const rides = await getRides()
    return(
        <div className="p-4 space-y-2">
            {rides.map((ride, index) => (
                <RideCard key={index} ride={ride} />
            ))}
        </div>
    )
}