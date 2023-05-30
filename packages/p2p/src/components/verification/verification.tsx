import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Icon, Checklist, Text } from '@deriv/components';
import { isMobile, routes } from '@deriv/shared';
import Dp2pBlocked from 'Components/dp2p-blocked';
import { Localize } from 'Components/i18next';
import { useStores } from 'Stores/index';

const VerificationWrapper = ({ should_wrap, children }: React.PropsWithChildren<{ should_wrap: boolean }>) => {
    if (should_wrap) {
        return (
            <div
                className={classNames('verification__wrapper', {
                    'verification__wrapper--mobile': isMobile(),
                })}
                data-testid='dt_verification_wrapper'
            >
                {children}
            </div>
        );
    }

    return children as JSX.Element;
};

const Verification = ({ should_wrap = false }: { should_wrap?: boolean }) => {
    const { general_store } = useStores();

    if (!general_store.is_advertiser && general_store.poi_status === 'verified' && general_store.nickname) {
        return <Dp2pBlocked />;
    }

    const checklist_items = [
        {
            content: general_store.nickname || <Localize i18n_default_text='Choose your nickname' />,
            status: general_store.nickname ? 'done' : 'action',
            onClick: general_store.nickname
                ? () => {
                      //do nothing
                  }
                : general_store.toggleNicknamePopup,
        },
        {
            content: general_store.poiStatusText(general_store.poi_status),
            is_disabled: general_store.poi_status !== 'verified' && !general_store.nickname,
            status: general_store.poi_status === 'verified' ? 'done' : 'action',
            onClick:
                general_store.poi_status === 'verified'
                    ? () => {
                          //do nothing
                      }
                    : () => {
                          window.location.href = `${routes.proof_of_identity}?ext_platform_url=${routes.cashier_p2p}`;
                      },
        },
    ];

    return (
        <VerificationWrapper should_wrap={should_wrap}>
            <div className='verification' data-testid='dt_verification_container'>
                <Icon icon='IcCashierSendEmail' className='verification__icon' size={102} />
                <div className='verification__text'>
                    <Text className='verification__text-title' weight='bold' align='center'>
                        <Localize i18n_default_text='Please register with us!' />
                    </Text>
                    <div className='verification__text-description'>
                        <Text as='p' size='xs' line_height='s' align='center'>
                            <Localize i18n_default_text='To use Deriv P2P, you need to choose a display name (a nickname) and verify your identity.' />
                        </Text>
                    </div>
                </div>
                <Checklist className='verification__checklist' items={checklist_items} />
            </div>
        </VerificationWrapper>
    );
};

export default observer(Verification);
