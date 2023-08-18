import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';

import Text from '../../../../Components/Text';
import Box from '../../../../Components/Box';
import TextInput from '../../../../Components/Input/TextInput';
import { Gap } from '../../../../Constants/Gap';
import { Color } from '../../../../Constants/Color';
import { usePhoneFormLogic } from './logic';

interface PhoneFormProps {
    name: string
    errorMessage?: string
    hideDelete?: boolean
}

const DeleteButton = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 0.75em;    
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Color.Danger};
  color: #ffffff;
  padding: 10px;
`;

export default function PhoneForm({ name, errorMessage, hideDelete = false }: PhoneFormProps): JSX.Element {
    const { t } = useTranslation();
    const { control, removePhoneForm, validatePhone } = usePhoneFormLogic({
        name
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <Box columnGap={Gap.Small} alignItems="center">
                        <Box direction="column">
                            <TextInput
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                placeholder={t('placeholder:input', { value: t('label:number') })}
                                style={{ flex: 1 }}
                            />
                            {errorMessage &&<Text color={Color.Danger} fontSize="small">{errorMessage}</Text>}

                        </Box>
                        {!hideDelete && <DeleteButton onClick={removePhoneForm}>&#10134;</DeleteButton>}
                    </Box>
                );
            }}
            rules={{ validate: validatePhone }}
        />
    );
}
