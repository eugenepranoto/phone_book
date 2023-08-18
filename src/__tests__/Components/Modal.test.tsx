import { render, fireEvent } from '@testing-library/react';
import Modal from '../../Components/Modal';

describe('Modal Component', () => {
    it('renders with title and content when show is true', () => {
        const handleClose = jest.fn();
        const { getByText, getByTestId } = render(
            <Modal show={true} title="Test Modal" handleClose={handleClose}>
                <div>Modal Content</div>
            </Modal>
        );

        const titleElement = getByText('Test Modal');
        const contentElement = getByText('Modal Content');
        const closeButton = getByTestId('btn-close-modal');

        expect(titleElement).toBeTruthy();
        expect(contentElement).toBeTruthy();
        expect(closeButton).toBeTruthy();

        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not render when show is false', () => {
        const handleClose = jest.fn();
        const { queryByTestId } = render(
            <Modal show={false} title="Test Modal" handleClose={handleClose}>
                <div data-testid="modal-content">Modal Content</div>
            </Modal>
        );

        const modalContent = queryByTestId('modal-container');
        if(modalContent) {
            const computedStyles = window.getComputedStyle(modalContent);
            expect(computedStyles.display).toBe('none');
        }
    });
});
