"use client"

import React from "react"
import { addDays, format } from "date-fns"

import { cn } from "@/libs/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function DatePickerWithPresets({ date, setDate, placeholderName }) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full text-sm ml-4 justify-start text-left",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? format(date, "PP") : <span>{placeholderName}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
            >
                <Select
                    onValueChange={(value) => {
                        if (value) {
                            setDate(addDays(new Date(), parseInt(value)))
                        } else{
                            setDate(null)
                        }
                    }
                }
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                </Select>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    required
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

// import React from 'react'
// import { Button } from '@/components/ui/button';
// import { format } from "date-fns"
// import { cn } from "@/libs/utils"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"

// export default function DatePicker({ date, setDate,  placeholderName}) {
//     const handleDateChange = (date) => {
//         setDate(date)
//     }
//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button
//                     variant={"outline"}
//                     className={cn(
//                         "w-full text-sm ml-4 justify-start text-left",
//                         !date && "text-muted-foreground"
//                     )}
//                 >
//                     {date ? format(date, "PPP") : <span>{placeholderName}</span>}
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                     mode="single"
//                     selected={date}
//                     onDateChange={handleDateChange}
//                     onSelect={setDate}
//                     initialFocus
//                 />
//             </PopoverContent>
//         </Popover>
//     )
// }
