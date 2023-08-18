import * as Yup from 'yup';

import { validationPhone } from './phone';
import { Regex } from '../Constants/Regex';

export const validationContact = Yup.object().shape({
    id: Yup.number().nullable(),
    first_name: Yup.string()
        .required('First name is required')
        .min(2, 'First name at least 2 characters')
        .matches(new RegExp(Regex.name), 'First name must contain only alphabetic/numberic characters')
        .trim(),
    last_name: Yup.string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .min(2, 'Last name at least 2 characters')
        .matches(new RegExp(Regex.name), 'Last name must contain only alphabetic/numberic characters')
        .trim(),
    phones: Yup.array().of(validationPhone)

});
