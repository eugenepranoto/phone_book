import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Loading from '../../Components/Loading';

import { Gap } from '../../Constants/Gap';
import { Margin } from '../../Constants/Margin';

import useFavoriteLogic from './logic';
import { Color } from '../../Constants/Color';

const ContactCard = lazy(() => import('../Contact/Components/Card'));

export default function Favorite(): JSX.Element {
    const { t } = useTranslation('common');

    const { favoritesData, loadingFavorite } = useFavoriteLogic();
    return (
        <Box direction="column" alignItems="center" rowGap={Gap.Small} style={{ padding: `${Margin.Medium} 0` }}>
            <Suspense fallback={<Loading />}>
                {favoritesData?.favorites?.map(el => (
                    <ContactCard key={el.id} data={el} onClick={() => {}} isFavorite/>
                ))}
            </Suspense>
            {!favoritesData?.favorites?.length && <Text fontSize="small" color={Color.Secondary}>{t('noData')}</Text>}
            {loadingFavorite && <Loading/>}
        </Box>
    );
}
