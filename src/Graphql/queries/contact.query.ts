import { gql } from '@apollo/client';
import { CORE_CONTACT_FIELDS } from '../fragments/contact.fragment';
import { PAGINATION_VARIABLES } from '../fragments/pagination.fragment';

import { createQueryHook } from '../../Helpers/graphql';
import { PaginatedQueryParams } from '../../Models/pagination';
import { Contact } from '../../Models/contact';

export const CONTACTS_QUERY = gql`
  query ContactsQuery(${PAGINATION_VARIABLES('contact')}) {
    contact(limit:$limit,order_by:$order_by,where:$where){
        ${CORE_CONTACT_FIELDS}
    }
  }
`;

export const useContacts = createQueryHook<
{ contact: Contact[] },
PaginatedQueryParams<Contact>
>(CONTACTS_QUERY);
