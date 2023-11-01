import { getServerSession } from "next-auth";
import CreateListingForm from "./CreateListingForm";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function () {
    
    return (
        <section className="w-full my-8 text-center">
            <h1 className="font-bold my-12 text-2xl">List a new Item for Rent</h1>
            <CreateListingForm />
        </section>
    )
}