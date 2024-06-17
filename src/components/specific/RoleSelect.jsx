'use client';

import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function RoleSelect() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState();

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };
    useEffect(() => {
        if (selectedRole === 'driver') {
            router.push('/dashboard/driver');
        } else if (selectedRole === 'passenger') {
            router.push('/dashboard/passenger');
        }
    }, [selectedRole]);
    return (
        <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose your Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="passenger">Passenger</SelectItem>
            </SelectContent>
        </Select>
    );
}
