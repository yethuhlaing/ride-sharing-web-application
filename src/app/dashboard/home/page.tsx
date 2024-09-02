import React, { Suspense, useEffect, useState } from 'react';
import RideList from './RideList';
import PaginationComponent from './PaginationComponent';
import prisma from '@/libs/db';
import SearchForm from './SearchForm';

export type RideQuery = {
    pickUpValue: string,
    dropOffValue: string,
    date: string,
    page_size: string;
    page: string;
};

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: RideQuery;
}){
    
    // const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    // const [pageSize, setPageSize] = useQueryState('page_size', parseAsInteger.withDefault(8));

    const page = parseInt(searchParams.page, 10) || 1;
    const pageSize = 3;

    const filters: any = {};

    if (searchParams.pickUpValue) {
        filters.origin = searchParams.pickUpValue;
    }

    if (searchParams.dropOffValue) {
        filters.destination = searchParams.dropOffValue;
    }

    if (searchParams.date) {
        const startOfDay = new Date(searchParams.date);
        startOfDay.setHours(0, 0, 0, 0);
        filters.departure_time = {
            gte: startOfDay, // Filter rides that depart on or after the specified date
        };
    }
    const rides = await prisma.ride.findMany({
        where: filters,
        orderBy: {
            departure_time: 'desc',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            driver: true
        }
    });
    const rideCount = await prisma.ride.count({
        where: filters
    });
    return(
        <div className='relative flex flex-col'>
            <SearchForm />
            <RideList rides={rides} />
            <PaginationComponent
                rideCount={rideCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </div>

    )
}

