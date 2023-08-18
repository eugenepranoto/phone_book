
type SortingDirection = 'asc' | 'desc';

export interface PaginatedQueryParams<T> {
    order_by?: Partial<{
        [field in keyof T]: SortingDirection;
    }>;
    limit?: number
    where?: Partial<{
        [field in keyof T]: unknown;
    }>;
}