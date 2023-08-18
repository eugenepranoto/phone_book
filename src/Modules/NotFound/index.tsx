import Box from '../../Components/Box';
import Text from '../../Components/Text';

export default function NotFound(): JSX.Element {
    return <Box alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        <Text fontSize="xlarge" bold>404 | Page Not Found</Text>
    </Box>;
}