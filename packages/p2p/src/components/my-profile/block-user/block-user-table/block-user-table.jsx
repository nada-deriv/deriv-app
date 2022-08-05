import React from 'react';
import { observer } from 'mobx-react-lite';
import { InfiniteDataList, Loading, Table, Text } from '@deriv/components';
import { localize } from 'Components/i18next';
import { isMobile } from '@deriv/shared';
import { useStores } from 'Stores';
import BlockUserRow from './block-user-row.jsx';
import { TableError } from 'Components/table/table-error.jsx';
import BlockUserEmpty from 'Components/block-user/block-user-empty';

const BlockUserTable = () => {
    const { general_store, my_profile_store } = useStores();

    React.useEffect(() => {
        my_profile_store.setBlockedAdvertisersList([]);
        my_profile_store.getBlockedAdvertisersList();
        my_profile_store.setSearchTerm('');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (my_profile_store.is_loading) {
        return <Loading is_fullscreen={isMobile()} />;
    }

    if (general_store.block_unblock_user_error) {
        return <TableError message={general_store.block_unblock_user_error} />;
    }

    if (my_profile_store.search_term && my_profile_store.rendered_blocked_advertisers_list.length === 0) {
        return (
            <Text align='center' className='block-user__text' line_height='m' size='s' weight='normal'>
                {localize('There are no matching name.')}
            </Text>
        );
    }

    if (my_profile_store.blocked_advertisers_list.length) {
        return (
            <React.Fragment>
                <Table className='block-user__table'>
                    <Table.Body className='block-user__table-body'>
                        <InfiniteDataList
                            data_list_className='block-user__data-list'
                            has_more_items_to_load={false}
                            items={my_profile_store.rendered_blocked_advertisers_list}
                            keyMapperFn={item => item.id}
                            loadMoreRowsFn={() => {}}
                            rowRenderer={props => <BlockUserRow {...props} />}
                        />
                    </Table.Body>
                </Table>
            </React.Fragment>
        );
    }

    return <BlockUserEmpty />;
};

export default observer(BlockUserTable);
