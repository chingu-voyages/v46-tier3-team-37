import { getUserRentals } from "@/app/actions";
import RentalList from "./RentalList";

export default async function Profile() {
    const transactions = await getUserRentals();
    return <RentalList transactions={transactions}/>
}
