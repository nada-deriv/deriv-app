import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStores } from 'Stores';
import AdvertiserPageProfileJoiningLabel from '../advertiser-page-profile-joining-label';

const mock_store: DeepPartial<ReturnType<typeof useStores>> = {
    advertiser_page_store: {
        advertiser_details_id: 'id1',
        counterparty_advertiser_info: {
            created_time: 1686539211,
        },
        info: {
            created_time: 1686539211,
        },
    },
    general_store: {
        advertiser_id: 'id2',
        advertiser_info: {
            created_time: 1686539217,
        },
    },
};

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(() => mock_store),
}));

describe('<AdvertiserPageProfileJoiningLabel/>', () => {
    it('should display advertiser profile section with name and joining date for old user', () => {
        (useStores as jest.Mock).mockReturnValue({
            ...mock_store,
            advertiser_page_store: {
                ...mock_store.advertiser_page_store,
                info: {
                    ...mock_store.advertiser_page_store.info,
                    created_time: new Date().getTime() / 1000 - 86400,
                },
            },
        });
        render(<AdvertiserPageProfileJoiningLabel />);

        expect(screen.getByText('Joined 1d')).toBeInTheDocument();
    });
    it('should show joined today for new user', () => {
        (useStores as jest.Mock).mockReturnValue({
            ...mock_store,
            advertiser_page_store: {
                ...mock_store.advertiser_page_store,
                info: {
                    ...mock_store.advertiser_page_store.info,
                    created_time: new Date().getTime() / 1000,
                },
            },
        });
        render(<AdvertiserPageProfileJoiningLabel />);
        expect(screen.getByText('Joined today')).toBeInTheDocument();
    });
});
