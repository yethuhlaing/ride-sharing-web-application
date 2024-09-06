'use client'

import React from 'react'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationLink,

} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from '@/components/ui/button'

type Props = {
    rideCount: number;
    pageSize: number;
    currentPage: number;
    setPage: (page: number) => void; // eslint-disable-line no-unused-vars
};

export default function PaginationComponent({ rideCount, pageSize, currentPage, setPage }: Props){

    const generatePaginationLinks = () => {
        const paginationLinks = [];
        const leftEllipsis = currentPage > 2;
        const rightEllipsis = currentPage < pageCount - 1;

        for (let i = 1; i <= pageCount; i++) {
            if (
                i === 1 ||
                i === pageCount ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                paginationLinks.push(
                    <PaginationLink
                        key={i}
                        onClick={() => setPage(i)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                );
            }
        }

        if (leftEllipsis) {
            paginationLinks.splice(1, 0, <PaginationEllipsis key="left" />);
        }
        if (rightEllipsis) {
            paginationLinks.splice(
                paginationLinks.length - 1,
                0,
                <PaginationEllipsis key="right" />
            );
        }

        return paginationLinks;
    };

    const pageCount = Math.ceil(rideCount / pageSize);
    if (pageCount <= 1) return null;
    console.log
    const changePrevious = async () => {
        
        const page = currentPage - 1
        setPage(page)
        // const params = new URLSearchParams(searchParams!);
        // params.set("page", page.toString());
        // router.push("?" + params.toString()); 

    };
    const changeNext = async () => {
        const page = currentPage + 1
        setPage(page)
        // const params = new URLSearchParams(searchParams!);
        // params.set("page", page.toString());
        // router.push("?" + params.toString());
    };
    return (
        <Pagination className='absolute bottom-2'>
            <PaginationContent className=" *:cursor-pointer">
                <form action={changePrevious}>
                    <Button
                        variant="ghost"
                        disabled={currentPage <= 1}
                        className="group"
                    >
                        <ChevronLeft className="group-hover:-translate-x-1 transition-all duration-300 delay-150" />{" "}
                        Previous
                    </Button>
                </form>
                {generatePaginationLinks()}
                <form action={changeNext}>
                    <Button
                        variant="ghost"
                        disabled={currentPage === pageCount}
                        className="group"
                    >
                        Next{" "}
                        <ChevronRight className="group-hover:translate-x-1 transition-all duration-300 delay-150" />
                    </Button>
                </form>
            </PaginationContent>
        </Pagination>
    );
}

