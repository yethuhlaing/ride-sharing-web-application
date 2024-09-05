"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { createReview } from '@/actions/action'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'
import { StarColors } from '@/libs/data'
import { Textarea } from '@/components/ui/textarea'

function ReviewForm({ ride_id, passenger_id }: any) {
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState(0);
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    const stars = Array(5).fill(0);

    const handleClick = (value: number) => {
        setRating(value);
    };

    const handleMouseOver = (newHoverValue: number) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createReview(ride_id, passenger_id, rating, comment)
            toast.success("Review submitted successfully!")
            setRating(0);
            setComment('');

        } catch (error: any) {
            console.log(error)
            
            if (error?.message.includes("Unique constraint")) {
                // Handle unique constraint error
                toast.error("Review already exists for this ride!");
            
            } else {
                // Handle generic errors
                toast.error("Error submitting review. Please try again.");
            }
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="btn btn-primary text-xs w-auto h-auto">
                    Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[775px]">
                <DialogHeader>
                    <DialogTitle>Give Review</DialogTitle>
                    <DialogDescription className='mt-2'>
                        We are committed to providing you with the best travel experience possible, so we welcome your reviews.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 space-y-1">
                        <Label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating:
                        </Label>
                        <div className="flex flex-row">
                            {stars.map((_, index) => {
                                return (
                                    <Star
                                        key={index}
                                        size={24}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={(hoverValue || rating) > index ? StarColors.hover : StarColors.current}
                                        className="mr-2 cursor-pointer"
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                            Comment:
                        </Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        ></Textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Review
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewForm