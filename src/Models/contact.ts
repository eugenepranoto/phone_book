import { Phone, PhoneParams } from './phone';

export type Contact = {
    id: number
    first_name: string,
    last_name?: string,
    created_at: string,
    updated_at?: string,
    phones: Phone[]
}

export interface ContactParams {
    id: number | null | undefined;
    first_name: string;
    last_name: string | null | undefined;
    phones: PhoneParams[] | undefined;
}