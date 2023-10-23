'use client'
import { usePathname } from "next/navigation"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const subPath = usePathname().split('/')[2];
    return (
        <main>
            <h1 className="text-center text-2xl font-bold ">User Name</h1>
            <nav role="navigation" aria-label="Profile navigation" className='flex justify-around lg:w-3/4 lg:mx-auto items-center border border-x-0 border-t-0 border-b-1 border-b-[#b6b6b6] dark:border-b-[#333333] h-10'>
                <a href="/profile/listings" className={`flex items-center h-full font-semibold text-base ${subPath ==='listings' && 'border-b border-b-1 border-[#b6b6b6] dark:border-[black]'} active:border active:border-b-2 active:border-b-[black]`}>My Listings</a>
                <a href="/profile/rentals" className={`flex items-center h-full font-semibold text-base ${subPath ==='rentals' && 'border-b border-b-1 border-[#b6b6b6] dark:border-[black]'} active:border active:border-b-2 active:border-b-[black]`}>My Rentals</a>
                <a href="/profile/settings" className={`flex items-center h-full font-semibold text-base ${subPath ==='settings' && 'border-b border-b-1 border-[#b6b6b6] dark:border-[black]'} active:border active:border-b-2 active:border-b-[black]`}>Settings</a>
            </nav>
            {children}
        </main>
    )
}
