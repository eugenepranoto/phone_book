import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Loading from '../../Components/Loading';
import Modal from '../../Components/Modal';

import { Gap } from '../../Constants/Gap';
import { Margin } from '../../Constants/Margin';

import useFavoriteLogic from './logic';
import { Color } from '../../Constants/Color';

const ContactForm = lazy(() => import('../Contact/Form'));
const ContactCard = lazy(() => import('../Contact/Components/Card'));

export default function Favorite(): JSX.Element {
    const { t } = useTranslation('common');

    const { selectedContact, showModalEdit, favoritesData, loadingFavorite, handleOpenContactDetail, setShowModalEdit } = useFavoriteLogic();
    return (
        <Box direction="column" alignItems="center" rowGap={Gap.Small} style={{ padding: `${Margin.Medium} 0` }}>
            <Modal title={selectedContact?.first_name} show={showModalEdit} handleClose={() => setShowModalEdit(false)}>
                <Suspense fallback={<Loading />}>
                    <ContactForm values={selectedContact} onSubmitCb={() => setShowModalEdit(false)}/>
                </Suspense>
            </Modal>
            <Suspense fallback={<Loading />}>
                {favoritesData?.favorites?.map(el => (
                    <ContactCard key={el.id} data={el} onClick={handleOpenContactDetail} isFavorite/>
                ))}
            </Suspense>
            {!favoritesData?.favorites?.length && <Text fontSize="small" color={Color.Secondary}>{t('noData')}</Text>}
            {loadingFavorite && <Loading/>}
        </Box>
    );
}
