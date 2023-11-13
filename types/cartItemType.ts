export type CartItem = {
    id: string;
    status: string;
    renterId: string;
    startDate: string | Date;
    endDate: string | Date;
    fee: number;
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        images: Array<{ id: string; url: string }>;
    };
};
