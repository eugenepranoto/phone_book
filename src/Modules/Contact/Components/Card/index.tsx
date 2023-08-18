import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import Box from '../../../../Components/Box';
import Button from '../../../../Components/Button';
import Text from '../../../../Components/Text';

import { Color } from '../../../../Constants/Color';
import { Gap } from '../../../../Constants/Gap';

import { Contact } from '../../../../Models/contact';
import { useDeleteContact } from '../../../../Graphql/mutations/contact.mutation';
import { useAddToFavoritesMutation, useRemoveFromFavoritesMutation } from '../../../../Graphql/mutations/favorite.mutation';

interface ContactCardProps {
    data: Contact
    onClick: (data: Contact) => void
    plain?: boolean
    isFavorite?: boolean
}

const ContactAvatar = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.Primary};
  color: #ffffff;
  padding: 10px;
`;

export default function ContactCard({ data, onClick, plain, isFavorite }: ContactCardProps) : JSX.Element {
    const { t } = useTranslation();
    const { id, first_name, last_name, phones, created_at, updated_at } = data;

    const addToFavoritesMutation = useAddToFavoritesMutation();
    const removeFormFavoritesMutation = useRemoveFromFavoritesMutation();

    const [ deleteContact, { loading: loadingDeleteContact } ] = useDeleteContact({ successMessage: t('description:successDeleteContact') });

    const openContactDetail = () : void => {
        onClick(data);
    };

    const handleAddToFavorite = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addToFavoritesMutation(id);
    };

    const handleRemoveFormFavorite = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        removeFormFavoritesMutation(id);
    };

    const handleDeleteContact = (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        deleteContact({ variables: { where: { id: { _eq: id } } }, update(cache) {
            const normalizedId = cache.identify({ id, __typename: 'contact' });
            cache.evict({ id: normalizedId });
            cache.gc();
        } });
    };

    return <Box onClick={openContactDetail} background={ plain ? Color.White: Color.SnowWhite} pad="medium" direction="column" data-testid="card-container" justifyContent="space-between" style={{ borderRadius: '.5em', cursor: 'pointer' }} alignItems="flex-end" rowGap={Gap.Small}>
        <Box alignItems="center">
            <Box columnGap={Gap.Small} alignItems="center" style={{ flex: 1 }}>
                <ContactAvatar>{first_name.charAt(0).toUpperCase()}</ContactAvatar>
                <Box direction="column">
                    <Text>
                        {first_name} {last_name}
                    </Text>
                    <Text fontSize="small">
                        {phones?.length ? phones[0].number || t('description:noPhone') : t('description:noPhone')}
                    </Text>
                </Box>
            </Box>
            {!plain && <Box direction="column" alignItems="flex-end" rowGap={Gap.Small} style={{ width: 'fit-content' }}>
                <Box justifyContent="flex-end" columnGap={Gap.Small}>
                    {isFavorite ?
                        <Button onClick={handleRemoveFormFavorite} link> <Text bold color={Color.Gold}>&#10029;</Text></Button>
                        :
                        <Button onClick={handleAddToFavorite} link> <Text bold color={Color.Gold}>&#9734;</Text></Button>
                    }
                </Box>
            </Box>}
        </Box>
        {!plain &&
            <Box justifyContent="space-between">
                <Text fontSize="small" color={Color.Secondary} >
                    Last update: {updated_at ? t('common:dateFormat', { value: new Date(updated_at) }): t('common:dateFormat', { value: new Date(created_at) })}
                </Text>
                <Button onClick={handleDeleteContact} disabled={loadingDeleteContact} link style={{ color: Color.Danger }}>{t('common:delete')}</Button>

            </Box>
        }
    </Box>;
}