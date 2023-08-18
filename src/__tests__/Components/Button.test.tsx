import { render, fireEvent } from '@testing-library/react';
import Button from '../../Components/Button';

describe('Button Component', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<Button>Click me</Button>);
        const buttonElement = getByText('Click me');
        expect(buttonElement).toBeTruthy();
    });

    it('applies appropriate styles for link and non-link buttons', () => {
        const { getByText, rerender } = render(<Button>Click me</Button>);
        const buttonElement = getByText('Click me');

        const computedStyles = window.getComputedStyle(buttonElement);
        expect(computedStyles.backgroundColor).toBe('rgb(31, 202, 62)');
        expect(computedStyles.color).toBe('white');

        rerender(<Button link>Click me</Button>);
        const updatedComputedStyles = window.getComputedStyle(buttonElement);
        expect(updatedComputedStyles.backgroundColor).toBe('transparent');
    });

    it('triggers the onClick callback when clicked', () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
        const buttonElement = getByText('Click me');

        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
