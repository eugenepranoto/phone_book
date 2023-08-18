import { FormProvider } from 'react-hook-form';

import Box from '../../../Components/Box';
import Button from '../../../Components/Button';
import TextInput from '../../../Components/Input/TextInput';
import { Gap } from '../../../Constants/Gap';

import { Contact, ContactParams } from '../../../Models/contact';
import PhoneForm from '../Phone/Form';
import Text from '../../../Components/Text';
import { Color } from '../../../Constants/Color';
import { useContactFormLogic } from './logic';


export default function ContactForm({ values, onSubmitCb }: {values?: Contact, onSubmitCb: () => void}): JSX.Element {
    const { form, handleSubmit, onSubmit, formState,append, fields, loadingCreateContact, loadingUpdateContact , t } = useContactFormLogic({ values, onSubmitCb });

    return (
        <Box direction="column">
            <FormProvider<ContactParams> {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box rowGap={Gap.Small} direction="column">
                        <TextInput
                            placeholder={t('placeholder:input', { value: t('label:firstName') })}
                            {...form.register('first_name')}
                        />
                        {formState.errors?.first_name?.message &&<Text color={Color.Danger} fontSize="small">{formState.errors.first_name.message}</Text>}
                        <TextInput
                            placeholder={t('placeholder:input', { value: t('label:lastName') })}
                            {...form.register('last_name')}
                        />
                        {formState.errors?.last_name?.message &&<Text color={Color.Danger} fontSize="small">{formState.errors.last_name?.message}</Text>}
                        <Box columnGap={Gap.Medium} justifyContent="space-between">
                            <Text bold>Phone Number</Text>
                            {!values?.id && <Button link onClick={() => append({ number: '' })}>
                                <Text color={Color.Primary} bold>
                                    &#x2b; {t('common:add', { value: '' })}
                                </Text>
                            </Button>}
                        </Box>
                        {fields.map((field, index) => {
                            return (
                                <PhoneForm key={field.id} name={`phones.${index}.number`} hideDelete={values?.phones?.[index]?.id !== undefined} errorMessage={formState.errors?.phones?.[index]?.number?.message}/>
                            );

                        })}
                        <Button disabled={loadingCreateContact || loadingUpdateContact} type="submit">{t('common:save')}</Button>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );
}
