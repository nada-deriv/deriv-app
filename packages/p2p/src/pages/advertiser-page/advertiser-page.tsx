import React from 'react';
import classNames from 'classnames';
import { reaction } from 'mobx';
import { useHistory } from 'react-router-dom';
import { Loading } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { observer } from '@deriv/stores';
import { localize } from 'Components/i18next';
import { useModalManagerContext } from 'Components/modal-manager/modal-manager-context';
import { api_error_codes } from 'Constants/api-error-codes';
import { my_profile_tabs } from 'Constants/my-profile-tabs';
import { useStores } from 'Stores';
import AdvertiserPageAdverts from './advertiser-page-adverts';
import AdvertiserPageHeader from './advertiser-page-header';
import AdvertiserPageProfile from './advertiser-page-profile';
import BlockUserOverlay from './block-user/block-user-overlay';

const AdvertiserPage = () => {
    const { advertiser_page_store, buy_sell_store, general_store, my_profile_store } = useStores();
    const { hideModal, showModal, useRegisterModalProps } = useModalManagerContext();
    const {
        active_index,
        active_tab_route,
        advertiser_id,
        advertiser_info,
        block_unblock_user_error,
        error_code,
        is_block_unblock_user_loading,
        setBlockUnblockUserError,
    } = general_store;
    const {
        advertiser_details_id,
        advertiser_details_name,
        counterparty_advertiser_info,
        error_message: error_message_api,
        is_counterparty_advertiser_blocked,
        is_loading,
    } = advertiser_page_store;

    const is_my_advert = advertiser_details_id === advertiser_id;
    // Use general_store.advertiser_info since resubscribing to the same id from advertiser page returns error
    const info = is_my_advert ? advertiser_info : counterparty_advertiser_info;

    const history = useHistory();

    const { name } = info;

    const nickname = advertiser_details_name ?? name;

    const error_message = () => {
        return !!is_counterparty_advertiser_blocked && !is_my_advert
            ? localize("Unblocking wasn't possible as {{name}} is not using Deriv P2P anymore.", {
                  name: nickname,
              })
            : localize("Blocking wasn't possible as {{name}} is not using Deriv P2P anymore.", {
                  name: nickname,
              });
    };

    const handleOpenModal = () => {
        showModal({
            key: 'ErrorModal',
            props: {
                error_message:
                    error_code === api_error_codes.INVALID_ADVERTISER_ID ? error_message() : block_unblock_user_error,
                error_modal_button_text: localize('Got it'),
                error_modal_title:
                    error_code === api_error_codes.INVALID_ADVERTISER_ID
                        ? localize('{{name}} is no longer on Deriv P2P', {
                              name: nickname,
                          })
                        : localize('Unable to block advertiser'),
                has_close_icon: false,
                onClose: () => {
                    buy_sell_store.hideAdvertiserPage();
                    history.push(active_tab_route);
                    if (active_index !== 0) my_profile_store.setActiveTab(my_profile_tabs.MY_COUNTERPARTIES);
                    advertiser_page_store.onCancel();
                    setBlockUnblockUserError('');
                    hideModal();
                },
                width: isMobile() ? '90rem' : '40rem',
            },
        });
        setBlockUnblockUserError(null);
    };

    React.useEffect(() => {
        advertiser_page_store.onMount();
        advertiser_page_store.setIsDropdownMenuVisible(false);
        const disposeCounterpartyAdvertiserIdReaction = reaction(
            () => [general_store.counterparty_advertiser_id, general_store.is_advertiser_info_subscribed],
            () => {
                // DO NOT REMOVE. This fixes reload on advertiser page routing issue
                advertiser_page_store.onAdvertiserIdUpdate();
            },
            { fireImmediately: true }
        );

        reaction(
            () => [advertiser_page_store.active_index, general_store.block_unblock_user_error],
            () => {
                advertiser_page_store.onTabChange();
                if (general_store.block_unblock_user_error && buy_sell_store.show_advertiser_page) {
                    handleOpenModal();
                }
            },
            { fireImmediately: true }
        );

        return () => {
            disposeCounterpartyAdvertiserIdReaction();
            advertiser_page_store.onUnmount();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useRegisterModalProps({
        key: 'BlockUserModal',
        props: {
            advertiser_name: name,
            is_advertiser_blocked: !!is_counterparty_advertiser_blocked && !is_my_advert,
            onCancel: advertiser_page_store.onCancel,
            onSubmit: advertiser_page_store.onSubmit,
        },
    });

    if (is_loading || is_block_unblock_user_loading) {
        return <Loading is_fullscreen={false} />;
    }

    if (error_message_api) {
        return <div className='advertiser-page__error'>{error_message_api}</div>;
    }

    const onClickBack = () => {
        buy_sell_store.hideAdvertiserPage();
        if (active_index === general_store.path.my_profile)
            my_profile_store.setActiveTab(my_profile_tabs.MY_COUNTERPARTIES);
        history.push(active_tab_route);
    };

    return (
        <div
            className={classNames('advertiser-page', {
                'advertiser-page--no-scroll': !!is_counterparty_advertiser_blocked && !is_my_advert,
            })}
        >
            <AdvertiserPageHeader
                title={localize("Advertiser's page")}
                onClickPageReturn={onClickBack}
                is_my_advert={is_my_advert}
            />
            <BlockUserOverlay
                is_visible={!!is_counterparty_advertiser_blocked && !is_my_advert}
                onClickUnblock={() =>
                    showModal({
                        key: 'BlockUserModal',
                    })
                }
            >
                <AdvertiserPageProfile />
                <AdvertiserPageAdverts />
            </BlockUserOverlay>
        </div>
    );
};

export default observer(AdvertiserPage);
