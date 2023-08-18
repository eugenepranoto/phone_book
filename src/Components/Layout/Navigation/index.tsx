import { useLocation, useNavigate } from 'react-router-dom';
import Box from '../../Box';
import Button from '../../Button';
import Text from '../../Text';

import { Color } from '../../../Constants/Color';

const navigationItems = [
    { path: '/', icon: '\u260F', label: 'Contacts' },
    { path: '/favorite', icon: '\u2606', label: 'Favorites' }
];

export default function Navigation(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Box background={Color.SnowWhite} style={{ position: 'fixed', bottom: 0, borderTop: `1px solid ${Color.SmokeGrey}` }} justifyContent="space-around" pad="medium">
            {navigationItems.map(({ path, icon, label }) => (
                <Button key={path} link onClick={() => handleNavigation(path)}>
                    <Box direction="column">
                        <Text fontSize="xlarge" bold color={location.pathname === path ? Color.Primary : undefined}>
                            {icon}
                        </Text>
                        <Text color={location.pathname === path ? Color.Primary : undefined}>{label}</Text>
                    </Box>
                </Button>
            ))}
        </Box>
    );
}
