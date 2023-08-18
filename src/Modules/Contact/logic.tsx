import { useState, useEffect, useMemo, useContext } from 'react';

import {
    useContacts,
} from '../../Graphql/queries/contact.query';
import { PER_PAGE } from '../../Constants/Pagination';
import { Contact as ContactModel } from '../../Models/contact';
import { PaginatedQueryParams } from '../../Models/pagination';
import { useFavorites } from '../../Graphql/queries/favorite.query';
import { AppContext } from '../../Components/Layout';

export default function useContactLogic() {
    const { hasMoreData, setHasMoreData } = useContext(AppContext);

    const [ showModalEdit, setShowModalEdit ] = useState(false);
    const [ selectedContact, setSelectedContact ] = useState<ContactModel>();

    const { data: favoritesData }= useFavorites();

    const [ variables, setVariables ] = useState<PaginatedQueryParams<ContactModel>>({
        order_by: {
            id: 'asc'
        },
        where: {},
        limit: PER_PAGE
    });
    const { data: contactData, loading: loadingContact, fetchMore, refetch } = useContacts({
        variables: variables,
        onCompleted: (data) => {
            if (data.contact.length < PER_PAGE) {
                refetch();
            }
        },
    });

    const filteredContactData = useMemo(() => {
        if (!favoritesData) {
            return contactData?.contact;
        }

        const favoriteIds = favoritesData.favorites.map(el => el.id);

        return contactData?.contact.filter(contact => !favoriteIds.includes(contact.id));
    }, [ favoritesData, contactData ]);


    const loadMoreData = (): void => {
        fetchMore({
            variables,
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                if (fetchMoreResult.contact.length < PER_PAGE) {
                    setHasMoreData(false);
                }

                return fetchMoreResult;
            },
        });
    };


    const handleOpenContactDetail = (data: ContactModel) : void => {
        setSelectedContact(data);
        setShowModalEdit(true);
    };

    useEffect(() => {
        if (contactData && contactData.contact.length > 0) {
            if(contactData.contact.length < PER_PAGE) {
                setHasMoreData(false);
            }
            const lastId = contactData.contact[contactData.contact.length - 1].id;
            setVariables(prevVariables => ({
                ...prevVariables,
                where: {
                    id: { _gt: lastId }
                }
            }));
        }
    }, [ contactData ]);

    return {
        loadMoreData,
        handleOpenContactDetail,
        showModalEdit,
        hasMoreData,
        selectedContact,
        filteredContactData,
        loadingContact,
        setShowModalEdit
    };
}
