import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function Loading() {

    return (
        <div className="flex flex-col space-y-3">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-24 w-[100%]" />
            </div>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-24 w-[100%]" />
            </div>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-24 w-[100%]" />
            </div>
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
    )
    
}

export default Loading