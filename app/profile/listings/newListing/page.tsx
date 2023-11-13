import CreateListingForm from "./CreateListingForm";

export default async function newListing () {
    
    return (
        <section className="w-full my-8 text-center">
            <h1 className="font-bold my-12 text-2xl">List a new Item for Rent</h1>
            <CreateListingForm />
        </section>
    )
}