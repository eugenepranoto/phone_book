import { useTranslation } from 'react-i18next';

import Box from '../../Box';
import Text from '../../Text';

import { Color } from '../../../Constants/Color';

export default function Footer() : JSX.Element {
    const { t } = useTranslation('common');

    return <Box pad="small" justifyContent="center">
        <Text style={{ color: Color.Secondary }}>{t('author')} - {t('brand')}</Text>
    </Box>;
}