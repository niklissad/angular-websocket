export class Order {
    static STATUS_ACTIVE = 'ACTIVE';
    static STATUS_COMPLETED = 'COMPLETED';

    orderId: number;
    driverPhone: string;
    passPhone: string;
    rating: number;
    status?: string;
}
