import React from 'react';
import { Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import { Localize } from 'Components/i18next';
import RecommendedBy from 'Components/recommended-by';
import StarRating from 'Components/star-rating';
import { useStores } from 'Stores';
import { getFieldValueSize } from 'Utils/responsive';
import AdvertiserPageProfileRatingLabel from './advertiser-page-profile-rating-label';

const AdvertiserPageProfileRating = () => {
    const { advertiser_page_store } = useStores();

    const { info } = advertiser_page_store;

    const { rating_average, rating_count, recommended_average, recommended_count } = info;

    // rating_average_decimal converts rating_average to 1 d.p number
    const rating_average_decimal = rating_average ? Number(rating_average).toFixed(1) : null;

    return (
        <React.Fragment>
            {rating_average ? (
                <React.Fragment>
                    <div className='advertiser-page-profile__rating--row'>
                        <StarRating
                            empty_star_className='advertiser-page-profile__rating--star'
                            empty_star_icon='IcEmptyStar'
                            full_star_className='advertiser-page-profile__rating--star'
                            full_star_icon='IcFullStar'
                            initial_value={rating_average_decimal ?? 0}
                            is_readonly
                            number_of_stars={5}
                            should_allow_hover_effect={false}
                            star_size={isMobile() ? 17 : 20}
                        />
                        <div className='advertiser-page-profile__rating--text'>
                            <Text color='prominent' size={getFieldValueSize('xxxs', 'xs')}>
                                {rating_average_decimal}
                            </Text>
                            <Text color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                                <AdvertiserPageProfileRatingLabel rating_count={rating_count} />
                            </Text>
                        </div>
                    </div>
                    <div className='advertiser-page-profile__rating--row'>
                        <RecommendedBy
                            recommended_average={recommended_average}
                            recommended_count={recommended_count}
                        />
                    </div>
                </React.Fragment>
            ) : (
                <div className='advertiser-page-profile__rating--row'>
                    <Text color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Not rated yet' />
                    </Text>
                </div>
            )}
        </React.Fragment>
    );
};

export default observer(AdvertiserPageProfileRating);
