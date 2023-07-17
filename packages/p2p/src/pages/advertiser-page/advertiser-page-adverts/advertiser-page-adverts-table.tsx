import React from 'react';
import classNames from 'classnames';
import { InfiniteDataList, Table } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import { localize } from 'Components/i18next';
import P2pEmpty from 'Components/p2p-empty';
import { useStores } from 'Stores';
import { TAdvertiserPageRow } from 'Types';
import AdvertiserPageAdvertsTableHeader from './advertiser-page-adverts-table-header';
import AdvertiserPageRow from './advertiser-page-row';

const AdvertiserPageRowRenderer = (props: TAdvertiserPageRow) => <AdvertiserPageRow {...props} />;

const AdvertiserPageAdvertsTable = () => {
    const { advertiser_page_store } = useStores();

    const { adverts, has_more_adverts_to_load, loadMoreAdvertiserAdverts } = advertiser_page_store;

    if (adverts.length)
        return (
            <Table className='advertiser-page-adverts__table'>
                <AdvertiserPageAdvertsTableHeader />
                <Table.Body className='advertiser-page-adverts__table-body'>
                    <InfiniteDataList
                        data_list_className='advertiser-page__data-list'
                        has_more_items_to_load={has_more_adverts_to_load}
                        items={adverts}
                        keyMapperFn={item => item.id}
                        loadMoreRowsFn={loadMoreAdvertiserAdverts}
                        rowRenderer={AdvertiserPageRowRenderer}
                    />
                </Table.Body>
            </Table>
        );

    return (
        <P2pEmpty
            className={classNames('', { 'advertiser-page-adverts__empty': isMobile() })}
            icon='IcNoData'
            title={localize('There are no ads yet')}
        />
    );
};

export default observer(AdvertiserPageAdvertsTable);
