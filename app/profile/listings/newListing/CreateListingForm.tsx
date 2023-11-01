import { options } from "@/app/api/auth/[...nextauth]/options";
import Button from "@/components/uiComponents/Button";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function () {

    const session = await getServerSession(options);
    if (!session) redirect('/login')

    async function createListing(data: FormData) {
        "use server";
        if (!session) {
            return
        }
        console.log(session.user)
        const newListing = await prisma.item.create({
            data: {
                name: data.get('name')?.toString() ?? '',
                description: data.get('description')?.toString() ?? '',
                price: Number(data.get('price')) ?? '',
                owner: {
                    connect: { 'username': session.user.username },
                },
                location: {
                    connect: { id: 'clo95y7ua00046xgfyv0ccp0a' },
                },
            },
        })
        if (newListing) {
            redirect('/profile')
        }
    }

    return (
        <form action={createListing} className="flex flex-col gap-12 items-center m-auto md:w-1/2 w-100">
            <ul className="flex flex-col w-full gap-5">
                <li className="flex justify-evenly gap-4">
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="name">Name</label>
                        <input required className='text-[black]' type="text" id="name" name="name" placeholder="Name:" />
                    </span>
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="Location">Location</label>
                        <input className='text-[black]' type="text" value='Texas' readOnly id="Location" name="Location" />
                    </span>
                </li>
                <li className="flex justify-evenly gap-4">
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="description">description</label>
                        <input required className='text-[black]' type="text" id="description" name="description" placeholder="description:" />
                    </span>
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="price">cost/day</label>
                        <input required className='text-[black]' type="number" placeholder="$00.00" id="price" name="price" />
                    </span>
                </li>
                <li className="flex justify-between gap-4">
                    {/* show images? */}
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="image">images</label>
                        <input className='text-[black]' type="text" id="image" name="image" placeholder="image:" />
                    </span>
                    <span className="flex items-center ">
                        <Button size='md'>Upload Images</Button>
                    </span>
                </li>
            </ul>
            <Button className="w-full" type="submit">Submit</Button>
        </form>
    )
}