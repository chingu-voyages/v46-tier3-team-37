import Button from "@/components/uiComponents/Button";
import Image from "next/image";

export default function Settings() {
    return (
        <div className="h-screen flex items-center lg:w-3/4 lg:mx-auto flex-col mt-10">
            <section aria-labelledby="User Info" className="w-3/4 text-center ">
                <h4 className="border-b-2 border-b-[lightgray] dark:border-b-[#3d3d3d]">User Info</h4>
                <ul className="my-10 md:mx-32 lg:mx-0">
                    <li className="flex lg:justify-around justify-between my-10">
                        <Image src={'/facebook.png'} height={30} width={30} alt='facebook logo' />
                        <Button variant={'default'} size={'md'}>Logout</Button>
                    </li>
                    <li className="flex lg:justify-around justify-between my-10">
                        <Image src={'/facebook.png'} height={30} width={30} alt='facebook logo' />
                        <Button variant={'default'} size={'md'}>Logout</Button>
                    </li>
                    <li className="flex lg:justify-around justify-between my-10">
                        <Image src={'/facebook.png'} height={30} width={30} alt='facebook logo' />
                        <Button variant={'default'} size={'md'}>Logout</Button>
                    </li>
                </ul>
            </section>
            <section aria-labelledby="User Info" className="w-3/4 text-center ">
                <h4 className="border-b-2 border-b-[lightgray] dark:border-b-[#3d3d3d]">User Credentials</h4>
                <ul className="my-10 md:mx-32 lg:bg-blue">
                    <li className="flex lg:justify-around justify-between my-10">
                        <Image src={'/facebook.png'} height={30} width={30} alt='facebook logo' />
                        <Button className="basis-1/2" variant={'thin'} size={'sm'}>change email</Button>
                    </li>
                    <li className="flex lg:justify-around justify-between my-10">
                        <Image src={'/facebook.png'} height={30} width={30} alt='facebook logo' />
                        <Button className="basis-1/2" variant={'thin'} size={'sm'}>change password</Button>
                    </li>
                </ul>
            </section>
        </div>
    )
}