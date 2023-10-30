import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";

/**
 * 
 * Items in section tags need to be broken into components in /app/checkout/component
 */

export default function () {
    return (
        <main className="dark flex flex-col gap-4 dark text-center bg-opacity-5 bg-[black] dark:bg-backgroundPrimary dark:text-fontSecondary h-full w-screen md:px-48">
            <section className=" w-full p-4 bg-[white] dark:bg-foregroundPrimary">
                <Card variant={'default'} title={'lawn mower'}></Card>
            </section>
            <section className="w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary">
                <h1 className="font-bold text-fontPrimary">Your Rental</h1>
                <h3 className="font-semibold text-sm mt-4 text-fontPrimary">Dates</h3>
                <ul className="pb-4 font-light">
                    <li className="flex justify-between py-1"><p>Start Date: 01/10/2022</p><Button variant={'thin'} size='sm'>Edit</Button></li>
                    <li className="flex justify-between py-1"><p>End Date: 01/10/2022</p><Button variant={'thin'} size='sm'>Edit</Button></li>
                </ul>
            </section>
            <section className="w-full p-4 bg-[white] dark:bg-foregroundPrimary">
                <h1 className="font-bold text-fontPrimary">Cancelation Policy and Overdraft Penalties</h1>
                <p className="font-semibold text-sm mt-4">This is non refundable</p>
                <h3 className="font-semibold text-sm mt-4 text-fontPrimary">Overdraft Penalties</h3>
                <p className="font-light">$120/day</p>
            </section>
            <section className="w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary">
                <h1 className="font-bold mb-4 text-fontPrimary">Choose Payment Option</h1>
                {/* create separate component */}
                <ul className="px-10">
                    <li className="flex justify-between items-center border h-16 px-5">
                        <label htmlFor="card">Card Info</label>
                        <input type="radio" value="card" />
                    </li>
                    <li className="flex justify-between items-center border h-16 px-5">
                        <label htmlFor="card">Card Info</label>
                        <input type="radio" value="card" />
                    </li>
                </ul>
            </section>
            <section className="w-full text-left p-4 bg-[white] dark:bg-foregroundPrimary">
                <h1 className="font-bold text-fontPrimary">Price Details</h1>
                <ul className="px-10">
                    <li className="flex justify-between">
                        <p>Fee</p>{'total'}
                    </li>
                    <li className="flex justify-between">
                        <p>Fee</p>{'total'}
                    </li>
                </ul>
            </section>
            <section className="text-center w-full p-4 bg-[white] dark:bg-foregroundPrimary">
                <h1 className="font-bold mb-8 text-fontPrimary">Login to Continue</h1>
                <Button className="w-full my-8" variant='default' size='md'> login</Button>
            </section>
        </main>
    )
}