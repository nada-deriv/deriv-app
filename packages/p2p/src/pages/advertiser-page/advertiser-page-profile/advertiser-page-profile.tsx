import React from 'react';
import { DesktopWrapper, MobileWrapper, Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import TradeBadge from 'Components/trade-badge';
import UserAvatar from 'Components/user/user-avatar';
import { useStores } from 'Stores';
import AdvertiserPageDropdownMenu from '../advertiser-page-dropdown-menu';
import AdvertiserPageProfileRating from './advertiser-page-profile-rating';
import AdvertiserPageProfileJoiningLabel from './advertiser-page-profile-joining-label';
import AdvertiserPageStats from './advertiser-page-stats';

const AdvertiserPageProfile = () => {
    const { advertiser_page_store, general_store } = useStores();

    const is_my_advert = advertiser_page_store.advertiser_details_id === general_store.advertiser_id;
    // Use general_store.advertiser_info since resubscribing to the same id from advertiser page returns error
    const info = is_my_advert ? general_store.advertiser_info : advertiser_page_store.counterparty_advertiser_info;

    const { basic_verification, buy_orders_count, first_name, full_verification, last_name, name, sell_orders_count } =
        info;

    const nickname = advertiser_page_store.advertiser_details_name ?? name;

    return (
        <div className='advertiser-page-profile'>
            <div className='advertiser-page-profile__header-details'>
                <UserAvatar nickname={nickname} size={isMobile() ? 32 : 64} text_size={isMobile() ? 's' : 'sm'} />
                <div className='advertiser-page-profile__header-name--column'>
                    <div className='advertiser-page-profile__header-name'>
                        <Text color='prominent' weight='bold'>
                            {nickname}
                        </Text>
                        {first_name && last_name && (
                            <div className='advertiser-page-profile__header-real-name'>
                                <Text color='less-prominent' line_height='xs' size='xs'>
                                    {`(${first_name} ${last_name})`}
                                </Text>
                            </div>
                        )}
                    </div>
                    <MobileWrapper>
                        <AdvertiserPageProfileJoiningLabel />
                    </MobileWrapper>
                    <div className='advertiser-page-profile__rating'>
                        <DesktopWrapper>
                            <AdvertiserPageProfileJoiningLabel />
                        </DesktopWrapper>
                        <AdvertiserPageProfileRating />
                    </div>
                    <div className='advertiser-page-profile__row'>
                        <TradeBadge
                            is_poa_verified={!!full_verification}
                            is_poi_verified={!!basic_verification}
                            trade_count={Number(buy_orders_count) + Number(sell_orders_count)}
                            large
                        />
                    </div>
                </div>
                {!is_my_advert && (
                    <DesktopWrapper>
                        <AdvertiserPageDropdownMenu />
                    </DesktopWrapper>
                )}
            </div>
            <AdvertiserPageStats />
        </div>
    );
};

export default observer(AdvertiserPageProfile);
