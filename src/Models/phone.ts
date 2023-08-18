export type Phone = {
    id: number
    number: string,
}

export interface PhoneParams {
    id?: number | null | undefined;
    number: string;
}