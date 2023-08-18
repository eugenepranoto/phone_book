import * as Yup from 'yup';
import { Regex } from '../Constants/Regex';

export const validationPhone = Yup.object().shape({
    id: Yup.number().nullable(),
    number: Yup.string()
        .required('Phone number is required')
        .min(2, 'Phone number at least 2 digit')
        .matches(new RegExp(Regex.phone), 'Invalid phone number format')
        .trim(),
});
