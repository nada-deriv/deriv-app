import React from 'react';
import classNames from 'classnames';
import { Text } from '@deriv/components';
import { daysSince, isMobile } from '@deriv/shared';
import { Localize } from 'Components/i18next';
import { OnlineStatusIcon, OnlineStatusLabel } from 'Components/online-status';
import { useStores } from 'Stores';
import { getFieldValueSize } from 'Utils/responsive';

const AdvertiserPageProfileJoiningLabel = () => {
    const { advertiser_page_store } = useStores();
    const { info } = advertiser_page_store;

    const { created_time, is_online, last_online_time } = info;

    const joined_since = daysSince(created_time);

    return (
        <div
            className={classNames('advertiser-page-profile__rating--label', {
                'advertiser-page-profile__row': isMobile(),
            })}
        >
            <div className='advertiser-page-profile__rating--row'>
                <OnlineStatusIcon is_online={is_online} />
                <OnlineStatusLabel is_online={is_online} last_online_time={last_online_time} />
            </div>
            <div className='advertiser-page-profile__rating--row'>
                <Text
                    className='advertiser-page-profile__joined-since'
                    color='less-prominent'
                    size={getFieldValueSize('xxxs', 'xs')}
                >
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
