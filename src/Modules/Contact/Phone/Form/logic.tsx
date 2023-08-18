import { useFormContext, ValidateResult } from 'react-hook-form';
import { validationPhone } from '../../../../Validations/phone';
import { PhoneParams } from '../../../../Models/phone';

interface UsePhoneFormLogicProps {
    name: string;
}

export function usePhoneFormLogic({ name }: UsePhoneFormLogicProps) {
    const { control, getValues, setValue } = useFormContext();

    const validatePhone = async (value: PhoneParams): Promise<ValidateResult> => {
        try {
            await validationPhone.validate(value);
            return true;
        } catch {
            return false;
        }
    };

    const removePhoneForm = (): void => {
        const phoneForms = getValues('phones') as Array<PhoneParams>;
        const indexMatch = name.match(/\d+/);
        if (indexMatch) {
            const index = Number(indexMatch[0]);
            phoneForms.splice(index, 1);
            setValue('phones', phoneForms);
        }
    };

    return {
        control,
        validatePhone,
        removePhoneForm,
    };
}
