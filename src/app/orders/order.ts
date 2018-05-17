export class Order {
    static STATUS_ACTIVE = 'ACTIVE';
    static STATUS_COMPLETED = 'COMPLETED';

    order_id: number;
    driver_phone: string;
    pass_phone: string;
    rating: number;
    status?: string;
}
