import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Header from '../../Components/Layout/Header';

jest.mock('../../Graphql/queries/contact.query', () => ({
    useContacts: jest.fn((options) => {
        const { skip } = options;
        return {
            data: {
                contact: skip ? [] : [
                    { id: 1, first_name: 'John', last_name: 'Doe' },
                    { id: 2, first_name: 'Jane', last_name: 'Doe' },
                ],
            },
            loading: false,
        };
    }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key : string) => key,
    }),
}));

test('renders Header component', async () => {
    const { getByTestId } = await act(async () => {
        return render(
            <MockedProvider>
                <Header />
            </MockedProvider>
        );
    });
    expect(getByTestId('btn-add-contact')).toBeTruthy();
    expect(getByTestId('search-input')).toBeTruthy();
});

test('opens and closes modal when clicking the Add button', async () => {
    const { getByTestId } = await act(async () => {
        return render(
            <MockedProvider>
                <Header />
            </MockedProvider>
        );
    });
    userEvent.click(getByTestId('btn-add-contact'));
    expect(getByTestId('btn-add-contact')).toBeTruthy();
    userEvent.click(getByTestId('btn-close-modal'));
});

test('renders Header component with search results', async () => {
    const { getByTestId, queryAllByTestId } = await act(async () => {
        return render(
            <MockedProvider>
                <Header />
            </MockedProvider>
        );
    });
    userEvent.type(getByTestId('search-input'), 'John');
    await waitFor(() => {
        expect(getByTestId('search-result-container')).toBeTruthy();
    });
    await waitFor(() => {
        const contactCards = queryAllByTestId('card-container');
        expect(contactCards).toHaveLength(2);
    });
});

test('renders Header component with no search results', async () => {
    const { getByTestId, queryByText } = await act(async () => {
        return render(
            <MockedProvider>
                <Header />
            </MockedProvider>
        );
    });
    userEvent.type(getByTestId('search-input'), 'InvalidName');
    await waitFor(() => {
        expect(getByTestId('search-result-container')).toBeTruthy();
    });
    await waitFor(() => {
        const noDataMessage = queryByText('common:noData');
        expect(noDataMessage).toBeTruthy();
    });
});
