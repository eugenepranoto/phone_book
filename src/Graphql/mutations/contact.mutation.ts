import { gql } from '@apollo/client';

import { CORE_CONTACT_FIELDS } from '../fragments/contact.fragment';
import { createMutationHook } from '../../Helpers/graphql';

import { Contact, ContactParams } from '../../Models/contact';
import { PhoneParams } from '../../Models/phone';

export const CREATE_CONTACT = gql`
  mutation InsertContactOne($input: contact_insert_input!) {
    insert_contact_one(object: $input) {
      ${CORE_CONTACT_FIELDS}
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($input: contact_set_input!,$where:contact_bool_exp!) {
    update_contact(_set: $input,where:$where) {
      returning {
        ${CORE_CONTACT_FIELDS}
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($where:contact_bool_exp!) {
    delete_contact(where:$where) {
      returning {
        ${CORE_CONTACT_FIELDS}
      }
    }
  }
`;

export const NEW_CONTACT = gql`
fragment NewContact on contact {
    id
    first_name
    last_name
    phones {
        number
    }
}
`;

export interface ContactParamsModified extends Omit<ContactParams, 'phones'> {
    phones: {
        data: PhoneParams[] | undefined;
    };
}

export type CreateContactVariables = {
    input: ContactParamsModified
}

export type UpdateContactVariables = {
    input: Omit<ContactParams, 'phones'>,
    where: {
        id: {
            _eq: number
        }
    }
}

export type DeleteContactVariables = {
    where: {
        id: {
            _eq: number
        }
    }
}

export const useCreateContact = createMutationHook<
{ insert_contact_one: Contact },
CreateContactVariables
>(CREATE_CONTACT);

export const useUpdateContact = createMutationHook<
{ update_contact: { returning: Contact[] } },
UpdateContactVariables
>(UPDATE_CONTACT);

export const useDeleteContact = createMutationHook<
{ delete_contact: { returning: Contact[] } },
DeleteContactVariables
>(DELETE_CONTACT);