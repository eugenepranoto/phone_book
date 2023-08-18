import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';
import Modal from '../../Components/Modal';

import { Gap } from '../../Constants/Gap';
import { Margin } from '../../Constants/Margin';

import useContactLogic from './logic';
import { Color } from '../../Constants/Color';
import { PER_PAGE } from '../../Constants/Pagination';

const ContactForm = lazy(() => import('./Form'));
const ContactCard = lazy(() => import('./Components/Card'));

export default function Contact(): JSX.Element {
    const { t } = useTranslation('common');

    const { selectedContact, showModalEdit, filteredContactData, hasMoreData, loadingContact, loadMoreData, handleOpenContactDetail, setShowModalEdit } = useContactLogic();

    return (
        <Box direction="column" alignItems="center" rowGap={Gap.Small} style={{ padding: `${Margin.Medium} 0` }}>
            <Modal title={selectedContact?.first_name} show={showModalEdit} handleClose={() => setShowModalEdit(false)}>
                <Suspense fallback={<Loading />}>
                    <ContactForm values={selectedContact} onSubmitCb={() => setShowModalEdit(false)}/>
                </Suspense>
            </Modal>
            <Suspense fallback={<Loading />}>
                {filteredContactData?.map(el => (
                    <ContactCard key={el.id} data={el} onClick={handleOpenContactDetail}/>
                ))}
            </Suspense>
            {filteredContactData?.length === 0 && <Text fontSize="small" color={Color.Secondary}>{t('noData')}</Text>}
            {loadingContact && <Loading/>}
            {hasMoreData && !loadingContact && filteredContactData && filteredContactData?.length >= PER_PAGE && (
                <Box justifyContent="center">
                    <Button
                        style={{ width: 'fit-content' }}
                        onClick={loadMoreData}
                    >
                        {t('loadMore')}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
