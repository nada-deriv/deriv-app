/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Control, Controller, FieldValues, useForm } from 'react-hook-form';
import { TAdvertType } from 'types';
import { BUY_SELL, RATE_TYPE } from '@/constants';
import { removeTrailingZeros, roundOffDecimal, setDecimalPlaces } from '@/utils';
import { p2p } from '@deriv/api-v2';
import { Divider, InlineMessage, Text, TextArea, useDevice } from '@deriv-com/ui';
import { BuySellAmount } from './BuySellAmount';
import { BuySellData } from './BuySellData';
import BuySellFormDisplayWrapper from './BuySellFormDisplayWrapper';
import { BuySellPaymentSection } from './BuySellPaymentSection';
import './BuySellForm.scss';

type TBuySellFormProps = {
    advert: TAdvertType;
    advertiserBuyLimit: number;
    advertiserPaymentMethods: ReturnType<typeof p2p.advertiserPaymentMethods.useGet>['data'];
    advertiserSellLimit: number;
    balanceAvailable: number;
    displayEffectiveRate: string;
    effectiveRate: number;
    isModalOpen: boolean;
    onRequestClose: () => void;
    paymentMethods: ReturnType<typeof p2p.paymentMethods.useGet>['data'];
};

const getAdvertiserMaxLimit = (
    isBuy: boolean,
    advertiserBuyLimit: number,
    advertiserSellLimit: number,
    maxOrderAmountLimitDisplay: string
) => {
    if (isBuy) {
        if (advertiserBuyLimit < Number(maxOrderAmountLimitDisplay)) return roundOffDecimal(advertiserBuyLimit);
    } else if (advertiserSellLimit < Number(maxOrderAmountLimitDisplay)) return roundOffDecimal(advertiserSellLimit);
    return maxOrderAmountLimitDisplay;
};

