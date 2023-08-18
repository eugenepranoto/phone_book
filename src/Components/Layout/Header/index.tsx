import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Box from '../../Box';
import TextInput from '../../Input/TextInput';
import Text from '../../Text';
import Button from '../../Button';

import { Color } from '../../../Constants/Color';
import { Gap } from '../../../Constants/Gap';
import Modal from '../../Modal';
import { useContacts } from '../../../Graphql/queries/contact.query';
import { PER_PAGE } from '../../../Constants/Pagination';
import Loading from '../../Loading';
import { Contact } from '../../../Models/contact';

const ContactForm = lazy(() => import('../../../Modules/Contact/Form'));
const ContactCard = lazy(() => import('../../../Modules/Contact/Components/Card'));

export default function Header(): JSX.Element {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const [ searchValue, setSearchValue ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedContact, setSelectedContact ] = useState<Contact>();
    const [ debouncedSearchValue, setDebouncedSearchValue ] = useState(searchValue);

    const { data: contactData, loading: loadingContact } = useContacts({
        fetchPolicy: 'no-cache',
        variables: {
            limit: PER_PAGE,
            where: { first_name: { _ilike: `%${debouncedSearchValue}%` }, },
        },
        skip: debouncedSearchValue === '',
    });

    const handleOpenContactDetail = (data: Contact) : void => {
        setSelectedContact(data);
        setShowModal(true);
    };

    const handleOpenModal = () : void => {
        setSelectedContact(undefined);
        setShowModal(true);
    };

    const handleCloseMoal = () => {
        setShowModal(false);
        setSearchValue('');
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
        setSelectedContact(undefined);
    };

    useEffect(() => {
        const delay = 300;
        const timer = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, delay);

        return () => clearTimeout(timer);
    }, [ searchValue ]);

    return (
        <Box direction="column" style={{ position: 'fixed' }}>
            <Box columnGap={Gap.Medium} background={Color.SnowWhite} style={{ borderBottom: `1px solid ${Color.SmokeGrey}` }} pad="small" justifyContent="space-between" alignItems="center">
                <img src="/goto.webp" height={32} onClick={() => {navigate('/');}}/>
                <TextInput data-testid="search-input" ref={searchInputRef} placeholder={t('placeholder:search', { value: t('common:lowerCase', { value: t('label:name', { value: t('label:contact') }) }) })} style={{ background: Color.SkyGrey }} onChange={(e) => {
                    const inputValue = e.target.value;
                    const alphabeticValue = inputValue.replace(/[^a-zA-Z]/g, '');
                    setSearchValue(alphabeticValue);
                }} />
                <Button onClick={handleOpenModal} data-testid="btn-add-contact">{t('common:add', { value: '' })}</Button>
            </Box>
            {searchValue ? (
                <Box data-testid="search-result-container" style={{ borderBottom: `1px solid ${Color.SmokeGrey}`, maxHeight: 'calc(100vh - 60px', overflowY: 'auto' }} pad="small" direction="column" alignItems="center" rowGap={Gap.Small} background="#ffffff">
                    {loadingContact && <Loading />}
                    {(!contactData?.contact.length && !loadingContact) && <Text fontSize="small" color={Color.Secondary}>{t('common:noData')}</Text>}
                    <Suspense fallback={<Loading />}>
                        { contactData?.contact.map((el) => (
                            <ContactCard key={el.id} data={el} onClick={handleOpenContactDetail} plain/>
                        ))
                        }
                    </Suspense>
                </Box>
            ) : <></>}
            <Modal show={showModal} title={selectedContact ? selectedContact.first_name : t('common:add', { value: t('label:contact') })} handleClose={handleCloseMoal}>
                <Suspense fallback={<Loading />}>
                    <ContactForm values={selectedContact} onSubmitCb={handleCloseMoal}/>
                </Suspense>
            </Modal>
        </Box>
    );
}
