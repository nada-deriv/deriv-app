import React from 'react';
import { Dropdown, Icon, useOnClickOutside } from '@deriv/components';
import { observer } from '@deriv/stores';
import { localize } from 'Components/i18next';
import { useStores } from 'Stores/index';

const AdvertiserPageDropdownMenu = () => {
    const dropdown_menu_ref = React.useRef<HTMLDivElement>(null);
    const { advertiser_page_store } = useStores();
    const {
        is_counterparty_advertiser_blocked,
        is_dropdown_menu_visible,
        setIsDropdownMenuVisible,
        showBlockUserModal,
    } = advertiser_page_store;

    const onClickOutside = () => {
        advertiser_page_store.setIsDropdownMenuVisible(false);
    };

    useOnClickOutside(dropdown_menu_ref, onClickOutside, () => is_dropdown_menu_visible);

    return (
        <React.Fragment>
            {!is_counterparty_advertiser_blocked && (
                <div className='advertiser-page-dropdown-menu__dots-toggle'>
                    <Icon
                        className='advertiser-page-dropdown-menu__dots-icon'
                        data_testid='dt_advertiser_page_menu_dots_icon'
                        icon='IcMenuDots'
                        onClick={() => setIsDropdownMenuVisible(!is_dropdown_menu_visible)}
                    />
                    {is_dropdown_menu_visible && (
                        <div
                            ref={dropdown_menu_ref}
                            className='advertiser-page-dropdown-menu'
                            onClick={showBlockUserModal}
                            data-testid='dt_advertiser_page_dropdown'
                        >
                            <Dropdown list={[]} name='block_user_dropdown' placeholder={localize('Block')} />
                        </div>
                    )}
                </div>
            )}
        </React.Fragment>
    );
};

export default observer(AdvertiserPageDropdownMenu);
