import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useStores } from 'Stores/index';
import BuySell from '../buy-sell';


const mock_store = {

    general_store: {
        advertiser_id: 'id2',
        advertiser_info: {
            name: 'my name',
        },
        block_unblock_user_error: '',
        error_code: '',
        active_index: 0,
        setBlockUnblockUserError: jest.fn(),
        setActiveIndex: jest.fn(),
        path: {
            my_profile: 3,
        },
        is_block_unblock_user_loading: false,
    },
    buy_sell_store: {
        registerIsListedReaction: jest.fn(),
        registerAdvertIntervalReaction: jest.fn(),
        selected_local_currency: 'USD',
        show_advertiser_page: false,
        should_show_verification: true,
        setLocalCurrency: jest.fn(),
    },
};

jest.mock('Components/verification/verification.jsx', () => jest.fn(() => <div>Verification Section</div>));

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(() => mock_store),
}));


describe('<BuySellPage/>', () => {
    it('should render Verification Section when user is not verified', () => {
        render(<BuySell />);

        expect(screen.getByText("Verification")).toBeInTheDocument();
        expect(screen.getByText("Verification Section")).toBeInTheDocument();
    });
    it('should not render the page return section when nickname form is open ', () => {
        useStores.mockReturnValue({
            ...mock_store,
            general_store: {
                ...mock_store.general_store,
                should_show_popup: true,
            },
        });
        render(<BuySell />);

        expect(screen.queryByText('Verification')).not.toBeInTheDocument();
    });
});