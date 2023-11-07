'use client'
import { FormEvent, useState } from "react";
import Button from "../uiComponents/Button";
import { useRouter } from "next/navigation";

export default function HomePgForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: ''
    })

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const startDate = formData.startDate;
        const endDate = formData.endDate;
        router.push(`/searchResults?startDate=${startDate}&endDate=${endDate}`);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 justify-center my-4'>
            <input readOnly type='text' value={'Texas'} className='border border-[lightgray] rounded-sm w-full' placeholder='Location' />
            <div className='flex justify-center gap-4 bg-[lightgray] h-16 p-2 '>
                <input name="startDate" onChange={handleChange} className='rounded-sm' type='date' min={new Date().toISOString().split('T')[0]} required />
                <p className='self-center text-[gray] h-full border border-[gray]'></p>
                <input name="endDate" onChange={handleChange} className='rounded-sm' type='date' min={new Date().toISOString().split('T')[0]} required />
            </div>
            <Button className='font-bold text-xl' size='lg'>Search</Button>
        </form>
    )
}