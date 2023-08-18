import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import Box from '../Box';
import Text from '../Text';
import { Color } from '../../Constants/Color';
import { Gap } from '../../Constants/Gap';


const StyledLoading = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${Color.Primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spinAnimation 1s linear infinite;
  @keyframes spinAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;


export default function Loading() : JSX.Element {
    const { t } = useTranslation('common');

    return <Box direction="column" alignItems="center" pad="small" rowGap={Gap.Small}>
        <StyledLoading data-testid="loading-spinner"/>
        <Text fontSize="small" color={Color.Secondary}>{t('loading')}</Text>
    </Box>;
}
