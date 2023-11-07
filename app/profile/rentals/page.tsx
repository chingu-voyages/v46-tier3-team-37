import { getUserRentals } from "@/app/actions";
import RentalList from "./RentalList";

export default async function Profile() {
    const transactions = await getUserRentals();
    if (transactions.length === 0) return <div className="text-center">You have No active rentals</div>
    return <RentalList transactions={transactions}/>
}
