"use client";
import React from 'react'
import { SafeUser } from '../types';
import {IconType} from "react-icons";
import useCountries from '../hooks/useCountries';
import Avatar from '../components/navbar/Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Maps'), {
    ssr: false,
})

interface ListingInfoProps {
    user?: SafeUser | null;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
    user, category, description, 
    roomCount, guestCount,bathroomCount, locationValue
}) => {
    const {getByValue} = useCountries();
    const cordinates = getByValue(locationValue)?.lating;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className=' flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2
        '>
            <div> Hosted by {user?.name}</div>  
            <Avatar  src= {user?.image}/>
        </div>
        <div className=' flex flex-row items-center gap-4 font-light text-neutral-500'>
            <div> {guestCount} guests</div>
            <div> {roomCount} rooms</div>
            <div> {bathroomCount} bathrooms</div>
            
        </div>
        </div>
        <hr />
        {
            category && (
                <ListingCategory
                    label={category.label}
                    description={category.description}
                    icon={category.icon}
                />
            )
        }
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr />
        <Map  center={cordinates}/>
    </div>
    

  )
}

export default ListingInfo
