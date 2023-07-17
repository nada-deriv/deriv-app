import React from 'react';
import { Localize } from 'Components/i18next';

type TAdvertiserPageProfileRatingLabelProps = {
    rating_count: number;
};

const AdvertiserPageProfileRatingLabel = ({ rating_count }: TAdvertiserPageProfileRatingLabelProps) => {
    if (rating_count === 1) {
        return (
            <Localize i18n_default_text='({{number_of_ratings}} rating)' values={{ number_of_ratings: rating_count }} />
        );
    }
    return (
        <Localize i18n_default_text='({{number_of_ratings}} ratings)' values={{ number_of_ratings: rating_count }} />
    );
};

export default AdvertiserPageProfileRatingLabel;
