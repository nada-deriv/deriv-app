import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisclaimerModal from '../disclaimer-modal';
import { StoreProvider, mockStore } from '@deriv/stores';

const mock_modal_manager_context = {
    hideModal: jest.fn(),
    is_modal_open: true,
    showModal: jest.fn(),
};

const mock = {
    client: {
        loginid: 'MX12345',
    },
    ui: {
        is_mobile: false,
    },
};

jest.mock('Components/modal-manager/modal-manager-context', () => ({
    useModalManagerContext: () => mock_modal_manager_context,
}));

describe('DisclaimerModal', () => {
    let modal_root_el: HTMLElement;
    beforeAll(() => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
        Object.defineProperty(window, 'localStorage', {
            value: {
                setItem: jest.fn(),
            },
        });
    });

    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    const wrapper = ({ children }: { children: JSX.Element }) => (
        <StoreProvider store={mockStore(mock)}>{children}</StoreProvider>
    );

    it('should render the modal with the correct title and content', () => {
        render(<DisclaimerModal />, { wrapper });
        expect(screen.getByText('For your safety:')).toBeInTheDocument();
    });

    it('should disable button when checkbox is not clicked', () => {
        render(<DisclaimerModal />, { wrapper });
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled();
    });

    it('should enable button when checkbox is clicked', () => {
        render(<DisclaimerModal />, { wrapper });
        userEvent.click(screen.getByRole('checkbox', { name: 'I’ve read and understood the above reminder.' }));
        expect(screen.getByRole('button', { name: 'Confirm' })).toBeEnabled();
    });

    it('should set value in local storage when confirm button is clicked', () => {
        render(<DisclaimerModal />, { wrapper });
        userEvent.click(screen.getByRole('checkbox', { name: 'I’ve read and understood the above reminder.' }));
        userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
        expect(localStorage.setItem).toHaveBeenCalledWith('MX12345_disclaimer_shown', expect.any(String));
    });
});
