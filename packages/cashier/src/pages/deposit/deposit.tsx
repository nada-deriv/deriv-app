import React from 'react';
import { useDepositLocked } from '@deriv/hooks';
import { observer, useStore } from '@deriv/stores';
import TransactionsCryptoHistory from '../../components/transactions-crypto-history';
import { CashierOnboardingModule, DepositCryptoModule, DepositFiatModule } from '../../modules';
import { useCashierStore } from '../../stores/useCashierStores';
import DepositLocked from './deposit-locked';

const PageContainer = React.lazy(
    () => import(/* webpackChunkName: "page-container" */ 'Components/page-container/page-container')
);

const Deposit = observer(() => {
    const { traders_hub } = useStore();
    const { transaction_history, general_store } = useCashierStore();
    const { is_low_risk_cr_eu_real } = traders_hub;
    const { is_transactions_crypto_visible } = transaction_history;
    const { is_crypto, is_deposit } = general_store;
    const is_deposit_locked = useDepositLocked();

    if (is_deposit_locked)
        return (
            <PageContainer hide_breadcrumb>
                <DepositLocked />
            </PageContainer>
        );

    if (is_transactions_crypto_visible) return <TransactionsCryptoHistory />;

    if (is_deposit || is_low_risk_cr_eu_real) {
        if (is_crypto) return <DepositCryptoModule />;

        return <DepositFiatModule />;
    }

    return <CashierOnboardingModule />;
});

export default Deposit;
