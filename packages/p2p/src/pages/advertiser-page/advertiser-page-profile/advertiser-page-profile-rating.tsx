import React from 'react';
import { Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import { Localize } from 'Components/i18next';
import RecommendedBy from 'Components/recommended-by';
import StarRating from 'Components/star-rating';
import { useStores } from 'Stores';
import AdvertiserPageProfileRatingLabel from './advertiser-page-profile-rating-label';

const AdvertiserPageProfileRating = () => {
    const { advertiser_page_store, general_store } = useStores();

    const { advertiser_details_id, counterparty_advertiser_info } = advertiser_page_store;
    const { advertiser_id, advertiser_info, label_size } = general_store;
    const is_my_advert = advertiser_details_id === advertiser_id;
    // Use general_store.advertiser_info since resubscribing to the same id from advertiser page returns error
    const info = is_my_advert ? advertiser_info : counterparty_advertiser_info;

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
                            <Text color='prominent' size={label_size}>
                                {rating_average_decimal}
                            </Text>
                            <Text color='less-prominent' size={label_size}>
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
                    <Text color='less-prominent' size={label_size}>
                        <Localize i18n_default_text='Not rated yet' />
                    </Text>
                </div>
            )}
        </React.Fragment>
    );
};

export default observer(AdvertiserPageProfileRating);
