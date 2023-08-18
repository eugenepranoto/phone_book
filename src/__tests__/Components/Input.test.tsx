import { render } from '@testing-library/react';
import TextInput from '../../Components/Input/TextInput';
import { Color } from '../../Constants/Color';
describe('TextInput Component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<TextInput data-testid="text-input" />);
        const inputElement = getByTestId('text-input');
        expect(inputElement).toBeTruthy();
    });

    it('applies proper styling on focus', () => {
        const { getByTestId } = render(<TextInput data-testid="text-input" />);
        const inputElement = getByTestId('text-input');

        expect(inputElement).toBeTruthy();
        const computedStyles = window.getComputedStyle(inputElement);
        expect(computedStyles.borderColor).toBe('#ccc');

        inputElement.focus();

        const focusedStyles = window.getComputedStyle(inputElement);
        expect(focusedStyles.borderColor).toBe(Color.Primary);
    });
});
