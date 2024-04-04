import React from 'react';
import { MY_ADS_URL } from '@/constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateEditAd from '../CreateEditAd';
import '../../../components/AdFormInput';

const mockOnChange = jest.fn();
jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    FormProvider: ({ children }) => <div>{children}</div>,
    Controller: ({ control, defaultValue, name, render }) =>
        render({
            field: { control, name, onBlur: jest.fn(), onChange: mockOnChange, value: defaultValue },
            fieldState: { error: null },
        }),
    useFormContext: () => ({
        control: 'mockedControl',
        formState: { errors: {}, isValid: true },
        getValues: () => ({
            'ad-type': 'buy',
            amount: '100',
            'payment-method': [],
            'rate-value': '1.2',
        }),
        watch: jest.fn(),
    }),
}));

const mockFn = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockFn,
    }),
}));

jest.mock('../../../components/AdFormInput', () => ({
    AdFormInput: () => <div>AdFormInput</div>,
}));

jest.mock('../../../components/AdFormTextArea', () => ({
    AdFormTextArea: () => <div>AdFormTextArea</div>,
}));
jest.mock('@deriv/api-v2', () => ({
    p2p: {
        advert: {
            useCreate: () => ({
                error: undefined,
                isError: false,
                isSuccess: false,
                mutate: jest.fn(),
            }),
            useGet: () => ({
                data: {},
                isLoading: false,
            }),
            useUpdate: () => ({
                error: undefined,
                isError: false,
                isSuccess: false,
                mutate: jest.fn(),
            }),
        },
        countryList: {
            useGet: () => ({
                data: {
                    af: {
                        country_name: 'Afghanistan',
                        cross_border_ads_enabled: 1,
                        fixed_rate_adverts: 'enabled',
                        float_rate_adverts: 'disabled',
                        float_rate_offset_limit: 10,
                        local_currency: 'AFN',
                        payment_methods: {
                            alipay: {
                                display_name: 'Alipay',
                                fields: {
                                    account: {
                                        display_name: 'Alipay ID',
                                        required: 1,
                                        type: 'text',
                                    },
                                    instructions: {
                                        display_name: 'Instructions',
                                        required: 0,
                                        type: 'memo',
                                    },
                                },
                                type: 'ewallet',
                            },
                        },
                    },
                },
            }),
        },
        settings: {
            useGetSettings: () => ({
                data: {
                    order_payment_period: 60,
                },
            }),
        },
    },
    useActiveAccount: () => ({ data: { currency: 'USD' } }),
}));

jest.mock('@/hooks', () => ({
    ...jest.requireActual('@/hooks'),
    useFloatingRate: () => ({ rateType: 'floating' }),
    useQueryString: jest.fn().mockReturnValue({ queryString: { advertId: '' } }),
}));

jest.mock('@deriv-com/ui', () => ({
    ...jest.requireActual('@deriv-com/ui'),
    useDevice: () => ({ isMobile: false }),
}));

describe('CreateEditAd', () => {
    it('should render the create edit ad component', () => {
        render(<CreateEditAd />);
        expect(screen.getByText('Set ad type and amount')).toBeInTheDocument();
    });
    it('should handle clicking on Cancel button', () => {
        render(<CreateEditAd />);
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
        userEvent.click(cancelButton);
        expect(mockFn).toHaveBeenCalledWith(MY_ADS_URL);
    });
});
