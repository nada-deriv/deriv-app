import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockStore, StoreProvider } from '@deriv/stores';
import { useStores } from 'Stores';
import AdvertiserPageAdverts from '../advertiser-page-adverts';
import { adverts } from '../../__mocks__/mock-data';

const mock_store: DeepPartial<ReturnType<typeof useStores>> = {
    advertiser_page_store: {
        adverts: [],
        loadMoreAdvertiserAdverts: jest.fn(),
        has_more_adverts_to_load: false,
    },
};

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(() => mock_store),
}));

const mock = mockStore({
    client: {
        currency: 'USD',
    },
});

describe('<AdvertiserPageAdverts/>', () => {
    const renderwithRouter = (component: React.ReactElement) => {
        render(<BrowserRouter>{component}</BrowserRouter>);
    };

    it('should render <Empty /> component when there are no ads yet', () => {
        renderwithRouter(<AdvertiserPageAdverts />);

        expect(screen.getByText('There are no ads yet')).toBeInTheDocument();
    });
    it('should display the ads list in the table when there are ads for the advertiser', () => {
        (useStores as jest.Mock).mockReturnValue({
            ...mock_store,
            advertiser_page_store: {
                ...mock_store.advertiser_page_store,
                adverts,
            },
        });
        renderwithRouter(
            <StoreProvider store={mock}>
                <AdvertiserPageAdverts />
            </StoreProvider>
        );
        expect(screen.getByTestId('dt_data_list')).toBeInTheDocument();
    });
});
