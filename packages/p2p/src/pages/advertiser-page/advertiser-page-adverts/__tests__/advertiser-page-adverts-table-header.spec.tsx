import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockStore, StoreProvider } from '@deriv/stores';
import AdvertiserPageAdvertsTableHeader from '../advertiser-page-adverts-table-header';

const mock = mockStore({
    client: {
        currency: 'USD',
    },
});

describe('<AdvertiserPageAdvertsTableHeader/>', () => {
    it('should render the adverts table header', () => {
        render(
            <StoreProvider store={mock}>
                <AdvertiserPageAdvertsTableHeader />
            </StoreProvider>
        );

        expect(screen.getByText('Limits')).toBeInTheDocument();
        expect(screen.getByText('Rate (1 USD)')).toBeInTheDocument();
        expect(screen.getByText('Payment methods')).toBeInTheDocument();
    });
});
