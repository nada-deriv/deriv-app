type TAvailabilityStatus = 0 | 1;
type TAdvertiserDetails = {
    id: string;
    completed_orders_count: number;
    is_blocked: TAvailabilityStatus;
    is_favourite: TAvailabilityStatus;
    is_online: TAvailabilityStatus;
    is_recommended: null | number;
    last_online_time: number | null;
    name: string;
    rating_average: null | number;
    rating_count: number;
    recommended_average: null | number;
    recommended_count: number | null;
    total_completion_rate: number | null;
};

type TAdvertiserPageDetails = {
    account_currency: string;
    advertiser_details: TAdvertiserDetails;
    counterparty_type: string;
    country: string;
    created_time: number;
    description: string;
    effective_rate: null | number;
    effective_rate_display: string;
    id: string;
    is_active: TAvailabilityStatus;
    is_visible: TAvailabilityStatus;
    local_currency: string;
    max_order_amount_limit: number;
    max_order_amount_limit_display: string;
    min_order_amount_limit: number;
    min_order_amount_limit_display: string;
    payment_method: string;
    payment_method_names: string[];
    price: number | null;
    price_display: string;
    rate: number;
    rate_display: string;
    rate_type: string;
    type: string;
};

export type TAdvertiserPageRow = {
    row: TAdvertiserPageDetails;
};
