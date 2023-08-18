import { useContext, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { validationContact } from '../../../Validations/contact';
import { Contact, ContactParams } from '../../../Models/contact';

import { NEW_CONTACT, useCreateContact, useUpdateContact } from '../../../Graphql/mutations/contact.mutation';
import { useCallback, useEffect } from 'react';
import { useUpdatePhone } from '../../../Graphql/mutations/phone.mutation';
import { AppContext } from '../../../Components/Layout';

export function useContactFormLogic({ values, onSubmitCb }: {values?: Contact, onSubmitCb: () => void}) {
    const { hasMoreData } = useContext(AppContext);

    const { t } = useTranslation();
    const form = useForm({
        resolver: yupResolver(validationContact),
        mode: 'all',
        defaultValues: {
            first_name: '',
            last_name:  '',
            phones:  []
        },
    });

    const { control, handleSubmit, formState } = form;
    const { fields, append } = useFieldArray({
        control,
        name: 'phones',
    });

    const setFormValues = useCallback((data?: Contact) : void => {
        if(data) {
            form.setValue('id', data.id);
            form.setValue('first_name', data.first_name);
            form.setValue('last_name', data?.last_name);
            form.setValue('phones', data?.phones ?? []);
        } else {
            form.reset();
        }
    }, [ form ]);

    const [ createContact, { loading: loadingCreateContact } ] = useCreateContact({ onCompleted: () => {
        toast(t('description:successInsertContact'), { type: 'success' });
        form.reset();
        onSubmitCb();
    },

    update: (cache, { data }) => {
        if (data?.insert_contact_one) {
            const newContact = data.insert_contact_one;

            cache.modify({
                fields: {
                    contact(existingContacts = []) {
                        if(hasMoreData) return existingContacts;

                        const newContactRef = cache.writeFragment({
                            data: newContact,
                            fragment:NEW_CONTACT
                        });

                        return [ ...existingContacts, newContactRef ];
                    },
                },
            });
        }
    }, });

    const [ updateContact ] = useUpdateContact({ update(cache, { data }) {
        if (data?.update_contact && data?.update_contact?.returning.length > 0) {
            const updatedData = data.update_contact.returning[0];
            cache.modify({
                id: cache.identify(updatedData),
                fields: {
                    first_name(existingFieldData) {
                        return existingFieldData;
                    },
                    last_name(existingFieldData) {
                        return existingFieldData;
                    },
                    created_at(existingFieldData) {
                        return existingFieldData;
                    },
                    updated_at(existingFieldData) {
                        return existingFieldData;
                    },
                },
            });
        }
    }, });
    const [ updatePhone ] = useUpdatePhone({
        update(cache, { data }) {
            if (data?.update_phone && data?.update_phone?.returning.length > 0) {

                const updatedData = data.update_phone.returning[0];

                cache.modify({
                    id: cache.identify(updatedData),
                    fields: {
                        number(existingFieldData) {
                            return existingFieldData;
                        },
                    },
                });
            }
        },
    });

    const [ loadingUpdateContact, setLoadingUpdateContact ] = useState(false);


    const onSubmit = async (inputs: ContactParams): Promise<void> => {
        if(inputs.id) {
            const { phones, ...input } = inputs;

            try {
                setLoadingUpdateContact(true);
                const updateContactPromise = input.first_name !== values?.first_name || input.last_name !== values.last_name ? await updateContact({
                    variables: { input: { ...input, last_name: input.last_name ?? '' }, where: { id: { _eq: inputs.id } } },
                }) : Promise.resolve();

                const updatePhonePromises = phones
                    ? phones.map(async (phone, index) => {
                        phone.number !== values?.phones?.[index]?.number ?
                            await updatePhone({
                                variables: { input: { number: phone.number }, where: { id:{ _eq:  phone.id ?? 0 } } },
                            }) : Promise.resolve();
                    }
                    )
                    : [];

                await Promise.all([ updateContactPromise, ...updatePhonePromises ]);
                toast(t('description:successUpdateContact'), { type: 'success' });
                form.reset();
                onSubmitCb();
                setLoadingUpdateContact(false);
            } catch (error) {
                toast(t('description:failUpdateContact'), { type: 'error' });
                setLoadingUpdateContact(false);
            }
        } else {
            createContact({ variables: { input: { id: inputs.id, first_name: inputs.first_name, last_name: inputs.last_name ?? '', phones: { data: inputs.phones?? [] } } } });
        }
    };

    useEffect(() => { setFormValues(values); } , [ values, setFormValues ]);

    return {
        loadingCreateContact,
        loadingUpdateContact,
        onSubmit,
        append,
        fields,
        t,
        handleSubmit,
        formState,
        form
    };
}
