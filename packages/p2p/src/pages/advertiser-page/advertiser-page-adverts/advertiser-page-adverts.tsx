import React from 'react';
import { Loading, Tabs } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import { localize } from 'Components/i18next';
import { useStores } from 'Stores/index';
import AdvertiserPageAdvertsTable from './advertiser-page-adverts-table';

const AdvertiserPageAdverts = () => {
    const { advertiser_page_store } = useStores();

    const { active_index, handleTabItemClick, is_loading_adverts } = advertiser_page_store;

    return (
        <div className='advertiser-page-adverts'>
            <Tabs
                active_index={active_index}
                className='advertiser-page-adverts__tabs'
                header_fit_content
                is_full_width={isMobile()}
                onTabItemClick={handleTabItemClick}
                top
            >
                <div label={localize('Buy')} />
                <div label={localize('Sell')} />
            </Tabs>
            {is_loading_adverts ? (
                <div className='advertiser-page-adverts__table'>
                    <Loading is_fullscreen={false} />
                </div>
            ) : (
                <AdvertiserPageAdvertsTable />
            )}
        </div>
    );
};

export default observer(AdvertiserPageAdverts);
