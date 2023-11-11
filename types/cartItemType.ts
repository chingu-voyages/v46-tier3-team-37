export type CartItem = {
    id: string;
    status: string;
    renterId: string;
    startDate: string;
    endDate: string;
    fee: number;
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        images: {
            id: string;
            url: string;
        }[];
    }
}