import { useState } from 'react';

import { Contact as ContactModel } from '../../Models/contact';
import { useFavorites } from '../../Graphql/queries/favorite.query';

export default function useFavoriteLogic() {
    const [ showModalEdit, setShowModalEdit ] = useState(false);
    const [ selectedContact, setSelectedContact ] = useState<ContactModel>();

    const { data: favoritesData, loading: loadingFavorite }= useFavorites();



    const handleOpenContactDetail = (data: ContactModel) : void => {
        setSelectedContact(data);
        setShowModalEdit(true);
    };

    return {
        handleOpenContactDetail,
        showModalEdit,
        selectedContact,
        favoritesData,
        loadingFavorite,
        setShowModalEdit
    };
}
