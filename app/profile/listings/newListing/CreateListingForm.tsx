import Button from "@/components/uiComponents/Button";


export default function () {
    return (
        <form className="flex flex-col gap-12 items-center m-auto md:w-1/2 w-100">
            <ul className="flex flex-col w-full gap-5">
                <li className="flex justify-evenly gap-4">
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Name:" />
                    </span>
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="name">Location</label>
                        <input type="text" value={'Texas'} id="name" name="name" />
                    </span>
                </li>
                <li className="flex justify-evenly gap-4">
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="description">description</label>
                        <input type="text" id="description" name="description" placeholder="description:" />
                    </span>
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="price">cost/day</label>
                        <input type="text" placeholder="$00.00" id="price" name="price" />
                    </span>
                </li>
                <li className="flex justify-between gap-4">
                    {/* show images? */}
                    <span className="flex flex-col">
                        <label className="text-left text-sm font-light text-[black] dark:text-fontPrimary" htmlFor="image">images</label>
                        <input type="text" id="image" name="image" placeholder="image:" />
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