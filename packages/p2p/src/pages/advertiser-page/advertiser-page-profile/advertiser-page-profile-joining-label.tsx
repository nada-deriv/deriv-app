import React from 'react';
import classNames from 'classnames';
import { Text } from '@deriv/components';
import { daysSince, isMobile } from '@deriv/shared';
import { Localize } from 'Components/i18next';
import { OnlineStatusIcon, OnlineStatusLabel } from 'Components/online-status';
import { useStores } from 'Stores';

const AdvertiserPageProfileJoiningLabel = () => {
    const { advertiser_page_store, general_store } = useStores();
    const { advertiser_id, advertiser_info, label_size } = general_store;
    const { advertiser_details_id, counterparty_advertiser_info } = advertiser_page_store;

    const is_my_advert = advertiser_details_id === advertiser_id;

    // Use general_store.advertiser_info since resubscribing to the same id from advertiser page returns error
    const info = is_my_advert ? advertiser_info : counterparty_advertiser_info;
    const { created_time, is_online, last_online_time } = info;

    const joined_since = daysSince(created_time);

    return (
        <div
            className={classNames({
                'advertiser-page-profile__row': isMobile(),
            })}
        >
            <div className='advertiser-page-profile__rating--row'>
                <OnlineStatusIcon is_online={is_online} />
                <OnlineStatusLabel is_online={is_online} last_online_time={last_online_time} />
            </div>
            <div className='advertiser-page-profile__rating--row'>
                <Text className='advertiser-page-profile__joined-since' color='less-prominent' size={label_size}>
                    {joined_since ? (
                        <Localize
                            i18n_default_text='Joined {{days_since_joined}}d'
                            values={{ days_since_joined: joined_since }}
                        />
                    ) : (
                        <Localize i18n_default_text='Joined today' />
                    )}
                </Text>
            </div>
        </div>
    );
};

export default AdvertiserPageProfileJoiningLabel;
