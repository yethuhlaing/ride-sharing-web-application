import { DashboardSidebar } from "@/components/specific/DashboardSidebar";

export default function DashboardPage(){
    return(
        <div className="flex flex-col space-y-6 mt-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardSidebar />
                </aside>
                <main>
                    <h1 className="text-center my-auto">
                        Ride Posts will be uplaoded here!
                    </h1>
                </main>
            </div>
        </div>
    )
}