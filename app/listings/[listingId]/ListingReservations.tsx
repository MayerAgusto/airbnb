"use client";
import Button from '@/app/components/Button';
import Calendar from '@/app/components/Calendar';
import React from 'react'
import {Range} from "react-date-range";


interface ListingReservationsProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range,
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}
const ListingReservations: React.FC<ListingReservationsProps> = (
    {
        price, totalPrice, onChangeDate, dateRange, disabled, disabledDates, onSubmit
    }
) => {
  return (
    <div
    className='bg-white rounded-xl borer-[1px] border-neutral-200 overflow-hidden' >
    
    <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>
            $ {price}
        </div>
        <div className='font-light text-neutral-500'>
            night
        </div>
    </div>
    <hr />
    <Calendar
        value= {dateRange}
        disabledDates= {disabledDates}
        onChange= {(value) => onChangeDate(value.selection)}
    />
    <hr />
    <div className='p-4'>
        <Button 
            disabled= {disabled}
            label='Reservar'
            onClick={onSubmit}
        />
    </div>
    <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>
            Total
        </div>
        <div>
            $ {totalPrice}
        </div>
    </div>
    </div>
  )
}

export default ListingReservations
