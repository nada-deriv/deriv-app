import React from 'react';
import { MobileWrapper } from '@deriv/components';
import { observer } from '@deriv/stores';
import PageReturn from 'Components/page-return';
import AdvertiserPageDropdownMenu from '../advertiser-page-dropdown-menu';

type TAdvertiserPageProps = {
    onClickPageReturn: () => void;
    is_my_advert: boolean;
    title: string;
};

const AdvertiserPageHeader = ({ onClickPageReturn, is_my_advert, title }: TAdvertiserPageProps) => {
    return (
        <div className='advertiser-page-header'>
            <PageReturn
                className='advertiser-page-header__page-return'
                onClick={onClickPageReturn}
                page_title={title}
            />
            {!is_my_advert && (
                <MobileWrapper>
                    <AdvertiserPageDropdownMenu />
                </MobileWrapper>
            )}
        </div>
    );
};

export default observer(AdvertiserPageHeader);
