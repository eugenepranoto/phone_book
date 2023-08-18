import { gql } from '@apollo/client';

import { createMutationHook } from '../../Helpers/graphql';

import { Phone, PhoneParams } from '../../Models/phone';
import { CORE_PHONE_FIELDS } from '../fragments/phone.fragment';


export const UPDATE_PHONE = gql`
  mutation UpdatePhone($input: phone_set_input!,$where:phone_bool_exp!) {
    update_phone(_set:$input,where:$where) {
      returning {
        ${CORE_PHONE_FIELDS}
      }
    }
  }
`;

export type UpdatePhoneVariables = {
    input:PhoneParams,
    where: {
        id: {
            _eq: number
        }
    }
}

export const useUpdatePhone = createMutationHook<
{ update_phone: { returning: Phone[] } },
UpdatePhoneVariables
>(UPDATE_PHONE);