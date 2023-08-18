import { gql } from '@apollo/client';
import { createQueryHook } from '../../Helpers/graphql';
import { Contact } from '../../Models/contact';

export const FAVORITE_QUERY = gql`
    query Favorites {
        favorites @client {
          id
          first_name
          last_name
          created_at
          updated_at
        }
    }
`;

export const useFavorites = createQueryHook<{ favorites: Contact[] }>(FAVORITE_QUERY);

