import { gql, useMutation, makeVar } from '@apollo/client';
import { FAVORITE_QUERY } from '../queries/favorite.query';
import { toast } from 'react-toastify';
import { Contact } from '../../Models/contact';
// import { CORE_CONTACT_FIELDS } from '../fragments/contact.fragment';
// export const favoritesVar = makeVar<number[]>([]);


export const favoritesVar = makeVar<string[]>([]);

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($contactId: ID!) {
    addToFavorites(contactId: $contactId) @client
  }
`;

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveFromFavorites($contactId: ID!) {
    removeFromFavorites(contactId: $contactId) @client
  }
`;

export type FavoriteQueryResult = {
    favorites: Contact[];
};

export const useAddToFavoritesMutation = () => {
    const [ addToFavorites ] = useMutation(ADD_TO_FAVORITES);

    return (contactId: number) => {
        addToFavorites({
            variables: { contactId },
            onCompleted: () => {
                toast('Successfully added contact to favorites', { type: 'success' });
            },
            update: (cache) => {
                const existingFavorites = cache.readQuery<FavoriteQueryResult>({ query: FAVORITE_QUERY });

                const contact = cache.readFragment({
                    id: `contact:${contactId}`,
                    fragment: gql`
                        fragment ContactFields on contact {
                            id
                            first_name
                            last_name
                            created_at
                            updated_at
                        }
                    `,
                });
                if(contact) {
                    cache.writeQuery({
                        query: FAVORITE_QUERY,
                        data: {
                            favorites: [ ...existingFavorites?.favorites ?? [], contact ],
                        },
                    });
                }

            },
        });
    };
};

export function useRemoveFromFavoritesMutation() {
    const [ removeFromFavorites ] = useMutation(REMOVE_FROM_FAVORITES);

    return (contactId: number) => {
        removeFromFavorites({
            variables: { contactId },
            onCompleted: () => {
                toast('Successfully remove contact from favorite', { type: 'success' });
            },
            update: (cache) => {
                const existingFavorites = cache.readQuery<FavoriteQueryResult>({ query: FAVORITE_QUERY });
                const newFavorites = existingFavorites?.favorites?.filter(
                    ({ id } : Contact) => id !== contactId
                );
                cache.writeQuery({
                    query: FAVORITE_QUERY,
                    data: { favorites: newFavorites },
                });
            },
        });
    };
}