const BuySellForm = ({
    advert,
    advertiserBuyLimit,
    advertiserPaymentMethods,
    advertiserSellLimit,
    balanceAvailable,
    displayEffectiveRate,
    effectiveRate,
    isModalOpen,
    onRequestClose,
    paymentMethods,
}: TBuySellFormProps) => {
    const { mutate } = p2p.order.useCreate();
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);

    const {
        account_currency,
        advertiser_details,
        description,
        id,
        local_currency,
        max_order_amount_limit_display,
        min_order_amount_limit,
        min_order_amount_limit_display,
        order_expiry_period,
        payment_method_names,
        rate_type,
        type,
    } = advert;

    const avertiserPaymentMethodObjects =
        advertiserPaymentMethods?.reduce(
            (
                acc: Record<
                    string,
                    NonNullable<ReturnType<typeof p2p.advertiserPaymentMethods.useGet>['data']>[number]
                >,
                curr
            ) => {
                if (curr.display_name) {
                    acc[curr.display_name] = curr;
                }
                return acc;
            },
            {}
        ) ?? {};

    const paymentMethodObjects =
        paymentMethods?.reduce(
            (
                acc: Record<
                    string,
                    NonNullable<ReturnType<typeof p2p.advertiserPaymentMethods.useGet>['data']>[number]
                >,
                curr
            ) => {
                if (curr.display_name) {
                    acc[curr.display_name] = curr;
                }
                return acc;
            },
            {}
        ) ?? {};

    const availablePaymentMethods = payment_method_names?.map(paymentMethod => {
        const isAvailable = advertiserPaymentMethods?.some(method => method.display_name === paymentMethod);
        return {
            ...(isAvailable ? avertiserPaymentMethodObjects[paymentMethod] : paymentMethodObjects[paymentMethod]),
            isAvailable,
        };
    });

    const { isMobile } = useDevice();
    const isBuy = type === BUY_SELL.BUY;
    const shouldDisableField =
        !isBuy &&
        (parseFloat(balanceAvailable.toString()) === 0 ||
            parseFloat(balanceAvailable.toString()) < min_order_amount_limit);

    const {
        control,
        formState: { isValid },
        getValues,
        handleSubmit,
    } = useForm({
        defaultValues: {
            amount: min_order_amount_limit ?? 1,
            bank_details: '',
            contact_details: '',
        },
        mode: 'all',
    });

    const onSubmit = () => {
        //TODO: error handling after implementation of exchange rate
        const rateValue = rate_type === RATE_TYPE.FIXED ? null : effectiveRate;
        const payload = {
            advert_id: id,
            amount: Number(getValues('amount')),
        };
        if (rateValue) {
            payload.rate = rateValue;
        }

        if (isBuy) {
            payload.payment_method_ids = selectedPaymentMethods;
        }

        mutate(payload);
    };

    const calculatedRate = removeTrailingZeros(roundOffDecimal(effectiveRate, setDecimalPlaces(effectiveRate, 6)));
    const initialAmount = removeTrailingZeros((min_order_amount_limit * Number(calculatedRate)).toString());

    const onSelectPaymentMethodCard = (paymentMethodId: string) => {
        if (selectedPaymentMethods.includes(paymentMethodId)) {
            setSelectedPaymentMethods(selectedPaymentMethods.filter(method => method !== paymentMethodId));
        } else {
            setSelectedPaymentMethods([...selectedPaymentMethods, paymentMethodId]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BuySellFormDisplayWrapper
                accountCurrency={account_currency}
                isBuy={isBuy}
                isModalOpen={isModalOpen}
                isValid={isValid}
                onRequestClose={onRequestClose}
                onSubmit={onSubmit}
            >
                {rate_type === RATE_TYPE.FLOAT && !shouldDisableField && (
                    <div className='px-[2.4rem] mt-[2.4rem]'>
                        <InlineMessage variant='info'>
                            <Text size={isMobile ? 'xs' : '2xs'}>
                                {`If the market rate changes from the rate shown here, we won't be able to process your order.`}
                            </Text>
                        </InlineMessage>
                    </div>
                )}
                <BuySellData
                    accountCurrency={account_currency}
                    expiryPeriod={order_expiry_period ?? 3600}
                    instructions={description ?? '-'}
                    isBuy={isBuy}
                    localCurrency={local_currency}
                    name={advertiser_details?.name}
                    paymentMethodNames={payment_method_names}
                    paymentMethods={paymentMethods}
                    rate={displayEffectiveRate}
                />
                <Divider />
                {isBuy && payment_method_names?.length && (
                    <BuySellPaymentSection
                        availablePaymentMethods={availablePaymentMethods}
                        onSelectPaymentMethodCard={onSelectPaymentMethodCard}
                        selectedPaymentMethodIds={selectedPaymentMethods}
                    />
                )}
                <BuySellAmount
                    accountCurrency={account_currency}
                    amount={initialAmount}
                    calculatedRate={calculatedRate}
                    control={control as unknown as Control<FieldValues, unknown, FieldValues>}
                    isBuy={isBuy}
                    isDisabled={shouldDisableField}
                    localCurrency={local_currency}
                    maxLimit={getAdvertiserMaxLimit(
                        isBuy,
                        advertiserBuyLimit,
                        advertiserSellLimit,
                        max_order_amount_limit_display
                    )}
                    minLimit={min_order_amount_limit_display}
                />
                {isBuy && !payment_method_names?.length && (
                    <Controller
                        control={control}
                        name='bank_details'
                        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => {
                            return (
                                <div className='px-[2.4rem] mb-[3.5rem] pt-[1.8rem]'>
                                    <TextArea
                                        hint={error ? error.message : 'Bank name, account number, beneficiary name'}
                                        isInvalid={!!error}
                                        label='Your bank details'
                                        maxLength={300}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        shouldShowCounter
                                        textSize='sm'
                                        value={value}
                                    />
                                </div>
                            );
                        }}
                        rules={{
                            required: 'Bank details is required',
                        }}
                    />
                )}
                {isBuy && (
                    <>
                        <Divider />
                        <Controller
                            control={control}
                            name='contact_details'
                            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
                                <div className='px-[2.4rem] mb-[3.5rem] pt-[1.8rem]'>
                                    <TextArea
                                        hint={error ? error.message : ''}
                                        isInvalid={!!error}
                                        label='Your contact details'
                                        maxLength={300}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        shouldShowCounter
                                        textSize='sm'
                                        value={value}
                                    />
                                </div>
                            )}
                            rules={{
                                required: 'Contact details is required',
                            }}
                        />
                    </>
                )}
            </BuySellFormDisplayWrapper>
        </form>
    );
};

export default BuySellForm;
