import React from 'react';
import { Money, Text } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { localize, Localize } from 'Components/i18next';
import { useStores } from 'Stores';
import { getFieldValueSize } from 'Utils/responsive';
import './advertiser-page-stats.scss';

const ItalicText = (
    <Text
        key={0}
        className='advertiser-page-stats__italic'
        color='less-prominent'
        size={getFieldValueSize('xxxs', 'xs')}
    />
);

const AdvertiserPageStats = () => {
    const { advertiser_page_store } = useStores();
    const {
        client: { currency },
    } = useStore();

    const { info } = advertiser_page_store;
    const {
        buy_completion_rate,
        buy_orders_amount,
        buy_orders_count,
        buy_time_avg,
        partner_count,
        release_time_avg,
        sell_completion_rate,
        sell_orders_amount,
        sell_orders_count,
    } = info;

    const avg_buy_time_in_minutes = buy_time_avg > 60 ? Math.round(buy_time_avg / 60) : '< 1';
    const avg_release_time_in_minutes = release_time_avg > 60 ? Math.round(release_time_avg / 60) : '< 1';

    return (
        <React.Fragment>
            <div className='advertiser-page-stats'>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Buy completion  <0>30d</0>' components={[ItalicText]} />
                    </Text>
                    <Text as='p' color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {buy_completion_rate ? `${buy_completion_rate}% (${buy_orders_count})` : '-'}
                    </Text>
                </div>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Sell completion  <0>30d</0>' components={[ItalicText]} />
                    </Text>
                    <Text as='p' color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {sell_completion_rate ? `${sell_completion_rate}% (${sell_orders_count})` : '-'}
                    </Text>
                </div>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Trade volume  <0>30d</0>' components={[ItalicText]} />
                    </Text>
                    <Text as='p' color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {buy_orders_amount && sell_orders_amount ? (
                            <Money
                                amount={Number(buy_orders_amount) + Number(sell_orders_amount)}
                                currency={currency}
                                show_currency
                            />
                        ) : (
                            '-'
                        )}
                    </Text>
                </div>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Avg. pay time  <0>30d</0>' components={[ItalicText]} />
                    </Text>
                    <Text color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {buy_time_avg
                            ? localize('{{- avg_buy_time_in_minutes}} min', {
                                  avg_buy_time_in_minutes,
                              })
                            : '-'}
                    </Text>
                </div>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Avg. release time  <0>30d</0>' components={[ItalicText]} />
                    </Text>
                    <Text color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {release_time_avg
                            ? localize('{{- avg_release_time_in_minutes}} min', {
                                  avg_release_time_in_minutes,
                              })
                            : '-'}
                    </Text>
                </div>
                <div className='advertiser-page-stats__cell'>
                    <Text as='p' color='less-prominent' size={getFieldValueSize('xxxs', 'xs')}>
                        <Localize i18n_default_text='Trade partners' />
                    </Text>
                    <Text as='p' color='prominent' size={getFieldValueSize('xs', 'm')} weight='bold'>
                        {partner_count || '0'}
                    </Text>
                </div>
            </div>
        </React.Fragment>
    );
};

export default observer(AdvertiserPageStats);
