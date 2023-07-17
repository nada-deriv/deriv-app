import React from 'react';
import { render, screen } from '@testing-library/react';
import AdvertiserPageProfileRatingLabel from '../advertiser-page-profile-rating-label';

describe('<AdvertiserPageProfileRatingLabel/>', () => {
    it('should render the component with more than 1 ratings', () => {
        render(<AdvertiserPageProfileRatingLabel rating_count={5} />);

        expect(screen.getByText('(5 ratings)')).toBeInTheDocument();
    });
    it('should render the component with only 1 rating', () => {
        render(<AdvertiserPageProfileRatingLabel rating_count={1} />);

        expect(screen.getByText('(1 rating)')).toBeInTheDocument();
    });
});
