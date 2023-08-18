import { render } from '@testing-library/react';
import Loading from '../../Components/Loading';

jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => {},
    }
}));

test('renders loading component', () => {
    const { getByText, getByTestId } = render(<Loading />);
    const loadingSpinner = getByTestId('loading-spinner');
    expect(loadingSpinner).toBeTruthy();
    const loadingText = getByText('loading');
    expect(loadingText).toBeTruthy();
});
