import { CORE_PHONE_FIELDS } from './phone.fragment';

export const CORE_CONTACT_FIELDS = `
id
first_name
last_name
created_at
updated_at
phones {
    ${CORE_PHONE_FIELDS}
}
`;